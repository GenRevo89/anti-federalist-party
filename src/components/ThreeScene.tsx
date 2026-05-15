"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, Suspense, type RefObject } from "react";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const N = 180;
const ZONES = [0, 0.12, 0.32, 0.52, 0.72];

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function smoothstep(t: number) { const c = Math.max(0, Math.min(1, t)); return c * c * (3 - 2 * c); }

/* ---------- Main Page Formations ---------- */

function sphereForm(): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = phi * i;
    pts.push(new THREE.Vector3(r * Math.cos(th) * 1.5, y * 1.5, r * Math.sin(th) * 1.5));
  }
  return pts;
}

function shatterForm(): THREE.Vector3[] {
  const base = sphereForm();
  return base.map(p => {
    const dir = p.clone().normalize();
    const dist = 2.5 + Math.random() * 3;
    return dir.multiplyScalar(dist).add(
      new THREE.Vector3((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2)
    );
  });
}

function pillarForm(): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  const cols = [-1.8, 0, 1.8];
  const per = Math.floor(N / 3);
  for (let c = 0; c < 3; c++) {
    const count = c < 2 ? per : N - per * 2;
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const y = t * 4 - 2;
      const angle = t * Math.PI * 6;
      pts.push(new THREE.Vector3(cols[c] + Math.cos(angle) * 0.15, y, Math.sin(angle) * 0.15));
    }
  }
  return pts;
}

function gridForm(): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  const cols = 12;
  for (let i = 0; i < N; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    pts.push(new THREE.Vector3(
      (col / (cols - 1)) * 5 - 2.5,
      (row / (Math.ceil(N / cols) - 1)) * 3.5 - 1.75,
      0
    ));
  }
  return pts;
}

function helixForm(): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);
    const angle = t * Math.PI * 6;
    const r = 0.4 + Math.sin(t * Math.PI) * 0.8;
    const strand = i % 2 === 0 ? 1 : -1;
    pts.push(new THREE.Vector3(
      Math.cos(angle + strand * 0.5) * r,
      t * 5 - 2.5,
      Math.sin(angle + strand * 0.5) * r
    ));
  }
  return pts;
}

/* ---------- Library Formations (Quill Ink / Archive Vault) ---------- */

// Opening: Ink drops falling from a quill — chaotic points raining down
function inkDropForm(): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);
    // Scattered ink drops in a gentle funnel shape
    const angle = t * Math.PI * 14 + (Math.random() - 0.5) * 2;
    const spread = 0.3 + t * 2.5;
    const y = 3 - t * 6;
    pts.push(new THREE.Vector3(
      Math.cos(angle) * spread * (0.3 + Math.random() * 0.7),
      y + (Math.random() - 0.5) * 0.5,
      Math.sin(angle) * spread * (0.3 + Math.random() * 0.7)
    ));
  }
  return pts;
}

// Transition: The ink coalesces into horizontal stacked pages (books on shelves)
function bookshelfForm(): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  const shelves = 5;
  const perShelf = Math.floor(N / shelves);
  for (let s = 0; s < shelves; s++) {
    const yBase = (s - (shelves - 1) / 2) * 1.2;
    const count = s < shelves - 1 ? perShelf : N - perShelf * (shelves - 1);
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      // Books along the shelf
      const x = (t - 0.5) * 5;
      const bookHeight = 0.2 + Math.sin(i * 1.7) * 0.15;
      pts.push(new THREE.Vector3(
        x,
        yBase + bookHeight,
        (Math.sin(t * Math.PI * 3) * 0.2)
      ));
    }
  }
  return pts;
}

// Final: Scroll unfurling — a spiral that opens into a flat plane
function scrollForm(): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);
    const angle = t * Math.PI * 4;
    const r = 0.5 + t * 1.5;
    const y = Math.cos(angle * 0.5) * (1 - t) * 2;
    pts.push(new THREE.Vector3(
      Math.cos(angle) * r,
      y,
      Math.sin(angle) * r * 0.6
    ));
  }
  return pts;
}

/* ---------- Chapters Formations (Network / Community) ---------- */

// Opening: Scattered stars across the USA — random constellation
function constellationForm(): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < N; i++) {
    // Wide spread across the viewport
    const x = (Math.random() - 0.5) * 8;
    const y = (Math.random() - 0.5) * 5;
    const z = (Math.random() - 0.5) * 3;
    pts.push(new THREE.Vector3(x, y, z));
  }
  return pts;
}

// Transition: Points converge into connected clusters (chapter nodes)
function clusterForm(): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  const clusters = 8;
  const perCluster = Math.floor(N / clusters);
  for (let c = 0; c < clusters; c++) {
    const cx = (Math.cos(c * Math.PI * 2 / clusters)) * 2.5;
    const cy = (Math.sin(c * Math.PI * 2 / clusters)) * 2;
    const cz = (Math.sin(c * 1.5)) * 1;
    const count = c < clusters - 1 ? perCluster : N - perCluster * (clusters - 1);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = 0.3 + Math.random() * 0.4;
      pts.push(new THREE.Vector3(
        cx + Math.cos(angle) * r,
        cy + Math.sin(angle) * r,
        cz + (Math.random() - 0.5) * 0.3
      ));
    }
  }
  return pts;
}

// Final: Points form a shield/emblem shape
function shieldForm(): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);
    // Shield outline
    if (i < N * 0.6) {
      // Upper semicircle
      const angle = (t / 0.6) * Math.PI;
      const r = 2;
      pts.push(new THREE.Vector3(
        Math.cos(angle) * r,
        Math.sin(angle) * r * 0.8 + 0.5,
        Math.sin(angle * 3) * 0.15
      ));
    } else {
      // Lower pointed section
      const st = (t - 0.6) / 0.4;
      const x = (1 - st) * (st < 0.5 ? -2 : 2) * (1 - st * 0.5);
      const y = -st * 2.5 + 0.5;
      pts.push(new THREE.Vector3(
        x * (1 - st),
        y,
        Math.sin(st * Math.PI) * 0.2
      ));
    }
  }
  return pts;
}

/* ---------- County Formations (Hyper-Local) ---------- */

// Town Hall dome
function domeForm(): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = (i / (N - 1));
    const r = Math.sqrt(1 - (y * 2 - 1) * (y * 2 - 1)) * 2;
    const th = phi * i;
    if (y > 0.5) {
      // Dome top half
      pts.push(new THREE.Vector3(r * Math.cos(th), y * 2 - 1, r * Math.sin(th)));
    } else {
      // Base columns
      const col = i % 8;
      const colAngle = (col / 8) * Math.PI * 2;
      pts.push(new THREE.Vector3(
        Math.cos(colAngle) * 1.8,
        y * 4 - 2,
        Math.sin(colAngle) * 1.8
      ));
    }
  }
  return pts;
}

// Community circle
function circleGatherForm(): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);
    // Concentric circles representing community layers
    const ring = Math.floor(t * 5);
    const ringT = (t * 5) - ring;
    const r = 0.5 + ring * 0.5;
    const angle = ringT * Math.PI * 2;
    pts.push(new THREE.Vector3(
      Math.cos(angle) * r,
      Math.sin(ringT * Math.PI) * 0.3,
      Math.sin(angle) * r
    ));
  }
  return pts;
}

/* ---------- Ring Keyframes ---------- */
interface RingState { r1s: number; r2s: number; r3s: number; r1rx: number; r2ry: number; r3rz: number }
const RING_KEYS: (RingState & { s: number })[] = [
  { s: 0,    r1s: 1, r2s: 1, r3s: 1, r1rx: 0, r2ry: 0, r3rz: 0 },
  { s: 0.12, r1s: 1.8, r2s: 2, r3s: 2.2, r1rx: 0.5, r2ry: 0.3, r3rz: 0.7 },
  { s: 0.32, r1s: 0.6, r2s: 0.6, r3s: 0.6, r1rx: Math.PI/2, r2ry: Math.PI/2, r3rz: Math.PI/2 },
  { s: 0.52, r1s: 1.5, r2s: 0, r3s: 0, r1rx: Math.PI/2, r2ry: 0, r3rz: 0 },
  { s: 0.72, r1s: 0.5, r2s: 0.5, r3s: 0.5, r1rx: 0, r2ry: 0, r3rz: 0 },
];

function lerpRings(scroll: number): RingState {
  let i = 0;
  while (i < RING_KEYS.length - 1 && RING_KEYS[i + 1].s <= scroll) i++;
  const a = RING_KEYS[i]; const b = RING_KEYS[Math.min(i + 1, RING_KEYS.length - 1)];
  if (a.s === b.s) return a;
  const t = smoothstep((scroll - a.s) / (b.s - a.s));
  return {
    r1s: lerp(a.r1s, b.r1s, t), r2s: lerp(a.r2s, b.r2s, t), r3s: lerp(a.r3s, b.r3s, t),
    r1rx: lerp(a.r1rx, b.r1rx, t), r2ry: lerp(a.r2ry, b.r2ry, t), r3rz: lerp(a.r3rz, b.r3rz, t),
  };
}

/* ---------- Theme Color Maps ---------- */
const THEME_COLORS = {
  main: { primary: '#2EC4B6', secondary: '#C9A94E', ring1: '#2EC4B6', ring2: '#C9A94E', ring3: '#2EC4B6' },
  library: { primary: '#C9A94E', secondary: '#E8D48B', ring1: '#C9A94E', ring2: '#E8D48B', ring3: '#9B7D2F' },
  chapters: { primary: '#2EC4B6', secondary: '#4DD8CC', ring1: '#2EC4B6', ring2: '#0D7377', ring3: '#4DD8CC' },
  county: { primary: '#C9A94E', secondary: '#2EC4B6', ring1: '#C9A94E', ring2: '#2EC4B6', ring3: '#E8D48B' },
};

/* ---------- Morphing Particles ---------- */
function MorphParticles({ scrollRef, theme }: { scrollRef: RefObject<number>, theme: string }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colors = THEME_COLORS[theme as keyof typeof THEME_COLORS] || THEME_COLORS.main;
  
  const formations = useMemo(() => {
    if (theme === 'library') return [inkDropForm(), bookshelfForm(), scrollForm()];
    if (theme === 'chapters') return [constellationForm(), clusterForm(), shieldForm()];
    if (theme === 'county') return [domeForm(), circleGatherForm()];
    return [sphereForm(), shatterForm(), pillarForm(), gridForm(), helixForm()];
  }, [theme]);
  
  const zones = useMemo(() => {
    if (theme === 'library') return [0, 0.35, 0.7];
    if (theme === 'chapters') return [0, 0.35, 0.7];
    if (theme === 'county') return [0, 0.5];
    return ZONES;
  }, [theme]);

  const currentPositions = useRef<THREE.Vector3[]>(formations[0].map(v => v.clone()));

  // Size adaptation for particle count
  const sizeScale = useMemo(() => {
    if (theme === 'library') return 0.9;
    if (theme === 'chapters') return 0.7;
    if (theme === 'county') return 1.0;
    return 0.8;
  }, [theme]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const scroll = scrollRef.current ?? 0;
    const time = clock.getElapsedTime();

    let zi = 0;
    while (zi < zones.length - 1 && zones[zi + 1] <= scroll) zi++;
    const from = formations[Math.min(zi, formations.length - 1)];
    const to = formations[Math.min(zi + 1, formations.length - 1)];
    const zStart = zones[zi];
    const zEnd = zones[Math.min(zi + 1, zones.length - 1)];
    const blend = zStart === zEnd ? 0 : smoothstep((scroll - zStart) / (zEnd - zStart));

    for (let i = 0; i < N; i++) {
      const fi = Math.min(i, from.length - 1);
      const ti = Math.min(i, to.length - 1);
      const target = new THREE.Vector3(
        lerp(from[fi].x, to[ti].x, blend),
        lerp(from[fi].y, to[ti].y, blend),
        lerp(from[fi].z, to[ti].z, blend),
      );
      const cur = currentPositions.current[i];
      cur.x = lerp(cur.x, target.x, 0.06);
      cur.y = lerp(cur.y, target.y, 0.06);
      cur.z = lerp(cur.z, target.z, 0.06);

      // Organic drift varies by theme
      const driftScale = theme === 'library' ? 0.05 : theme === 'chapters' ? 0.04 : 0.03;
      dummy.position.set(
        cur.x + Math.sin(time * 0.5 + i * 0.3) * driftScale,
        cur.y + Math.cos(time * 0.4 + i * 0.2) * driftScale,
        cur.z + Math.sin(time * 0.3 + i * 0.5) * (driftScale * 0.7),
      );
      const scale = (sizeScale) * (0.8 + Math.sin(time * 2 + i) * 0.2);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, N]}>
      <sphereGeometry args={[0.04, 10, 10]} />
      <meshBasicMaterial color={colors.primary} transparent opacity={0.85} />
    </instancedMesh>
  );
}

/* ---------- Monument Rings ---------- */
function Rings({ scrollRef, theme }: { scrollRef: RefObject<number>, theme: string }) {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);
  const cur = useRef({ r1s: 1, r2s: 1, r3s: 1, r1rx: 0, r2ry: 0, r3rz: 0 });
  const colors = THEME_COLORS[theme as keyof typeof THEME_COLORS] || THEME_COLORS.main;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const scroll = scrollRef.current ?? 0;
    
    // For non-main themes, rings gently breathe instead of morphing
    let target: RingState;
    if (theme === 'main') {
      target = lerpRings(scroll);
    } else {
      const breathe = Math.sin(t * 0.3) * 0.2;
      const scrollExpand = 1 + scroll * 0.5;
      target = {
        r1s: (1.2 + breathe) * scrollExpand,
        r2s: (1.5 + breathe * 0.7) * scrollExpand,
        r3s: (1.8 - breathe * 0.5) * scrollExpand,
        r1rx: scroll * Math.PI * 0.3,
        r2ry: scroll * Math.PI * 0.5,
        r3rz: scroll * Math.PI * 0.2,
      };
    }
    
    const c = cur.current;
    const e = 0.04;
    c.r1s = lerp(c.r1s, target.r1s, e); c.r2s = lerp(c.r2s, target.r2s, e); c.r3s = lerp(c.r3s, target.r3s, e);
    c.r1rx = lerp(c.r1rx, target.r1rx, e); c.r2ry = lerp(c.r2ry, target.r2ry, e); c.r3rz = lerp(c.r3rz, target.r3rz, e);

    const speedMul = theme === 'library' ? 0.1 : theme === 'chapters' ? 0.15 : 0.2;
    if (r1.current) { r1.current.scale.setScalar(c.r1s); r1.current.rotation.x = t * speedMul + c.r1rx; }
    if (r2.current) { r2.current.scale.setScalar(c.r2s); r2.current.rotation.y = t * (speedMul * 0.85) + c.r2ry; }
    if (r3.current) { r3.current.scale.setScalar(c.r3s); r3.current.rotation.z = t * (speedMul * 0.65) + c.r3rz; }
  });

  return (
    <group>
      <mesh ref={r1}><torusGeometry args={[1.8, 0.005, 16, 128]} /><meshBasicMaterial color={colors.ring1} transparent opacity={0.5} /></mesh>
      <mesh ref={r2} rotation={[Math.PI / 3, Math.PI / 6, 0]}><torusGeometry args={[2.1, 0.005, 16, 128]} /><meshBasicMaterial color={colors.ring2} transparent opacity={0.35} /></mesh>
      <mesh ref={r3} rotation={[-Math.PI / 4, 0, Math.PI / 5]}><torusGeometry args={[2.4, 0.005, 16, 128]} /><meshBasicMaterial color={colors.ring3} transparent opacity={0.25} /></mesh>
    </group>
  );
}

/* ---------- Scene Root ---------- */
function SceneContent({ scrollRef, theme }: { scrollRef: RefObject<number>, theme: string }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    const rotSpeed = theme === 'library' ? 0.03 : theme === 'chapters' ? 0.04 : 0.06;
    group.current.rotation.y = t * rotSpeed;
    group.current.rotation.x = pointer.y * 0.08;
    group.current.rotation.z = pointer.x * 0.04;
  });

  return (
    <group ref={group}>
      <MorphParticles scrollRef={scrollRef} theme={theme} />
      <Rings scrollRef={scrollRef} theme={theme} />
    </group>
  );
}

export default function ThreeScene({ scrollRef, theme = 'main' }: { scrollRef: RefObject<number>, theme?: 'main'|'library'|'chapters'|'county' }) {
  const bloomIntensity = theme === 'library' ? 0.9 : theme === 'chapters' ? 0.8 : 0.7;
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true }}
      style={{ width: "100%", height: "100%", background: 'transparent' }}
      onCreated={({ gl }) => { gl.setClearColor(0x000000, 0); }}
    >
      <SceneContent scrollRef={scrollRef} theme={theme} />
      <Suspense fallback={null}>
        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} intensity={bloomIntensity} mipmapBlur />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
