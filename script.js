'use strict'

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
console.log(boxesArr);