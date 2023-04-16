score = 0;
cross = true;

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play();
    audio.loop = true;
}, 100);

document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {
        player = document.querySelector('.player');
        player.classList.add('animateplayer');
        setTimeout(() => {
            player.classList.remove('animateplayer');
        }, 700);
    }
    if (e.keyCode == 39) {
        player = document.querySelector('.player');
        playerx = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'));
        player.style.left = playerx + 120 + "px";
    }
    if (e.keyCode == 37) {
        player = document.querySelector('.player');
        playerx = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'));
        player.style.left = playerx + -120 + "px";
    }
}



setInterval(() => {
    player = document.querySelector('.player');
    gameover = document.querySelector('.gameover');
    goimg = document.querySelector('.goimg');
    enemy = document.querySelector('.enemy');

    mx = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'));
    my = parseInt(window.getComputedStyle(player, null).getPropertyValue('top'));

    ex = parseInt(window.getComputedStyle(enemy, null).getPropertyValue('left'));
    ey = parseInt(window.getComputedStyle(enemy, null).getPropertyValue('top'));

    offsetX = Math.abs(mx - ex);
    offsetY = Math.abs(my - ey);
    console.log(offsetX, offsetY)

    if (offsetX < 70 && offsetY < 100) {
        gameover.innerHTML = 'Game Over'
        goimg.style.visibility = 'visible';
        enemy.classList.remove('enemymove');
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    else if (offsetX < 140 && cross) {
        score += 1;
        updatescore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(enemy, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            enemy.style.animationDuration = newDur + 's';
            console.log('new animation duration: ', newDur)
        }, 500);
    }
}, 10);

function updatescore(score) {
    scorecount.innerHTML = "Your Score: " + score
}