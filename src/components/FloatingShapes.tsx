import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface ShapeProps {
  position: [number, number, number];
  color: string;
  scale: number;
  speed: number;
  type: 'sphere' | 'box' | 'torus' | 'octahedron';
}

const Shape = ({ position, color, scale, speed, type }: ShapeProps) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * speed * 0.5;
      ref.current.rotation.y += delta * speed * 0.3;
    }
  });

  const geometry = useMemo(() => {
    switch (type) {
      case 'sphere': return <sphereGeometry args={[1, 16, 16]} />;
      case 'box': return <boxGeometry args={[1, 1, 1]} />;
      case 'torus': return <torusGeometry args={[1, 0.4, 16, 32]} />;
      case 'octahedron': return <octahedronGeometry args={[1]} />;
    }
  }, [type]);

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={ref} position={position} scale={scale}>
        {geometry}
        <meshStandardMaterial color={color} transparent opacity={0.15} wireframe />
      </mesh>
    </Float>
  );
};

const shapes: ShapeProps[] = [
  { position: [-4, 2, -3], color: '#3b82f6', scale: 0.8, speed: 1.5, type: 'octahedron' },
  { position: [4, -1, -4], color: '#f97316', scale: 0.6, speed: 1.2, type: 'torus' },
  { position: [-3, -2, -2], color: '#10b981', scale: 0.5, speed: 1.8, type: 'sphere' },
  { position: [3, 3, -5], color: '#8b5cf6', scale: 0.7, speed: 1.0, type: 'box' },
  { position: [0, -3, -3], color: '#ec4899', scale: 0.4, speed: 2.0, type: 'octahedron' },
  { position: [-5, 0, -4], color: '#06b6d4', scale: 0.5, speed: 1.3, type: 'torus' },
];

/**
 * Floating 3D geometric shapes for homepage hero background.
 * Renders subtle wireframe shapes with parallax-like floating animation.
 */
const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 -z-10 opacity-60 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.3} />
        {shapes.map((shape, i) => (
          <Shape key={i} {...shape} />
        ))}
      </Canvas>
    </div>
  );
};

export default FloatingShapes;
