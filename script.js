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
        board[row][column] = activePlayer.sign;
        return board;
    }
    const updateBoard = () => console.log(gameBoard.getBoard());

    return { placeSign, updateBoard }
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