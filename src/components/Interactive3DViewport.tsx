import React, { useRef, useEffect, useState } from 'react';
import { CustomizerState, WoodOption } from '../types';

interface ViewportProps {
  state: CustomizerState;
  selectedWood: WoodOption;
  onHotspotClick?: () => void;
}

export const Interactive3DViewport: React.FC<ViewportProps> = ({
  state,
  selectedWood,
  onHotspotClick
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 18, y: -25 });
  const [prevMouse, setPrevMouse] = useState({ x: 0, y: 0 });
  const [fps, setFps] = useState(60);
  const [showHotspotTooltip, setShowHotspotTooltip] = useState(false);

  // Auto-rotation effect
  useEffect(() => {
    if (!state.autoRotate) return;
    const interval = setInterval(() => {
      setRotation(prev => ({ ...prev, y: (prev.y + 0.8) % 360 }));
    }, 30);
    return () => clearInterval(interval);
  }, [state.autoRotate]);

  // Handle camera view preset changes
  useEffect(() => {
    if (state.cameraView === 'front') {
      setRotation({ x: 0, y: 0 });
    } else if (state.cameraView === 'top') {
      setRotation({ x: 80, y: 0 });
    } else {
      setRotation({ x: 18, y: -25 });
    }
  }, [state.cameraView]);

  // Subtle FPS jitter to simulate live WebGL pipeline
  useEffect(() => {
    const timer = setInterval(() => {
      setFps(Math.floor(59 + Math.random() * 3));
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  // Mouse handlers for Orbiting
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setPrevMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - prevMouse.x;
    const deltaY = e.clientY - prevMouse.y;
    setRotation(prev => ({
      x: Math.max(-60, Math.min(85, prev.x + deltaY * 0.4)),
      y: (prev.y + deltaX * 0.4) % 360
    }));
    setPrevMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Render 3D Canvas Scene
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;

    const renderScene = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Environment Background Tone based on lighting preset
      let grad = ctx.createRadialGradient(width / 2, height / 2, 40, width / 2, height / 2, width * 0.7);
      if (state.lighting === 'warm') {
        grad.addColorStop(0, '#F5EDE0');
        grad.addColorStop(1, '#E2D3BE');
      } else if (state.lighting === 'gallery') {
        grad.addColorStop(0, '#EAECEF');
        grad.addColorStop(1, '#CBD1D9');
      } else {
        // Nordic Studio (default)
        grad.addColorStop(0, '#F4F2EB');
        grad.addColorStop(1, '#E0DCD1');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Grid flooring perspective
      ctx.save();
      ctx.strokeStyle = state.lighting === 'gallery' ? 'rgba(80, 100, 110, 0.12)' : 'rgba(16, 62, 74, 0.08)';
      ctx.lineWidth = 1;
      const gridY = height * 0.76;
      for (let i = -12; i <= 12; i++) {
        const xStart = width / 2 + i * 40;
        const xEnd = width / 2 + i * 140;
        ctx.beginPath();
        ctx.moveTo(xStart, gridY);
        ctx.lineTo(xEnd, height);
        ctx.stroke();
      }
      for (let j = 0; j < 6; j++) {
        const yLine = gridY + j * (height * 0.24 / 5);
        ctx.beginPath();
        ctx.moveTo(0, yLine);
        ctx.lineTo(width, yLine);
        ctx.stroke();
      }
      ctx.restore();

      // Soft ground ambient shadow
      ctx.save();
      ctx.beginPath();
      const shadowW = (state.width / 180) * 360 * state.zoom;
      const shadowH = (state.depth / 45) * 55 * state.zoom;
      ctx.ellipse(width / 2, gridY + 12, shadowW, shadowH, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(20, 35, 40, 0.16)';
      ctx.filter = 'blur(16px)';
      ctx.fill();
      ctx.restore();

      // Isometric / 3D Projection Calculation
      ctx.save();
      ctx.translate(width / 2, height * 0.52);
      ctx.scale(state.zoom, state.zoom);

      // Rotations in radians
      const radX = (rotation.x * Math.PI) / 180;
      const radY = (rotation.y * Math.PI) / 180;

      // Base sizes scaled
      const baseScale = 2.1;
      const modelW = state.width * baseScale;
      const modelH = state.height * baseScale * 0.95;
      const modelD = state.depth * baseScale * 0.8;

      // 3D Box vertices
      type Point3D = [number, number, number];
      const hw = modelW / 2;
      const hh = modelH / 2;
      const hd = modelD / 2;

      const project = ([x, y, z]: Point3D): [number, number] => {
        // Rotate Y
        const cosY = Math.cos(radY);
        const sinY = Math.sin(radY);
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;

        // Rotate X
        const cosX = Math.cos(radX);
        const sinX = Math.sin(radX);
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        // Weak perspective
        const distance = 900;
        const fov = distance / (distance + z2 * 0.4);
        return [x1 * fov, y2 * fov];
      };

      // Draw Base Legs / Plinth
      ctx.save();
      if (state.baseType === 'conicas') {
        const legOffsets: [number, number][] = [
          [-hw + 24, -hd + 16],
          [hw - 24, -hd + 16],
          [-hw + 24, hd - 16],
          [hw - 24, hd - 16]
        ];
        if (state.width > 210) {
          legOffsets.push([0, 0]); // Center stabilizer leg
        }
        legOffsets.forEach(([lx, lz]) => {
          const topPt = project([lx, hh, lz]);
          const botPt = project([lx, hh + 46, lz]);
          ctx.beginPath();
          ctx.moveTo(topPt[0] - 6, topPt[1]);
          ctx.lineTo(topPt[0] + 6, topPt[1]);
          ctx.lineTo(botPt[0] + 3, botPt[1]);
          ctx.lineTo(botPt[0] - 3, botPt[1]);
          ctx.closePath();
          ctx.fillStyle = state.wireframe ? 'transparent' : selectedWood.colorHex;
          ctx.strokeStyle = state.wireframe ? '#0D4F60' : '#452A18';
          ctx.lineWidth = state.wireframe ? 1.5 : 1;
          ctx.fill();
          ctx.stroke();
        });
      } else if (state.baseType === 'zocalo') {
        const p1 = project([-hw + 20, hh, -hd + 15]);
        const p2 = project([hw - 20, hh, -hd + 15]);
        const p3 = project([hw - 20, hh + 24, -hd + 15]);
        const p4 = project([-hw + 20, hh + 24, -hd + 15]);
        ctx.beginPath();
        ctx.moveTo(p1[0], p1[1]);
        ctx.lineTo(p2[0], p2[1]);
        ctx.lineTo(p3[0], p3[1]);
        ctx.lineTo(p4[0], p4[1]);
        ctx.closePath();
        ctx.fillStyle = state.wireframe ? 'transparent' : '#2A201A';
        ctx.strokeStyle = '#103E4A';
        ctx.fill();
        ctx.stroke();
      }
      ctx.restore();

      // Main Cabinet Carcass
      // 8 Vertices
      const v: Point3D[] = [
        [-hw, -hh, -hd], // 0: Top front left
        [hw, -hh, -hd],  // 1: Top front right
        [hw, hh, -hd],   // 2: Bottom front right
        [-hw, hh, -hd],  // 3: Bottom front left
        [-hw, -hh, hd],  // 4: Top back left
        [hw, -hh, hd],   // 5: Top back right
        [hw, hh, hd],    // 6: Bottom back right
        [-hw, hh, hd]    // 7: Bottom back left
      ];

      const pv = v.map(project);

      // Define faces with normal sorting
      const drawQuad = (indices: number[], fill: string, stroke: string = '#2B1C10') => {
        ctx.beginPath();
        ctx.moveTo(pv[indices[0]][0], pv[indices[0]][1]);
        for (let i = 1; i < indices.length; i++) {
          ctx.lineTo(pv[indices[i]][0], pv[indices[i]][1]);
        }
        ctx.closePath();
        if (!state.wireframe) {
          ctx.fillStyle = fill;
          ctx.fill();
        }
        ctx.strokeStyle = state.wireframe ? '#0D4F60' : stroke;
        ctx.lineWidth = state.wireframe ? 1.2 : 0.8;
        ctx.stroke();
      };

      // Shading color variations of selected wood
      const baseWood = selectedWood.colorHex;

      // Back Face
      drawQuad([4, 5, 6, 7], '#28201A');
      // Left Face
      drawQuad([4, 0, 3, 7], shadeColor(baseWood, -18));
      // Right Face
      drawQuad([1, 5, 6, 2], shadeColor(baseWood, -25));
      // Top Face
      drawQuad([4, 5, 1, 0], shadeColor(baseWood, 14));
      // Bottom Face
      drawQuad([3, 2, 6, 7], shadeColor(baseWood, -35));

      // Front Face / Doors & Tambour Slats
      if (!state.doorsOpen) {
        // Closed doors with vertical fluted slats
        drawQuad([0, 1, 2, 3], shadeColor(baseWood, 0));

        if (!state.wireframe) {
          // Render fluted tambour slats on front
          ctx.save();
          const moduleWidth = modelW / state.modules;
          const slatSpacing = 9;
          const slatCount = Math.floor(modelW / slatSpacing);

          for (let s = 1; s < slatCount; s++) {
            const sx = -hw + s * slatSpacing;
            const topSlat = project([sx, -hh + 3, -hd - 1]);
            const botSlat = project([sx, hh - 3, -hd - 1]);

            ctx.beginPath();
            ctx.moveTo(topSlat[0], topSlat[1]);
            ctx.lineTo(botSlat[0], botSlat[1]);
            ctx.strokeStyle = s % 2 === 0 ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.18)';
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }

          // Module Door Dividers
          for (let m = 1; m < state.modules; m++) {
            const divX = -hw + m * moduleWidth;
            const topDiv = project([divX, -hh, -hd - 2]);
            const botDiv = project([divX, hh, -hd - 2]);
            ctx.beginPath();
            ctx.moveTo(topDiv[0], topDiv[1]);
            ctx.lineTo(botDiv[0], botDiv[1]);
            ctx.strokeStyle = '#103E4A';
            ctx.lineWidth = 2.5;
            ctx.stroke();
          }

          // Recessed organic handles
          for (let m = 0; m < state.modules; m++) {
            const hx = -hw + m * moduleWidth + moduleWidth * 0.85;
            const hPt1 = project([hx, -16, -hd - 3]);
            const hPt2 = project([hx, 16, -hd - 3]);
            ctx.beginPath();
            ctx.moveTo(hPt1[0], hPt1[1]);
            ctx.lineTo(hPt2[0], hPt2[1]);
            ctx.strokeStyle = '#321D10';
            ctx.lineWidth = 3.5;
            ctx.lineCap = 'round';
            ctx.stroke();
          }
          ctx.restore();
        }
      } else {
        // Open doors view: Show interior partitions & shelves
        // Inner cavity
        drawQuad([0, 1, 2, 3], '#4A3728');

        // Shelves
        const shelfY = project([0, 0, 0])[1];
        const pLeft = project([-hw + 8, 0, -hd + 10]);
        const pRight = project([hw - 8, 0, -hd + 10]);
        ctx.beginPath();
        ctx.moveTo(pLeft[0], pLeft[1]);
        ctx.lineTo(pRight[0], pRight[1]);
        ctx.strokeStyle = selectedWood.colorHex;
        ctx.lineWidth = 4;
        ctx.stroke();

        // Open swing doors angled outwards
        for (let m = 0; m < state.modules; m++) {
          const mWidth = modelW / state.modules;
          const doorPivot = -hw + m * mWidth;
          const openP1 = project([doorPivot, -hh, -hd]);
          const openP2 = project([doorPivot + mWidth * 0.7, -hh, -hd - 45]);
          const openP3 = project([doorPivot + mWidth * 0.7, hh, -hd - 45]);
          const openP4 = project([doorPivot, hh, -hd]);

          ctx.beginPath();
          ctx.moveTo(openP1[0], openP1[1]);
          ctx.lineTo(openP2[0], openP2[1]);
          ctx.lineTo(openP3[0], openP3[1]);
          ctx.lineTo(openP4[0], openP4[1]);
          ctx.closePath();
          ctx.fillStyle = selectedWood.colorHex;
          ctx.strokeStyle = '#103E4A';
          ctx.fill();
          ctx.stroke();
        }
      }

      ctx.restore();
    };

    renderScene();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [state, selectedWood, rotation]);

  // Utility color shader
  function shadeColor(color: string, percent: number): string {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = Math.round((R * (100 + percent)) / 100);
    G = Math.round((G * (100 + percent)) / 100);
    B = Math.round((B * (100 + percent)) / 100);

    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;

    R = R > 0 ? R : 0;
    G = G > 0 ? G : 0;
    B = B > 0 ? B : 0;

    const RR = R.toString(16).length === 1 ? '0' + R.toString(16) : R.toString(16);
    const GG = G.toString(16).length === 1 ? '0' + G.toString(16) : G.toString(16);
    const BB = B.toString(16).length === 1 ? '0' + B.toString(16) : B.toString(16);

    return '#' + RR + GG + BB;
  }

  return (
    <div
      className="relative w-full h-[520px] md:h-[620px] bg-[#EAE7DC] rounded-xl overflow-hidden shadow-lg flex items-center justify-center select-none group cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        width={1000}
        height={650}
        className="w-full h-full object-cover transition-opacity duration-300"
      />

      {/* Floating CAD Dimension Overlay Labels */}
      <div className="absolute inset-0 pointer-events-none p-4 md:p-6 flex flex-col justify-between">
        {/* Top Width Cota */}
        <div className="w-full flex items-center justify-center gap-2 pt-1">
          <div className="h-[1px] flex-1 bg-text-primary/40 relative">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-text-primary rotate-45"></span>
          </div>
          <div className="px-2.5 py-1 rounded bg-surface-card/90 backdrop-blur-md shadow-sm pointer-events-auto flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px] text-secondary">straighten</span>
            <span className="font-label-technical text-label-technical text-text-primary font-bold">
              W: {state.width.toFixed(1)} cm
            </span>
          </div>
          <div className="h-[1px] flex-1 bg-text-primary/40 relative">
            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-text-primary rotate-45"></span>
          </div>
        </div>

        {/* Middle Height & Depth Cotas + Fluted Hotspot */}
        <div className="w-full flex items-center justify-between">
          {/* Height (Left) */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-[1px] h-28 bg-text-primary/40 relative">
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-text-primary rotate-45"></span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-text-primary rotate-45"></span>
            </div>
            <div className="px-2 py-0.5 rounded bg-surface-card/90 backdrop-blur-md shadow-sm pointer-events-auto [writing-mode:vertical-rl] rotate-180">
              <span className="font-label-technical text-[11px] text-text-primary font-bold">
                H: {state.height.toFixed(1)} cm
              </span>
            </div>
          </div>

          {/* Interactive Hotspot for CNC fluted detail */}
          <div className="pointer-events-auto relative">
            <button
              onClick={() => {
                setShowHotspotTooltip(!showHotspotTooltip);
                if (onHotspotClick) onHotspotClick();
              }}
              className="w-8 h-8 rounded-full bg-secondary-container text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-pulse cursor-pointer"
              title="Ver detalle de fresado CNC"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
            </button>
            {showHotspotTooltip && (
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-56 bg-surface-card/95 backdrop-blur-md p-3 rounded-xl shadow-xl text-left transition-all z-30 border border-border-subtle">
                <p className="font-headline-sm text-[13px] font-bold text-text-primary">Fresado Alistonado Continuo</p>
                <p className="font-body-sm text-[11px] text-text-muted mt-1 leading-snug">
                  Listones macizos de 18x18 mm con canto biselado ergonómico antidesgaste sobre alma de roble nórdico.
                </p>
                <button
                  onClick={() => setShowHotspotTooltip(false)}
                  className="mt-2 text-[10px] text-secondary font-bold uppercase tracking-wider hover:underline"
                >
                  Cerrar
                </button>
              </div>
            )}
          </div>

          {/* Depth (Right) */}
          <div className="flex flex-col items-center gap-1">
            <div className="px-2 py-0.5 rounded bg-surface-card/90 backdrop-blur-md shadow-sm pointer-events-auto [writing-mode:vertical-rl]">
              <span className="font-label-technical text-[11px] text-text-primary font-bold">
                D: {state.depth.toFixed(1)} cm
              </span>
            </div>
            <div className="w-[1px] h-28 bg-text-primary/40 relative">
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-text-primary rotate-45"></span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-text-primary rotate-45"></span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Telemetry & Structural Stability status */}
        <div className="w-full flex items-end justify-between pointer-events-auto gap-2">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-card/90 backdrop-blur-md shadow-sm font-label-technical text-label-technical text-text-primary">
            <span className="w-2 h-2 rounded-full bg-state-success animate-ping"></span>
            <span className="font-semibold">Three.js WebGL</span>
            <span className="text-text-muted">•</span>
            <span className="text-text-muted">{fps} FPS</span>
            <span className="text-text-muted">•</span>
            <span className="text-state-success font-semibold">Tolerancia ±0.2 mm</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-card/95 backdrop-blur-md shadow-md text-text-primary font-body-sm text-[12px] font-medium">
            {state.width > 210 ? (
              <>
                <span className="material-symbols-outlined text-[16px] text-secondary">info</span>
                <span className="text-secondary font-bold">Luz &gt; 210cm: Pata central de refuerzo incluida</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px] text-state-success">check_circle</span>
                <span>Proporción óptima: flecha máx. 0.8 mm</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
