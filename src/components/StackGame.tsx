import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Play, RotateCcw } from 'lucide-react';
import { blockHue, drop, LAYER_H, movingPos, sim, stackActions, stackStore, useStack } from '../game/stack';

/**
 * Deploy Stack — the hero's playable 3D centerpiece.
 *
 * Idle: an attract-mode demo stacks blocks by itself ("click to play").
 * Playing: click / tap / space drops the sliding block; overhangs are sliced off.
 * Over: score card for a few seconds, then back to the demo.
 */

const BG = '#020617';
const hueColor = (hue: number) => new THREE.Color().setHSL(hue / 360, 0.72, 0.56);

/** Placed blocks, falling off-cuts and the perfect-drop shockwave. Re-renders on `version`. */
function Tower({ version }: { version: number }) {
  const debrisRefs = useRef<Array<THREE.Mesh | null>>([]);
  const effectRef = useRef<THREE.LineSegments>(null!);
  const effectMat = useRef<THREE.LineBasicMaterial>(null!);
  const effectGeom = useMemo(() => new THREE.BoxGeometry(1, LAYER_H, 1), []);

  // `version` is a change signal: re-snapshot the mutable sim lists whenever it bumps
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const blocks = useMemo(() => sim.blocks.slice(), [version]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debris = useMemo(() => sim.debris.slice(), [version]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    let removed = false;

    for (let i = 0; i < sim.debris.length; i++) {
      const d = sim.debris[i];
      const m = debrisRefs.current[i];
      d.vy -= 16 * dt;
      d.x += d.vx * dt;
      d.y += d.vy * dt;
      d.z += d.vz * dt;
      d.rx += d.ex * dt;
      d.ry += d.ey * dt;
      d.rz += d.ez * dt;
      d.life -= dt;
      if (!m) continue;
      m.position.set(d.x, d.y, d.z);
      m.rotation.set(d.rx, d.ry, d.rz);
      (m.material as THREE.MeshStandardMaterial).opacity = Math.min(0.92, Math.max(0, d.life));
    }
    if (sim.debris.some((d) => d.life <= 0)) {
      sim.debris = sim.debris.filter((d) => d.life > 0);
      removed = true;
    }

    const e = sim.effect;
    if (e.active && effectRef.current) {
      e.t += dt * 2.2;
      const s = Math.min(1, e.t);
      effectRef.current.visible = true;
      effectRef.current.position.set(e.x, e.y, e.z);
      effectRef.current.scale.set(e.sx * (1 + s * 1.6), 1, e.sz * (1 + s * 1.6));
      effectMat.current.opacity = 0.9 * (1 - s);
      if (s >= 1) {
        e.active = false;
        effectRef.current.visible = false;
      }
    }

    if (removed) stackStore.set({ version: stackStore.get().version + 1 });
  });

  return (
    <>
      {blocks.map((b, i) => {
        const c = hueColor(b.hue);
        return (
          <mesh key={i} position={[b.x, b.y, b.z]}>
            <boxGeometry args={[b.sx, b.sy, b.sz]} />
            <meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.22} metalness={0.15} roughness={0.5} />
          </mesh>
        );
      })}
      {debris.map((d, i) => {
        const c = hueColor(d.hue);
        return (
          <mesh
            key={`d${i}`}
            ref={(el) => {
              debrisRefs.current[i] = el;
            }}
            position={[d.x, d.y, d.z]}
          >
            <boxGeometry args={[d.sx, d.sy, d.sz]} />
            <meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.22} metalness={0.15} roughness={0.5} transparent opacity={0.92} />
          </mesh>
        );
      })}
      <lineSegments ref={effectRef} visible={false}>
        <edgesGeometry args={[effectGeom]} />
        <lineBasicMaterial ref={effectMat} color="#ffffff" transparent opacity={0.9} depthWrite={false} />
      </lineSegments>
    </>
  );
}

/** Sliding block + camera rig + the per-frame game logic. */
function Rig() {
  const moving = useRef<THREE.Mesh>(null!);
  const movingMat = useRef<THREE.MeshStandardMaterial>(null!);
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);
  const look = useMemo(() => new THREE.Vector3(0, -1.4, 0), []);

  // orthographic: keep the tower at ~40% of the stage height on every screen size
  useEffect(() => {
    camera.zoom = Math.max(38, size.height / 7.4);
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    const phase = stackStore.get().phase;
    // attract-mode miss / demo reset countdown → keep the slider parked
    const waiting = phase === 'idle' && sim.overTimer > 0;

    if (phase !== 'over' && !waiting) {
      sim.phase += dt * sim.phaseRate;
      const pos = movingPos();
      if (phase === 'idle') {
        // attract mode: drop when the demo block crosses (near) the tower centre
        const target = (sim.axis === 'x' ? sim.tx : sim.tz) + sim.autoOffset;
        if ((sim.prevPos - target) * (pos - target) <= 0) drop();
      }
      sim.prevPos = movingPos();
    }

    if (sim.overTimer > 0) {
      sim.overTimer -= dt;
      if (sim.overTimer <= 0) stackActions.toIdle();
    }

    const m = moving.current;
    if (m) {
      const pos = movingPos();
      m.visible = phase !== 'over' && !waiting;
      m.position.set(sim.axis === 'x' ? pos : sim.tx, sim.y, sim.axis === 'z' ? pos : sim.tz);
      m.scale.set(sim.sx, 1, sim.sz);
      const c = hueColor(blockHue(sim.blocks.length));
      movingMat.current.color.copy(c);
      movingMat.current.emissive.copy(c);
    }

    // camera: follow the top of the tower with a slow lateral sway
    const k = 1 - Math.exp(-dt * 3.5);
    camera.position.x += (6.4 + Math.sin(t * 0.18) * 0.9 - camera.position.x) * k;
    camera.position.y += (sim.y + 3.4 - camera.position.y) * k;
    camera.position.z += (8.6 - camera.position.z) * k;
    look.y += (sim.y - 1.4 - look.y) * k;
    camera.lookAt(look);
  });

  return (
    <mesh ref={moving} position={[0, LAYER_H * 1.5, 0]} scale={[3, 1, 3]}>
      <boxGeometry args={[1, LAYER_H, 1]} />
      <meshStandardMaterial ref={movingMat} color="#22d3ee" emissive="#06b6d4" emissiveIntensity={0.3} metalness={0.15} roughness={0.45} />
    </mesh>
  );
}

const StackGame: React.FC = () => {
  const g = useStack();

  const tap = useCallback(() => {
    if (stackStore.get().phase === 'playing') drop();
    else stackActions.start();
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      tap();
    }
  };

  return (
    <div
      tabIndex={0}
      role="application"
      aria-label="Deploy Stack game. Click, tap or press space to drop the block."
      onClick={tap}
      onKeyDown={onKeyDown}
      className="relative h-[420px] sm:h-[460px] outline-none cursor-pointer select-none bg-[#020617]"
      style={{ touchAction: 'manipulation' }}
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_20%,rgba(6,182,212,0.16),transparent_55%)]" />

      <Canvas
        orthographic
        dpr={[1, 1.75]}
        camera={{ position: [6.4, 4.2, 8.6], near: 0.1, far: 100, zoom: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <fog attach="fog" args={[BG, 13, 32]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[6, 12, 4]} intensity={1.8} />
        <pointLight position={[-5, 7, -5]} intensity={60} color="#22d3ee" distance={22} />
        <Rig />
        <Tower version={g.version} />
      </Canvas>

      {g.phase === 'playing' && (
        <>
          <div className="absolute top-3 left-3 px-2.5 py-1.5 rounded-lg border border-white/10 bg-slate-950/70 backdrop-blur-sm pointer-events-none font-mono">
            <div className="text-[9px] uppercase tracking-[0.2em] text-slate-500">Height</div>
            <div className="text-lg font-bold text-cyan-300 leading-none">{g.height}</div>
          </div>
          <div className="absolute top-3 right-3 px-2.5 py-1.5 rounded-lg border border-white/10 bg-slate-950/70 backdrop-blur-sm pointer-events-none font-mono">
            <div className="text-[9px] uppercase tracking-[0.2em] text-slate-500">Best</div>
            <div className="text-lg font-bold text-white leading-none">{g.best}</div>
          </div>
          {g.perfectStreak >= 2 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-[0.2em] text-emerald-300 pointer-events-none">
              PERFECT ×{g.perfectStreak}
            </div>
          )}
          {g.perfectFlash > 0 && (
            <div
              key={g.perfectFlash}
              className="absolute top-[36%] left-1/2 -translate-x-1/2 stack-perfect pointer-events-none text-white font-bold font-sans text-sm tracking-[0.3em] uppercase"
            >
              Perfect
            </div>
          )}
        </>
      )}

      {g.phase === 'idle' && (
        <div className="absolute bottom-6 inset-x-0 flex justify-center pointer-events-none">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/30 bg-slate-950/70 backdrop-blur-md text-cyan-300 text-[11px] font-mono animate-pulse">
            <Play className="w-3 h-3" /> Click / tap to play
          </div>
        </div>
      )}

      {g.phase === 'over' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="stack-pop w-[240px] rounded-2xl border border-white/10 bg-slate-950/90 backdrop-blur-xl p-5 text-center font-mono">
            <div className="text-[9px] uppercase tracking-[0.35em] text-cyan-400 mb-1">Deploy Stack</div>
            <div className="text-base font-bold text-white font-sans">Tower collapsed</div>
            <div className="text-4xl font-bold gradient-accent mt-3 leading-none">{g.height}</div>
            <div className="text-[10px] text-slate-500 mt-1">blocks stacked</div>
            <div className="mt-3 text-[10px] h-5 flex items-center justify-center">
              {g.isNewBest ? (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">NEW BEST</span>
              ) : (
                <span className="text-slate-500">Best {g.best}</span>
              )}
            </div>
            <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 animate-pulse">
              <RotateCcw className="w-3 h-3" /> Click to play again
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StackGame;
