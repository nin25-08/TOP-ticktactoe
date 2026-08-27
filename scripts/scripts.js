const body = document.querySelector("body")
const grid = document.querySelector(".grid")
const pname = document.querySelector(".player-name")
const dialog = document.querySelector("dialog");

const openingSequence =  document.querySelector(".opening-sequence");
const newGameBtn =  document.querySelector(".new-game");
const playAgainBtn = document.querySelector(".play-again");

const playerBtns = document.querySelectorAll(".player-btn")
let playerSelection = "X"
playerBtns.forEach(button=>{
    button.addEventListener("click",e=>{
        playerBtns.forEach(btn => btn.classList.remove('selected'));
        e.target.classList.add("selected")
        playerSelection = e.target.dataset.choice;
    })
})

newGameBtn.addEventListener("click",e=>{
    openingSequence.classList.add("hidden")
    UIcreateBoard()
})

function Player(name, marker) {
    this.name = name;
    this.marker = marker;
}

const player1 = new Player("Player1", "X")
const player2 = new Player("Player2", "O")

const createPlayerHandler = ((player1, player2) => {
    let currentPlayer = player1;
    const getCurrentPlayer = () => {
        return currentPlayer;
    }
    const togglePlayer = () => {
        if (currentPlayer == player1) {
            currentPlayer = player2
        } else {
            currentPlayer = player1
        }
    }
    return { getCurrentPlayer, togglePlayer }
})

const playerHandler = createPlayerHandler(player1, player2)

const board = (() => {
    const gameBoard =
        [["", "", ""],
        ["", "", ""],
        ["", "", ""]];

    const getBoard = (() => {
        return gameBoard;
    })

    const makeMove = ((value, row, col) => {
        if (row < 3 && row >= 0 &&
            col < 3 && col >= 0) {
            gameBoard[row][col] = value;
            return isGameOver(value);
        }
        else {
            return "invalidMove";
        }
    })

    const isGameOver = ((value) => {
        let rows = [[gameBoard[0][0], gameBoard[0][1], gameBoard[0][2]], [gameBoard[1][0], gameBoard[1][1], gameBoard[1][2]], [gameBoard[2][0], gameBoard[2][1], gameBoard[2][2]]]
        let cols = [[gameBoard[0][0], gameBoard[1][0], gameBoard[2][0]], [gameBoard[0][1], gameBoard[1][1], gameBoard[2][1]], [gameBoard[0][2], gameBoard[1][2], gameBoard[2][2]]]
        let diag = [[gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]], [gameBoard[0][2], gameBoard[1][1], gameBoard[2][0]]]

        return evaluateLine(rows, value) || evaluateLine(cols, value) || evaluateLine(diag, value)
    })

    const isBoardFull = (() => {
        for (let i = 0; i < gameBoard.length; i++) {
            for (let j = 0; j < gameBoard[i].length; j++) {
                if (gameBoard[i][j] === "")
                    return false;
            }
        }
        return true
    })
    const evaluateLine = ((line, value) => {
        for (let i = 0; i < line.length; i++) {
            let count = 0;
            for (let j = 0; j < line[i].length; j++) {
                if (line[i][j] == value) {
                    count++;
                }
            }
            if (count == 3) {
                return true;
            }
        }
        return false;
    })

    const printBoard = (() => {
        for (let i = 0; i < gameBoard.length; i++) {
            console.log(gameBoard[i][0] + ";" + gameBoard[i][1] + ";" + gameBoard[i][2])
        }
    })

    const clearBoard = () => {
        for (let i = 0; i < gameBoard.length; i++) {
            for (let j = 0; j < gameBoard[i].length; j++) {
                gameBoard[i][j] = "";
            }
        }
    }
    return { getBoard, makeMove, printBoard, clearBoard, isGameOver ,isBoardFull}
})();


function UIcreateBoard() {
    for (let i = 0; i < 3; i++) {
        const row = document.createElement("div");
        row.className = "row"
        for (let j = 0; j < 3; j++) {
            const elem = document.createElement("div");
            elem.className = "square"
            elem.dataset.row = i
            elem.dataset.col = j
            row.appendChild(elem)
        }
        grid.appendChild(row)
    }
}

function UIclearBoard() {
    const allSquares = document.querySelectorAll(".square");

    allSquares.forEach(square => {
        square.textContent = "";
    });
}

function UIhideBoard() {
    grid.classList.add("hidden")
}
function UIshowBoard() {
    grid.classList.remove("hidden")
}

body.addEventListener("click", (e) => {
    if (e.target.className == "square" && e.target.textContent == "") {
        const currentPlayer = playerHandler.getCurrentPlayer()
        board.makeMove(currentPlayer.marker, e.target.dataset.row, e.target.dataset.col)
        e.target.textContent = currentPlayer.marker

        if (board.isGameOver(currentPlayer.marker)) {
            handleGameOver(currentPlayer)
        } else if (board.isBoardFull()) { 
            handleTie();
        }
        else {
            playerHandler.togglePlayer()
            board.printBoard()
        }
    }
})
function handleGameOver(player) {
    console.log("gameOver")
    pname.textContent = player.name + " won!"
    dialog.showModal()
}
function handleTie(){
    console.log("gameOver")
    pname.textContent = "It's a tie!"
    dialog.showModal()
}

playAgainBtn.addEventListener("click",()=>{
    board.clearBoard()
    UIclearBoard()
    dialog.close()

})




