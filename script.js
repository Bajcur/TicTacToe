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

    function checkWin(){
        const value = activePlayer.sign;
        for (let i = 0; i < 3; i++) {
            const arr = board[i].filter((el) => el === value);
            if(arr.length === 3){
                console.log("yes");
            }
        }
    }

    const updateBoard = () => console.log(board);

    function playRound(row, column) {
        placeSign(row, column);
        updateBoard();
        checkWin();
        //switchPlayers();
        
    };

    

    return { placeSign, updateBoard, playRound }
})();




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