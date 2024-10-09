// UniverseBackground.js
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

export default function UniverseBackground() {
    return (
        <Canvas style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}>
            <Stars radius={100} depth={50} count={5000} factor={4} fade />
        </Canvas>
    );
}
