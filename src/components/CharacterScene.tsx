"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function Mascot({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current || reduced) return;
    const scroll = window.scrollY / Math.max(1, document.body.scrollHeight - innerHeight);
    const targetX = scroll < .22 ? .85 : scroll < .42 ? 1.5 : scroll < .7 ? -2.7 : .7;
    const targetScale = scroll > .35 && scroll < .62 ? .35 : scroll > .72 ? .7 : .88;
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX, .035);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetX * -.16, .035);
    group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), .035);
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * .5) * .025;
  });
  const fur = new THREE.MeshStandardMaterial({ color: "#77736f", roughness: .95 });
  const dark = new THREE.MeshStandardMaterial({ color: "#262422", roughness: .8 });
  return (
    <Float speed={reduced ? 0 : .8} rotationIntensity={.08} floatIntensity={.18}>
      <group ref={group} position={[0, -.8, 0]}>
        <mesh position={[0, .45, 0]} scale={[1.2, 1.35, 1]} material={fur}><sphereGeometry args={[1, 40, 40]} /></mesh>
        <mesh position={[-.68, 1.28, -.02]} rotation={[0, 0, -.5]} material={fur}><capsuleGeometry args={[.26, .55, 12, 24]} /></mesh>
        <mesh position={[.68, 1.28, -.02]} rotation={[0, 0, .5]} material={fur}><capsuleGeometry args={[.26, .55, 12, 24]} /></mesh>
        <mesh position={[-.34, .62, 1.01]} material={dark}><sphereGeometry args={[.105, 20, 20]} /></mesh>
        <mesh position={[.34, .62, 1.01]} material={dark}><sphereGeometry args={[.105, 20, 20]} /></mesh>
        <mesh position={[-.31, .66, 1.1]}><sphereGeometry args={[.028, 12, 12]} /><meshBasicMaterial color="#f6f3ee" /></mesh>
        <mesh position={[.37, .66, 1.1]}><sphereGeometry args={[.028, 12, 12]} /><meshBasicMaterial color="#f6f3ee" /></mesh>
        <mesh position={[0, .3, 1.08]} material={dark} scale={[.65, .2, .12]}><sphereGeometry args={[.22, 20, 20]} /></mesh>
        <mesh position={[0, .21, 1.12]} rotation={[0, 0, 0]}><torusGeometry args={[.16, .025, 10, 24, Math.PI]} /><meshStandardMaterial color="#d8cfc4" /></mesh>
        <RoundedBox args={[1.45, 1.35, .75]} radius={.32} smoothness={4} position={[0, -.78, 0]} material={fur} />
        <mesh position={[-.86, -.78, 0]} rotation={[0, 0, -.12]} material={fur}><capsuleGeometry args={[.22, .85, 10, 20]} /></mesh>
        <mesh position={[.86, -.78, 0]} rotation={[0, 0, .12]} material={fur}><capsuleGeometry args={[.22, .85, 10, 20]} /></mesh>
      </group>
    </Float>
  );
}

export function CharacterScene() {
  const reduced = useReducedMotion();
  const [supported, setSupported] = useState(true);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const check = window.setTimeout(() => { try { const canvas = document.createElement("canvas"); setSupported(Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"))); } catch { setSupported(false); } }, 0);
    const timer = setTimeout(() => setReady(true), 350);
    return () => { clearTimeout(check); clearTimeout(timer); };
  }, []);
  if (!supported) return <div className="mascot-fallback" role="img" aria-label="Original grey fog creature placeholder"><span>Original mascot placeholder</span></div>;
  return <div className={`character-scene ${ready ? "scene-ready" : ""}`} aria-hidden="true"><Canvas dpr={[1, 1.5]} camera={{ position: [0, .2, 6.8], fov: 36 }} gl={{ alpha: true, antialias: false }}>
    <ambientLight intensity={1.9} /><directionalLight position={[3, 4, 5]} intensity={2.8} color="#f6f3ee" /><pointLight position={[-3, 0, 2]} intensity={7} color="#a8927d" />
    <fog attach="fog" args={["#d8cfc4", 4.6, 8]} />
    <Suspense fallback={null}><Mascot reduced={reduced} /></Suspense>
  </Canvas></div>;
}
