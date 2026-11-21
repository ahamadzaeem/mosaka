'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 240;

export default function Hero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let isDestroyed = false;
    let currentFrame = 0;
    let isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

    const desktopImages = new Array(TOTAL_FRAMES);
    const mobileImages = new Array(TOTAL_FRAMES);

    const getActiveImages = () => (isMobile ? mobileImages : desktopImages);

    const getFrameUrl = (index, mobile) => {
      const num = String(index + 1).padStart(3, '0');
      const folder = mobile ? 'frames_mobile' : 'frames';
      return `/${folder}/frame_${num}.jpg`;
    };

    // Helper to draw an image covering the canvas (object-cover)
    const drawCover = (img) => {
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      const scale = Math.max(cw / iw, ch / ih);
      const nw = iw * scale;
      const nh = ih * scale;
      const nx = (cw - nw) / 2;
      const ny = (ch - nh) / 2;

      ctx.drawImage(img, nx, ny, nw, nh);
    };

    // Render a specific frame, falling back to nearest loaded frame
    const renderFrame = (index) => {
      currentFrame = Math.min(TOTAL_FRAMES - 1, Math.max(0, index));
      const activeImgs = getActiveImages();
      let img = activeImgs[currentFrame];

      // If requested frame isn't loaded yet, find nearest loaded frame
      if (!img || !img.complete) {
        for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
          const prev = currentFrame - offset;
          const next = currentFrame + offset;
          if (prev >= 0 && activeImgs[prev] && activeImgs[prev].complete) {
            img = activeImgs[prev];
            break;
          }
          if (next < TOTAL_FRAMES && activeImgs[next] && activeImgs[next].complete) {
            img = activeImgs[next];
            break;
          }
        }
      }

      if (img && img.complete) {
        drawCover(img);
      }
    };

    const preloadedModes = { desktop: false, mobile: false };
    const preloadFrames = (mobile) => {
      const modeKey = mobile ? 'mobile' : 'desktop';
      if (preloadedModes[modeKey]) return;
      preloadedModes[modeKey] = true;

      const targetImgs = mobile ? mobileImages : desktopImages;

      // 1. First image immediately for zero-delay initial render
      if (!targetImgs[0]) {
        const first = new Image();
        first.src = getFrameUrl(0, mobile);
        targetImgs[0] = first;
        first.onload = () => {
          if (!isDestroyed && currentFrame === 0 && isMobile === mobile) {
            drawCover(first);
          }
        };
      }

      // 2. Preload remaining frames
      for (let i = 1; i < TOTAL_FRAMES; i++) {
        if (!targetImgs[i]) {
          const img = new Image();
          img.src = getFrameUrl(i, mobile);
          targetImgs[i] = img;
          img.onload = () => {
            if (!isDestroyed && currentFrame === i && isMobile === mobile) {
              drawCover(img);
            }
          };
        }
      }
    };

    // Responsive Canvas Sizing with Retina/HiDPI support
    const resizeCanvas = () => {
      if (!canvas) return;
      const nowMobile = window.innerWidth < 768;
      if (nowMobile !== isMobile) {
        isMobile = nowMobile;
        preloadFrames(isMobile);
      }
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      renderFrame(currentFrame);
    };

    // Initial resize & frame loading
    resizeCanvas();
    preloadFrames(isMobile);
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // 3. ScrollTrigger setup: 100% buttery smooth 60-120fps scrubbing
    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=250%',
      pin: true,
      scrub: 0.1,
      anticipatePin: 1,
      onUpdate: (self) => {
        const targetFrame = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.floor(self.progress * TOTAL_FRAMES))
        );
        renderFrame(targetFrame);
      },
    });

    return () => {
      isDestroyed = true;
      window.removeEventListener('resize', resizeCanvas);
      if (st) st.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-white pt-2 px-2 sm:pt-2.5 sm:px-2.5"
    >
      {/* Framed Canvas Container with Rounded Top Corners */}
      <div className="relative w-full h-full overflow-hidden rounded-t-2xl sm:rounded-t-[24px] bg-[#0a0a09]">
        {/* 100% Ultra-Smooth Hardware-Accelerated Canvas Scrubbing - Zero Lag */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block object-cover pointer-events-none"
        />

        {/* Subtle luxury scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center opacity-40 hover:opacity-100 transition-opacity">
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/70 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}
