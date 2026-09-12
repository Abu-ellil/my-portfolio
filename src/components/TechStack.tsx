import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { TECH_CATEGORIES } from '../data';

/* Ember palette (matches Scene3D) */
const RING_COLORS = ['#fbbf24', '#f97316', '#fb7185', '#fdba74', '#fde047'];

/** Each tech category = an orbiting ring of small 3D shapes that shy away from the cursor. */
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
    // ring plane follows the cursor slightly; spin rate increases with cursor distance
    const px = state.pointer.x * 0.5;
    const py = state.pointer.y * 0.4;
    g.position.x += (px - g.position.x) * 0.04;
    g.position.y += (py - g.position.y) * 0.04;
    const energy = 1 + Math.abs(state.pointer.x) * 0.8;
    g.rotation.y = t * speed * energy + offset;
    g.rotation.x = tilt;
    group.current.rotation.z = t * speed * 0.3 * energy;
  });

  return (
    <group ref={group}>
      <group ref={spins}>
        {Array.from({ length: count }).map((_, i) => {
          const a = (i / count) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * radius, 0, Math.sin(a) * radius]}>
              <octahedronGeometry args={[0.09 + (i % 3) * 0.02, 0]} />
              <meshBasicMaterial color={color} wireframe transparent opacity={0.8} />
            </mesh>
          );
        })}
      </group>
      <mesh>
        <torusGeometry args={[radius, 0.006, 8, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

/** Atom-like visual: nucleus + one ring per tech category. */
function TechAtom() {
  const rings = [
    { count: TECH_CATEGORIES[0].items.length, radius: 1.35, tilt: 0.35, speed: 0.35, offset: 0.0, color: RING_COLORS[0] },
    { count: TECH_CATEGORIES[1].items.length, radius: 1.85, tilt: -0.5, speed: -0.26, offset: 1.2, color: RING_COLORS[1] },
    { count: TECH_CATEGORIES[2].items.length, radius: 2.35, tilt: 0.85, speed: 0.2, offset: 2.4, color: RING_COLORS[2] },
    { count: TECH_CATEGORIES[3].items.length, radius: 2.85, tilt: -0.25, speed: -0.15, offset: 3.6, color: RING_COLORS[3] },
    { count: TECH_CATEGORIES[4].items.length, radius: 3.3, tilt: 0.15, speed: 0.11, offset: 4.8, color: RING_COLORS[4] },
  ];
  const core = useRef<THREE.Mesh>(null!);
  const coreMat = useRef<THREE.MeshBasicMaterial>(null!);
  const scale = useRef(1);

  useFrame((state, delta) => {
    const c = core.current;
    c.rotation.x += delta * 0.4;
    c.rotation.y += delta * 0.6;
    // nucleus: proximity to center makes it glow hotter and swell
    const d = Math.hypot(state.pointer.x, state.pointer.y); // 0 at center
    const prox = Math.max(0, 1 - d * 1.6);
    scale.current += (1 + prox * 0.45 - scale.current) * 0.08;
    c.scale.setScalar(scale.current);
    coreMat.current.color.setHSL(
      THREE.MathUtils.lerp(0.11, 0.02, prox),
      0.95,
      0.62 + 0.08 * Math.sin(state.clock.elapsedTime * 2)
    );
  });

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.6}>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.62, 1]} />
        <meshBasicMaterial ref={coreMat} color="#fcd34d" wireframe transparent opacity={0.95} />
      </mesh>
      {rings.map((r, i) => (
        <CategoryRing key={i} {...r} />
      ))}
    </Float>
  );
}

const TechStack: React.FC = () => {
  return (
    <section id="skills" className="relative py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-medium text-amber-400 tracking-widest uppercase">Skills</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold font-['Space_Grotesk'] text-white">
            Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">Stack</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            The technologies I use to build scalable, production-grade applications.
          </p>
        </motion.div>

        {/* 3D atom (hidden on small screens for performance) */}
        <div className="hidden lg:block h-[380px] mb-8 cursor-grab active:cursor-grabbing">
          <Canvas camera={{ position: [0, 0.6, 6.4], fov: 55 }} dpr={[1, 1.75]} gl={{ alpha: true, antialias: true }}>
            <TechAtom />
          </Canvas>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {TECH_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-400/40 transition-all duration-300"
            >
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-rose-400" />
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-amber-400/40 hover:bg-amber-400/5 transition-all duration-200"
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
