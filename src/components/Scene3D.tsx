import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/* Ember palette */
const COLORS = {
  amber: '#fbbf24',
  orange: '#f97316',
  rose: '#fb7185',
  yellow: '#fde047',
  ember: '#fdba74',
  core: '#fcd34d',
};

/** Pointer position in world space on a plane at depth z (camera fixed at z=6, fov 60). */
function pointerWorld(state: any, z: number, out: THREE.Vector2) {
  const halfH = Math.tan(((60 / 2) * Math.PI) / 180) * 6;
  const halfW = halfH * state.viewport.aspect;
  const scale = (6 - z) / 6; // project onto the object's z plane
  out.set(state.pointer.x * halfW * scale, state.pointer.y * halfH * scale);
  return out;
}

/**
 * Wireframe icosahedron with organic pointer physics:
 * drifts toward the cursor when far (curious), flees when close (shy),
 * springs back home, spins faster when agitated.
 */
function WireShape({
  position,
  radius = 1,
  color = COLORS.amber,
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
      // repel — stronger the closer the cursor gets
      const f = (1 - dist / REPEL) * 0.11;
      vel.addScaledVector(dir, -f);
    } else if (dist < 5.5) {
      // gentle attraction when far away
      vel.addScaledVector(dir, 0.006);
    }
    // spring home + damping
    vel.addScaledVector(dir.copy(base).sub(m.position), 0.016);
    vel.multiplyScalar(0.86);
    m.position.addScaledVector(vel, delta * 60 * 0.016);

    // agitation spins it faster
    const agitation = Math.min(vel.length() * 26, 3.2);
    m.rotation.x += delta * (speed + agitation);
    m.rotation.y += delta * (speed * 1.4 + agitation * 1.3);
  });

  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={mesh} position={position}>
        <icosahedronGeometry args={[radius, 0]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.55} />
      </mesh>
    </Float>
  );
}

/** Instanced particle field: drifts toward the viewer, parallaxes with the cursor. */
function Particles({ count = 900 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = ['#fbbf24', '#f97316', '#fb7185'].map((c) => new THREE.Color(c));
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
      const c = palette[Math.floor(Math.random() * 3)];
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
    // cursor parallax
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

/**
 * Central hero orb: breathing wireframe blob.
 * Cursor proximity swells the noise amplitude; cursor x-position shifts the hue
 * along the ember range (red ↔ gold). Tilts toward the cursor.
 */
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
    const prox = 1 - distToCenter / 4; // 0 far → 1 at cursor on the orb

    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const ix = orig[i * 3];
      const iy = orig[i * 3 + 1];
      const iz = orig[i * 3 + 2];
      const amp = 0.12 + 0.16 * prox;
      const n =
        amp * Math.sin(ix * 1.8 + t * 0.9) +
        amp * 0.85 * Math.sin(iy * 2.2 + t * 1.2) +
        amp * 0.7 * Math.sin(iz * 2.0 + t * 1.5);
      const s = 1 + n;
      pos.setXYZ(i, ix * s, iy * s, iz * s);
    }
    pos.needsUpdate = true;

    // tilt toward cursor (smoothed)
    tilt.current.x += (state.pointer.y * 0.35 - tilt.current.x) * 0.04;
    tilt.current.y += (state.pointer.x * 0.5 - tilt.current.y) * 0.04;
    m.rotation.y = t * 0.16 + tilt.current.y;
    m.rotation.x = tilt.current.x;

    // ember hue: red (0.02) ↔ gold (0.15) driven by cursor x
    const hue = THREE.MathUtils.clamp(0.085 + state.pointer.x * 0.055, 0.02, 0.15);
    mat.current.color.setHSL(hue, 0.9, 0.58);
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

/** Key light follows the cursor so the whole scene glows where you point. */
function CursorLight() {
  const light = useRef<THREE.PointLight>(null!);
  useFrame((state) => {
    const l = light.current;
    l.position.x += (state.pointer.x * 5 - l.position.x) * 0.06;
    l.position.y += (state.pointer.y * 4 - l.position.y) * 0.06;
  });
  return <pointLight ref={light} position={[0, 0, 6]} intensity={2.2} color="#fbbf24" />;
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
        <ambientLight intensity={0.3} />
        <pointLight position={[6, 5, 6]} intensity={1.4} color="#f97316" />
        <pointLight position={[-6, -4, 3]} intensity={1.0} color="#fb7185" />
        <CursorLight />
        <CoreOrb />
        <WireShape position={[-4.4, 1.8, -1.5]} radius={0.65} color={COLORS.orange} speed={0.25} />
        <WireShape position={[4.5, -1.6, -1]} radius={0.55} color={COLORS.rose} speed={0.18} />
        <WireShape position={[3.8, 2.2, -3]} radius={0.4} color={COLORS.yellow} speed={0.3} />
        <WireShape position={[-3.6, -2.2, -2.5]} radius={0.45} color={COLORS.ember} speed={0.22} />
        <Particles />
      </Canvas>
    </div>
  );
}
