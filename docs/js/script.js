const canvas = document.getElementById("heroCanvas");
const ctx = canvas.getContext("2d");

let width, height;
let particlesArray = [];

function init() {
  resizeCanvas();
  createParticles();
  animate();
}

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener("resize", () => {
  resizeCanvas();
  particlesArray = [];
  createParticles();
});

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radius = Math.random() * 1.2 + 0.4;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > width) this.speedX *= -1;
    if (this.y < 0 || this.y > height) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = "rgba(80, 80, 80, 0.6)";
    ctx.shadowColor = "rgba(80, 80, 80, 0.3)";
    ctx.shadowBlur = 4;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function connectParticles() {
  let maxDistance = 130;
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a + 1; b < particlesArray.length; b++) {
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDistance) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(80, 80, 80, ${1 - dist / maxDistance})`;
        ctx.lineWidth = 1;
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
}

function createParticles() {
  const count = Math.floor(width / 20); // Menos partículas
  for (let i = 0; i < count; i++) {
    particlesArray.push(new Particle());
  }
}

let fpsInterval = 1000 / 30;
let then = Date.now();

function animate() {
  requestAnimationFrame(animate);
  let now = Date.now();
  let elapsed = now - then;
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    ctx.clearRect(0, 0, width, height);

    particlesArray.forEach((p) => {
      p.update();
      p.draw();
    });

    connectParticles();
  }
}

init();
