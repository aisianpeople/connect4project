const vsComputer = document.querySelector("#vs-computer");
vsComputer.addEventListener("click", vsSwap);
document.querySelector("#restart").addEventListener("click", restart);

var scorecard = document.querySelector("#scorecard");

var board;
var vsCom = true;
var oTurn = true;
var oscore = 0;
var qscore = 0;
var roundnumber = 1;


function vsSwap(){
    if(vsCom){
        vsComputer.textContent = "VS Player";
        vsCom = false;
    }else{
        vsComputer.textContent = "VS Computer";
        vsCom = true;
    }
}

function restart(){
    emptyBoard();
    var vsCom = true;
    var oTurn = true;
    document.querySelector("h1").textContent = "Connect 4";
    document.querySelector("#restart").textContent = "Restart";

    const boardCells = document.querySelectorAll('#connect4board td');
    for (let i = 0; i < boardCells.length; i++) {
        document.querySelector("#cell-" + i).style.backgroundColor = '#465e5f';
        boardCells[i].addEventListener("click", handleClick);
    }
}

function emptyBoard() {
    board = [null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null];
     
    updateBoard();
}

function handleClick(evt) {
    var cell = evt.currentTarget;
    makeHumanMove(parseInt(cell.id[5] + cell.id[6]));
}

function makeHumanMove(cellNumber) {
    if(vsCom){

        if (placePiece(cellNumber, "O")) {
            updateBoard();
    
            if (! checkGameOver()) {
                computerMove();
                updateBoard();
                checkGameOver();
            }
        }
    } else 
    {
        if(oTurn){
            if (placePiece(cellNumber, "O")) {
                updateBoard();
                oTurn = !oTurn;
                checkGameOver();
            }
        } else {
            if (placePiece(cellNumber, "Q")) {
                updateBoard();
                oTurn = !oTurn;
                checkGameOver();
            }
        }
    }
}

function computerMove() {
    placingPiece = true;
    while(placingPiece){
        if (placePiece(Math.floor(Math.random() * 9), "Q")) {
            return board;
        }
    }
}

function placePiece(cellNumber, pieceType) {
    while(cellNumber < 54){
        cellNumber += 9;
    }
    if (board[cellNumber] === null) {
        board[cellNumber] = pieceType;
        return true;
    }
    cellNumber -= 9;
    if (board[cellNumber] === null) {
        board[cellNumber] = pieceType;
        return true;
    }
    cellNumber -= 9;
    if (board[cellNumber] === null) {
        board[cellNumber] = pieceType;
        return true;
    }
    cellNumber -= 9;
    if (board[cellNumber] === null) {
        board[cellNumber] = pieceType;
        return true;
    }
    cellNumber -= 9;
    if (board[cellNumber] === null) {
        board[cellNumber] = pieceType;
        return true;
    }
    cellNumber -= 9;
    if (board[cellNumber] === null) {
        board[cellNumber] = pieceType;
        return true;
    }
    cellNumber -= 9;
    if (board[cellNumber] === null) {
        board[cellNumber] = pieceType;
        return true;
    }

    return false;
}

function updateBoard() {
    for (var i = 0; i < 63; i++) {
        var cell = board[i] || "";
        document.querySelector("#cell-" + i).textContent = cell;
        if (cell === "O") {
            document.querySelector("#cell-" + i).style.backgroundColor = "red";
        }else if(cell === "Q") {
            document.querySelector("#cell-" + i).style.backgroundColor = "yellow";
        }
    }
}

function checkGameOver() {
    var winner = findWinner();
    var gameOver = false;

    if (winner) {
        document.querySelector("h1").textContent = winner + " Won";

        let row = scorecard.insertRow(-1);

        let round = row.insertCell(0);
        let ohome = row.insertCell(1);
        let qaway = row.insertCell(2);

        round.textContent = roundnumber;
        roundnumber++;
        if(winner === "O"){
            oscore += 1;
            ohome.textContent = "W";
            ohome.style.backgroundColor = "lime";
            document.querySelector('#oscore').textContent = oscore;
            qaway.textContent = "L";
        }else{
            qscore += 1;
            ohome.textContent = "L";
            qaway.textContent = "W";
            qaway.style.backgroundColor = "lime";
            document.querySelector('#qscore').textContent = qscore;
        }

        gameOver = true;
    }

    else if (isBoardFull()) {
        document.querySelector("h1").textContent = "Tie!";

        let row = scorecard.insertRow(-1);

        let round = row.insertCell(0);
        let ohome = row.insertCell(1);
        let qaway = row.insertCell(2);

        round.textContent = roundnumber;
        roundnumber++;
        
        ohome.textContent = "T";
        qaway.textContent = "T";
        ohome.style.backgroundColor = "yellow";
        qaway.style.backgroundColor = "yellow";

        gameOver = true;
    }

    if (gameOver) {
        const boardCells = document.querySelectorAll('#connect4board td');
        for (let i = 0; i < boardCells.length; i++) {
            boardCells[i].removeEventListener("click", handleClick);
        }
        oTurn = true;
    }

    return gameOver;
}

function findWinner() {
    var cell;

    // horizontal
    for (var rowi = 0; rowi < 7; rowi++) {
        for (var coli = 0; coli < 6; coli++) {
            cell = board[xyToCell(coli, rowi)];
            if (cell !== null) {
                if ((board[xyToCell(coli+1, rowi)] === cell) &&
                    (board[xyToCell(coli+2, rowi)] === cell) &&
                    (board[xyToCell(coli+3, rowi)] === cell)) {
                        return cell;
                }
            }
        }
    }

    // vertical
    for (var coli = 0; coli < 9; coli++) {
        for (var rowi = 0; rowi < 4; rowi++) {
            cell = board[xyToCell(coli, rowi)];
            if (cell !== null) {
                if ((board[xyToCell(coli, rowi+1)] === cell) &&
                    (board[xyToCell(coli, rowi+2)] === cell) &&
                    (board[xyToCell(coli, rowi+3)] === cell)) {
                        return cell;
                }
            }
        }
    }

    // diagonal /
    for (var coli = 0; coli < 6; coli++) {
        for (var rowi = 0; rowi < 4; rowi++) {
            cell = board[xyToCell(coli, rowi)];
            if (cell !== null) {
                if ((board[xyToCell(coli+1, rowi+1)] === cell) &&
                    (board[xyToCell(coli+2, rowi+2)] === cell) &&
                    (board[xyToCell(coli+3, rowi+3)] === cell)) {
                        return cell;
                }
            }
        }
    }
    
    for (var coli = 3; coli < 9; coli++) {
        for (var rowi = 0; rowi < 4; rowi++) {
            cell = board[xyToCell(coli, rowi)];
            if (cell !== null) {
                if ((board[xyToCell(coli-1, rowi+1)] === cell) &&
                    (board[xyToCell(coli-2, rowi+2)] === cell) &&
                    (board[xyToCell(coli-3, rowi+3)] === cell)) {
                        return cell;
                }
            }
        }
    }
}

function xyToCell(x, y) {
    return y * 9 + x;
}

function isBoardFull() {
    for (var i = 0; i < 63; i++) {
        if (!board[i]) {
            return false;
        }
    }
    return true;
}