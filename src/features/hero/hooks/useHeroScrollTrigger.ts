import { useLayoutEffect } from "react";
import type { RefObject } from "react";
import * as THREE from "three";

type HeroMeshMotionParams = {
  meshRef: RefObject<THREE.Mesh>;
};

const useHeroMeshMotion = ({ meshRef }: HeroMeshMotionParams) => {
  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return undefined;
    return undefined;
  }, [meshRef]);
};

export default useHeroMeshMotion;
