'use client';

import { useRef, useEffect, useCallback } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  brightness: number;
  pulseOffset: number;
  layer: number;
}

interface Edge {
  from: number;
  to: number;
  opacity: number;
}

const AMBER = { r: 232, g: 168, b: 50 };
const TEAL = { r: 45, g: 212, b: 168 };

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const edgesRef = useRef<Edge[]>([]);

  const initNodes = useCallback((width: number, height: number) => {
    const nodeCount = Math.min(Math.floor((width * height) / 18000), 80);
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const layer = Math.random() < 0.3 ? 0 : Math.random() < 0.6 ? 1 : 2;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: layer === 0 ? 2 + Math.random() * 2 : layer === 1 ? 1.5 + Math.random() * 1.5 : 1 + Math.random(),
        brightness: 0.3 + Math.random() * 0.7,
        pulseOffset: Math.random() * Math.PI * 2,
        layer,
      });
    }

    // Generate edges (connections between nearby nodes)
    const edges: Edge[] = [];
    const maxDist = Math.min(width, height) * 0.18;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist && Math.random() < 0.4) {
          edges.push({
            from: i,
            to: j,
            opacity: Math.max(0, 1 - dist / maxDist) * 0.3,
          });
        }
      }
    }

    nodesRef.current = nodes;
    edgesRef.current = edges;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      initNodes(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const draw = (time: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const edges = edgesRef.current;
      const mouse = mouseRef.current;

      // Update node positions
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges with soft padding
        if (node.x < -20) node.vx = Math.abs(node.vx);
        if (node.x > w + 20) node.vx = -Math.abs(node.vx);
        if (node.y < -20) node.vy = Math.abs(node.vy);
        if (node.y > h + 20) node.vy = -Math.abs(node.vy);

        // Mouse influence (gentle push)
        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / 200);

        if (influence > 0) {
          node.vx += (dx / dist) * influence * 0.015;
          node.vy += (dy / dist) * influence * 0.015;
        }

        // Damping
        node.vx *= 0.999;
        node.vy *= 0.999;
      }

      // Draw edges
      for (const edge of edges) {
        const a = nodes[edge.from];
        const b = nodes[edge.to];

        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.min(w, h) * 0.18;

        if (dist > maxDist * 1.3) continue;

        const alpha = Math.max(0, (1 - dist / maxDist)) * 0.15;

        // Teal colored edges
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(${TEAL.r}, ${TEAL.g}, ${TEAL.b}, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Draw nodes
      const t = time * 0.001;
      for (const node of nodes) {
        const pulse = Math.sin(t * 0.8 + node.pulseOffset) * 0.3 + 0.7;
        const alpha = node.brightness * pulse * 0.8;

        // Amber nodes with glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${AMBER.r}, ${AMBER.g}, ${AMBER.b}, ${alpha})`;
        ctx.fill();

        // Subtle glow for larger nodes
        if (node.radius > 2.5) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
          const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 3);
          glow.addColorStop(0, `rgba(${AMBER.r}, ${AMBER.g}, ${AMBER.b}, ${alpha * 0.15})`);
          glow.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = glow;
          ctx.fill();
        }

        // Mouse proximity glow
        const mdx = node.x - mouse.x;
        const mdy = node.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 150) {
          const proximity = 1 - mdist / 150;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
          const pglow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 4);
          pglow.addColorStop(0, `rgba(${AMBER.r}, ${AMBER.g}, ${AMBER.b}, ${proximity * 0.25})`);
          pglow.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = pglow;
          ctx.fill();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [initNodes]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}
