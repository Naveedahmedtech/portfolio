import React, { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents, Preload } from "@react-three/drei";
import { gsap } from "gsap";
import * as THREE from "three";
import {
  setCursorAnchors,
  type CursorAnchor,
} from "../../../state/cursorAnchors";

type StarLayer = {
  positions: Float32Array;
  colors: Float32Array;
  velocities: Float32Array;
};

type CircuitLine = {
  line: THREE.Line;
  geometry: THREE.BufferGeometry;
  material: THREE.LineBasicMaterial;
  glowLine: THREE.Line;
  glowMaterial: THREE.LineBasicMaterial;
  timeline: gsap.core.Timeline | null;
  orientation: "vertical" | "horizontal";
  length: number;
  laneIndex: number;
  direction: 1 | -1;
  phaseOffset: number;
  travelStart: THREE.Vector3;
  travelEnd: THREE.Vector3;
};

const STAR_DEPTH: [number, number] = [-2.2, 2.2];
const STAR_COUNT_NEAR = 880;
const STAR_COUNT_FAR = 1200;
const V_LANE_COUNT = 5;
const H_LANE_COUNT = 5;
const LINE_COUNT = V_LANE_COUNT + H_LANE_COUNT;
const MAX_INTERSECTIONS = 48;

const randRange = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const createPointTexture = () => {
  if (typeof document === "undefined") return null;
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.45, "rgba(255, 255, 255, 0.85)");
  gradient.addColorStop(0.78, "rgba(255, 255, 255, 0.2)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

const buildStarLayer = (
  count: number,
  width: number,
  height: number,
  depthRange: [number, number],
  colorA: THREE.Color,
  colorB: THREE.Color,
  velocityScale: number
): StarLayer => {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const index = i * 3;
    const x = THREE.MathUtils.randFloatSpread(width * 1.1);
    const y = THREE.MathUtils.randFloatSpread(height * 1.1);
    const z = THREE.MathUtils.randFloat(depthRange[0], depthRange[1]);

    positions[index] = x;
    positions[index + 1] = y;
    positions[index + 2] = z;

    velocities[index] = randRange(-0.12, 0.12) * velocityScale;
    velocities[index + 1] = randRange(-0.1, 0.1) * velocityScale;
    velocities[index + 2] = randRange(-0.04, 0.04) * velocityScale;

    const tint = colorA.clone().lerp(colorB, Math.random());
    tint.multiplyScalar(THREE.MathUtils.randFloat(0.78, 1.1));
    colors[index] = tint.r;
    colors[index + 1] = tint.g;
    colors[index + 2] = tint.b;
  }

  return { positions, colors, velocities };
};

const createLanes = (count: number, span: number) => {
  const step = span / (count + 1);
  return Array.from({ length: count }, (_, index) =>
    -span / 2 + step * (index + 1)
  );
};

const buildLineGeometry = (
  length: number,
  orientation: "vertical" | "horizontal"
) => {
  const geometry = new THREE.BufferGeometry();
  const half = length / 2;
  const points =
    orientation === "vertical"
      ? [new THREE.Vector3(0, -half, 0), new THREE.Vector3(0, half, 0)]
      : [new THREE.Vector3(-half, 0, 0), new THREE.Vector3(half, 0, 0)];
  geometry.setFromPoints(points);
  return geometry;
};

const SceneField: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const lineGroupRef = useRef<THREE.Group>(null);
  const starsFarRef = useRef<THREE.Points>(null);
  const starsNearRef = useRef<THREE.Points>(null);
  const starsFarMaterialRef = useRef<THREE.PointsMaterial>(null);
  const starsNearMaterialRef = useRef<THREE.PointsMaterial>(null);
  const intersectionRef = useRef<THREE.Points>(null);
  const intersectionMaterialRef = useRef<THREE.PointsMaterial>(null);
  const pathsRef = useRef<CircuitLine[]>([]);
  const { viewport, mouse, size, camera } = useThree();

  const reduceMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const pointTexture = useMemo(() => createPointTexture(), []);
  const glowPositions = useMemo(
    () => new Float32Array(MAX_INTERSECTIONS * 3),
    []
  );
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const pointerWorld = useMemo(() => new THREE.Vector3(), []);
  const pointerLocal = useMemo(() => new THREE.Vector3(), []);
  const inverseMatrix = useMemo(() => new THREE.Matrix4(), []);

  const fieldWidth = viewport.width * 1.6;
  const fieldHeight = viewport.height * 1.6;
  const fieldSizeRef = useRef({ width: fieldWidth, height: fieldHeight });

  useEffect(() => {
    fieldSizeRef.current = { width: fieldWidth, height: fieldHeight };
  }, [fieldWidth, fieldHeight]);

  const verticalLanes = useMemo(
    () => createLanes(V_LANE_COUNT, fieldWidth * 0.92),
    [fieldWidth]
  );
  const horizontalLanes = useMemo(
    () => createLanes(H_LANE_COUNT, fieldHeight * 0.92),
    [fieldHeight]
  );

  const starsFarData = useMemo(
    () =>
      buildStarLayer(
        STAR_COUNT_FAR,
        fieldWidth,
        fieldHeight,
        STAR_DEPTH,
        new THREE.Color("#eee3d7"),
        new THREE.Color("#a7bed8"),
        0.1
      ),
    [fieldWidth, fieldHeight]
  );

  const starsNearData = useMemo(
    () =>
      buildStarLayer(
        STAR_COUNT_NEAR,
        fieldWidth,
        fieldHeight,
        STAR_DEPTH,
        new THREE.Color("#f8eee2"),
        new THREE.Color("#c5d8ea"),
        0.12
      ),
    [fieldWidth, fieldHeight]
  );

  const anchorIndices = useMemo(() => {
    const count = starsNearData.positions.length / 3;
    const indices = new Set<number>();
    const targetCount = Math.min(14, count);
    while (indices.size < targetCount) {
      indices.add(Math.floor(Math.random() * count));
    }
    return Array.from(indices);
  }, [starsNearData]);

  const anchorBufferRef = useRef<CursorAnchor[]>([]);
  const anchorVector = useMemo(() => new THREE.Vector3(), []);

  const configureLine = (path: CircuitLine, flipDirection = false) => {
    const { width, height } = fieldSizeRef.current;
    const margin = Math.max(width, height) * 0.14;
    if (flipDirection) {
      path.direction = path.direction === 1 ? -1 : 1;
    }

    const orientation = path.orientation;
    const laneValue =
      orientation === "vertical"
        ? verticalLanes[path.laneIndex % verticalLanes.length]
        : horizontalLanes[path.laneIndex % horizontalLanes.length];

    const length =
      orientation === "vertical"
        ? randRange(height * 0.32, height * 0.55)
        : randRange(width * 0.32, width * 0.55);

    path.geometry.dispose();
    path.geometry = buildLineGeometry(length, orientation);
    path.line.geometry = path.geometry;
    path.glowLine.geometry = path.geometry;
    path.length = length;

    if (orientation === "vertical") {
      const startY = height / 2 + length / 2 + margin;
      const endY = -height / 2 - length / 2 - margin;
      const start = new THREE.Vector3(laneValue, startY, randRange(-0.5, 0.5));
      const end = new THREE.Vector3(laneValue, endY, start.z);
      if (path.direction === 1) {
        path.travelStart.copy(start);
        path.travelEnd.copy(end);
      } else {
        path.travelStart.copy(end);
        path.travelEnd.copy(start);
      }
    } else {
      const startX = -width / 2 - length / 2 - margin;
      const endX = width / 2 + length / 2 + margin;
      const start = new THREE.Vector3(startX, laneValue, randRange(-0.5, 0.5));
      const end = new THREE.Vector3(endX, laneValue, start.z);
      if (path.direction === 1) {
        path.travelStart.copy(start);
        path.travelEnd.copy(end);
      } else {
        path.travelStart.copy(end);
        path.travelEnd.copy(start);
      }
    }

    path.line.position.copy(path.travelStart);
    path.glowLine.position.copy(path.travelStart);
  };

  const animateLine = (path: CircuitLine, delay = 0) => {
    path.timeline?.kill();

    const travelDuration = randRange(12, 18);
    const fadeIn = randRange(1.6, 2.8);
    const fadeOut = randRange(2.4, 3.4);
    const hold = Math.max(2, travelDuration - fadeIn - fadeOut);

    const timeline = gsap.timeline({
      delay,
      onComplete: () => {
        configureLine(path, true);
        path.phaseOffset = Math.random();
        animateLine(path, randRange(0.6, 1.8));
      },
    });

    timeline.to(
      path.line.position,
      {
        x: path.travelEnd.x,
        y: path.travelEnd.y,
        duration: travelDuration,
        ease: "sine.inOut",
      },
      0
    );

    timeline.to(
      path.material,
      {
        opacity: 0.5,
        duration: fadeIn,
        ease: "sine.out",
      },
      0
    );

    timeline.to(
      path.material,
      {
        opacity: 0.5,
        duration: hold,
        ease: "none",
      },
      fadeIn
    );

    timeline.to(
      path.material,
      {
        opacity: 0,
        duration: fadeOut,
        ease: "sine.inOut",
      },
      fadeIn + hold
    );

    timeline.to(
      path.material,
      {
        opacity: 0.68,
        duration: 0.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1,
      },
      fadeIn + hold * 0.45
    );

    timeline.progress(path.phaseOffset);
    timeline.timeScale(randRange(0.9, 1.05));

    path.timeline = timeline;
  };

  useEffect(() => {
    const lineGroup = lineGroupRef.current;
    if (!lineGroup) return;

    const paths: CircuitLine[] = [];

    for (let i = 0; i < LINE_COUNT; i += 1) {
      const orientation = i < V_LANE_COUNT ? "vertical" : "horizontal";
      const laneIndex =
        i < V_LANE_COUNT ? i : (i - V_LANE_COUNT) % H_LANE_COUNT;
      const direction = i % 2 === 0 ? 1 : -1;
      const geometry = buildLineGeometry(1, orientation);
      const material = new THREE.LineBasicMaterial({
        color: "#d8cab8",
        transparent: true,
        opacity: 0,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
      });
      const glowMaterial = new THREE.LineBasicMaterial({
        color: "#f3d8b8",
        transparent: true,
        opacity: 0,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
      });
      const line = new THREE.Line(geometry, material);
      const glowLine = new THREE.Line(geometry, glowMaterial);
      line.frustumCulled = false;
      glowLine.frustumCulled = false;

      const path: CircuitLine = {
        line,
        geometry,
        material,
        glowLine,
        glowMaterial,
        timeline: null,
        orientation,
        length: 1,
        laneIndex,
        direction,
        phaseOffset: Math.random(),
        travelStart: new THREE.Vector3(),
        travelEnd: new THREE.Vector3(),
      };

      configureLine(path, false);

      if (!reduceMotion) {
        const delay =
          orientation === "vertical"
            ? laneIndex * 0.35 + randRange(0, 1)
            : laneIndex * 0.35 + 0.5 + randRange(0, 1);
        animateLine(path, delay);
      } else {
        material.opacity = 0.25;
      }

      lineGroup.add(line);
      lineGroup.add(glowLine);
      paths.push(path);
    }

    pathsRef.current = paths;

    return () => {
      pathsRef.current.forEach((path) => {
        path.timeline?.kill();
        lineGroup.remove(path.line);
        lineGroup.remove(path.glowLine);
        path.geometry.dispose();
        path.material.dispose();
        path.glowMaterial.dispose();
      });
      pathsRef.current = [];
    };
  }, [reduceMotion, fieldWidth, fieldHeight, verticalLanes, horizontalLanes]);

  useEffect(() => {
    return () => {
      pointTexture?.dispose();
    };
  }, [pointTexture]);

  useEffect(() => {
    anchorBufferRef.current = anchorIndices.map(() => ({
      x: 0,
      y: 0,
      strength: 1,
    }));
    return () => {
      setCursorAnchors([]);
    };
  }, [anchorIndices]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    const starsFar = starsFarRef.current;
    const starsNear = starsNearRef.current;
    const starsFarMat = starsFarMaterialRef.current;
    const starsNearMat = starsNearMaterialRef.current;
    const intersectionPoints = intersectionRef.current;
    const intersectionMat = intersectionMaterialRef.current;

    if (
      !group ||
      !starsFar ||
      !starsNear ||
      !starsFarMat ||
      !starsNearMat ||
      !intersectionPoints ||
      !intersectionMat
    )
      return;

    const { width, height } = fieldSizeRef.current;
    const boundX = width / 2;
    const boundY = height / 2;

    let pointerBoost = 0;
    if (!reduceMotion) {
      const time = state.clock.elapsedTime;
      starsFarMat.opacity = 0.28 + Math.sin(time * 0.2) * 0.03;
      starsNearMat.opacity = 0.42 + Math.sin(time * 0.25) * 0.04;

      const updateStars = (layer: StarLayer, speedScale: number) => {
        const { positions, velocities } = layer;
        for (let i = 0; i < positions.length; i += 3) {
          let x = positions[i] + velocities[i] * delta * speedScale;
          let y = positions[i + 1] + velocities[i + 1] * delta * speedScale;
          let z = positions[i + 2] + velocities[i + 2] * delta * speedScale;

          if (x > boundX) x = -boundX;
          if (x < -boundX) x = boundX;
          if (y > boundY) y = -boundY;
          if (y < -boundY) y = boundY;
          if (z > STAR_DEPTH[1]) z = STAR_DEPTH[0];
          if (z < STAR_DEPTH[0]) z = STAR_DEPTH[1];

          positions[i] = x;
          positions[i + 1] = y;
          positions[i + 2] = z;
        }
      };

      updateStars(starsFarData, 0.35);
      updateStars(starsNearData, 0.45);

      starsFar.geometry.attributes.position.needsUpdate = true;
      starsNear.geometry.attributes.position.needsUpdate = true;

      plane.constant = -group.position.z;
      raycaster.setFromCamera(mouse, camera);
      if (raycaster.ray.intersectPlane(plane, pointerWorld)) {
        inverseMatrix.copy(group.matrixWorld).invert();
        pointerLocal.copy(pointerWorld).applyMatrix4(inverseMatrix);
      }

      const lines = pathsRef.current;
      const pointerX = pointerLocal.x;
      const pointerY = pointerLocal.y;
      for (const line of lines) {
        line.glowLine.position.copy(line.line.position);
        let dx = 0;
        let dy = 0;
        if (line.orientation === "vertical") {
          const x = line.line.position.x;
          const y1 = line.line.position.y - line.length / 2;
          const y2 = line.line.position.y + line.length / 2;
          dx = Math.abs(pointerX - x);
          if (pointerY < y1) dy = y1 - pointerY;
          if (pointerY > y2) dy = pointerY - y2;
        } else {
          const y = line.line.position.y;
          const x1 = line.line.position.x - line.length / 2;
          const x2 = line.line.position.x + line.length / 2;
          dy = Math.abs(pointerY - y);
          if (pointerX < x1) dx = x1 - pointerX;
          if (pointerX > x2) dx = pointerX - x2;
        }
        const dist = Math.hypot(dx, dy);
        const boost = Math.max(0, 1 - dist / 1.4);
        line.glowMaterial.opacity = boost * 0.45;
      }
      let glowCount = 0;
      for (let i = 0; i < lines.length; i += 1) {
        const lineA = lines[i];
        const posA = lineA.line.position;
        if (lineA.orientation === "vertical") {
          const x = posA.x;
          const y1 = posA.y - lineA.length / 2;
          const y2 = posA.y + lineA.length / 2;
          for (let j = 0; j < lines.length; j += 1) {
            if (i === j) continue;
            const lineB = lines[j];
            if (lineB.orientation !== "horizontal") continue;
            const posB = lineB.line.position;
            const x1 = posB.x - lineB.length / 2;
            const x2 = posB.x + lineB.length / 2;
            const y = posB.y;

            if (x >= Math.min(x1, x2) && x <= Math.max(x1, x2)) {
              if (y >= Math.min(y1, y2) && y <= Math.max(y1, y2)) {
                if (glowCount < MAX_INTERSECTIONS) {
                  const idx = glowCount * 3;
                  glowPositions[idx] = x;
                  glowPositions[idx + 1] = y;
                  glowPositions[idx + 2] = (posA.z + posB.z) * 0.5;
                  glowCount += 1;

                  const dist = pointerLocal.distanceTo(
                    new THREE.Vector3(x, y, 0)
                  );
                  const influence = Math.max(0, 1 - dist / 1.6);
                  if (influence > pointerBoost) pointerBoost = influence;
                }
              }
            }
          }
        }
      }

      intersectionPoints.geometry.setDrawRange(0, glowCount);
      intersectionPoints.geometry.attributes.position.needsUpdate = true;
      intersectionMat.opacity =
        0.28 + Math.sin(time * 2.1) * 0.08 + pointerBoost * 0.3;
    }

    group.updateMatrixWorld();
    const anchorBuffer = anchorBufferRef.current;
    if (anchorBuffer.length) {
      for (let i = 0; i < anchorIndices.length; i += 1) {
        const starIndex = anchorIndices[i] * 3;
        anchorVector.set(
          starsNearData.positions[starIndex],
          starsNearData.positions[starIndex + 1],
          starsNearData.positions[starIndex + 2]
        );
        anchorVector.applyMatrix4(group.matrixWorld);
        anchorVector.project(camera);
        anchorBuffer[i].x = (anchorVector.x * 0.5 + 0.5) * size.width;
        anchorBuffer[i].y = (-anchorVector.y * 0.5 + 0.5) * size.height;
      }
      setCursorAnchors(anchorBuffer);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -2.4]}>
      <points ref={starsFarRef} renderOrder={0}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={starsFarData.positions}
            count={starsFarData.positions.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            array={starsFarData.colors}
            count={starsFarData.colors.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={starsFarMaterialRef}
          vertexColors
          size={0.055}
          sizeAttenuation
          transparent
          opacity={0.28}
          depthWrite={false}
          depthTest={false}
          blending={THREE.AdditiveBlending}
          map={pointTexture ?? undefined}
          alphaMap={pointTexture ?? undefined}
          toneMapped={false}
        />
      </points>

      <points ref={starsNearRef} renderOrder={1}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={starsNearData.positions}
            count={starsNearData.positions.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            array={starsNearData.colors}
            count={starsNearData.colors.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={starsNearMaterialRef}
          vertexColors
          size={0.1}
          sizeAttenuation
          transparent
          opacity={0.42}
          depthWrite={false}
          depthTest={false}
          blending={THREE.AdditiveBlending}
          map={pointTexture ?? undefined}
          alphaMap={pointTexture ?? undefined}
          toneMapped={false}
        />
      </points>

      <points ref={intersectionRef} renderOrder={2}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={glowPositions}
            count={glowPositions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={intersectionMaterialRef}
          size={0.12}
          sizeAttenuation
          transparent
          opacity={0.32}
          depthWrite={false}
          depthTest={false}
          blending={THREE.AdditiveBlending}
          map={pointTexture ?? undefined}
          alphaMap={pointTexture ?? undefined}
          toneMapped={false}
          color="#f0d8b6"
        />
      </points>

      <group ref={lineGroupRef} />
    </group>
  );
};

const HeroCanvas: React.FC = () => {
  return (
    <Canvas
      className="pointer-events-none !absolute inset-0 h-full w-full"
      camera={{ position: [0, 0, 10], fov: 55 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <AdaptiveDpr />
      <AdaptiveEvents />
      <SceneField />
      <Preload all />
      {/* TODO: dispose geometries/materials when unmounted */}
    </Canvas>
  );
};

export default HeroCanvas;
