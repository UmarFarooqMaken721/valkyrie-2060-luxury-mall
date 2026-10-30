import React, { useEffect, useRef, useState } from 'react';
import type { Product3DMesh } from '../types';
import { cyberAudio } from '../utils/cyberAudio';
import { Rotate3d } from 'lucide-react';

interface Props {
  meshData: Product3DMesh;
  productName?: string;
  category?: 'shoes' | 'clothes' | 'jackets';
  hologramColor?: string;
  interactive?: boolean;
}

export const HoloProduct3DCanvas: React.FC<Props> = ({
  meshData,
  interactive = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotationX, setRotationX] = useState(0.2);
  const [rotationY, setRotationY] = useState(0.4);
  const [autoRotate, setAutoRotate] = useState(true);
  const [studioMode, setStudioMode] = useState<'atelier' | 'blueprint'>('atelier');

  const lastMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const points: [number, number, number][] = meshData.wireframePoints;
  const edges: [number, number][] = meshData.wireframeEdges;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let localRotY = rotationY;
    let localRotX = rotationX;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      if (autoRotate && !isDragging) {
        localRotY += 0.008;
      }

      const cx = width / 2;
      const cy = height / 2 + 10;
      const scale = Math.min(width, height) * 0.35;

      const cosY = Math.cos(localRotY);
      const sinY = Math.sin(localRotY);
      const cosX = Math.cos(localRotX);
      const sinX = Math.sin(localRotX);

      const projected = points.map(([x, y, z]) => {
        let rx = x * cosY - z * sinY;
        let rz = x * sinY + z * cosY;
        let ry = y * cosX - rz * sinX;
        let rz2 = y * sinX + rz * cosX;

        const distance = 4.4;
        const fov = 380;
        const pz = rz2 + distance;
        const px = cx + (rx / pz) * fov;
        const py = cy - (ry / pz) * fov;

        return { px, py, pz, rx, ry, rz: rz2 };
      });

      // 1. Studio Pedestal (Polished Smoked Obsidian with Fine Champagne Rim)
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(cx, cy + scale * 0.9, scale * 0.65, scale * 0.16, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      ctx.ellipse(cx, cy + scale * 0.9, scale * 0.8, scale * 0.2, 0, 0, Math.PI * 2);
      ctx.stroke();

      // 2. Architectural Mesh Edges
      edges.forEach(([i1, i2]) => {
        const p1 = projected[i1];
        const p2 = projected[i2];
        if (!p1 || !p2) return;

        const avgZ = (p1.pz + p2.pz) / 2;
        const alpha = Math.max(0.15, Math.min(0.85, 1.3 - (avgZ - 2.5) * 0.3));

        if (studioMode === 'atelier') {
          ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
          ctx.lineWidth = 1.5;
        } else {
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
          ctx.lineWidth = 1;
        }

        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.stroke();
      });

      // 3. Subtle Metallic Nodes
      projected.forEach((p) => {
        const nodeAlpha = Math.max(0.3, Math.min(0.9, 1.4 - (p.pz - 2.5) * 0.35));
        ctx.fillStyle = studioMode === 'atelier' ? '#d4af37' : '#ffffff';
        ctx.globalAlpha = nodeAlpha;

        ctx.beginPath();
        ctx.arc(p.px, p.py, 1.8, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [points, edges, autoRotate, isDragging, rotationX, rotationY, studioMode]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!interactive) return;
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !interactive) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    setRotationY(prev => prev + dx * 0.012);
    setRotationX(prev => Math.max(-0.6, Math.min(0.6, prev - dy * 0.012)));
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-[#0c0c0f] border border-white/5 rounded-2xl overflow-hidden p-4 group">
      <div className="absolute top-3 left-4 text-[11px] font-mono-luxury text-zinc-400 tracking-wider">
        STUDIO SPECIFICATION // 3D MODEL
      </div>
      <div className="absolute top-3 right-4 text-[11px] font-mono-luxury text-[#d4af37]">
        AVANT-GARDE 2060
      </div>

      <canvas
        ref={canvasRef}
        width={420}
        height={340}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`w-full max-w-[420px] h-[290px] object-contain ${interactive ? 'cursor-grab active:cursor-grabbing' : ''}`}
      />

      {interactive && (
        <div className="flex items-center justify-between w-full max-w-sm mt-3 px-3 py-2 bg-[#141418] border border-white/5 rounded-xl text-xs font-sans z-10">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                setStudioMode('atelier');
                cyberAudio.playClick();
              }}
              className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all ${
                studioMode === 'atelier'
                  ? 'bg-[#d4af37] text-black font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Atelier Gold
            </button>
            <button
              onClick={() => {
                setStudioMode('blueprint');
                cyberAudio.playClick();
              }}
              className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all ${
                studioMode === 'blueprint'
                  ? 'bg-white text-black font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Architectural
            </button>
          </div>

          <button
            onClick={() => {
              setAutoRotate(!autoRotate);
              cyberAudio.playClick();
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-white/10 text-zinc-300 hover:text-white text-[11px] transition-colors"
          >
            <Rotate3d size={13} className={autoRotate ? 'animate-spin' : ''} />
            <span>{autoRotate ? '360° Turntable' : 'Manual View'}</span>
          </button>
        </div>
      )}

      <div className="flex justify-between items-center w-full px-4 mt-2 text-[10px] font-mono-luxury text-zinc-500">
        <span>INTERACTIVE ROTATION AVAILABLE</span>
        <span>ATELIER PROJECTION</span>
      </div>
    </div>
  );
};
