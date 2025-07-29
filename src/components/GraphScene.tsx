import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

const GraphScene = () => {
  const groupRef = useRef<THREE.Group>(null!);

  // Rotate the scene slowly
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Dummy bid bar */}
      <mesh position={[-5, 1, 0]}>
        <boxGeometry args={[1, 2, 1]} />
        <meshStandardMaterial color="green" />
      </mesh>

      {/* Dummy ask bar */}
      <mesh position={[5, 1, 0]}>
        <boxGeometry args={[1, 2, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </group>
  );
};

export default GraphScene;
