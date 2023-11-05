'use strict'

const gameBoard = (function () {
    const rows = 3;
    const columns = 3;
    let board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push("");
        }
    }

    const getBoard = () => board;

    return { getBoard }
})();

function createPlayer (name, sign) {
    
    return { name, sign };
}

const oPlayer = createPlayer("oPlayer", "O");
const xPlayer = createPlayer("xPlayer", "X");

const gameFlow = (function () {
    let activePlayer = oPlayer;
    let board = gameBoard.getBoard();
    function placeSign(row, column) {
        if (board[row][column] === "") {
            board[row][column] = activePlayer.sign;
            return board;
        } else {
            console.log("This cell is already occupied.");
            return board;
        }
    }

    const switchPlayers = () => {
        activePlayer = activePlayer === oPlayer ? xPlayer : oPlayer;
    };

    function checkWin() {
        const trans = board[0].map((_, colIndex) => board.map(row => row[colIndex]));
        const value = activePlayer.sign;
        let gameScore = 0;
        for (let i = 0; i < 3; i++) {
            const arr = board[i].filter((el) => el === value);
            if(arr.length === 3){
                gameScore = 10;
                console.log("yes");
            }
        }
        for (let i = 0; i < 3; i++) {
            const arr = trans[i].filter((el) => el === value);
            if(arr.length === 3){
                gameScore = 10;
                console.log("yes");
            }
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] != "" && gameScore < 10) {
                    gameScore++;
                    console.log(gameScore);
                };
            }
        }


        const getScore = () => gameScore;

        return { getScore }
    };

    const gameResult = () => {
        const win = checkWin()
        console.log(win.getScore());
        if (win.getScore() === 9) {
            console.log("It's a tie! Play again if you want!")
        } else if (win.getScore() === 10) {
            console.log("It's a Win!")
        }
    }

    const updateBoard = () => console.log(board);

    function playRound(row, column) {
        placeSign(row, column);
        updateBoard();
        
        gameResult();
        switchPlayers();
        
    };

    

    return { placeSign, updateBoard, playRound }
})();


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


function Go() {
    for (let i = 0; i < 10; i++){
        gameFlow.playRound(getRandomInt(3), getRandomInt(3))
    }
}

console.log(xPlayer.name);
console.log(gameBoard.getBoard());





/*
const gameBoard = (function () {
    let gameArray = ["O","X","O","X","O","X","O","X","O"];
    return {gameArray};
})();

const gameFlow = (function () {

})();

function createPlayer (name, oX) {
    
    return { name, oX };
}

function displayBoard() {
    let i = 0;
    boxesArr.forEach(element => {
        element.textContent = gameBoard.gameArray[i];
        i++;
    });

}
const board = document.getElementById("gameboard");
const boxes = document.querySelectorAll(".box");
const boxesArr = Array.from(boxes);
displayBoard();
*/