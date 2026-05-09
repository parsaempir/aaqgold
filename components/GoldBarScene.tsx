'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// A single, mirror-polished gold torus floating in a soft procedural studio.
// Minimal, cinematic, premium — no logos, no plates, no clutter.
export default function GoldBarScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Probe WebGL without leaking a context.
    const probe = document.createElement('canvas');
    const gl =
      probe.getContext('webgl2') ||
      probe.getContext('webgl') ||
      probe.getContext('experimental-webgl');
    if (!gl) {
      console.info('GoldScene: WebGL unavailable, skipping 3D scene');
      return;
    }
    const loseExt = (gl as WebGLRenderingContext).getExtension(
      'WEBGL_lose_context'
    );
    loseExt?.loseContext();

    const scene = new THREE.Scene();

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 0.1, 5.6);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false,
      });
    } catch (err) {
      console.info('GoldScene: WebGL unavailable —', err);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    // ── Procedural studio environment for clean metallic reflections ──
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envScene = new THREE.Scene();
    const envGeo = new THREE.SphereGeometry(50, 48, 48);
    const envMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      vertexShader: `
        varying vec3 vWorld;
        void main(){
          vWorld = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vWorld;
        void main(){
          vec3 n = normalize(vWorld);
          float t = n.y * 0.5 + 0.5;

          // Three-band warm gradient, top to bottom.
          vec3 top = vec3(1.00, 0.99, 0.95);   // soft warm white
          vec3 mid = vec3(0.99, 0.83, 0.50);   // warm gold band
          vec3 bot = vec3(0.94, 0.94, 0.92);   // cool soft floor

          vec3 col = mix(bot, mid, smoothstep(0.10, 0.55, t));
          col = mix(col, top, smoothstep(0.55, 0.95, t));

          // Subtle horizon highlight to give the metal a clean rim catch.
          float h = exp(-pow((t - 0.52) * 9.0, 2.0));
          col += h * vec3(0.22, 0.16, 0.06);

          // Two side highlights for cinematic specular sweeps.
          float sx = max(0.0, 1.0 - abs(n.x - 0.55) * 4.0);
          float sx2 = max(0.0, 1.0 - abs(n.x + 0.55) * 4.0);
          col += pow(sx, 6.0) * vec3(0.55, 0.50, 0.35);
          col += pow(sx2, 6.0) * vec3(0.45, 0.42, 0.30);

          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
    envScene.add(new THREE.Mesh(envGeo, envMat));
    const envMap = pmrem.fromScene(envScene).texture;
    scene.environment = envMap;

    // Quiet ambient + a soft key for depth.
    const ambient = new THREE.AmbientLight(0xfff5e0, 0.55);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xfff8e8, 1.1);
    key.position.set(3, 5, 4);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xf3e0a8, 0.7);
    rim.position.set(-4, 2, -3);
    scene.add(rim);

    // ── The hero element: a polished gold torus ──
    const torusGeo = new THREE.TorusGeometry(1.18, 0.36, 128, 256);
    const goldMat = new THREE.MeshPhysicalMaterial({
      color: 0xe6c25a,
      metalness: 1.0,
      roughness: 0.16,
      reflectivity: 1.0,
      clearcoat: 0.65,
      clearcoatRoughness: 0.12,
      envMapIntensity: 1.55,
    });
    const torus = new THREE.Mesh(torusGeo, goldMat);
    torus.rotation.set(0.55, -0.4, 0.05);
    scene.add(torus);

    // ── Sparse drifting gold motes ──
    const moteCount = 48;
    const moteGeo = new THREE.BufferGeometry();
    const motePos = new Float32Array(moteCount * 3);
    const moteSpeed = new Float32Array(moteCount);
    for (let i = 0; i < moteCount; i++) {
      motePos[i * 3 + 0] = (Math.random() - 0.5) * 9;
      motePos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      motePos[i * 3 + 2] = (Math.random() - 0.5) * 4 - 0.5;
      moteSpeed[i] = 0.0005 + Math.random() * 0.0014;
    }
    moteGeo.setAttribute('position', new THREE.BufferAttribute(motePos, 3));
    const moteMat = new THREE.PointsMaterial({
      color: 0xb88820,
      size: 0.022,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const motes = new THREE.Points(moteGeo, moteMat);
    scene.add(motes);

    // ── Mouse parallax ──
    const m = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointerMove = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      m.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      m.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    window.addEventListener('pointermove', onPointerMove);

    // ── Resize ──
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    // ── Loop ──
    const timer = new THREE.Timer();
    timer.connect(document);
    let raf = 0;
    let contextLost = false;
    const onContextLost = (e: Event) => {
      e.preventDefault();
      contextLost = true;
      cancelAnimationFrame(raf);
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);

    const tick = () => {
      if (contextLost) return;
      timer.update();
      const t = timer.getElapsed();

      m.x += (m.tx - m.x) * 0.04;
      m.y += (m.ty - m.y) * 0.04;

      torus.rotation.x = 0.55 + Math.sin(t * 0.32) * 0.16 + m.y * 0.22;
      torus.rotation.y = -0.4 + t * 0.18 + m.x * 0.4;
      torus.rotation.z = 0.05 + Math.sin(t * 0.21) * 0.04;
      torus.position.y = Math.sin(t * 0.7) * 0.07;

      const arr = motes.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < moteCount; i++) {
        arr[i * 3 + 1] += moteSpeed[i];
        if (arr[i * 3 + 1] > 3.5) arr[i * 3 + 1] = -3.5;
      }
      motes.geometry.attributes.position.needsUpdate = true;
      motes.rotation.y = t * 0.012;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      timer.dispose();
      ro.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      try {
        renderer.forceContextLoss();
      } catch {
        // already lost
      }
      renderer.dispose();
      pmrem.dispose();
      torusGeo.dispose();
      goldMat.dispose();
      moteGeo.dispose();
      moteMat.dispose();
      envGeo.dispose();
      envMat.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
