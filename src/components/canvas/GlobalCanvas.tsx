import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
    MeshTransmissionMaterial,
    AdaptiveDpr,
    Preload,
    Environment,
} from '@react-three/drei';
import * as THREE from 'three';
import { useScrollProgress } from '../../hooks/useScrollProgress';

// ═══════════════════════════════════════════════════════════════════════════════
// SHARED PARTICLE SYSTEM - Morphs between section states
// ═══════════════════════════════════════════════════════════════════════════════

const isMobile = typeof window !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const PARTICLE_COUNT = isMobile ? 800 : 2500;

interface ParticleState {
    // Hero: Donut ring around center
    hero: Float32Array;
    // Skills: Orbiting neural nodes - clustered groups
    skills: Float32Array;
    // Experience: Horizontal timeline flow
    experience: Float32Array;
    // Contact: Converging vortex
    contact: Float32Array;
}

const generateParticleStates = (): ParticleState => {
    const hero = new Float32Array(PARTICLE_COUNT * 3);
    const skills = new Float32Array(PARTICLE_COUNT * 3);
    const experience = new Float32Array(PARTICLE_COUNT * 3);
    const contact = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;

        // HERO: Donut distribution
        const heroAngle = Math.random() * Math.PI * 2;
        const heroRadius = 3.5 + Math.random() * 8;
        hero[i3] = Math.cos(heroAngle) * heroRadius;
        hero[i3 + 1] = Math.sin(heroAngle) * heroRadius;
        hero[i3 + 2] = THREE.MathUtils.randFloatSpread(10);

        // SKILLS: Neural clusters - 6 orbital groups
        const clusterIndex = Math.floor(Math.random() * 6);
        const clusterAngle = (clusterIndex / 6) * Math.PI * 2;
        const clusterRadius = 4 + Math.random() * 2;
        const localOffset = THREE.MathUtils.randFloatSpread(1.5);
        skills[i3] = Math.cos(clusterAngle) * clusterRadius + localOffset;
        skills[i3 + 1] = Math.sin(clusterAngle) * clusterRadius + localOffset;
        skills[i3 + 2] = THREE.MathUtils.randFloatSpread(3);

        // EXPERIENCE: Horizontal ribbon flow
        const ribbonX = THREE.MathUtils.randFloatSpread(20);
        const ribbonY = Math.sin(ribbonX * 0.3) * 2 + THREE.MathUtils.randFloatSpread(1);
        const ribbonZ = Math.cos(ribbonX * 0.2) * 3;
        experience[i3] = ribbonX;
        experience[i3 + 1] = ribbonY;
        experience[i3 + 2] = ribbonZ;

        // CONTACT: Converging vortex
        const vortexAngle = Math.random() * Math.PI * 2;
        const vortexRadius = Math.random() * 6;
        const vortexSpiral = vortexAngle + vortexRadius * 0.5;
        contact[i3] = Math.cos(vortexSpiral) * vortexRadius;
        contact[i3 + 1] = Math.sin(vortexSpiral) * vortexRadius;
        contact[i3 + 2] = (vortexRadius - 3) * 2;
    }

    return { hero, skills, experience, contact };
};

const MorphingParticles: React.FC = () => {
    const points = useRef<THREE.Points>(null);
    const { progress, activeSection } = useScrollProgress();

    const [states, colors] = useMemo(() => {
        const particleStates = generateParticleStates();
        const cols = new Float32Array(PARTICLE_COUNT * 3);

        const colorPrimary = new THREE.Color('#b86a4a');
        const colorAccent = new THREE.Color('#e2a177');
        const colorSecondary = new THREE.Color('#8b7355');

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const t = Math.random();
            const mixedColor = colorPrimary.clone()
                .lerp(colorAccent, t)
                .lerp(colorSecondary, Math.random() * 0.3);
            cols[i * 3] = mixedColor.r;
            cols[i * 3 + 1] = mixedColor.g;
            cols[i * 3 + 2] = mixedColor.b;
        }

        return [particleStates, cols];
    }, []);

    useFrame((state) => {
        if (!points.current) return;
        const time = state.clock.elapsedTime;
        const positions = points.current.geometry.attributes.position.array as Float32Array;

        // Calculate blend weights based on section progress
        const heroWeight = Math.max(0, 1 - progress.hero * 2);
        const skillsWeight = Math.min(1, Math.max(0, progress.skills * 2 - 0.3)) *
            Math.max(0, 1 - (progress.skills - 0.5) * 3);
        const expWeight = Math.min(1, Math.max(0, progress.experience * 2 - 0.2)) *
            Math.max(0, 1 - (progress.experience - 0.6) * 3);
        const contactWeight = Math.min(1, progress.contact * 1.5);

        const totalWeight = heroWeight + skillsWeight + expWeight + contactWeight || 1;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const i3 = i * 3;

            // Weighted blend between all states
            const targetX = (
                states.hero[i3] * heroWeight +
                states.skills[i3] * skillsWeight +
                states.experience[i3] * expWeight +
                states.contact[i3] * contactWeight
            ) / totalWeight;

            const targetY = (
                states.hero[i3 + 1] * heroWeight +
                states.skills[i3 + 1] * skillsWeight +
                states.experience[i3 + 1] * expWeight +
                states.contact[i3 + 1] * contactWeight
            ) / totalWeight;

            const targetZ = (
                states.hero[i3 + 2] * heroWeight +
                states.skills[i3 + 2] * skillsWeight +
                states.experience[i3 + 2] * expWeight +
                states.contact[i3 + 2] * contactWeight
            ) / totalWeight;

            // Smooth interpolation with organic motion
            const noiseOffset = Math.sin(time * 0.5 + i * 0.01) * 0.1;
            positions[i3] = THREE.MathUtils.lerp(positions[i3], targetX + noiseOffset, 0.03);
            positions[i3 + 1] = THREE.MathUtils.lerp(positions[i3 + 1], targetY + noiseOffset, 0.03);
            positions[i3 + 2] = THREE.MathUtils.lerp(positions[i3 + 2], targetZ, 0.03);
        }

        points.current.geometry.attributes.position.needsUpdate = true;

        // Global rotation based on active section
        const rotationSpeed = activeSection === 'contact' ? 0.08 : 0.03;
        points.current.rotation.y = time * rotationSpeed;
        points.current.rotation.z = Math.sin(time * 0.1) * 0.1;

        // Opacity based on visibility
        const material = points.current.material as THREE.PointsMaterial;
        material.opacity = 0.15 + progress.hero * 0.2;
    });

    // Initialize with hero state
    const initialPositions = useMemo(() => {
        return new Float32Array(states.hero);
    }, [states]);

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={PARTICLE_COUNT}
                    array={initialPositions}
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
                size={0.035}
                vertexColors
                transparent
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
};

// ═══════════════════════════════════════════════════════════════════════════════
// REFRACTIVE AURA - Morphing geometric forms per section
// ═══════════════════════════════════════════════════════════════════════════════

const MorphingAura: React.FC = () => {
    const torusRef = useRef<THREE.Mesh>(null);
    const ring1Ref = useRef<THREE.Mesh>(null);
    const ring2Ref = useRef<THREE.Mesh>(null);
    const { mouse, viewport } = useThree();
    const { progress, activeSection, totalProgress } = useScrollProgress();

    useFrame((state) => {
        const time = state.clock.elapsedTime;

        if (torusRef.current) {
            // Follow cursor
            const targetRX = (mouse.y * viewport.height) * 0.03;
            const targetRY = (mouse.x * viewport.width) * 0.03;
            torusRef.current.rotation.x = THREE.MathUtils.lerp(torusRef.current.rotation.x, targetRX, 0.04);
            torusRef.current.rotation.y = THREE.MathUtils.lerp(torusRef.current.rotation.y, targetRY + time * 0.08, 0.04);

            // Scale morphs based on section
            let targetScale = 2.4;
            if (activeSection === 'skills') {
                targetScale = 1.8 + Math.sin(time * 0.5) * 0.2; // Pulse smaller
            } else if (activeSection === 'experience') {
                targetScale = 0.8; // Shrink for horizontal space
            } else if (activeSection === 'contact') {
                targetScale = 3.0 + progress.contact * 1.5; // Expand as beacon
            }

            const currentScale = torusRef.current.scale.x;
            const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.02);
            torusRef.current.scale.setScalar(newScale);

            // Opacity fade based on scroll
            const fadeProgress = Math.min(totalProgress * 3, 1);
            (torusRef.current.material as THREE.MeshStandardMaterial).opacity =
                THREE.MathUtils.lerp(0.95, 0.4, fadeProgress);
        }

        // Orbital rings animation
        if (ring1Ref.current) {
            ring1Ref.current.rotation.z = time * 0.12;
            ring1Ref.current.rotation.x = Math.sin(time * 0.15) * 0.15;

            // Expand rings in experience section
            const ringScale = activeSection === 'experience' ? 1.4 : 1;
            ring1Ref.current.scale.setScalar(THREE.MathUtils.lerp(ring1Ref.current.scale.x, ringScale, 0.02));
        }

        if (ring2Ref.current) {
            ring2Ref.current.rotation.z = -time * 0.08;
            ring2Ref.current.rotation.y = Math.cos(time * 0.12) * 0.12;
        }
    });

    return (
        <group>
            {/* Main Refractive Torus */}
            <mesh ref={torusRef}>
                <torusGeometry args={[1.5, 0.06, 32, 128]} />
                <MeshTransmissionMaterial
                    backside={!isMobile}
                    samples={isMobile ? 3 : 6}
                    resolution={isMobile ? 256 : 1024}
                    thickness={0.15}
                    chromaticAberration={isMobile ? 0.01 : 0.03}
                    anisotropy={isMobile ? 0.05 : 0.15}
                    distortion={0.25}
                    distortionScale={0.35}
                    temporalDistortion={isMobile ? 0.02 : 0.08}
                    iridescence={isMobile ? 0.4 : 0.7}
                    iridescenceIOR={1.15}
                    iridescenceThicknessRange={[0, 800]}
                    color="#f7f0e6"
                    roughness={0.04}
                    metalness={0.04}
                    transmission={0.92}
                />
            </mesh>

            {/* Architectural Orbit Rings */}
            <mesh ref={ring1Ref}>
                <torusGeometry args={[4.5, 0.006, 16, 120]} />
                <meshBasicMaterial color="#b86a4a" transparent opacity={0.18} />
            </mesh>

            <mesh ref={ring2Ref} rotation={[Math.PI / 2.2, 0, 0]}>
                <torusGeometry args={[5.0, 0.004, 16, 120]} />
                <meshBasicMaterial color="#e2a177" transparent opacity={0.12} />
            </mesh>

            <Environment preset="city" />
        </group>
    );
};

// ═══════════════════════════════════════════════════════════════════════════════
// CONNECTION LINES - Neural network edges for Skills section
// ═══════════════════════════════════════════════════════════════════════════════

const ConnectionLines: React.FC = () => {
    const linesRef = useRef<THREE.LineSegments>(null);
    const { progress } = useScrollProgress();

    const lineGeometry = useMemo(() => {
        const positions: number[] = [];
        const nodeCount = 12;

        // Create node positions (orbital clusters)
        const nodes: THREE.Vector3[] = [];
        for (let i = 0; i < nodeCount; i++) {
            const angle = (i / nodeCount) * Math.PI * 2;
            const radius = 4 + Math.sin(i * 1.5) * 1.5;
            nodes.push(new THREE.Vector3(
                Math.cos(angle) * radius,
                Math.sin(angle) * radius,
                Math.sin(i * 0.8) * 2
            ));
        }

        // Connect nearby nodes
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const distance = nodes[i].distanceTo(nodes[j]);
                if (distance < 6) {
                    positions.push(nodes[i].x, nodes[i].y, nodes[i].z);
                    positions.push(nodes[j].x, nodes[j].y, nodes[j].z);
                }
            }
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        return geometry;
    }, []);

    useFrame((state) => {
        if (!linesRef.current) return;
        const time = state.clock.elapsedTime;

        // Only visible during skills section
        const visibility = Math.min(1, Math.max(0, progress.skills * 3 - 0.5)) *
            Math.max(0, 1 - (progress.skills - 0.7) * 4);

        (linesRef.current.material as THREE.LineBasicMaterial).opacity = visibility * 0.25;
        linesRef.current.rotation.z = time * 0.02;
    });

    return (
        <lineSegments ref={linesRef} geometry={lineGeometry}>
            <lineBasicMaterial color="#e2a177" transparent opacity={0} />
        </lineSegments>
    );
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN SCENE COMPOSITION
// ═══════════════════════════════════════════════════════════════════════════════

const GlobalScene: React.FC = () => {
    return (
        <>
            <ambientLight intensity={0.35} />
            <spotLight position={[15, 20, 5]} angle={0.25} penumbra={1} intensity={1.2} />
            <pointLight position={[-15, -15, -10]} intensity={0.5} color="#b86a4a" />

            <MorphingParticles />
            <MorphingAura />
            <ConnectionLines />
        </>
    );
};

const GlobalCanvas: React.FC = () => {
    return (
        <Canvas
            className="!fixed inset-0 h-full w-full pointer-events-none"
            style={{ zIndex: 0 }}
            camera={{ position: [0, 0, 12], fov: 38 }}
            gl={{
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
                stencil: false,
                depth: true,
            }}
        >
            <AdaptiveDpr pixelated />
            <GlobalScene />
            <Preload all />
        </Canvas>
    );
};

export default GlobalCanvas;
