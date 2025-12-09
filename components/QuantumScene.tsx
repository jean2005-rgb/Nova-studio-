
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Box, Cylinder, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShape = ({ position, color, type, delay = 0 }: { position: [number, number, number]; color: string; type: 'sphere' | 'box' | 'torus' | 'cylinder'; delay?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * 0.5 + delay) * 0.3;
      ref.current.rotation.x = t * 0.2 + delay;
      ref.current.rotation.z = t * 0.1;
    }
  });

  const material = (
    <MeshDistortMaterial
        color={color}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={0.1}
        metalness={0.1}
        distort={0.3}
        speed={1.5}
    />
  );

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {type === 'sphere' && <Sphere ref={ref} args={[1, 32, 32]} position={position} scale={1.2}>{material}</Sphere>}
        {type === 'box' && <Box ref={ref} args={[1.5, 1.5, 1.5]} position={position} rotation={[0.5, 0.5, 0]} scale={1}>{material}</Box>}
        {type === 'torus' && <Torus ref={ref} args={[1, 0.4, 32, 32]} position={position} rotation={[1, 0.5, 0]} scale={1.2}>{material}</Torus>}
        {type === 'cylinder' && <Cylinder ref={ref} args={[0.5, 0.5, 2, 32]} position={position} rotation={[0.5, 0, 0.5]} scale={1}>{material}</Cylinder>}
    </Float>
  );
};

export const CreativeScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#5F9EA0" />
        <pointLight position={[-10, -5, -10]} intensity={0.5} color="#E2E8F0" />
        
        {/* Abstract Geometric Composition representing Design Elements */}
        <group position={[3, 0, 0]}>
            <FloatingShape position={[0, 1, 0]} color="#5F9EA0" type="torus" delay={0} />
            <FloatingShape position={[-2, -1.5, 1]} color="#A0AEC0" type="sphere" delay={1} />
            <FloatingShape position={[1.5, -1, -2]} color="#B2F5EA" type="box" delay={2} />
        </group>

        {/* Background ambient shapes */}
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
             <Torus args={[4, 0.05, 16, 100]} position={[-2, 0, -5]} rotation={[Math.PI / 3, 0, 0]}>
                <meshStandardMaterial color="#CBD5E0" transparent opacity={0.3} />
            </Torus>
             <Torus args={[3, 0.05, 16, 100]} position={[-2, 0, -5]} rotation={[Math.PI / 2, 0.5, 0]}>
                <meshStandardMaterial color="#5F9EA0" transparent opacity={0.2} />
            </Torus>
        </Float>

        <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.25} far={10} color="#000000" />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};
