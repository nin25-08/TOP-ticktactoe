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
        }
        else {
            return "invalidMove";
        }
    })

    const isGameOver = ((value) => {
        let rows=[[gameBoard[0][0],gameBoard[0][1],gameBoard[0][2]],[gameBoard[1][0],gameBoard[1][1],gameBoard[1][2]],[gameBoard[2][0],gameBoard[2][1],gameBoard[2][2]]]
        let cols=[[gameBoard[0][0],gameBoard[1][0],gameBoard[2][0]],[gameBoard[0][1],gameBoard[1][1],gameBoard[2][1]],[gameBoard[0][2],gameBoard[1][2],gameBoard[2][2]]]
        let diag=[[gameBoard[0][0],gameBoard[1][1],gameBoard[2][2]],[gameBoard[0][2],gameBoard[1][1],gameBoard[2][0]]]


        return evaluateLine(rows,value)||evaluateLine(cols,value)||evaluateLine(diag,value)
    })
      const evaluateLine = ((line,value) => {
        for(let i=0;i<line.length;i++){
            let count=0;
            for(let j=0;j<line[i].length;j++){
                if(line[i][j]==value){
                    count++;
                    
                }
            }
            if(count==3){
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

    return { getBoard, makeMove, printBoard,isGameOver}
})();


board.makeMove("O",0,0)
board.makeMove("O",0,1)
board.makeMove("O",0,2)
console.log(board.printBoard())

console.log(board.printBoard())

console.log(board.isGameOver("O"))