
"use client";

import React, { useRef, useEffect, useCallback } from 'react';

const ParticleBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const draw = useCallback((ctx: CanvasRenderingContext2D, particles: any[]) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = 'rgba(120, 119, 198, 0.2)';

        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
            ctx.fill();

            p.y -= p.s;
            if (p.y < -p.r) {
                p.y = ctx.canvas.height + p.r;
            }
        });

        requestAnimationFrame(() => draw(ctx, particles));
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        let animationFrameId: number;
        let particles: any[] = [];

        const setCanvasSize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.parentElement!.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
            
            particles = [];
            const numParticles = Math.floor(canvas.getBoundingClientRect().width / 50);

            for(let i = 0; i < numParticles; i++) {
                particles.push({
                    x: Math.random() * rect.width,
                    y: Math.random() * rect.height,
                    r: Math.random() * 4 + 1, // radius
                    s: Math.random() * 0.5 + 0.2 // speed
                });
            }
        };
        

        const resizeObserver = new ResizeObserver(() => {
            setCanvasSize();
        });

        if (canvas.parentElement) {
            resizeObserver.observe(canvas.parentElement);
        }
        
        setCanvasSize();
        animationFrameId = requestAnimationFrame(() => draw(ctx, particles));

        return () => {
            cancelAnimationFrame(animationFrameId);
            if (canvas.parentElement) {
                resizeObserver.unobserve(canvas.parentElement);
            }
        };
    }, [draw]);

    return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }} />;
};

export default ParticleBackground;
