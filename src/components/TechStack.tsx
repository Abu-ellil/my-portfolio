import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { TECH_CATEGORIES } from '../data';
import { Cpu } from 'lucide-react';

/* Sleek Modern Cyber/Tech palette */
const RING_COLORS = ['#38bdf8', '#818cf8', '#34d399', '#a78bfa', '#60a5fa', '#f472b6'];

function CategoryRing({
  count,
  radius,
  tilt,
  speed,
  offset,
  color,
}: {
  count: number;
  radius: number;
  tilt: number;
  speed: number;
  offset: number;
  color: string;
}) {
  const group = useRef<THREE.Group>(null!);
  const spins = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const g = spins.current;
    const px = state.pointer.x * 0.4;
    const py = state.pointer.y * 0.3;
    g.position.x += (px - g.position.x) * 0.04;
    g.position.y += (py - g.position.y) * 0.04;
    const energy = 1 + Math.abs(state.pointer.x) * 0.6;
    g.rotation.y = t * speed * energy + offset;
    g.rotation.x = tilt;
    group.current.rotation.z = t * speed * 0.25 * energy;
  });

  return (
    <group ref={group}>
      <group ref={spins}>
        {Array.from({ length: count }).map((_, i) => {
          const a = (i / count) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * radius, 0, Math.sin(a) * radius]}>
              <octahedronGeometry args={[0.07 + (i % 3) * 0.015, 0]} />
              <meshBasicMaterial color={color} wireframe transparent opacity={0.65} />
            </mesh>
          );
        })}
      </group>
      <mesh>
        <torusGeometry args={[radius, 0.005, 8, 80]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function TechAtom() {
  const rings = TECH_CATEGORIES.map((cat, i) => ({
    count: cat.items.length,
    radius: 1.25 + i * 0.42,
    tilt: (i % 2 === 0 ? 1 : -1) * (0.3 + i * 0.12),
    speed: (i % 2 === 0 ? 1 : -1) * (0.32 - i * 0.03),
    offset: i * 1.05,
    color: RING_COLORS[i % RING_COLORS.length],
  }));

  const core = useRef<THREE.Mesh>(null!);
  const coreMat = useRef<THREE.MeshBasicMaterial>(null!);

  useFrame((state, delta) => {
    const c = core.current;
    c.rotation.x += delta * 0.3;
    c.rotation.y += delta * 0.45;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshBasicMaterial ref={coreMat} color="#38bdf8" wireframe transparent opacity={0.7} />
      </mesh>
      {rings.map((r, i) => (
        <CategoryRing key={i} {...r} />
      ))}
    </Float>
  );
}

const TechStack: React.FC = () => {
  return (
    <section id="skills" className="relative py-28 border-t border-white/5 bg-slate-950/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-xs font-mono tracking-wider uppercase mb-3">
            <Cpu className="w-3.5 h-3.5" />
            Capabilities & Stack
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Modern, battle-tested toolchain.
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            From cross-platform mobile frameworks to containerized backends and private local LLM orchestration.
          </p>
        </motion.div>

        {/* 3D Tech Atom */}
        <div className="hidden lg:block h-[340px] mb-8 cursor-grab active:cursor-grabbing">
          <Canvas camera={{ position: [0, 0.5, 6.2], fov: 52 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
            <TechAtom />
          </Canvas>
        </div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TECH_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 hover:border-cyan-500/30 transition-all duration-200"
            >
              <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 text-xs font-mono rounded-md bg-slate-800/60 border border-white/5 text-slate-400 hover:text-white hover:border-cyan-500/30 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
