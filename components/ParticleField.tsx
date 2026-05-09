'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Cinematic gold particle field for the hero.
 * - ~750 floating gold flecks with depth + parallax
 * - Mouse-attracted swirl
 * - Soft additive blending against the dark scene
 */
export default function ParticleField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const probe = document.createElement('canvas');
    const gl =
      probe.getContext('webgl2') ||
      probe.getContext('webgl') ||
      probe.getContext('experimental-webgl');
    if (!gl) return;
    (gl as WebGLRenderingContext)
      .getExtension('WEBGL_lose_context')
      ?.loseContext();

    const scene = new THREE.Scene();
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 200);
    camera.position.set(0, 0, 18);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false,
      });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    /* ───── Particles ───── */
    const COUNT = 760;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);

    const goldA = new THREE.Color('#F5D06F');
    const goldB = new THREE.Color('#D4AF37');
    const goldC = new THREE.Color('#B8860B');

    for (let i = 0; i < COUNT; i++) {
      // Distribute in a vertical slab with some depth
      positions[i * 3 + 0] = (Math.random() - 0.5) * 38;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18 - 2;

      seeds[i] = Math.random() * Math.PI * 2;

      const t = Math.random();
      const c = t < 0.33 ? goldA : t < 0.66 ? goldB : goldC;
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = 0.6 + Math.random() * 2.2;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

    /* ───── Soft round point sprite (no external assets) ───── */
    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = 128;
    spriteCanvas.height = 128;
    const sctx = spriteCanvas.getContext('2d')!;
    const grad = sctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.35, 'rgba(255,235,170,0.85)');
    grad.addColorStop(0.7, 'rgba(212,175,55,0.25)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    sctx.fillStyle = grad;
    sctx.fillRect(0, 0, 128, 128);
    const sprite = new THREE.CanvasTexture(spriteCanvas);
    sprite.colorSpace = THREE.SRGBColorSpace;

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uSprite: { value: sprite },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: /* glsl */ `
        attribute float aSeed;
        attribute vec3 aColor;
        attribute float aSize;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uPixelRatio;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec3 p = position;

          // gentle drift
          p.y += sin(uTime * 0.5 + aSeed) * 0.6;
          p.x += cos(uTime * 0.35 + aSeed * 1.3) * 0.4;

          // mouse attraction (parallax)
          vec2 m = uMouse * 4.0;
          float depth = smoothstep(-10.0, 10.0, p.z);
          p.xy += m * (0.4 + depth * 0.8);

          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = aSize * (300.0 / -mv.z) * uPixelRatio;
          vColor = aColor;
          vAlpha = 0.55 + 0.45 * sin(uTime + aSeed);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform sampler2D uSprite;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec4 tex = texture2D(uSprite, gl_PointCoord);
          vec3 col = vColor * tex.rgb;
          float a = tex.a * vAlpha;
          gl_FragColor = vec4(col, a);
        }
      `,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    /* ───── Mouse ───── */
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointerMove = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      mouse.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      mouse.ty = -((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    /* ───── Resize ───── */
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    /* ───── Loop ───── */
    const clock = new THREE.Clock();
    let raf = 0;
    let lost = false;
    const onLost = (e: Event) => {
      e.preventDefault();
      lost = true;
      cancelAnimationFrame(raf);
    };
    renderer.domElement.addEventListener('webglcontextlost', onLost);

    const tick = () => {
      if (lost) return;
      const t = clock.getElapsedTime();
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      mat.uniforms.uTime.value = t;
      mat.uniforms.uMouse.value.set(mouse.x, mouse.y);

      points.rotation.y = Math.sin(t * 0.05) * 0.15;
      points.rotation.x = Math.cos(t * 0.04) * 0.1;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('webglcontextlost', onLost);
      try {
        renderer.forceContextLoss();
      } catch {}
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      sprite.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}
