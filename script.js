window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hide-preloader');
    }, 2000);
});
const canvas = document.getElementById('leaf-canvas');
if (canvas) { 
    const ctx = canvas.getContext('2d'); 
    function resizeCanvas() {
        canvas.width = window.innerWidth; 
        canvas.height = window.innerHeight;
    }
    resizeCanvas(); 
    window.addEventListener('resize', resizeCanvas);
    const leavesArray = [];
const numberOfLeaves = 35;
const mouse = { x: null, y: null, radius: 100 };

window.addEventListener('mousemove', (e) => { mouse.x = e.x; mouse.y = e.y; });
window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });
class Leaf {
    constructor() { this.reset(); this.y = Math.random() * canvas.height; }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.size = Math.random() * 10 + 6;
        this.speedY = Math.random() * 1 + 0.5;
        this.speedX = (Math.random() - 0.5) * 1;
        this.spin = Math.random() * 360;
        this.spinSpeed = (Math.random() - 0.5) * 0.02;
        const pinkColors = ['rgba(255,192,203,0.6)', 'rgba(255,182,193,0.7)', 'rgba(255,105,180,0.5)'];
        this.color = pinkColors[Math.floor(Math.random() * pinkColors.length)];
    }
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.spin += this.spinSpeed;
        if (mouse.x !== null && mouse.y !== null) {
            let dx = this.x - mouse.x;
            let dy = this.y - mouse.y;
            let dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < mouse.radius) {
                this.x += (dx / dist) * 4;
                this.y += (dy / dist) * 4;
            }
        }
        if (this.y > canvas.height || this.x < -20 || this.x > canvas.width + 20) this.reset();
    }
draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.spin);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(this.size/2, -this.size/2, this.size, -this.size/4, this.size/2, this.size/2);
        ctx.bezierCurveTo(0, this.size/4, -this.size/4, 0, 0, 0);
        ctx.fill();
        ctx.restore();
    }
}

function init() { for (let i = 0; i < numberOfLeaves; i++) leavesArray.push(new Leaf()); }
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < leavesArray.length; i++) {
        leavesArray[i].update();
        leavesArray[i].draw();
    }
    requestAnimationFrame(animate);
}
init();
animate();
}