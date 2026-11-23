import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * World-Class AI Visual (DeepSeek / OpenAI / Claude inspired)
 * Features:
 * 1. Quantum Neural Torus Knot: Multi-dimensional topological manifold representing AI tensor embeddings.
 * 2. Synaptic Attention Rings: Layered orbital rings with pulsing transformer attention nodes.
 * 3. Fluid Synaptic Tensor Field: Over 1,200 undulating particles simulating neural token generation & thinking waves.
 */

// DeepSeek & OpenAI inspired palette: Electric Cyan, Neural Indigo, Quantum Teal
const AI_PALETTE = {
  primaryCyan: '#06b6d4',
  neonBlue: '#38bdf8',
  quantumIndigo: '#6366f1',
  neuralPurple: '#818cf8',
  synapseEmerald: '#10b981',
};

/**
 * 1. The DeepSeek / OpenAI Thinking Core:
 * An intricate mathematical Torus Knot that organically morphs and breathes
 */
function NeuralThinkingCore() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);
  const wireMat = useRef<THREE.MeshBasicMaterial>(null!);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const pointer = state.pointer;

    // Organic harmonic rotation
    meshRef.current.rotation.x = t * 0.18 + pointer.y * 0.3;
    meshRef.current.rotation.y = t * 0.28 + pointer.x * 0.4;
    meshRef.current.rotation.z = Math.sin(t * 0.15) * 0.2;

    innerRef.current.rotation.x = -t * 0.25;
    innerRef.current.rotation.y = -t * 0.35;

    // Breathing pulse (simulating AI inference / token streaming)
    const pulse = 1 + Math.sin(t * 1.8) * 0.05 + Math.abs(pointer.x) * 0.08;
    meshRef.current.scale.setScalar(pulse);

    // Dynamic luminescence based on cursor interaction
    if (wireMat.current) {
      wireMat.current.opacity = 0.55 + Math.sin(t * 2) * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <group position={[2.8, 0.1, -0.4]}>
        {/* Outer Torus Knot Tensor Manifold */}
        <mesh ref={meshRef}>
          <torusKnotGeometry args={[1.3, 0.32, 180, 36, 2, 3]} />
          <meshBasicMaterial
            ref={wireMat}
            color={AI_PALETTE.neonBlue}
            wireframe
            transparent
            opacity={0.6}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Inner Quantum Geodesic Nucleus */}
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[0.75, 2]} />
          <meshBasicMaterial
            color={AI_PALETTE.quantumIndigo}
            wireframe
            transparent
            opacity={0.45}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Core Glowing Glow Point */}
        <pointLight color="#38bdf8" intensity={2.5} distance={7} />
        <pointLight color="#6366f1" intensity={2} distance={6} />
      </group>
    </Float>
  );
}

/**
 * 2. Attention Layer Rings (Transformer Multi-Head Attention visual)
 */
function TransformerAttentionRings() {
  const ring1 = useRef<THREE.Group>(null!);
  const ring2 = useRef<THREE.Group>(null!);
  const ring3 = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const px = state.pointer.x * 0.2;
    const py = state.pointer.y * 0.2;

    ring1.current.rotation.x = t * 0.22 + py;
    ring1.current.rotation.y = t * 0.3 + px;

    ring2.current.rotation.y = -t * 0.18 + py;
    ring2.current.rotation.z = t * 0.25 + px;

    ring3.current.rotation.x = -t * 0.15;
    ring3.current.rotation.z = -t * 0.28;
  });

  return (
    <group position={[2.8, 0.1, -0.4]}>
      {/* Ring 1 */}
      <group ref={ring1}>
        <mesh>
          <torusGeometry args={[2.1, 0.008, 16, 120]} />
          <meshBasicMaterial color={AI_PALETTE.primaryCyan} transparent opacity={0.4} />
        </mesh>
        {/* Attention Head Nodes */}
        {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((angle, i) => (
          <mesh
            key={i}
            position={[Math.cos(angle) * 2.1, Math.sin(angle) * 2.1, 0]}
          >
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        ))}
      </group>

      {/* Ring 2 */}
      <group ref={ring2}>
        <mesh>
          <torusGeometry args={[2.55, 0.008, 16, 120]} />
          <meshBasicMaterial color={AI_PALETTE.neuralPurple} transparent opacity={0.3} />
        </mesh>
        {[0.5, 2.6, 4.7].map((angle, i) => (
          <mesh
            key={i}
            position={[Math.cos(angle) * 2.55, 0, Math.sin(angle) * 2.55]}
          >
            <octahedronGeometry args={[0.05, 0]} />
            <meshBasicMaterial color={AI_PALETTE.neonBlue} wireframe />
          </mesh>
        ))}
      </group>

      {/* Ring 3 */}
      <group ref={ring3}>
        <mesh>
          <torusGeometry args={[2.95, 0.006, 16, 120]} />
          <meshBasicMaterial color={AI_PALETTE.synapseEmerald} transparent opacity={0.25} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * 3. Fluid Synaptic Tensor Field (1,200+ undulating particles simulating neural weights)
 */
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

      posArray[i * 3] = bx + wave * 0.2 + (pointer.x * cursorPull);
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

/**
 * Master Scene3D Component
 */
const Scene3D: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 52 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.5} />
        {/* Thinking Neural Core (ChatGPT/DeepSeek Manifold) */}
        <NeuralThinkingCore />
        {/* Multi-head Transformer Attention Orbital Rings */}
        <TransformerAttentionRings />
        {/* Fluid Synaptic Tensor Field */}
        <SynapticTensorField count={1100} />
      </Canvas>
    </div>
  );
};

export default Scene3D;
