const selectCells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessage = document.getElementById('winningMessage');
const winningMessageText = document.querySelector('.winning-message-text');
const restart = document.getElementById('restart-btn');
const x_class = 'x';
const circle_class = 'circle';
const winningCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let circleTurn;

startGame()

restart.addEventListener('click', startGame);


function startGame() {
    circleTurn = false;
    selectCells.forEach(cell => {
        cell.classList.remove(x_class);
        cell.classList.remove(circle_class);
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })

    });
    setHoverClass();
    winningMessage.classList.remove('show');
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? circle_class : x_class;
    //placeMark
    placeMark(cell, currentClass);
    //check for win
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        //check for draw
        endGame(true);
    } else {
        // switch turns
        switchTurns();
        setHoverClass();
    }

}

function endGame(draw) {
    if (draw) {
        winningMessageText.innerText = 'Draw!'
    } else {
        winningMessageText.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessage.classList.add('show')
}

function isDraw() {
    return [...selectCells].every((cell) => {
        return cell.classList.contains(x_class) || cell.classList.contains(circle_class);
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function switchTurns() {
    circleTurn = !circleTurn;
}

function setHoverClass() {
    board.classList.remove(x_class);
    board.classList.remove(circle_class);
    if (circleTurn) {
        board.classList.add(circle_class);
    } else {
        board.classList.add(x_class);
    }
}

function checkWin(currentClass) {
    return winningCondition.some(combination => {
        return combination.every(index => {
            return selectCells[index].classList.contains(currentClass);
        })
    })
}