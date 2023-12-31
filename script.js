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

const oPlayer = createPlayer("O Player", "O");
const xPlayer = createPlayer("X Player", "X");

const gameFlow = (function () {
    let activePlayer = oPlayer;
    let board = gameBoard.getBoard();
    let correct = 1;
    function placeSign(row, column) {
        if (board[row][column] === "") {
            board[row][column] = activePlayer.sign;
            correct = 1;
            return board;
        } else {
            console.log("This cell is already occupied.");
            correct = 0;
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
                //console.log("yes");
            }
        }
        for (let i = 0; i < 3; i++) {
            const arr = trans[i].filter((el) => el === value);
            if(arr.length === 3){
                gameScore = 10;
                //console.log("yes");
            }
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] != "" && gameScore < 10) {
                    gameScore++;
                    //console.log(gameScore);
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
    const updateBoard = () => console.log(board);
    const getPlayerName = () => activePlayer.name;
    const ifCorrect = () => correct;
    

    

    

    return { placeSign, updateBoard, switchPlayers, checkWin, getPlayerName, ifCorrect}
})();

function playRound(row, column) {
    gameFlow.placeSign(row, column);
    if(gameFlow.ifCorrect() === 1) {        
        gameFlow.updateBoard();
        if (gameFlow.checkWin() === 9) {
            console.log("It's a tie! Play again if you want!");
            gameConclusion.tie();
        } else if (gameFlow.checkWin() === 10) {
            console.log("It's a Win!");
            gameConclusion.win();
        } else {
            gameFlow.switchPlayers();
        }
    }

};

function randomAi() {
    xPlayer.name = "Random bot";
    const randomNumber = () => {
        return Math.floor(Math.random() * 3);
      }    
    let board = gameBoard.getBoard();
    let row = randomNumber();
    let column = randomNumber();
    if (board[row][column] === "") {
        //
        playRound(row, column);
    } else {
        randomAi();
    }
}

function playGame(row, column) {
    if (gameFlow.checkWin() < 9) {
        playRound(row, column);
    }
    if (gameFlow.checkWin() < 9 && gameFlow.ifCorrect() === 1) {
        randomAi();
    }
}

const theBoard = (function () {
    const fields = document.querySelectorAll(".box");
    const fieldsArr = Array.from(fields);
    const startButton = document.getElementById("start");
    const options = document.getElementById("options");
    const pvp = document.getElementById("pvp");
    const pveRandomAI = document.getElementById("pve-random");
    const submitBtn = document.getElementById("submitBtn");
    const restartBtn = document.getElementById("restart");
    const fieldset = document.getElementById("players");
    const setup = document.getElementById("setup");
    const conclusion = document.getElementById("conclusion-text");
    return { fieldsArr, startButton, options, pvp, pveRandomAI, submitBtn, fieldset, restartBtn, setup, conclusion }
})();

function boardPrint() {
    let board = gameBoard.getBoard();
    theBoard.fieldsArr.forEach((field) => {
        field.textContent = board[field.id[0]][field.id[1]]
    })
}

const gameModes = (function () {
    //player vs Random AI
    theBoard.pveRandomAI.addEventListener('click', () =>  {
        theBoard.fieldsArr.forEach((field) => {
            field.addEventListener('click', () => {
                playGame(field.id[0],field.id[1]);
                boardPrint();
            })
        });
        theBoard.pveRandomAI.disabled = true;
        theBoard.pvp.disabled = true;
        theBoard.fieldsArr.forEach((field) => {
            field.disabled = true;
                });
    });
    //player vs player
    theBoard.pvp.addEventListener('click', () => {
        theBoard.fieldsArr.forEach((field) => {
            field.addEventListener('click', () => {
                playRound(field.id[0],field.id[1]);
                boardPrint();
                });
        });
        theBoard.fieldsArr.forEach((field) => {
            field.disabled = true;
                });
        theBoard.pveRandomAI.disabled = true;
        theBoard.pvp.disabled = true;
        const div = document.createElement("div");
        div.setAttribute("class", "input");
        div.setAttribute("id", "xPlayerName");
        const xPlayerInput = document.createElement("input");
        xPlayerInput.setAttribute("type", "text");
        xPlayerInput.setAttribute("name", "X");
        xPlayerInput.setAttribute("id", "xPlayer");
        const xPlayerLabel = document.createElement("label");
        xPlayerLabel.setAttribute("for", "xPlayer");
        xPlayerLabel.textContent = "X Player Name";
        theBoard.fieldset.appendChild(div);
        div.appendChild(xPlayerLabel);
        div.appendChild(xPlayerInput);
    });
    //player vs unbeatable AI
})();

const startButton = (function () {
    theBoard.startButton.addEventListener('click', () => {
        theBoard.fieldsArr.forEach((field) => {
            field.disabled = false;
            });
    });
})();

const gameConclusion = (function () {
    const win = () => theBoard.conclusion.textContent = `${gameFlow.getPlayerName()} is a winner!`;
    const tie = () => theBoard.conclusion.textContent = `It's a tie!`;
    const getDiv = () => theBoard.conclusion;
    return { win, tie, getDiv }
})();

const reset = (function () {
    theBoard.restartBtn.addEventListener("click", () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                gameBoard.getBoard()[i][j] = "";
            }
        };
        boardPrint();
        theBoard.pveRandomAI.disabled = false;
        theBoard.pvp.disabled = false;
        //theBoard.switchButton.disabled = false;
        theBoard.fieldsArr.forEach((field) => {
            field.replaceWith(field.cloneNode(true));
        });
        const fields = document.querySelectorAll(".box");
        theBoard.fieldsArr = Array.from(fields);
        if(document.getElementById("xPlayerName") != null) {
            document.getElementById("xPlayerName").remove();
        }
        gameConclusion.getDiv().textContent = "";
    })
})();

const createPlayers = (function () {
    theBoard.submitBtn.addEventListener("click", (event) => {
        event.preventDefault();
        oPlayer.name = document.getElementById("oPlayer").value;
        console.log(typeof(document.getElementById("xPlayer")));
        if(document.getElementById("xPlayer") != null) {
            xPlayer.name = document.getElementById("xPlayer").value;
        }
    });
})();