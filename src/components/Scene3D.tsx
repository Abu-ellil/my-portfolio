import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/** Wireframe icosahedron that slowly rotates; reacts to pointer via useFrame state. */
function WireShape({
  position,
  radius = 1,
  color = '#60a5fa',
  speed = 0.2,
}: {
  position: [number, number, number];
  radius?: number;
  color?: string;
  speed?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame((state, delta) => {
    mesh.current.rotation.x += delta * speed;
    mesh.current.rotation.y += delta * speed * 1.4;
    // subtle pointer parallax
    const { x, y } = state.pointer;
    mesh.current.rotation.x += y * delta * 0.15;
    mesh.current.rotation.y += x * delta * 0.15;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={mesh} position={position}>
        <icosahedronGeometry args={[radius, 0]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.5} />
      </mesh>
    </Float>
  );
}

/** Instanced particle starfield drifting toward the viewer. */
function Particles({ count = 900 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const blue = new THREE.Color('#3b82f6');
    const purple = new THREE.Color('#a855f7');
    const cyan = new THREE.Color('#22d3ee');
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
      const c = [blue, purple, cyan][Math.floor(Math.random() * 3)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 2] += delta * (0.25 + (i % 7) * 0.045);
      if (arr[i * 3 + 2] > 15) arr[i * 3 + 2] = -15;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = state.clock.elapsedTime * 0.012;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Central hero object: distorted sphere with glowing rim. */
function CoreOrb() {
  const mesh = useRef<THREE.Mesh>(null!);
  const mat = useRef<THREE.MeshStandardMaterial>(null!);
  const geo = useMemo(() => new THREE.IcosahedronGeometry(1.35, 24), []);
  const orig = useMemo(() => Float32Array.from(geo.attributes.position.array), [geo]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const ix = orig[i * 3];
      const iy = orig[i * 3 + 1];
      const iz = orig[i * 3 + 2];
      const n =
        0.14 * Math.sin(ix * 1.8 + t * 0.9) +
        0.12 * Math.sin(iy * 2.2 + t * 1.2) +
        0.10 * Math.sin(iz * 2.0 + t * 1.5);
      const s = 1 + n;
      pos.setXYZ(i, ix * s, iy * s, iz * s);
      pos.needsUpdate = true;
    }
    mesh.current.rotation.y = t * 0.18;
    mat.current.color.setHSL(
      0.62 + 0.05 * Math.sin(t * 0.35),
      0.75,
      0.55 + 0.06 * Math.sin(t * 0.5)
    );
  });

  return (
    <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.9}>
      <mesh ref={mesh} geometry={geo} scale={0.92}>
        <meshStandardMaterial
          ref={mat}
          wireframe
          wireframeLinewidth={1.4}
          emissiveIntensity={0.6}
          roughness={0.25}
          metalness={0.65}
        />
      </mesh>
    </Float>
  );
}

/** Full-viewport animated backdrop for the hero section. */
export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.35} />
        <pointLight position={[6, 5, 6]} intensity={2.1} color="#60a5fa" />
        <pointLight position={[-6, -4, 3]} intensity={1.5} color="#a855f7" />
        <CoreOrb />
        <WireShape position={[-4.4, 1.8, -1.5]} radius={0.65} color="#a855f7" speed={0.25} />
        <WireShape position={[4.5, -1.6, -1]} radius={0.55} color="#22d3ee" speed={0.18} />
        <WireShape position={[3.8, 2.2, -3]} radius={0.4} color="#3b82f6" speed={0.3} />
        <WireShape position={[-3.6, -2.2, -2.5]} radius={0.45} color="#60a5fa" speed={0.22} />
        <Particles />
      </Canvas>
    </div>
  );
}

export type { FloatProps } from '@react-three/drei';
