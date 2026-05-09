/* =========================================================================
   Aurum° — Editorial landing page interactions
   GSAP entrance + scroll reveals · Three.js gold form · timeline scrubbing
   ========================================================================= */

import * as THREE from "three";

const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;

if (!gsap || !ScrollTrigger) {
  document
    .querySelectorAll("[data-reveal], [data-reveal-row]")
    .forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
  document.querySelectorAll(".line-inner, .word-inner").forEach((el) => {
    el.style.transform = "none";
  });
  const reveal = document.getElementById("pageReveal");
  if (reveal) reveal.style.display = "none";
  throw new Error("GSAP not available — falling back to static layout.");
}

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

const lerp = (a, b, t) => a + (b - a) * t;

/* -------------------------------------------------------------------------
   Text splitting (lines / words) into masked spans for slide-up reveals
   ------------------------------------------------------------------------- */

function splitLines(el) {
  if (!el || el.dataset._split === "lines") return;

  const html = el.innerHTML;
  const lines = html.split(/<br\s*\/?>/i);

  el.innerHTML = lines
    .map((line) => {
      const words = line
        .split(/(<[^>]+>)/g)
        .map((chunk) => {
          if (chunk.startsWith("<")) return chunk;
          return chunk
            .split(/(\s+)/)
            .map((part) => {
              if (/^\s+$/.test(part)) return part;
              if (!part) return "";
              return `<span class="line-wrap"><span class="line-inner">${part}</span></span>`;
            })
            .join("");
        })
        .join("");
      return words;
    })
    .join("<br/>");

  el.dataset._split = "lines";
}

function splitWords(el) {
  if (!el || el.dataset._split === "words") return;
  const text = el.textContent;
  el.innerHTML = text
    .split(/(\s+)/)
    .map((part) => {
      if (/^\s+$/.test(part)) return part;
      return `<span class="word-wrap"><span class="word-inner">${part}</span></span>`;
    })
    .join("");
  el.dataset._split = "words";
}

/* -------------------------------------------------------------------------
   Page reveal
   ------------------------------------------------------------------------- */

function runPageReveal() {
  const reveal = document.getElementById("pageReveal");
  if (!reveal) return Promise.resolve();

  return new Promise((resolve) => {
    if (prefersReducedMotion) {
      reveal.style.display = "none";
      resolve();
      return;
    }

    gsap.to(reveal, {
      autoAlpha: 0,
      duration: 0.6,
      delay: 0.85,
      ease: "power3.inOut",
      onComplete: () => {
        reveal.style.display = "none";
        resolve();
      },
    });
  });
}

/* -------------------------------------------------------------------------
   Header scroll state
   ------------------------------------------------------------------------- */

function setupHeader() {
  const header = document.getElementById("siteHeader");
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 24) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* -------------------------------------------------------------------------
   Mobile nav
   ------------------------------------------------------------------------- */

function setupMobileNav() {
  const trigger = document.getElementById("hamburger");
  const nav = document.getElementById("mobileNav");
  if (!trigger || !nav) return;

  const close = () => {
    nav.classList.remove("is-open");
    nav.setAttribute("aria-hidden", "true");
    trigger.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("is-locked");
  };

  const open = () => {
    nav.classList.add("is-open");
    nav.setAttribute("aria-hidden", "false");
    trigger.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
    trigger.setAttribute("aria-label", "Close menu");
    document.body.classList.add("is-locked");
  };

  trigger.addEventListener("click", () => {
    if (nav.classList.contains("is-open")) close();
    else open();
  });

  nav.querySelectorAll("a[href^='#']").forEach((a) => {
    a.addEventListener("click", () => close());
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) close();
  });
}

/* -------------------------------------------------------------------------
   Magnetic buttons
   ------------------------------------------------------------------------- */

function setupMagnetic() {
  if (isCoarsePointer || prefersReducedMotion) return;

  document.querySelectorAll("[data-magnetic]").forEach((btn) => {
    const strength = 14;

    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const dx = ((e.clientX - rect.left) / rect.width - 0.5) * strength;
      const dy = ((e.clientY - rect.top) / rect.height - 0.5) * strength;
      gsap.to(btn, {
        x: dx,
        y: dy,
        duration: 0.45,
        ease: "power3.out",
      });
    });

    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
      });
    });
  });
}

/* -------------------------------------------------------------------------
   Cursor glow
   ------------------------------------------------------------------------- */

function setupCursorGlow() {
  if (isCoarsePointer || prefersReducedMotion) return;

  const glow = document.getElementById("cursorGlow");
  if (!glow) return;

  let tx = 0,
    ty = 0,
    cx = 0,
    cy = 0;
  let active = false;

  window.addEventListener("mousemove", (e) => {
    tx = e.clientX;
    ty = e.clientY;
    if (!active) {
      active = true;
      glow.style.opacity = "1";
    }
  });

  window.addEventListener("mouseleave", () => {
    active = false;
    glow.style.opacity = "0";
  });

  function tick() {
    cx = lerp(cx, tx, 0.15);
    cy = lerp(cy, ty, 0.15);
    glow.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  }
  tick();
}

/* -------------------------------------------------------------------------
   Hero entrance
   ------------------------------------------------------------------------- */

function setupHeroEntrance() {
  document.querySelectorAll("[data-split-lines]").forEach(splitLines);
  document.querySelectorAll("[data-split-words]").forEach(splitWords);

  if (prefersReducedMotion) {
    gsap.set("[data-reveal], [data-reveal-row]", { opacity: 1, y: 0 });
    gsap.set(".line-inner, .word-inner", { y: 0 });
    return;
  }

  const eyebrow = document.querySelector(".hero__eyebrow");
  const eyebrowLine = document.querySelector(".hero__eyebrow-line");
  const title = document.querySelector(".hero__title");
  const sub = document.querySelector(".hero__sub");
  const cta = document.querySelector(".hero__cta");
  const strip = document.querySelector(".hero__strip");

  const tl = gsap.timeline({
    delay: 0.05,
    defaults: { ease: "power3.out" },
  });

  if (eyebrow) {
    tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.7 }, 0);
    if (eyebrowLine) {
      tl.from(
        eyebrowLine,
        { scaleX: 0, transformOrigin: "left center", duration: 0.7 },
        0
      );
    }
    tl.to(
      eyebrow.querySelectorAll(".word-inner"),
      { y: 0, duration: 0.8, stagger: 0.04 },
      0.05
    );
  }

  if (title) {
    tl.to(
      title.querySelectorAll(".line-inner"),
      { y: 0, duration: 1.1, stagger: 0.05, ease: "expo.out" },
      0.18
    );
  }

  if (sub) {
    tl.to(sub, { opacity: 1, y: 0, duration: 0.8 }, 0.6);
  }

  if (cta) {
    tl.to(cta, { opacity: 1, y: 0, duration: 0.8 }, 0.72);
  }

  if (strip) {
    tl.to(strip, { opacity: 1, y: 0, duration: 0.9 }, 0.85);
  }
}

/* -------------------------------------------------------------------------
   Scroll reveals (everything below the fold)
   ------------------------------------------------------------------------- */

function setupScrollReveals() {
  if (prefersReducedMotion) return;

  const heroEl = document.querySelector(".hero");
  const inHero = (el) => heroEl && heroEl.contains(el);

  // Section titles & ledes (split lines)
  document.querySelectorAll("[data-split-lines]").forEach((el) => {
    if (inHero(el)) return; // hero handles its own
    const lines = el.querySelectorAll(".line-inner");
    gsap.to(lines, {
      y: 0,
      duration: 1,
      ease: "expo.out",
      stagger: 0.05,
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
      },
    });
  });

  // Generic data-reveal (eyebrows, ledes, etc.)
  document.querySelectorAll("[data-reveal]").forEach((el) => {
    if (inHero(el)) return;
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
      },
    });
  });

  // data-reveal-row — group by parent for staggered reveal
  const groups = new Map();
  document.querySelectorAll("[data-reveal-row]").forEach((el) => {
    const parent = el.parentElement;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(el);
  });

  groups.forEach((rows, parent) => {
    gsap.to(rows, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: parent,
        start: "top 80%",
      },
    });
  });
}

/* -------------------------------------------------------------------------
   Timeline progress (fills as you scroll past "How it works")
   ------------------------------------------------------------------------- */

function setupTimelineProgress() {
  const line = document.querySelector(".timeline__line");
  const progress = document.getElementById("timelineProgress");
  const steps = document.querySelectorAll(".t-step");
  if (!line || !progress) return;

  if (prefersReducedMotion) {
    progress.style.height = "100%";
    steps.forEach((s) => s.classList.add("is-active"));
    return;
  }

  ScrollTrigger.create({
    trigger: ".timeline",
    start: "top 70%",
    end: "bottom 60%",
    onUpdate: (self) => {
      progress.style.height = (self.progress * 100).toFixed(2) + "%";
    },
  });

  steps.forEach((step) => {
    ScrollTrigger.create({
      trigger: step,
      start: "top 65%",
      end: "bottom 35%",
      onToggle: (self) => {
        step.classList.toggle("is-active", self.isActive);
      },
    });
  });
}

/* -------------------------------------------------------------------------
   Stat counters
   ------------------------------------------------------------------------- */

function setupCounters() {
  document.querySelectorAll("[data-counter]").forEach((el) => {
    const to = parseFloat(el.dataset.to || "0");
    const decimals = parseInt(el.dataset.decimals || "0", 10);

    if (prefersReducedMotion) {
      el.textContent = to.toFixed(decimals);
      return;
    }

    el.textContent = (0).toFixed(decimals);

    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: to,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = proxy.val.toFixed(decimals);
          },
        });
      },
    });
  });
}

/* -------------------------------------------------------------------------
   Hero live-ish drifting price
   ------------------------------------------------------------------------- */

function setupHeroPrice() {
  const node = document.getElementById("heroPrice");
  if (!node || prefersReducedMotion) return;

  let value = 2418.5;
  setInterval(() => {
    const delta = (Math.random() - 0.45) * 0.6;
    value = Math.max(2400, Math.min(2440, value + delta));
    node.textContent = value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }, 2400);
}

/* -------------------------------------------------------------------------
   Three.js — abstract gold torus knot, ambient hero background
   ------------------------------------------------------------------------- */

function setupHero3D() {
  const canvas = document.getElementById("heroCanvas");
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 0, 5.6);

  /* ---------- Lighting ---------- */
  scene.add(new THREE.AmbientLight(0xffffff, 0.55));

  const keyLight = new THREE.DirectionalLight(0xfff2cc, 1.7);
  keyLight.position.set(3, 4, 5);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0xb8884b, 1.4);
  rimLight.position.set(-3, -2, 1);
  scene.add(rimLight);

  const fill = new THREE.PointLight(0xffe8b5, 0.6, 14);
  fill.position.set(0, 1, 4);
  scene.add(fill);

  /* ---------- Soft canvas-based env map ---------- */
  const envCanvas = document.createElement("canvas");
  envCanvas.width = 256;
  envCanvas.height = 256;
  const ectx = envCanvas.getContext("2d");
  const grad = ectx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, "#fff5d8");
  grad.addColorStop(0.45, "#e6c98a");
  grad.addColorStop(1, "#6b4914");
  ectx.fillStyle = grad;
  ectx.fillRect(0, 0, 256, 256);
  const envTexture = new THREE.CanvasTexture(envCanvas);
  envTexture.mapping = THREE.EquirectangularReflectionMapping;
  envTexture.colorSpace = THREE.SRGBColorSpace;
  scene.environment = envTexture;

  /* ---------- Gold material ---------- */
  const goldMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xd6b170,
    metalness: 1,
    roughness: 0.22,
    clearcoat: 0.5,
    clearcoatRoughness: 0.28,
    reflectivity: 0.85,
    sheen: 0.5,
    sheenColor: new THREE.Color(0xffe1a3),
  });

  /* ---------- Torus knot — abstract gold form ---------- */
  const knotGeo = new THREE.TorusKnotGeometry(1.05, 0.32, 240, 36, 2, 3);
  const knot = new THREE.Mesh(knotGeo, goldMaterial);
  scene.add(knot);

  /* ---------- Floating particle haze ---------- */
  const particleCount = 70;
  const positions = new Float32Array(particleCount * 3);
  const seeds = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    const r = 1.7 + Math.random() * 2.4;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
    positions[i * 3 + 2] = r * Math.cos(phi) * 0.5;
    seeds[i] = Math.random() * Math.PI * 2;
  }

  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );
  particleGeo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

  const particleMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uColor: { value: new THREE.Color(0xb8884b) },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: /* glsl */ `
      attribute float aSeed;
      uniform float uTime;
      uniform float uPixelRatio;
      varying float vAlpha;

      void main() {
        vec3 p = position;
        float s = aSeed;
        p.y += sin(uTime * 0.4 + s) * 0.18;
        p.x += cos(uTime * 0.3 + s * 1.3) * 0.12;
        p.z += sin(uTime * 0.25 + s * 0.7) * 0.12;

        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;

        float size = mix(2.0, 6.0, fract(s));
        gl_PointSize = size * uPixelRatio * (1.0 / -mv.z);

        vAlpha = mix(0.18, 0.7, fract(s * 1.7));
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      varying float vAlpha;
      void main() {
        vec2 uv = gl_PointCoord - vec2(0.5);
        float d = length(uv);
        float a = smoothstep(0.5, 0.0, d) * vAlpha;
        gl_FragColor = vec4(uColor, a);
      }
    `,
  });

  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  /* ---------- Pointer parallax (window-wide for ambient feel) ---------- */
  let pointerX = 0,
    pointerY = 0,
    targetX = 0,
    targetY = 0;

  if (!isCoarsePointer) {
    window.addEventListener("mousemove", (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 0.6;
      targetY = (e.clientY / window.innerHeight - 0.5) * 0.5;
    });
  }

  /* ---------- Resize ---------- */
  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(1, rect.width);
    const h = Math.max(1, rect.height);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };

  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  window.addEventListener("orientationchange", resize);

  /* ---------- Animation loop with visibility pause ---------- */
  const clock = new THREE.Clock();
  let running = true;

  const io = new IntersectionObserver(
    ([entry]) => {
      running = entry.isIntersecting;
    },
    { threshold: 0.05 }
  );
  io.observe(canvas);

  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
  });

  function animate() {
    requestAnimationFrame(animate);
    if (!running) return;

    const t = clock.getElapsedTime();
    particleMat.uniforms.uTime.value = t;

    pointerX = lerp(pointerX, targetX, 0.04);
    pointerY = lerp(pointerY, targetY, 0.04);

    knot.rotation.y = t * 0.18 + pointerX * 0.4;
    knot.rotation.x = Math.sin(t * 0.22) * 0.18 + pointerY * 0.3;
    knot.position.y = Math.sin(t * 0.5) * 0.04;

    particles.rotation.y = t * 0.05 + pointerX * 0.25;
    particles.rotation.x = pointerY * 0.18;

    renderer.render(scene, camera);
  }

  /* ---------- Entrance — scale + spin in ---------- */
  if (!prefersReducedMotion) {
    knot.scale.setScalar(0.001);
    knot.rotation.y = -1.6;
    gsap.to(knot.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 1.8,
      delay: 0.9,
      ease: "expo.out",
    });
  }

  animate();
}

/* -------------------------------------------------------------------------
   Boot
   ------------------------------------------------------------------------- */

window.addEventListener("DOMContentLoaded", async () => {
  setupHeader();
  setupMobileNav();
  setupMagnetic();
  setupCursorGlow();
  setupHero3D();
  setupHeroPrice();

  await runPageReveal();
  setupHeroEntrance();
  setupScrollReveals();
  setupTimelineProgress();
  setupCounters();

  // Final settle — ensure ScrollTrigger picks up final layout
  ScrollTrigger.refresh();
});
