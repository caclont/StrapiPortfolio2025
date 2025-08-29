export default function initParticlesBackground(canvas) {
  const NUM_PARTICLES = 1000;
  const PARTICLE_RADIUS = [10, 10];
  const PARTICLE_COLOR = '#000000ff';
  const BORDER_COLOR = '#ffffffff';
  const BORDER_SIZE = 2;
  const FRICTION = 0.9;
  
  // Détecte si on est sur mobile / tactile
  const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Rayon d’attraction adapté
  const INTERACTION_DISTANCE = isMobile ? 100 : 400;
  const INTERACTION_STRENGTH = isMobile ? 0.2 : 0.7;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const particles = [];

  function createParticles() {
    particles.length = 0;
    for (let i = 0; i < NUM_PARTICLES; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: PARTICLE_RADIUS[0] + Math.random() * (PARTICLE_RADIUS[1] - PARTICLE_RADIUS[0])
      });
    }
  }

  createParticles();

  // Pointeur universel desktop + mobile
  const pointer = { x: width / 2, y: height / 2 };

  // desktop
  window.addEventListener('mousemove', e => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
  });

  // mobile / tactile
  canvas.addEventListener('touchstart', e => {
    const t = e.touches[0];
    pointer.x = t.clientX;
    pointer.y = t.clientY;
  });

  canvas.addEventListener('touchmove', e => {
    const t = e.touches[0];
    pointer.x = t.clientX;
    pointer.y = t.clientY;
    e.preventDefault(); // évite le scroll
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createParticles();
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      const dx = p.x - pointer.x;
      const dy = p.y - pointer.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < INTERACTION_DISTANCE) {
        const angle = Math.atan2(dy, dx);
        const force = (INTERACTION_DISTANCE - dist) / INTERACTION_DISTANCE * INTERACTION_STRENGTH;
        p.vx -= Math.cos(angle) * force;
        p.vy -= Math.sin(angle) * force;
      }

      // viscosité
      p.vx *= FRICTION;
      p.vy *= FRICTION;

      p.x += p.vx;
      p.y += p.vy;

      // rebond sur les bords
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = PARTICLE_COLOR;
      ctx.fill();

      ctx.strokeStyle = BORDER_COLOR;
      ctx.lineWidth = BORDER_SIZE;
      ctx.stroke();
    });

    requestAnimationFrame(animate);
  }

  animate();
}
