import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/* Sleek Modern 2027 Deep-Tech Palette (Cyan, Electric Indigo, Emerald) */
const COLORS = {
  cyan: '#38bdf8',
  indigo: '#818cf8',
  emerald: '#34d399',
  violet: '#a78bfa',
  core: '#60a5fa',
};

function pointerWorld(state: any, z: number, out: THREE.Vector2) {
  const halfH = Math.tan(((60 / 2) * Math.PI) / 180) * 6;
  const halfW = halfH * state.viewport.aspect;
  const scale = (6 - z) / 6;
  out.set(state.pointer.x * halfW * scale, state.pointer.y * halfH * scale);
  return out;
}

function WireShape({
  position,
  radius = 1,
  color = COLORS.cyan,
  speed = 0.2,
}: {
  position: [number, number, number];
  radius?: number;
  color?: string;
  speed?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null!);
  const base = useMemo(() => new THREE.Vector3(...position), [position]);
  const vel = useMemo(() => new THREE.Vector3(), []);
  const pw = useMemo(() => new THREE.Vector2(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const REPEL = 2.3;

  useFrame((state, delta) => {
    const m = mesh.current;
    pointerWorld(state, base.z, pw);
    dir.set(pw.x - m.position.x, pw.y - m.position.y, 0);
    const dist = dir.length() || 0.0001;
    dir.divideScalar(dist);

    if (dist < REPEL) {
      const f = (1 - dist / REPEL) * 0.11;
      vel.addScaledVector(dir, -f);
    } else if (dist < 5.5) {
      vel.addScaledVector(dir, 0.006);
    }
    vel.addScaledVector(dir.copy(base).sub(m.position), 0.016);
    vel.multiplyScalar(0.86);
    m.position.addScaledVector(vel, delta * 60 * 0.016);

    const agitation = Math.min(vel.length() * 26, 3.2);
    m.rotation.x += delta * (speed + agitation);
    m.rotation.y += delta * (speed * 1.4 + agitation * 1.3);
  });

  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={mesh} position={position}>
        <icosahedronGeometry args={[radius, 0]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.35} />
      </mesh>
    </Float>
  );
}

function Particles({ count = 800 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = ['#38bdf8', '#818cf8', '#34d399'].map((c) => new THREE.Color(c));
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
      const c = palette[Math.floor(Math.random() * palette.length)];
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
    const g = ref.current;
    g.position.x += (state.pointer.x * 0.7 - g.position.x) * 0.03;
    g.position.y += (state.pointer.y * 0.5 - g.position.y) * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CoreOrb() {
  const mesh = useRef<THREE.Mesh>(null!);
  const mat = useRef<THREE.MeshStandardMaterial>(null!);
  const geo = useMemo(() => new THREE.IcosahedronGeometry(1.35, 24), []);
  const orig = useMemo(() => Float32Array.from(geo.attributes.position.array), [geo]);
  const pw = useMemo(() => new THREE.Vector2(), []);
  const tilt = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const m = mesh.current;
    pointerWorld(state, 0, pw);
    const distToCenter = Math.min(pw.length(), 4);
    const prox = 1 - distToCenter / 4;

    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const ix = orig[i * 3];
      const iy = orig[i * 3 + 1];
      const iz = orig[i * 3 + 2];
      const wave =
        Math.sin(ix * 2.2 + t * 1.5) *
        Math.cos(iy * 2.2 + t * 1.3) *
        Math.sin(iz * 2.2 + t * 1.7);
      const amp = 0.09 + prox * 0.16;
      pos.setXYZ(i, ix + ix * wave * amp, iy + iy * wave * amp, iz + iz * wave * amp);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();

    tilt.current.x += (state.pointer.y * 0.45 - tilt.current.x) * 0.06;
    tilt.current.y += (state.pointer.x * 0.65 - tilt.current.y) * 0.06;
    m.rotation.x = t * 0.18 + tilt.current.x;
    m.rotation.y = t * 0.28 + tilt.current.y;

    if (mat.current) {
      const hue = THREE.MathUtils.lerp(0.55, 0.45, (state.pointer.x + 1) / 2);
      mat.current.color.setHSL(hue, 0.85, 0.55);
      mat.current.emissive.setHSL(hue, 0.9, 0.25);
    }
  });

  return (
    <Float speed={1.1} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={mesh} geometry={geo} position={[2.6, 0.2, -0.6]}>
        <meshStandardMaterial
          ref={mat}
          wireframe
          transparent
          opacity={0.45}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

const Scene3D: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#38bdf8" />
        <pointLight position={[-5, -5, -2]} intensity={0.8} color="#818cf8" />
        <Particles count={800} />
        <CoreOrb />
        <WireShape position={[-3.8, 1.6, -2]} radius={0.85} color={COLORS.cyan} speed={0.18} />
        <WireShape position={[-2.4, -2.1, -1]} radius={0.65} color={COLORS.indigo} speed={0.25} />
        <WireShape position={[3.6, -1.8, -2]} radius={0.75} color={COLORS.emerald} speed={0.22} />
      </Canvas>
    </div>
  );
};

export default Scene3D;
