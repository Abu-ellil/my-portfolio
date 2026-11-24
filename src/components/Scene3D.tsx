import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Hero backdrop: a fluid field of ~1,100 synaptic particles (token / embedding
 * metaphor) that drifts and reacts to the cursor. The playable 3D piece itself
 * lives in <StackGame /> inside the hero card.
 */

// DeepSeek & OpenAI inspired palette: Electric Cyan, Neural Indigo, Quantum Teal
const AI_PALETTE = {
  primaryCyan: '#06b6d4',
  neonBlue: '#38bdf8',
  quantumIndigo: '#6366f1',
  synapseEmerald: '#10b981',
};

/** Fluid Synaptic Tensor Field (1,200+ undulating particles simulating neural weights) */
function SynapticTensorField({ count = 1200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, colors, basePositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const colorPalette = [
      new THREE.Color(AI_PALETTE.primaryCyan),
      new THREE.Color(AI_PALETTE.neonBlue),
      new THREE.Color(AI_PALETTE.quantumIndigo),
      new THREE.Color(AI_PALETTE.synapseEmerald),
    ];

    for (let i = 0; i < count; i++) {
      // Cylindrical/spherical cluster distribution
      const radius = 2.5 + Math.random() * 16;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 16;

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius - 2;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col, base];
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const pointer = state.pointer;

    for (let i = 0; i < count; i++) {
      const bx = basePositions[i * 3];
      const by = basePositions[i * 3 + 1];
      const bz = basePositions[i * 3 + 2];

      // Organic fluid neural wave simulation
      const wave = Math.sin(bx * 0.4 + t * 1.2) * Math.cos(by * 0.4 + t * 0.9) * 0.35;
      const cursorDist = Math.hypot(pointer.x * 6 - bx, pointer.y * 4 - by);
      const cursorPull = cursorDist < 4 ? (4 - cursorDist) * 0.08 : 0;

      posArray[i * 3] = bx + wave * 0.2 + pointer.x * cursorPull;
      posArray[i * 3 + 1] = by + wave;
      posArray[i * 3 + 2] = bz + Math.cos(t * 0.8 + i) * 0.15;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = t * 0.025;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.038}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Master Scene3D Component */
const Scene3D: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 52 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.5} />
        {/* Fluid Synaptic Tensor Field */}
        <SynapticTensorField count={1100} />
      </Canvas>
    </div>
  );
};

export default Scene3D;
