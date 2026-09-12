import * as THREE from 'three';

/**
 * R3F v8 augments the GLOBAL `JSX` namespace (pre-React-19 style), while
 * @types/react 19 moved JSX lookups to `React.JSX`. This bridge re-exports
 * the fiber ThreeElements into React.JSX so R3F elements type-check under
 * React 19 types. Remove when upgrading to @react-three/fiber v9.
 */
declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements extends ThreeElements {}
    }
  }
}

type ThreeElements = import('@react-three/fiber').ThreeElements;

export type { ThreeElements };
export { THREE };
