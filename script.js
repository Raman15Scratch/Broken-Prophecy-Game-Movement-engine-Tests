const player = document.getElementById('player');
const gameBox = document.getElementById('game-box');

// Engine Settings
const speed = 4; 
let posX = 300; 
let posY = 220; 

// Universal movement tracker state
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    w: false,
    s: false,
    a: false,
    d: false
};

// Flexible boundaries
const minX = 0;
const minY = 0;
let maxX = gameBox.clientWidth - 40;  
let maxY = gameBox.clientHeight - 40; 

// Handle screen changes or rotations smoothly
window.addEventListener('resize', () => {
    maxX = gameBox.clientWidth - 40;
    maxY = gameBox.clientHeight - 40;
});

// DESKTOP KEYBOARD LISTENERS
window.addEventListener('keydown', (e) => {
    if (e.key in keys) keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    if (e.key in keys) keys[e.key] = false;
});


// MOBILE TOUCH EVENTS LINK TO ENGINE
function bindMobileButton(elementId, mappingKey) {
    const element = document.getElementById(elementId);
    if (!element) return;

    element.addEventListener('touchstart', (e) => {
        e.preventDefault(); 
        keys[mappingKey] = true;
    });

    element.addEventListener('touchend', (e) => {
        e.preventDefault();
        keys[mappingKey] = false;
    });

    element.addEventListener('touchcancel', (e) => {
        e.preventDefault();
        keys[mappingKey] = false;
    });
}

// Connect layout buttons directly to direction variables
bindMobileButton('btn-up', 'ArrowUp');
bindMobileButton('btn-down', 'ArrowDown');
bindMobileButton('btn-left', 'ArrowLeft');
bindMobileButton('btn-right', 'ArrowRight');


// MAIN CORE ENGINE ANIMATION LOOP
function update() {
    // Process Horizontal Positions
    if (keys.ArrowLeft || keys.a) posX -= speed;
    if (keys.ArrowRight || keys.d) posX += speed;

    // Process Vertical Positions
    if (keys.ArrowUp || keys.w) posY -= speed;
    if (keys.ArrowDown || keys.s) posY += speed;

    // Collision Edge Restrictions
    if (posX < minX) posX = minX;
    if (posX > maxX) posX = maxX;
    if (posY < minY) posY = minY;
    if (posY > maxY) posY = maxY;

    // Visual Render Updates
    player.style.left = posX + 'px';
    player.style.top = posY + 'px';

    // Loop
    requestAnimationFrame(update);
}

// Start Engine
requestAnimationFrame(update);
