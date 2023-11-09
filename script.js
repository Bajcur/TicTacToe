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
    let ifContinue = 0;
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
    
        if (board[0][0] === value && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            gameScore = 10;
        }else if (board[2][0] === value && board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
            gameScore = 10;
        }
        
        return gameScore;
    };

    const gameResult = () => {
        const ifContinue = checkWin();
        console.log(ifContinue);
        if (ifContinue === 9) {
            console.log("It's a tie! Play again if you want!")
        } else if (ifContinue === 10) {
            console.log("It's a Win!")
        }
        return ifContinue;
    }

    const updateBoard = () => console.log(board);
    const cont = () => ifContinue;

    

    

    return { placeSign, updateBoard, gameResult, switchPlayers, checkWin, cont}
})();

function playRound(row, column) {
    gameFlow.placeSign(row, column);
    gameFlow.updateBoard();
    gameFlow.gameResult();
    gameFlow.switchPlayers();
};

function randomAi() {
    const randomNumber = () => {
        return Math.floor(Math.random() * 3);
      }    
    let board = gameBoard.getBoard();
    let row = randomNumber();
    let column = randomNumber();
    if (board[row][column] === "") {
        playRound(row, column);
    } else {
        randomAi();
    }
}

function playGame(row, column) {
    playRound(row, column);
    randomAi();
}






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