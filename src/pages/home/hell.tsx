import { Canvas } from '@react-three/fiber';
import { FlyControls, Stars, Icosahedron, MeshWobbleMaterial } from '@react-three/drei';

const Home = () => {
    return (
        <section id="home" className="w-full h-screen bg-background flex items-center justify-center relative overflow-hidden">
            <Canvas
                className="absolute inset-0 w-full h-full"
                camera={{ position: [0, 0, 10], fov: 75 }}
            >
                <ambientLight intensity={0.8} />
                <directionalLight position={[2, 5, 2]} intensity={1} />
                <Stars radius={150} depth={60} count={7000} factor={7} saturation={0} fade speed={1} />
                <Icosahedron args={[1, 0]} scale={3} position={[0, 0, -8]}>
                    <MeshWobbleMaterial
                        color={window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "#93c5fd" : "#4ade80"}
                        attach="material"
                        speed={1.5}
                        factor={1}
                    />
                </Icosahedron>
                {/* Replace OrbitControls with FlyControls */}
                <FlyControls movementSpeed={2} rollSpeed={0.5} dragToLook />
            </Canvas>

            {/* Main Content */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-textPrimary dark:text-textPrimary mb-4">
                        Welcome to My Portfolio
                    </h1>
                    <p className="text-lg md:text-xl text-textSecondary dark:text-textSecondary max-w-lg mx-auto">
                        Discover my projects, skills, and experience as I share my journey in the world of development and design.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Home;
