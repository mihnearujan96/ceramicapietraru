"use client";

import { PotteryMesh } from "@/components/pottery/pottery-mesh";
import { ContactShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useReducedMotion } from "motion/react";

export type PotteryViewerProps = {
  className?: string;
  spinSpeed?: number;
  cameraZ?: number;
  showShadow?: boolean;
  ariaLabel?: string;
};

function PotteryScene({
  spinSpeed,
  paused,
  showShadow,
}: {
  spinSpeed: number;
  paused: boolean;
  showShadow: boolean;
}) {
  return (
    <>
      <ambientLight intensity={0.62} />
      <hemisphereLight args={["#FFF8F0", "#B96F4B", 0.55]} />
      <directionalLight
        position={[3.5, 5.5, 4]}
        intensity={1.05}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0002}
      />
      <directionalLight position={[-4, 2, -2]} intensity={0.35} color="#F5EFE5" />
      <directionalLight position={[0, 1, 5]} intensity={0.25} color="#FFE8D4" />
      <PotteryMesh spinSpeed={spinSpeed} paused={paused} />
      {showShadow ? (
        <ContactShadows
          position={[0, -0.85, 0]}
          opacity={0.22}
          scale={5}
          blur={2.8}
          far={2.2}
          color="#442F26"
        />
      ) : null}
    </>
  );
}

/**
 * Reusable coded 3D Horezu pot — transparent canvas so the page cream shows through.
 */
export function PotteryViewer({
  className,
  spinSpeed = 0.35,
  cameraZ = 3.2,
  showShadow = true,
  ariaLabel = "Vas ceramic Horezu care se rotește pe axa verticală",
}: PotteryViewerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={className} role="img" aria-label={ariaLabel}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.2, cameraZ], fov: 32 }}
        gl={{
          antialias: true,
          alpha: true,
          premultipliedAlpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          <PotteryScene
            spinSpeed={spinSpeed}
            paused={!!reduceMotion}
            showShadow={showShadow}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
