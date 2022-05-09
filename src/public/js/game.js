const game = {
    dino: {
        position: 0,
        positionToUp: 0,
        status: 'run',
    },
    movesToUp: 8,
    status: 'begin',
    cactus: [],
}

document.addEventListener('keydown', handleKeyDown);

function handleKeyDown(event) {
    if (event.keyCode === 32) {
        jump();
    }
    if (event.keyCode === 13 && game.status !== 'end') {
        pause();
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

function updateCactus() {
    let collision = false;
    game.cactus.forEach((cactus) =>{
        cactus.position = cactus.position - 10;
        cactus.element.style.left = `${cactus.position}px`;
        if (cactus.position > 0 && cactus.position < 60 && game.dino.position < 60){
            collision = true;
        }
    });
    return collision;
}

function gameLoop () {
    setInterval(function () {
        if(game.status === 'end'){
            return;  
        }else if(game.status === 'pause'){
            return;  
        } else if(game.dino.status === 'up') {
            dinoUp();
        } else if(game.dino.status === 'down') {
            dinoDown();
        }
        const collision = updateCactus();
        if(collision) {
            gameOver();
        }
    }, 20);
}

function pause() {
    if (game.status === 'pause') {
        scenario.style.animationPlayState = 'running';
        game.status = 'running';
    } else {
        scenario.style.animationPlayState = 'paused';
        game.status = 'pause';
    }
}

function gameOver() {
    game.status = 'end';
    scenario.style.animationPlayState = 'paused';
}

gameLoop();