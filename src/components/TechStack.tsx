import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { TECH_CATEGORIES } from '../data';

/** Each tech category = an orbiting ring of small 3D shapes. */
function CategoryRing({
  items,
  radius,
  tilt,
  speed,
  offset,
  color,
}: {
  items: number;
  radius: number;
  tilt: number;
  speed: number;
  offset: number;
  color: string;
}) {
  const group = useRef<THREE.Group>(null!);
  useFrame((state) => {
    group.current.rotation.y = state.clock.elapsedTime * speed + offset;
    group.current.rotation.x = tilt;
  });
  return (
    <group ref={group}>
      {Array.from({ length: items }).map((_, i) => {
        const a = (i / items) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * radius, 0, Math.sin(a) * radius]}>
            <octahedronGeometry args={[0.09 + (i % 3) * 0.02, 0]} />
            <meshBasicMaterial color={color} wireframe transparent opacity={0.75} />
          </mesh>
        );
      })}
      <mesh>
        <torusGeometry args={[radius, 0.006, 8, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

/** Atom-like visual: nucleus + one ring per tech category. */
function TechAtom() {
  const rings = [
    { cat: TECH_CATEGORIES[0], radius: 1.35, tilt: 0.35, speed: 0.35, offset: 0.0, color: '#60a5fa' },
    { cat: TECH_CATEGORIES[1], radius: 1.85, tilt: -0.5, speed: -0.26, offset: 1.2, color: '#a855f7' },
    { cat: TECH_CATEGORIES[2], radius: 2.35, tilt: 0.85, speed: 0.2, offset: 2.4, color: '#22d3ee' },
    { cat: TECH_CATEGORIES[3], radius: 2.85, tilt: -0.25, speed: -0.15, offset: 3.6, color: '#818cf8' },
    { cat: TECH_CATEGORIES[4], radius: 3.3, tilt: 0.15, speed: 0.11, offset: 4.8, color: '#c084fc' },
  ];
  const core = useRef<THREE.Mesh>(null!);
  useFrame((state, delta) => {
    core.current.rotation.x += delta * 0.4;
    core.current.rotation.y += delta * 0.6;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.6}>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.62, 1]} />
        <meshBasicMaterial color="#93c5fd" wireframe transparent opacity={0.9} />
      </mesh>
      {rings.map((r, i) => (
        <CategoryRing key={i} items={r.cat.items.length} {...r} />
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
          <span className="text-sm font-medium text-cyan-400 tracking-widest uppercase">Skills</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold font-['Space_Grotesk'] text-white">
            Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Stack</span>
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
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 transition-all duration-300"
            >
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-cyan-400/40 hover:bg-cyan-400/5 transition-all duration-200"
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
