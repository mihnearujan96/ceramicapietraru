"use client";

import {
  createClayBumpTexture,
  createHorezuTexture,
} from "@/lib/pottery/create-horezu-texture";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  CanvasTexture,
  CatmullRomCurve3,
  DoubleSide,
  Group,
  LatheGeometry,
  LinearMipmapLinearFilter,
  LinearFilter,
  MeshStandardMaterial,
  SRGBColorSpace,
  TubeGeometry,
  Vector2,
  Vector3,
} from "three";

export type PotteryMeshProps = {
  spinSpeed?: number;
  paused?: boolean;
  scale?: number;
};

/** Refined Horezu vessel — denser lathe, clay bump, painted texture, organic handle. */
export function PotteryMesh({
  spinSpeed = 0.32,
  paused = false,
  scale = 1,
}: PotteryMeshProps) {
  const group = useRef<Group>(null);

  const { bodyGeometry, handleGeometry, material, rimMaterial, handleMaterial } =
    useMemo(() => {
      // Smoother amphora / ulcior profile (radius, height)
      const profile: Vector2[] = [
        new Vector2(0.4, 1.62),
        new Vector2(0.44, 1.56),
        new Vector2(0.4, 1.5),
        new Vector2(0.35, 1.4),
        new Vector2(0.33, 1.28),
        new Vector2(0.38, 1.16),
        new Vector2(0.52, 1.04),
        new Vector2(0.68, 0.9),
        new Vector2(0.8, 0.72),
        new Vector2(0.86, 0.52),
        new Vector2(0.84, 0.34),
        new Vector2(0.74, 0.18),
        new Vector2(0.55, 0.06),
        new Vector2(0.34, 0.01),
        new Vector2(0.22, 0),
        new Vector2(0.0, 0),
      ];

      const bodyGeometry = new LatheGeometry(profile, 128);
      bodyGeometry.computeVertexNormals();

      const map = new CanvasTexture(createHorezuTexture(2048));
      map.colorSpace = SRGBColorSpace;
      map.anisotropy = 16;
      map.minFilter = LinearMipmapLinearFilter;
      map.magFilter = LinearFilter;
      map.generateMipmaps = true;
      map.needsUpdate = true;

      const bump = new CanvasTexture(createClayBumpTexture(1024));
      bump.anisotropy = 8;
      bump.minFilter = LinearMipmapLinearFilter;
      bump.magFilter = LinearFilter;
      bump.needsUpdate = true;

      const material = new MeshStandardMaterial({
        map,
        bumpMap: bump,
        bumpScale: 0.018,
        roughness: 0.82,
        metalness: 0.0,
        envMapIntensity: 0.4,
        side: DoubleSide,
      });

      const rimMaterial = new MeshStandardMaterial({
        color: "#D4A07A",
        roughness: 0.72,
        metalness: 0,
        bumpMap: bump,
        bumpScale: 0.01,
      });

      const handleMaterial = new MeshStandardMaterial({
        color: "#C07A52",
        roughness: 0.8,
        metalness: 0,
        bumpMap: bump,
        bumpScale: 0.012,
        map,
      });

      const handleCurve = new CatmullRomCurve3([
        new Vector3(0.34, 1.32, 0),
        new Vector3(0.62, 1.28, 0.02),
        new Vector3(0.9, 1.05, 0),
        new Vector3(0.96, 0.78, 0),
        new Vector3(0.82, 0.58, 0),
        new Vector3(0.66, 0.52, 0),
      ]);
      const handleGeometry = new TubeGeometry(handleCurve, 64, 0.048, 16, false);

      return {
        bodyGeometry,
        handleGeometry,
        material,
        rimMaterial,
        handleMaterial,
      };
    }, []);

  useFrame((_, delta) => {
    if (paused || !group.current) return;
    group.current.rotation.y += delta * spinSpeed;
  });

  return (
    <group ref={group} scale={scale} position={[0, -0.82, 0]}>
      <mesh geometry={bodyGeometry} material={material} castShadow receiveShadow />

      <mesh position={[0, 1.58, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.36, 0.028, 16, 64]} />
        <primitive object={rimMaterial} attach="material" />
      </mesh>

      {/* Inner opening */}
      <mesh position={[0, 1.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.3, 48]} />
        <meshStandardMaterial color="#6B4534" roughness={0.9} side={DoubleSide} />
      </mesh>

      <mesh
        geometry={handleGeometry}
        material={handleMaterial}
        castShadow
        receiveShadow
      />
    </group>
  );
}
