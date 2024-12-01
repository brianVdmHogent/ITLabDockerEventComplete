const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restartButton');

let ship, bullets, asteroids, score, gameOver;
const keys = {};

// Herstart het spel
function resetGame() {
    ship = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        angle: 0,
        dx: 0,
        dy: 0
    };
    bullets = [];
    asteroids = [];
    score = 0;
    gameOver = false;

    for (let i = 0; i < 5; i++) {
        asteroids.push(createAsteroid());
    }

    scoreElement.textContent = `Score: ${score}`;
    restartButton.style.display = 'none';

    gameLoop();
}

// Functie om asteroids te maken
function createAsteroid(x, y, radius) {
    return {
        x: x !== undefined ? x : Math.random() * canvas.width,
        y: y !== undefined ? y : Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
        radius: radius || 30 + Math.random() * 20
    };
}

// Game loop
function gameLoop() {
    if (!gameOver) {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    } else {
        drawGameOver();
    }
}

// Update game-objecten
function update() {
    // Beweeg ruimteschip
    if (keys['ArrowUp']) {
        ship.dx += Math.cos(ship.angle) * 0.05;
        ship.dy += Math.sin(ship.angle) * 0.05;
    }
    if (keys['ArrowLeft']) {
        ship.angle -= 0.05;
    }
    if (keys['ArrowRight']) {
        ship.angle += 0.05;
    }

    ship.x += ship.dx;
    ship.y += ship.dy;

    // Schermgrenzen
    if (ship.x < 0) ship.x = canvas.width;
    if (ship.x > canvas.width) ship.x = 0;
    if (ship.y < 0) ship.y = canvas.height;
    if (ship.y > canvas.height) ship.y = 0;

    // Beweeg kogels
    bullets.forEach((bullet, index) => {
        bullet.x += Math.cos(bullet.angle) * 5;
        bullet.y += Math.sin(bullet.angle) * 5;

        if (bullet.x < 0 || bullet.x > canvas.width || bullet.y < 0 || bullet.y > canvas.height) {
            bullets.splice(index, 1);
        }
    });

    // Beweeg asteroids
    asteroids.forEach((asteroid, index) => {
        asteroid.x += asteroid.dx;
        asteroid.y += asteroid.dy;

        if (asteroid.x < 0) asteroid.x = canvas.width;
        if (asteroid.x > canvas.width) asteroid.x = 0;
        if (asteroid.y < 0) asteroid.y = canvas.height;
        if (asteroid.y > canvas.height) asteroid.y = 0;

        // Controleer botsing met schip
        const dist = Math.hypot(ship.x - asteroid.x, ship.y - asteroid.y);
        if (dist < asteroid.radius) {
            gameOver = true;
        }
    });

    // Controleer botsing kogels vs asteroids
    bullets.forEach((bullet, bIndex) => {
        asteroids.forEach((asteroid, aIndex) => {
            const dist = Math.hypot(bullet.x - asteroid.x, bullet.y - asteroid.y);
            if (dist < asteroid.radius) {
                score += 10;
                scoreElement.textContent = `Score: ${score}`;
                bullets.splice(bIndex, 1);

                if (asteroid.radius > 15) {
                    asteroids.push(createAsteroid(asteroid.x, asteroid.y, asteroid.radius / 2));
                    asteroids.push(createAsteroid(asteroid.x, asteroid.y, asteroid.radius / 2));
                }
                asteroids.splice(aIndex, 1);
            }
        });
    });
}

// Teken game-objecten
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Teken schip
    ctx.save();
    ctx.translate(ship.x, ship.y);
    ctx.rotate(ship.angle);

    if (keys['ArrowUp']) {
        // Motoruitlaat
        ctx.beginPath();
        ctx.moveTo(-10, 3);
        ctx.lineTo(-20, 0);
        ctx.lineTo(-10, -3);
        ctx.closePath();
        ctx.fillStyle = 'orange';
        ctx.fill();
    }

    ctx.beginPath();
    ctx.moveTo(10, 0);
    ctx.lineTo(-10, 5);
    ctx.lineTo(-10, -5);
    ctx.closePath();
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.restore();

    // Teken kogels
    bullets.forEach((bullet) => {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    });

    // Teken asteroids
    asteroids.forEach((asteroid) => {
        ctx.beginPath();
        ctx.arc(asteroid.x, asteroid.y, asteroid.radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'white';
        ctx.stroke();
    });
}

// Teken Game Over-scherm
function drawGameOver() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
    ctx.font = '24px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 50);
    restartButton.style.display = 'block';
}

// Schiet kogel
function fireBullet() {
    bullets.push({
        x: ship.x,
        y: ship.y,
        angle: ship.angle
    });
}

// Event listeners
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    if (e.key === ' ') {
        fireBullet();
    }
});
document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});
restartButton.addEventListener('click', resetGame);

// Start de game
resetGame();
