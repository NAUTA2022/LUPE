import React, { useEffect, useRef } from "react";

const FondoAnimado = () => {
  const canvasRef = useRef(null);
  const foregroundStars = Array.from({ length: 100 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    originalX: null,
    originalY: null,
    size: Math.random() * 2 + 1,
    parallaxFactor: Math.random() * 0.5 + 0.1,
    velocity: (Math.random() - 0.5) * 0.2, // Movimiento ligero
  }));

  const backgroundStars = Array.from({ length: 100 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 1.5 + 0.5,
    velocity: (Math.random() - 0.5) * 0.1, // Movimiento aún más ligero
  }));

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;
  let lastMoveTime = Date.now();

  foregroundStars.forEach((star) => {
    star.originalX = star.x;
    star.originalY = star.y;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawStars = (stars, opacity) => {
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const animate = () => {
      const now = Date.now();
      if (now - lastMoveTime > 5000) {
        foregroundStars.forEach((star) => {
          star.x += (star.originalX - star.x) * 0.02;
          star.y += (star.originalY - star.y) * 0.02;
        });
      } else {
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;

        foregroundStars.forEach((star) => {
          star.x += (currentX - window.innerWidth / 2) * star.parallaxFactor * 0.004;
          star.y += (currentY - window.innerHeight / 2) * star.parallaxFactor * 0.004;
        });
      }

      backgroundStars.forEach((star) => {
        star.x += star.velocity;
        star.y += star.velocity;

        if (star.x < 0 || star.x > window.innerWidth) star.velocity *= -1;
        if (star.y < 0 || star.y > window.innerHeight) star.velocity *= -1;
      });

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawStars(backgroundStars, 0.5);
      drawStars(foregroundStars, 1);

      requestAnimationFrame(animate);
    };

    const handleMouseMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      lastMoveTime = Date.now();
    };

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        backgroundColor: 'black'
      }}
    />
  );
};

export default FondoAnimado; 