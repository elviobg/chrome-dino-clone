const game = {
    dino: {
        position: 0,
        positionToUp: 0,
        status: 'run',
    },
    movesToUp: 8,
    status: 'begin',
    cactus: [],
    nextRespawn: 0,
    score: 0,
}

document.addEventListener('keydown', handleKeyDown);
createCactus();

function handleKeyDown(event) {
    if (event.keyCode === 32) {
        jump();
    }
    if (event.keyCode === 13) {
        if(game.status === 'begin') {
            restart();
        } else {
            pause();
        }
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
        if (cactus.position > 0 && cactus.position < 60 && game.dino.position < 60){
            collision = true;
        }
        cactus.position = cactus.position - 10;
        cactus.element.style.left = `${cactus.position}px`;
    });
    game.cactus = game.cactus.filter(function(element) {
        return element.position > -100;
    });
    return collision;
}

function gameLoop () {
    setInterval(function () {
        if(game.status === 'begin'){
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
        
        game.nextRespawn -= 20;
        if (game.nextRespawn <= 0) {
            createCactus();
        }
        game.score += 1;
        score.innerHTML = `SCORE: ${game.score}`;
    }, 20);
}

function pause() {
    if (game.status === 'pause') {
        scenario.style.animationPlayState = 'running';
        game.status = 'running';
        banner.innerHTML = 'Pressione Enter para pausar...';
    } else {
        scenario.style.animationPlayState = 'paused';
        game.status = 'pause';
        banner.innerHTML = 'Pressione Enter para recomeçar...';
    }
}

function gameOver() {
    game.status = 'begin';
    scenario.style.animationPlayState = 'paused';
    banner.innerHTML = 'Errooooooooooou!!! <br>Pressione Enter para perder de novo...';
}

function createCactus() {
    const cactus = document.createElement('div');
    cactus.classList.add('cactus');
    scenario.appendChild(cactus);
    cactus.style.left = '1000px';
    game.cactus.push({element: cactus, position: 1000});
    game.nextRespawn = 1000 + Math.random() * 3000;
}

function restart() {
    game.status = 'running';
    game.cactus = [];
    game.dino = {
        position: 0,
        positionToUp: 0,
        status: 'run',
    };
    game.nextRespawn = 0;
    scenario.style.animationPlayState = 'running';
    dino.style.bottom = '0px';

    document.querySelectorAll('.cactus').forEach((cactus) =>{
        cactus.remove();
    });
    banner.innerHTML = 'Pressione Enter para pausar...';
    game.score = 0;
}

gameLoop();
scenario.style.animationPlayState = 'paused';