module.exports = function solveSudoku(matrix) {
  // your solution
  let sudoku = matrix.slice();
  solve(sudoku, 0, 0);
  return sudoku;

  function isThereSameNumberInRow(sudoku, row, number) {
    for (let col = 0; col < 9; col++) {
      if (sudoku[row][col] === number) {
        return true;
      }
    }
    return false;
  }

  function isThereSameNumberInColumn(sudoku, col, number) {
    for (let row = 0; row < 9; row ++) {
      if (sudoku[row][col] === number) {
        return true;
      }
    }
    return false;
  }

  function isThereSameNumberInSquare(sudoku, row, col, number) {
    row = Math.floor(row / 3) * 3;
    col = Math.floor(col / 3) * 3;

    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      for (let colIndex = 0; colIndex < 3; colIndex++) {
        if (sudoku[row + rowIndex][col + colIndex] === number) {
          return true;
        }
      }
    }
    return false;
  }

  function canNumberBePlaced(sudoku, row, col, number) {
    return !isThereSameNumberInRow(sudoku, row, number)
      && !isThereSameNumberInColumn(sudoku, col, number)
      && !isThereSameNumberInSquare(sudoku, row, col, number);
  }

  function getNextSudokuCell(sudoku, row, col) {
    for (row; row < 9; row++) {
      for (col = 0; col < 9; col++) {
        if (sudoku[row][col] === 0) {
          return [row, col];
        }
      }
    }
    return null;
  }

  function solve(sudoku, row, col) {
    let nextCellCoordinates = getNextSudokuCell(sudoku, row, col);

    if (nextCellCoordinates === null) {
      return true;
    }

    row = nextCellCoordinates[0];
    col = nextCellCoordinates[1];

    for (let number = 1; number <= 9; number++) {
      if (canNumberBePlaced(sudoku, row, col, number)) {
        sudoku[row][col] = number;
        if (solve(sudoku, row, col)) {
          return true;
        }
        sudoku[row][col] = 0;
      }
    }
    return false;
  }
}

