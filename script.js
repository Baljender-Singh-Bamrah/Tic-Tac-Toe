const grids = document.querySelectorAll('.cell')
const reset = document.querySelector('.reset')
const x = document.querySelector('.turn-child1')
const o = document.querySelector('.turn-child2')
let WinX = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let WinY = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let turn = 0;
let count = 0;

for (let grid of grids) {
    grid.addEventListener('click', () => {
            if (turn % 2 == 0) {
                if (grid.firstElementChild != null && (grid.firstElementChild.classList == 'cross' || grid.firstElementChild.classList == 'zero'))
                    alert("cell already occupied...")
                else {
                    x.classList.toggle('x')
                    o.classList.toggle('o')
                    let image = document.createElement('img')
                    image.classList.add('cross')
                    image.src = "./images/cross.png";
                    grid.append(image)
                    let rows = grid.getAttribute('row');
                    let cols = grid.getAttribute("col");
                    WinX[rows][cols] = 1;
                    turn++;
                    count++;
                    if (Win(WinX)) {
                        alert("X Wins !!!");
                        WinX = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
                        WinY = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
                        clear_grid();
                        let ScoreX = document.querySelector("#scoreX");
                        let t = ScoreX.innerText;
                        t++;
                        ScoreX.innerText = `${t}`;
                        count = 0;
                    }
                }
            }

            else {
                if (grid.firstElementChild != null && (grid.firstElementChild.classList == 'zero' || grid.firstElementChild.classList == 'cross'))
                    alert("cell already occupied...")

                else {
                    x.classList.toggle('x')
                    o.classList.toggle('o')
                    let image = document.createElement('img')
                    image.classList.add('zero')
                    image.src = "./images/zero.png";
                    grid.append(image)
                    let rows = grid.getAttribute("row");
                    let cols = grid.getAttribute("col");
                    WinY[rows][cols] = 1;
                    turn++;
                    count++;
                    if (Win(WinY)) {
                        alert("O Wins !!!");
                        WinX = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
                        WinY = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
                        clear_grid();
                        let ScoreY = document.querySelector("#scoreO");
                        let t = ScoreY.innerText;
                        t++;
                        ScoreY.innerText = `${t}`;
                        count = 0
                    }
                }
            }

            if (count >=9) {
                alert("Board Full !!");
                clear_grid();
                count = 0;
                WinX = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
                WinY = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
            }
        
    })
}

reset.addEventListener('click', () => {
    clear_grid();
    WinX = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    WinY = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    alert("Game Reset !");
    document.querySelector("#scoreX").innerText = "0";
    document.querySelector("#scoreO").innerText = "0";
})

const clear_grid = () => {
    let images = document.querySelectorAll('img')
    for (let it of images) {
        it.remove();
    }

    if (!x.classList.contains('x')) {
        x.classList.toggle('x')
        o.classList.toggle('o')
    }

    turn = 0;
}

let Win = (board) => {
    for (let i = 0; i < 3; i++) {
        if ((board[i][0] == 1 && board[i][1] == 1 && board[i][2] == 1) ||
            (board[0][i] == 1 && board[1][i] == 1 && board[2][i] == 1)) {
            return true;
        }
    }
    if ((board[0][0] == 1 && board[1][1] == 1 && board[2][2] == 1) ||
        (board[0][2] == 1 && board[1][1] == 1 && board[2][0] == 1)) {
        return true;
    }

    return false;
}