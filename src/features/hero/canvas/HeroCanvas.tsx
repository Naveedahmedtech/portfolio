import React, { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  MeshTransmissionMaterial,
  AdaptiveDpr,
  Preload,
  Environment
} from "@react-three/drei";
import * as THREE from "three";

const PARTICLE_COUNT = 2000;
const RADIUS_VOID = 3.5; // Visual void for center text

const ParticleField: React.FC<{ scrollProgress: React.MutableRefObject<number> }> = ({ scrollProgress }) => {
  const points = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const cols = new Float32Array(PARTICLE_COUNT * 3);
    const colorPrimary = new THREE.Color("#b86a4a");
    const colorAccent = new THREE.Color("#e2a177");

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Create a donut-like distribution to keep the center clear
      const angle = Math.random() * Math.PI * 2;
      const radius = RADIUS_VOID + Math.random() * 8;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = THREE.MathUtils.randFloatSpread(10);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      const mixedColor = colorPrimary.clone().lerp(colorAccent, Math.random());
      cols[i * 3] = mixedColor.r;
      cols[i * 3 + 1] = mixedColor.g;
      cols[i * 3 + 2] = mixedColor.b;
    }
    return [pos, cols];
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    const time = state.clock.elapsedTime;
    const scroll = scrollProgress.current;

    points.current.rotation.y = time * 0.03 + scroll * 0.4;
    points.current.rotation.z = time * 0.02;

    const material = points.current.material as THREE.PointsMaterial;
    material.opacity = 0.12 + scroll * 0.28;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const RefractiveAura: React.FC<{ scrollProgress: React.MutableRefObject<number> }> = ({ scrollProgress }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const { mouse, viewport } = useThree();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const scroll = scrollProgress.current;

    if (meshRef.current) {
      // Wide tilt to follow cursor around the center text
      const targetRX = (mouse.y * viewport.height) * 0.04;
      const targetRY = (mouse.x * viewport.width) * 0.04;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRX, 0.04);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRY + time * 0.1, 0.04);

      const bounce = Math.sin(time * 0.5) * 0.05;
      const baseScale = 2.4 + scroll * 0.4 + bounce;
      meshRef.current.scale.setScalar(baseScale);
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.15;
      ring1Ref.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.1;
      ring2Ref.current.rotation.y = Math.cos(time * 0.2) * 0.1;
    }
  });

  return (
    <group>
      {/* Large Hollow Refractive Torus */}
      <mesh ref={meshRef}>
        <torusGeometry args={[1.5, 0.08, 32, 128]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={0.2}
          chromaticAberration={0.04}
          anisotropy={0.2}
          distortion={0.3}
          distortionScale={0.4}
          temporalDistortion={0.1}
          iridescence={0.8}
          iridescenceIOR={1.2}
          iridescenceThicknessRange={[0, 1000]}
          color="#f7f0e6"
          roughness={0.05}
          metalness={0.05}
          transmission={0.95}
        />
      </mesh>

      {/* Wide Orbit Architectural Rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[4.2, 0.008, 16, 120]} />
        <meshBasicMaterial color="#b86a4a" transparent opacity={0.2} />
      </mesh>

      <mesh ref={ring2Ref} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[4.6, 0.006, 16, 120]} />
        <meshBasicMaterial color="#e2a177" transparent opacity={0.15} />
      </mesh>

      <Environment preset="city" />
    </group>
  );
};

const Scene: React.FC = () => {
  const scrollProgress = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY / (window.innerHeight * 3);
      scrollProgress.current = Math.min(Math.max(scrolled, 0), 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <ambientLight intensity={0.4} />
      <spotLight position={[15, 20, 5]} angle={0.3} penumbra={1} intensity={1.5} />
      <pointLight position={[-15, -15, -10]} intensity={0.6} color="#b86a4a" />

      <RefractiveAura scrollProgress={scrollProgress} />
      <ParticleField scrollProgress={scrollProgress} />
    </>
  );
};

const HeroCanvas: React.FC = () => {
  return (
    <Canvas
      className="pointer-events-none !absolute inset-0 h-full w-full"
      camera={{ position: [0, 0, 12], fov: 40 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true
      }}
    >
      <AdaptiveDpr />
      <Scene />
      <Preload all />
    </Canvas>
  );
};

export default HeroCanvas;
