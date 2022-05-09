const game = {
    dino: {
        isJumping: false,
        position: 0,
    }
}

document.addEventListener('keyup', handleKeyUp);
function handleKeyUp(event) {
    if (event.keyCode === 32 && !game.dino.isJumping) {
        jump();
    }
}

function dinoUp() {
    game.dino.isJumping = true;
    let moves = 0;
    let dinoUpInterval = setInterval(() => {
        moves += 1;
        game.dino.position += 20;
        dino.style.bottom = game.dino.position + 'px';
        if(moves >= 8) {
            dinoDown();
            clearInterval(dinoUpInterval);
        }
      }, 20);
}

function dinoDown() {
    let moves = 0;
    let dinoDownInterval = setInterval(() => {
        moves += 1;
        game.dino.position -= 20;
        dino.style.bottom = game.dino.position + 'px';
        if (moves >= 8) {
          clearInterval(dinoDownInterval);
          game.dino.isJumping = false;
        }
    }, 20);
}

function jump() {
    if(!game.dino.isJumping) {
        dinoUp();
    }
}
  