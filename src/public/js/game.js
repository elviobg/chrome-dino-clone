const game = {
    dino: {
        position: 0,
        positionToUp: 0,
        status: 'run',
    },
    movesToUp: 8,
}

document.addEventListener('keydown', handleKeyUp);

function handleKeyUp(event) {
    if (event.keyCode === 32 && !game.dino.isJumping) {
        jump();
    }
}

function dinoUp() {
    game.dino.positionToUp += 1;
    game.dino.position = game.dino.positionToUp * 20;
    dino.style.bottom = game.dino.position + 'px';
    if(game.dino.positionToUp >= 8) {
        game.dino.status = 'down';
    }
}

function dinoDown() {
    game.dino.positionToUp -= 1;
    game.dino.position = game.dino.positionToUp * 20;
    dino.style.bottom = game.dino.position + 'px';
    if(game.dino.positionToUp <= 0) {
        game.dino.status = 'run';
    }
}

function jump() {
    if(game.dino.status === 'run') {
        game.dino.status = 'up';
    }
}

function gameLoop () {
    setInterval(function () {
        if(game.dino.status === 'up') {
            dinoUp();
        } else if(game.dino.status === 'down') {
            dinoDown();
        }
    }, 20);
}

gameLoop();