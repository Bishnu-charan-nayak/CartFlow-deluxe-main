import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox, Float, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

const ProductBox = ({ color = '#3b82f6' }: { color?: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <RoundedBox ref={meshRef} args={[2, 2.5, 0.3]} radius={0.15} smoothness={4}>
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </RoundedBox>
      {/* Shopping bag handle */}
      <mesh position={[0, 1.6, 0]}>
        <torusGeometry args={[0.5, 0.06, 16, 32, Math.PI]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
    </Float>
  );
};

interface Props {
  color?: string;
  className?: string;
}

/**
 * 3D product viewer with drag-to-rotate interaction.
 */
const ProductViewer3D = ({ color = '#3b82f6', className = '' }: Props) => {
  return (
    <div className={`rounded-2xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted ${className}`} style={{ height: '300px' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, -5]} intensity={0.3} color="#60a5fa" />
        <ProductBox color={color} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
};

export default ProductViewer3D;
