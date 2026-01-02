const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

class Particle {
  constructor(x, y, size, color, velocity) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.velocity = velocity;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if (this.x < 0 || this.x > canvas.width) this.velocity.x *= -1;
    if (this.y < 0 || this.y > canvas.height) this.velocity.y *= -1;

    this.draw();
  }
}

function init() {
  particlesArray = [];
  for (let i = 0; i < 80; i++) {
    let size = Math.random() * 3 + 1;
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let color = `rgba(255,105,180,${Math.random()})`;
    let velocity = {
      x: (Math.random() - 0.5) * 0.5,
      y: (Math.random() - 0.5) * 0.5
    };
    particlesArray.push(new Particle(x, y, size, color, velocity));
  }
}

// Draw lines between close particles
function connect() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,105,180,${1 - distance / 100})`;
        ctx.lineWidth = 1;
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => p.update());
  connect();
  requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});
s