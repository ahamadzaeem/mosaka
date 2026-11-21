'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const curtainRef = useRef(null);

  // Exact 5-Second Luxury Preload Sequence (5000ms)
  useEffect(() => {
    const totalDuration = 5000; // 5 full seconds
    const startTime = performance.now();
    let animId;

    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const pct = Math.min(100, Math.floor((elapsed / totalDuration) * 100));
      setProgress(pct);

      if (elapsed < totalDuration) {
        animId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setIsLoaded(true);
      }
    };

    animId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Cinematic Exit Transition
  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    const tl = gsap.timeline({
      delay: 0.3,
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    // Content smoothly dissolves and scales slightly
    tl.to(contentRef.current, {
      opacity: 0,
      scale: 0.95,
      y: -24,
      duration: 0.7,
      ease: 'power2.in',
    });

    // Elegant architectural curtain sweeps upward
    tl.to(
      curtainRef.current,
      {
        yPercent: -100,
        duration: 1.15,
        ease: 'power4.inOut',
      },
      '-=0.25'
    );

    // Fade out main container completely
    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.2,
      },
      '-=0.2'
    );
  }, [isLoaded, onComplete]);

  // Dynamic Atelier Loading Status over 5 seconds
  const getStatusText = () => {
    if (progress < 30) return 'Preloading Atelier Frames';
    if (progress < 65) return 'Buffering 240fps Sculptural Film';
    if (progress < 95) return 'Calibrating Spatial Perspective';
    return 'Entering MOSAKA Space';
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] pointer-events-auto overflow-hidden"
    >
      {/* Background Architectural Curtain */}
      <div
        ref={curtainRef}
        className="absolute inset-0 bg-[#0a0a09] flex items-center justify-center"
      >
        {/* Soft Ambient Radial Gold Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_48%,rgba(200,169,110,0.12),transparent_75%)] pointer-events-none" />

        {/* Subtle Luxury Dot Grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        {/* Center Content Box */}
        <div
          ref={contentRef}
          className="relative z-10 flex flex-col items-center px-6 text-center max-w-lg mx-auto"
        >
          {/* ============================================================== */}
          {/* PRECISE 3D ARCHITECTURAL ENSEMBLE: BASIN & GOOSENECK TAP       */}
          {/* ============================================================== */}
          <div className="relative mb-6 drop-shadow-[0_8px_24px_rgba(200,169,110,0.3)]">
            <svg
              width="170"
              height="100"
              viewBox="0 0 170 100"
              fill="none"
              className="overflow-visible"
            >
              <defs>
                {/* Brushed Brass 3D Cylindrical Shader */}
                <linearGradient id="tap-body-shader" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7E6030" />
                  <stop offset="25%" stopColor="#D4B47D" />
                  <stop offset="50%" stopColor="#FFF4DC" />
                  <stop offset="75%" stopColor="#C8A96E" />
                  <stop offset="100%" stopColor="#5E441D" />
                </linearGradient>

                {/* Stepped Base Horizontal Radial Gradient */}
                <linearGradient id="tap-base-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF4DC" />
                  <stop offset="45%" stopColor="#C8A96E" />
                  <stop offset="100%" stopColor="#5E441D" />
                </linearGradient>

                {/* Sculpted Vessel Basin Outer Torus Shader */}
                <linearGradient id="basin-outer-shader" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4A3F33" />
                  <stop offset="30%" stopColor="#302820" />
                  <stop offset="70%" stopColor="#1C1713" />
                  <stop offset="100%" stopColor="#0B0907" />
                </linearGradient>

                {/* Basin Lip Metallic Bevel Highlight */}
                <linearGradient id="basin-rim-shader" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9C7844" />
                  <stop offset="20%" stopColor="#E5C583" />
                  <stop offset="50%" stopColor="#FFF8E7" />
                  <stop offset="80%" stopColor="#C8A96E" />
                  <stop offset="100%" stopColor="#6E5025" />
                </linearGradient>

                {/* Basin Inner Cavity Ambient Occlusion */}
                <radialGradient id="basin-inner-cavity" cx="50%" cy="40%" r="55%">
                  <stop offset="0%" stopColor="#1F1A15" />
                  <stop offset="60%" stopColor="#14110E" />
                  <stop offset="100%" stopColor="#0A0807" />
                </radialGradient>

                {/* Water Surface Depth */}
                <linearGradient id="water-glow" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255, 248, 231, 0.45)" />
                  <stop offset="100%" stopColor="rgba(200, 169, 110, 0.08)" />
                </linearGradient>

                {/* Soft Drop Shadow Filter */}
                <filter id="basin-shadow-filter" x="-20%" y="-20%" width="140%" height="160%">
                  <feGaussianBlur stdDeviation="3.5" />
                </filter>
              </defs>

              {/* ------------------------------------------------------------- */}
              {/* 1. DROP SHADOWS                                               */}
              {/* ------------------------------------------------------------- */}
              <ellipse
                cx="108"
                cy="84"
                rx="44"
                ry="8"
                fill="#000000"
                opacity="0.65"
                filter="url(#basin-shadow-filter)"
              />
              <ellipse
                cx="38"
                cy="82"
                rx="14"
                ry="4"
                fill="#000000"
                opacity="0.5"
                filter="url(#basin-shadow-filter)"
              />

              {/* ------------------------------------------------------------- */}
              {/* 2. THE SCULPTED 3D VESSEL BASIN                               */}
              {/* ------------------------------------------------------------- */}
              {/* Outer Curving Vessel Body */}
              <path
                d="M 64,55 C 66,77 82,85 108,85 C 134,85 150,77 152,55 Z"
                fill="url(#basin-outer-shader)"
                stroke="#42372C"
                strokeWidth="1.2"
              />

              {/* Outer Torus Rim Bevel */}
              <ellipse
                cx="108"
                cy="55"
                rx="44"
                ry="12"
                fill="#26201A"
                stroke="url(#basin-rim-shader)"
                strokeWidth="2.2"
              />

              {/* Inner Bowl Concavity */}
              <ellipse
                cx="108"
                cy="56"
                rx="38"
                ry="9.5"
                fill="url(#basin-inner-cavity)"
                stroke="#1B1612"
                strokeWidth="1"
              />

              {/* Water Surface Plane inside bowl */}
              <ellipse
                cx="108"
                cy="58"
                rx="29"
                ry="6.5"
                fill="url(#water-glow)"
              />

              {/* Animated Concentric Water Ripple Rings */}
              <ellipse
                cx="96"
                cy="58.5"
                rx="12"
                ry="3"
                stroke="#FFF4DC"
                strokeWidth="0.75"
                opacity="0.65"
                className="animate-ping origin-center"
              />
              <ellipse
                cx="96"
                cy="58.5"
                rx="6"
                ry="1.8"
                stroke="#C8A96E"
                strokeWidth="0.8"
                opacity="0.8"
              />

              {/* Brass Pop-Up Waste in center of basin */}
              <ellipse
                cx="108"
                cy="60"
                rx="4"
                ry="1.4"
                fill="url(#tap-base-grad)"
                stroke="#8A672E"
                strokeWidth="0.5"
              />

              {/* ------------------------------------------------------------- */}
              {/* 3. ARCHITECTURAL GOOSENECK BRASS BASIN MIXER                  */}
              {/* ------------------------------------------------------------- */}
              {/* Base Flange Cylinder */}
              <ellipse cx="38" cy="80" rx="9" ry="2.8" fill="url(#tap-base-grad)" />
              <rect x="29" y="75" width="18" height="5" fill="url(#tap-body-shader)" rx="0.5" />
              <ellipse cx="38" cy="75" rx="9" ry="2.8" fill="url(#tap-base-grad)" />

              {/* Mixer Handle Pin Lever */}
              <line
                x1="38"
                y1="67"
                x2="24"
                y2="59"
                stroke="url(#tap-body-shader)"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <circle
                cx="24"
                cy="59"
                r="2"
                fill="url(#tap-base-grad)"
              />

              {/* Elegant Curved Gooseneck Spout (Outer Silhouette) */}
              <path
                d="M 38,75 L 38,36 C 38,15 54,12 68,12 C 82,12 88,18 88,32 L 88,43"
                stroke="url(#tap-body-shader)"
                strokeWidth="5.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Inner Specular Highlight Reflection Filament */}
              <path
                d="M 37,75 L 37,36 C 37,16 53,13.5 68,13.5 C 81,13.5 86.5,19 86.5,32 L 86.5,43"
                stroke="#FFFDF7"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
                opacity="0.85"
              />

              {/* Flanged Aerator Nozzle */}
              <rect
                x="85.5"
                y="43"
                width="5"
                height="3.5"
                rx="0.8"
                fill="url(#tap-base-grad)"
              />

              {/* Crystal Laminar Water Stream Pouring Directly into Basin */}
              <path
                d="M 88,46.5 C 88,52 92,56 96,58.5"
                stroke="url(#tap-rim-shader, #FFF4DC)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="4 2"
                fill="none"
                className="animate-pulse"
                opacity="0.9"
              />
            </svg>
          </div>

          {/* ============================================================== */}
          {/* OFFICIAL MOSAKA LOGO                                           */}
          {/* ============================================================== */}
          <div className="mb-4 relative">
            <img
              src="/images/mosaka_logo_white.png"
              alt="MOSAKA BATHWARE"
              className="h-9 sm:h-11 w-auto object-contain mx-auto drop-shadow-[0_0_20px_rgba(200,169,110,0.35)]"
            />
          </div>

          {/* Atelier Tagline */}
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.42em] text-stone-400 font-light mb-8">
            Where Elements Become Art
          </p>

          {/* ============================================================== */}
          {/* 5-SECOND PROGRESS BAR & COUNTER                               */}
          {/* ============================================================== */}
          <div className="w-56 sm:w-64 max-w-full flex flex-col items-center">
            {/* Progress Track */}
            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative mb-3">
              <div
                className="h-full bg-gradient-to-r from-gold-500 via-[#FFF5DC] to-gold-400 transition-all duration-75 ease-out shadow-[0_0_12px_rgba(200,169,110,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Status & Percentage Counter */}
            <div className="flex justify-between items-center w-full text-[10px] tracking-[0.2em] text-stone-400 font-mono">
              <span className="uppercase text-[9px] text-stone-400 truncate max-w-[180px]">
                {getStatusText()}
              </span>
              <span className="text-gold-300 font-medium ml-2">
                {String(progress).padStart(2, '0')}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
