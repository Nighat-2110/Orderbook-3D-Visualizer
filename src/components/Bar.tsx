import React from 'react';
import { MeshProps } from '@react-three/fiber';

type BarProps = MeshProps & {
  color: string;
  isPressureZone?: boolean;
};

const Bar: React.FC<BarProps> = ({ color, isPressureZone = false, ...props }) => {
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        color={color}
        emissive={isPressureZone ? '#ff0000' : '#000000'}
        emissiveIntensity={isPressureZone ? 0.5 : 0}
        metalness={0.3}
        roughness={0.4}
      />
    </mesh>
  );
};

export default Bar;
