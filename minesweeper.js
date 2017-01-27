document.addEventListener('DOMContentLoaded', startGame)

var board = {
  cells: []
}

function numberedCell (rowNum, colNum) {
  var cell = {
    row: rowNum,
    col: colNum,
    isMine: mineGenerator(),
    hidden: true,
    isMarked: false
  }
  return cell
}

function fillBoard (board, rows, cols) {
  board.cells = []
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      var newCell = numberedCell(i,j)
      board.cells.push(newCell)
    }
  }
  return board
}

function mineGenerator() {
    return Math.random() < 0.2;
}

function startGame () {
  fillBoard(board, 5, 5)
  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
  reloadAndDrawBoard()
}

function reloadAndDrawBoard () {
  var domBoard = document.getElementsByClassName('board')[0]
  while (domBoard.firstChild) {
      domBoard.removeChild(domBoard.firstChild);
  }
  domBoard.addEventListener("click", checkForWin);
  domBoard.addEventListener("contextmenu", checkForWin);
  document.getElementById("reset").addEventListener("click", hideBoard);
  document.getElementById("newgame").addEventListener("click", startGame)

  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}



function hideBoard () {
  displayMessage("Bury all the zombunnies")
  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].hidden = true;
    board.cells[i].isMarked = false;
    board.cells[i].isProcessed = false;
  }
  reloadAndDrawBoard()
}


// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  for (var i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine === true && board.cells[i].isMarked === true) {
    }
    else if (board.cells[i].isMine === false && board.cells[i].hidden === false) {
    }
    else {
      return
    }
  }
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  var surroundingCells = lib.getSurroundingCells(cell.row, cell.col);
  var count = 0
  for (var i = 0; i < surroundingCells.length; i++) {
    if (surroundingCells[i].isMine === true) {
      count = count + 1;
    }
  }
  return count
}
