
'use client';
import * as THREE from 'three';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  BallCollider,
  Physics,
  RapierRigidBody,
  RigidBody,
  RigidBodyProps,
} from '@react-three/rapier';
import { useTheme } from 'next-themes';

const Ball = ({
  vec = new THREE.Vector3(),
  rigidbody,
  ...props
}: {
  vec?: THREE.Vector3;
  rigidbody: React.RefObject<RapierRigidBody>;
} & RigidBodyProps) => {
  useFrame((_, delta) => {
    if (rigidbody.current) {
      vec.set(0, 0, -5); // Move towards the back
      const impulse = vec.multiplyScalar(delta * 2);
      rigidbody.current.applyImpulse(impulse, true);
    }
  });

  return (
    <RigidBody
      ref={rigidbody}
      colliders="ball"
      linearDamping={4}
      angularDamping={1}
      friction={0}
      restitution={1.1}
      {...props}
    >
      <BallCollider args={[1]} />
    </RigidBody>
  );
};

const Pointer = ({ vec = new THREE.Vector3(), rigidbody, ...props }: {
  vec?: THREE.Vector3;
  rigidbody: React.RefObject<RapierRigidBody>;
} & RigidBodyProps) => {
  useFrame(({ pointer, viewport }) => {
    if (rigidbody.current) {
      vec.set(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0,
      );
      rigidbody.current.setNextKinematicTranslation(vec);
    }
  });

  return (
    <RigidBody
      ref={rigidbody}
      type="kinematicPosition"
      colliders="ball"
      {...props}
    />
  );
};

export default function Ballpit() {
  const { resolvedTheme } = useTheme();
  const rigidbody = useRef<RapierRigidBody>(null);
  const pointer = useRef<RapierRigidBody>(null);
  const colors = {
    light: [
      '#67e8f9',
      '#a5b4fc',
      '#d8b4fe',
    ],
    dark: [
      '#67e8f9',
      '#a5b4fc',
      '#d8b4fe',
    ],
  };

  return (
    <div className='absolute inset-0 -z-10'>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 25, near: 1, far: 40 }}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer rigidbody={pointer} />
          {Array.from({ length: 40 }, (_, i) => (
            <Ball
              key={i}
              rigidbody={rigidbody}
              position={[
                THREE.MathUtils.randFloatSpread(15),
                THREE.MathUtils.randFloatSpread(15),
                THREE.MathUtils.randFloatSpread(15),
              ]}
            >
              <mesh>
                <sphereGeometry args={[1]} />
                <meshStandardMaterial
                  color={
                    colors[
                      (resolvedTheme as keyof typeof colors) ?? 'dark'
                    ][Math.floor(Math.random() * 3)]
                  }
                  emissive='black'
                  roughness={0.1}
                  metalness={0.75}
                />
              </mesh>
            </Ball>
          ))}
        </Physics>
      </Canvas>
    </div>
  );
}
