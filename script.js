const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const bombCount = 30;
const sizeGame = 20;

var arry = [];

function generateRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
for (var i = 0; i < sizeGame; i++) {
    arry[i] = [];
    for (var j = 0; j < sizeGame; j++) {
        arry[i][j] = { data: undefined, status: 'hidden' };

    }
}

// Create Bombs
for (var i = 0; i < bombCount; i++) {
    var randomX = generateRandom(0, sizeGame);
    var randomY = generateRandom(0, sizeGame);
    if (arry[randomX][randomY].data != 'Bomb') {
        arry[randomX][randomY] = { data: 'Bomb', status: 'hidden' };
    } else {
        i--;
    }
}

canvas.addEventListener('click', (e) => {
    arry[Math.floor(e.offsetX / (canvas.offsetWidth / sizeGame))][Math.floor(e.offsetY / (canvas.offsetWidth / sizeGame))].status = 'visible';
    updateGame(Math.floor(e.offsetX / (canvas.offsetWidth / sizeGame)), Math.floor(e.offsetY / (canvas.offsetWidth / sizeGame)));
    drawGame();
});

// Create Numbers
for (var i = 0; i < sizeGame; i++) {
    for (var j = 0; j < sizeGame; j++) {
        if (arry[i][j].data != 'Bomb') {
            var counting = 0;
            if (arry[i][j].data == 'Bomb') {
                counting++;
            }
            if (arry[i][j - 1]) {
                if (arry[i][j - 1].data == 'Bomb') {
                    counting++;
                }
            }
            if (arry[i][j + 1]) {
                if (arry[i][j + 1].data == 'Bomb') {
                    counting++;
                }
            }
            if (arry[i + 1]) {
                if (arry[i + 1][j]) {
                    if (arry[i + 1][j].data == 'Bomb') {
                        counting++;
                    }
                }
            }
            if (arry[i + 1]) {
                if (arry[i + 1][j - 1]) {
                    if (arry[i + 1][j - 1].data == 'Bomb') {
                        counting++;
                    }
                }
            }
            if (arry[i + 1]) {
                if (arry[i + 1][j + 1]) {
                    if (arry[i + 1][j + 1].data == 'Bomb') {
                        counting++;
                    }
                }
            }
            if (arry[i - 1]) {
                if (arry[i - 1][j - 1]) {
                    if (arry[i - 1][j - 1].data == 'Bomb') {
                        counting++;
                    }
                }
            }
            if (arry[i - 1]) {
                if (arry[i - 1][j].data == 'Bomb') {
                    counting++;
                }
            }
            if (arry[i - 1]) {
                if (arry[i - 1][j + 1]) {
                    if (arry[i - 1][j + 1].data == 'Bomb') {
                        counting++;
                    }
                }
            }
            arry[i][j].data = counting;
        }
    }
}

function updateGame(i, j) {
    if (arry[i][j].data == 0) {

        if (arry[i][j - 1] && arry[i][j - 1].status != 'visible') {
            arry[i][j - 1].status = 'visible';
        }
        if (arry[i][j + 1] && arry[i][j + 1].status != 'visible') {
            arry[i][j + 1].status = 'visible';
        }
        if (arry[i + 1]) {
            if (arry[i + 1][j] && arry[i + 1][j].status != 'visible') {
                arry[i + 1][j].status = 'visible';
            }
        }
        if (arry[i + 1]) {
            if (arry[i + 1][j - 1] && arry[i + 1][j - 1].status != 'visible') {
                arry[i + 1][j - 1].status = 'visible';
            }
        }
        if (arry[i + 1]) {
            if (arry[i + 1][j + 1] && arry[i + 1][j + 1].status != 'visible') {
                arry[i + 1][j + 1].status = 'visible';
            }
        }
        if (arry[i - 1]) {
            if (arry[i - 1][j - 1] && arry[i - 1][j - 1].status != 'visible') {
                arry[i - 1][j - 1].status = 'visible';
            }
        }
        if (arry[i - 1]) {
            if (arry[i - 1][j] && arry[i - 1][j].status != 'visible') {
                arry[i - 1][j].status = 'visible';
            }
        }
        if (arry[i - 1]) {
            if (arry[i - 1][j + 1] && arry[i - 1][j + 1].status != 'visible') {
                arry[i - 1][j + 1].status = 'visible';
            }
        }
        // if (arry[i][j - 1].data == 0) {
        //     updateGame(i, j - 1)
        // }
        // if (arry[i][j + 1].data == 0) {
        //     updateGame(i, j + 1)
        // }
        // if (arry[i + 1][j].data == 0) {
        //     updateGame(i + 1, j)
        // }
        // if (arry[i + 1][j - 1].data == 0) {
        //     updateGame(i + 1, j - 1)
        // }
        // if (arry[i + 1][j + 1].data == 0) {
        //     updateGame(i + 1, j + 1)
        // }
        // if (arry[i - 1][j + 1].data == 0) {
        //     updateGame(i - 1, j + 1)
        // }
        if (arry[i - 1][j - 1].data == 0) {
            updateGame(i - 1, j - 1)
        }
        if (arry[i - 1][j].data == 0) {
            updateGame(i - 1, j)
        }
    }
}

function drawGame() {
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    for (var i = 0; i < sizeGame; i++) {
        for (var j = 0; j < sizeGame; j++) {
            ctx.beginPath();
            ctx.rect(i * canvas.offsetWidth / sizeGame, j * canvas.offsetWidth / sizeGame, canvas.offsetWidth / sizeGame, canvas.offsetWidth / sizeGame);
            ctx.stroke();
            if (arry[i][j].status == 'visible') {
                if (arry[i][j].data == 'Bomb') {
                    ctx.beginPath();
                    ctx.fillRect(i * canvas.offsetWidth / sizeGame, j * canvas.offsetWidth / sizeGame, canvas.offsetWidth / sizeGame, canvas.offsetWidth / sizeGame);
                } else {
                    ctx.beginPath();
                    ctx.fillText(arry[i][j].data, i * canvas.offsetWidth / sizeGame + 10, j * canvas.offsetWidth / sizeGame + 20);
                }
            }
        }
    }
}
drawGame();





