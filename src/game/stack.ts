import { useSyncExternalStore } from 'react';

/**
 * Deploy Stack — a "stack the tower" mini-game for the portfolio hero.
 *
 * Blocks slide back and forth above the tower; the player taps to drop them.
 * Whatever overhangs the block below is sliced off and tumbles away, so the
 * footprint shrinks with every imperfect drop until a block misses entirely.
 *
 * Two kinds of state live here:
 *  - `stackStore` : React-visible snapshot (phase, height, best…). Changes only on
 *                   discrete events (drop, game over, phase switch).
 *  - `sim`        : per-frame mutable state (motion phase, blocks, debris, camera).
 *                   Mutated inside the R3F frame loop; `version` bumps re-render meshes.
 */

export type StackPhase = 'idle' | 'playing' | 'over';
export type Axis = 'x' | 'z';

export interface PlacedBlock {
  x: number;
  y: number;
  z: number;
  sx: number;
  sy: number;
  sz: number;
  hue: number;
}

export interface Debris {
  x: number;
  y: number;
  z: number;
  sx: number;
  sy: number;
  sz: number;
  vx: number;
  vy: number;
  vz: number;
  rx: number;
  ry: number;
  rz: number;
  ex: number;
  ey: number;
  ez: number;
  life: number;
  hue: number;
}

export const BASE = 3;
export const LAYER_H = 0.5;
export const AMPLITUDE = 2.4;
const PERFECT_TOLERANCE = 0.12;
const MIN_OVERLAP = 0.06;
/** attract mode only — never let the demo tower grow unbounded */
const MAX_DEMO_BLOCKS = 60;

export interface StackSnapshot {
  phase: StackPhase;
  height: number;
  best: number;
  perfectStreak: number;
  /** increments on every perfect drop → HUD replays the flash animation */
  perfectFlash: number;
  isNewBest: boolean;
  /** increments whenever blocks / debris lists change structurally */
  version: number;
}

const BEST_KEY = 'deploy-stack-best';

const readBest = (): number => {
  try {
    const v = Number(localStorage.getItem(BEST_KEY));
    return Number.isFinite(v) && v > 0 ? v : 0;
  } catch {
    return 0;
  }
};

let snapshot: StackSnapshot = {
  phase: 'idle',
  height: 0,
  best: readBest(),
  perfectStreak: 0,
  perfectFlash: 0,
  isNewBest: false,
  version: 0,
};

const listeners = new Set<() => void>();

export const stackStore = {
  get: () => snapshot,
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  set(patch: Partial<StackSnapshot>) {
    snapshot = { ...snapshot, ...patch };
    listeners.forEach((l) => l());
  },
};

export function useStack(): StackSnapshot {
  return useSyncExternalStore(stackStore.subscribe, stackStore.get, stackStore.get);
}

/** ask React to re-render the meshes because a list changed */
const bump = () => stackStore.set({ version: snapshot.version + 1 });

export const blockHue = (layer: number) => (190 + layer * 7) % 360;

const randomOffset = () => (Math.random() - 0.5) * 0.44;

export const stackActions = {
  start() {
    sim.reset();
    stackStore.set({ phase: 'playing', height: 0, perfectStreak: 0, isNewBest: false });
    bump();
  },
  toIdle() {
    sim.reset();
    stackStore.set({ phase: 'idle', height: 0, perfectStreak: 0 });
    bump();
  },
  placed(perfect: boolean) {
    const s = stackStore.get();
    stackStore.set({
      height: s.height + 1,
      perfectStreak: perfect ? s.perfectStreak + 1 : 0,
      perfectFlash: perfect ? s.perfectFlash + 1 : s.perfectFlash,
    });
  },
  gameOver() {
    const s = stackStore.get();
    const isNewBest = s.height > s.best;
    if (isNewBest) {
      try {
        localStorage.setItem(BEST_KEY, String(s.height));
      } catch {
        /* private mode — best simply won't persist */
      }
    }
    stackStore.set({ phase: 'over', isNewBest, best: isNewBest ? s.height : s.best, perfectStreak: 0 });
  },
};

/** Per-frame simulation state. */
export const sim = {
  axis: 'x' as Axis,
  /** motion phase of the sliding block; position = sin(phase) * AMPLITUDE */
  phase: -Math.PI / 2,
  /** radians / second */
  phaseRate: 1.6,
  /** centre y of the block currently sliding */
  y: LAYER_H * 1.5,
  /** footprint of the sliding block */
  sx: BASE,
  sz: BASE,
  /** centre of the top placed block */
  tx: 0,
  tz: 0,
  blocks: [] as PlacedBlock[],
  debris: [] as Debris[],
  /** previous sliding position along the active axis (attract-mode crossing detection) */
  prevPos: -AMPLITUDE,
  /** attract-mode aim error for the current layer */
  autoOffset: 0,
  /** counts down to an automatic reset (attract miss / game-over screen timeout) */
  overTimer: 0,
  effect: { active: false, t: 0, x: 0, y: 0, z: 0, sx: BASE, sz: BASE },

  reset() {
    this.axis = 'x';
    this.phase = -Math.PI / 2;
    this.phaseRate = 1.6;
    this.blocks = [{ x: 0, y: LAYER_H / 2, z: 0, sx: BASE, sy: LAYER_H, sz: BASE, hue: blockHue(0) }];
    this.debris = [];
    this.tx = 0;
    this.tz = 0;
    this.sx = BASE;
    this.sz = BASE;
    this.y = LAYER_H * 1.5;
    this.prevPos = -AMPLITUDE;
    this.autoOffset = randomOffset();
    this.overTimer = 0;
    this.effect.active = false;
  },
};
sim.reset();

export const movingPos = () => Math.sin(sim.phase) * AMPLITUDE;

function makeDebris(
  x: number,
  y: number,
  z: number,
  sx: number,
  sy: number,
  sz: number,
  dir: number,
  axis: Axis,
  hue: number
): Debris {
  const side = 1.6 + Math.random() * 1.6;
  return {
    x, y, z, sx, sy, sz, hue,
    vx: axis === 'x' ? dir * side : (Math.random() - 0.5) * 0.8,
    vy: 1.2 + Math.random() * 1.2,
    vz: axis === 'z' ? dir * side : (Math.random() - 0.5) * 0.8,
    rx: 0, ry: 0, rz: 0,
    ex: (Math.random() - 0.5) * 5,
    ey: (Math.random() - 0.5) * 4,
    ez: (Math.random() - 0.5) * 5,
    life: 2.6,
  };
}

/**
 * Drops the sliding block onto the tower. Slices off the overhang, spawns the
 * falling off-cut, advances the layer and updates the score / phase.
 * Returns 'perfect' | 'cut' | 'miss'.
 */
export function drop(): 'perfect' | 'cut' | 'miss' {
  const pos = movingPos();
  const top = sim.blocks[sim.blocks.length - 1];
  const along = sim.axis;
  const topCenter = along === 'x' ? top.x : top.z;
  const delta = pos - topCenter;
  const size = along === 'x' ? sim.sx : sim.sz;
  const overlap = size - Math.abs(delta);
  const dir = Math.sign(delta) || 1;
  const hue = blockHue(sim.blocks.length);
  const playing = stackStore.get().phase === 'playing';

  // clean miss → the whole block tumbles and the round ends
  if (overlap <= MIN_OVERLAP) {
    sim.debris.push(
      makeDebris(along === 'x' ? pos : sim.tx, sim.y, along === 'z' ? pos : sim.tz, sim.sx, LAYER_H, sim.sz, dir, along, hue)
    );
    if (playing) stackActions.gameOver();
    sim.overTimer = playing ? 6 : 2.5;
    bump();
    return 'miss';
  }

  const perfect = Math.abs(delta) <= PERFECT_TOLERANCE;
  let nx = top.x;
  let nz = top.z;
  let nsx = sim.sx;
  let nsz = sim.sz;

  if (perfect) {
    // every 4th perfect in a streak grows the footprint back a little
    const streak = stackStore.get().perfectStreak + 1;
    const grow = streak % 4 === 0 ? 0.3 : 0;
    nsx = Math.min(BASE, sim.sx + grow);
    nsz = Math.min(BASE, sim.sz + grow);
    sim.effect = { active: true, t: 0, x: nx, y: sim.y, z: nz, sx: nsx, sz: nsz };
  } else if (along === 'x') {
    nsx = overlap;
    nx = top.x + delta / 2;
    const keptLow = nx - overlap / 2;
    const keptHigh = nx + overlap / 2;
    const low = pos - sim.sx / 2;
    const high = pos + sim.sx / 2;
    const cutLow = dir > 0 ? keptHigh : low;
    const cutHigh = dir > 0 ? high : keptLow;
    sim.debris.push(makeDebris((cutLow + cutHigh) / 2, sim.y, sim.tz, cutHigh - cutLow, LAYER_H, sim.sz, dir, 'x', hue));
  } else {
    nsz = overlap;
    nz = top.z + delta / 2;
    const keptLow = nz - overlap / 2;
    const keptHigh = nz + overlap / 2;
    const low = pos - sim.sz / 2;
    const high = pos + sim.sz / 2;
    const cutLow = dir > 0 ? keptHigh : low;
    const cutHigh = dir > 0 ? high : keptLow;
    sim.debris.push(makeDebris(sim.tx, sim.y, (cutLow + cutHigh) / 2, sim.sx, LAYER_H, cutHigh - cutLow, dir, 'z', hue));
  }

  sim.blocks.push({ x: nx, y: sim.y, z: nz, sx: nsx, sy: LAYER_H, sz: nsz, hue });
  sim.tx = nx;
  sim.tz = nz;
  sim.sx = nsx;
  sim.sz = nsz;
  sim.y += LAYER_H;
  sim.axis = along === 'x' ? 'z' : 'x';
  sim.phase = -Math.PI / 2;
  sim.prevPos = -AMPLITUDE;
  sim.phaseRate = Math.min(3.2, 1.6 + sim.blocks.length * 0.045);
  sim.autoOffset = randomOffset();

  if (playing) {
    stackActions.placed(perfect);
  } else if (sim.blocks.length > MAX_DEMO_BLOCKS) {
    sim.overTimer = 1.5;
  }
  bump();
  return perfect ? 'perfect' : 'cut';
}
