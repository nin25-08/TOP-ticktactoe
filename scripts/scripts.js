const body = document.querySelector("body")
const grid = document.querySelector(".grid")
const pname = document.querySelector(".player-name")
const dialog = document.querySelector("dialog");


const board = (() => {
    let gameBoard =
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

    const clearBoard = (() => {
        gameBoard =
            [["","",""],
            ["", "",""],
            ["","",""]];

    })

    return { getBoard, makeMove, printBoard, clearBoard, isGameOver}
})();

function Player(name, marker) {
    this.name = name;
    this.marker = marker;
}



function displayBoard() {
    for (let i = 0; i < 3; i++) {
        const row = document.createElement("div");
        row.className="row"
        for (let j = 0; j < 3; j++) {
            const elem = document.createElement("div");
            elem.className="square"
            elem.dataset.row = i
            elem.dataset.col=j
            row.appendChild(elem)
        }
        grid.appendChild(row)
    }
}
const createPlayerHandler = ((player1,player2)=>{
    let currentPlayer=player1;
    const getCurrentPlayer = ()=>{
        return currentPlayer;
    }
    const togglePlayer = ()=>{
        if(currentPlayer==player1){
            currentPlayer=player2
        }else{
            currentPlayer=player1
        }
    }
    return {getCurrentPlayer,togglePlayer}
})

const player1=new Player("Jhon","X")
const player2=new Player("Lebron","O")

const playerHandler=createPlayerHandler(player1,player2)
body.addEventListener("click",(e)=>{
    if(e.target.className=="square"){
        const currentPlayer=playerHandler.getCurrentPlayer()
        board.makeMove(currentPlayer.marker,e.target.dataset.row,e.target.dataset.col)
        e.target.textContent=currentPlayer.marker

        if(board.isGameOver(currentPlayer.marker)){
            handleGameOver(currentPlayer)
        }else{
        playerHandler.togglePlayer()
        board.printBoard()
        }
    }
})
function handleGameOver(player){
    console.log("gameOver")
    pname.textContent=player.name
    dialog.show()
}
displayBoard();