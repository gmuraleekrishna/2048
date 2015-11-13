import _ from 'lodash';

class GameEngine {
  constructor(board) {
    this.board = board;
    this.score = 0;
    this.isMoved = false;
  }

  transpose(m) {
     for (var i = 0; i < m.length; i++) {
         for (var j = i; j < m[0].length; j++) {
             var x = m[i][j];
             m[i][j] = m[j][i];
             m[j][i] = x;
         }
     }
     return m;
   };

   rotate90Left(m) {
     return this.transpose(m).reverse();
   };

   rotate90Right(m) {
     return this.transpose(m.reverse());;
   };

  moveUp() {
    this.isMoved = true;
    var rotatedBoard = this.rotate90Right(this.board);
    this.moveRight();
    this.board = this.rotate90Left(this.board)
  }

  moveDown() {
    this.isMoved = true;
    var rotatedBoard = this.rotate90Right(this.board);
    this.moveLeft();
    this.board = this.rotate90Left(this.board)
  }

  moveRight() {
    this.isMoved = true;
    this.board = this.board.map((row) => {
      return this.mergeArray(row.reverse()).reverse();
    });
  }

  moveLeft() {
    this.isMoved = true;
    this.board = this.board.map((row) => {
      return this.mergeArray(row);
    });
  }

  getColumn(colIndex) {
    return this.board.map((row) => {
      return row[colIndex];
    })
  }

  mergeArray(array) {
    var i, j, nonEmptyTiles = [], mergedArray  = [] ;

    nonEmptyTiles = array.filter((value) => { return value != 0 });

    for(i = 0; i < nonEmptyTiles.length; i++) {
      if(i === nonEmptyTiles.length - 1) {
        mergedArray.push(nonEmptyTiles[i]);
      } else {
        if (nonEmptyTiles[i] === nonEmptyTiles[i+1]) {
          var total = nonEmptyTiles[i] * 2;
          mergedArray.push(total);
          this.score += total;
          i++;
        } else {
          mergedArray.push(nonEmptyTiles[i]);
        }
      }
    }

    for( i = mergedArray.length; i < array.length; i++)
      mergedArray[i] = 0

    return mergedArray;
  }

  reset() {
    this.board = [
                  [0, 0, 4, 0],
                  [0, 0, 0, 0],
                  [0, 0, 2, 0],
                  [0, 0, 0, 0],
                ];
    this.isMoved = false;
  }

  emptyCells() {
    var emptyCells= [];
    this.board.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
          if( value === 0) {
            emptyCells.push([rowIndex, colIndex]);
          }
        });
    });
    return emptyCells;
  }

  findCell(rowIndex, colIndex) {
    if( rowIndex > 3 || colIndex < 0 ||
        rowIndex < 0 || colIndex > 3 ) {
          return null;
    } else {
        return this.board[rowIndex][colIndex];
    }
  }

  randomValue() {
    return _.sample([2, 4]);
  }

  createRandomCell() {
    var value = this.randomValue();
    var  emptyCell = _.sample(this.emptyCells()) || [];
    if(emptyCell.length) {
      this.board[emptyCell[0]][emptyCell[1]] = value;
    }
  }

  neighbours(rowIndex, colIndex) {
    var leftCenter = this.findCell(rowIndex, colIndex - 1);
    var rightCenter = this.findCell(rowIndex, colIndex + 1);
    var topCenter = this.findCell(rowIndex - 1, colIndex);
    var bottomCenter = this.findCell(rowIndex + 1, colIndex);

    return [leftCenter, topCenter, rightCenter, bottomCenter]
  }

  anyMove(rowIndex, colIndex) {
    var cellValue = this.board[rowIndex][colIndex];
    var neighbours = this.neighbours(rowIndex, colIndex);

    var moves = (_.filter(neighbours, (value) => {
      return value != null && (cellValue === value || value === 0);
    }));
    return moves.length > 0;
  }

  isGameOver() {
    var moveMap = this.board.map((row, rowIndex) => {
                    return row.map((value, colIndex) => {
                      return this.anyMove(rowIndex, colIndex);
                    });
                  });
    var flattenedMap = [].concat.apply([], moveMap);
    var anyMoveLeft = _.some(flattenedMap, (move) => { return move; });
    return !anyMoveLeft;
  }

  run() {
    if(!this.isGameOver() && this.isMoved) {
      this.createRandomCell();
    }
    return { board: this.board, score: this.score };
  }
}
export default GameEngine;
