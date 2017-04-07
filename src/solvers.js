/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var newBoard = new Board({n : n});
  var possiblePositions = [];
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      possiblePositions.push([i, j]);
    }
  }

  function rookAdder(rooksLeft, positionsLeft){

    if(rooksLeft === 0){
      return newBoard.rows();
    }
    for (var i = 0; i < positionsLeft.length; i++) {
      var yPos = positionsLeft[i][0];
      var xPos = positionsLeft[i][1];
      newBoard.togglePiece(yPos, xPos);
      if(!newBoard.hasRowConflictAt(yPos) && !newBoard.hasColConflictAt(xPos)){
        var newPossibilities = positionsLeft.filter(function(tuple){
          return !(tuple[0] === yPos || tuple[1] === xPos);
        })
        return rookAdder(rooksLeft - 1, newPossibilities);
      } else {
        newBoard.togglePiece(yPos, xPos);
      }
    }
  }

rookAdder(n, possiblePositions);
return newBoard.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var newBoard = new Board({n : n});
  var possiblePositions = [];
  var solutionCount = 0;
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      possiblePositions.push([i, j]);
    }
  }

  function rookAdder(rooksLeft, positionsLeft){
    var rooksOnBoard = newBoard.rows().reduce(function(a,b){
      return a + b.reduce(function(a, b){
        return a + b;
      })
    }, 0)
    if(rooksLeft === 0 && rooksOnBoard === n){
      solutionCount++;
    }
    if(positionsLeft.length === 0){
      return;
    }
    for (var i = 0; i < positionsLeft.length; i++) {
      var yPos = positionsLeft[i][0];
      var xPos = positionsLeft[i][1];
      newBoard.togglePiece(yPos, xPos);
      if(!newBoard.hasAnyRooksConflicts()){
        var newPossibilities = positionsLeft.filter(function(tuple){
          return !(tuple[0] === yPos || tuple[1] === xPos) && tuple[0] > yPos;
        })
        rookAdder(rooksLeft - 1, newPossibilities);
        newBoard.togglePiece(yPos, xPos);
      } else {
        newBoard.togglePiece(yPos, xPos);
      }
    }
  }

rookAdder(n, possiblePositions);
return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var newBoard = new Board({n : n});
  var possiblePositions = [];
  var solution = [];

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      possiblePositions.push([i, j]);
    }
  }

  function queenAdder(queensLeft, positionsLeft){
    var queensOnBoard = newBoard.rows().reduce(function(a,b){
      return a + b.reduce(function(a, b){
        return a + b;
      })
    }, 0)
    if(queensLeft === 0 && queensOnBoard === n){
      console.log(JSON.stringify(newBoard.rows()),'queensOnBoard', queensOnBoard, n)
      solution = newBoard.rows();
    }




    if(positionsLeft.length === 0){
      return;
    }
    for (var i = 0; i < positionsLeft.length; i++) {
      var yPos = positionsLeft[i][0];
      var xPos = positionsLeft[i][1];
      newBoard.togglePiece(yPos, xPos);
      if (!newBoard.hasAnyQueensConflicts()) {
        var newPossibilities = positionsLeft.filter(function(tuple){
          return !(tuple[0] === yPos || tuple[1] === xPos) && tuple[0] > yPos;
        })
        queenAdder(queensLeft - 1, newPossibilities);
        if(solution){
          return solution
        }
        newBoard.togglePiece(yPos, xPos);
      } else {
        newBoard.togglePiece(yPos, xPos);
      }
    }
  }

queenAdder(n, possiblePositions);
console.log(JSON.stringify(solution))
return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var newBoard = new Board({n : n});
  var possiblePositions = [];
  var solutionCount = 0;
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      possiblePositions.push([i, j]);
    }
  }

  function rookAdder(rooksLeft, positionsLeft){
    var rooksOnBoard = newBoard.rows().reduce(function(a,b){
      return a + b.reduce(function(a, b){
        return a + b;
      })
    }, 0)
    if(rooksLeft === 0 && rooksOnBoard === n){
      solutionCount++;
    }
    if(positionsLeft.length === 0){
      return;
    }
    for (var i = 0; i < positionsLeft.length; i++) {
      var yPos = positionsLeft[i][0];
      var xPos = positionsLeft[i][1];
      newBoard.togglePiece(yPos, xPos);
      if(!newBoard.hasAnyQueensConflicts()){
        var newPossibilities = positionsLeft.filter(function(tuple){
          return !(tuple[0] === yPos || tuple[1] === xPos) && tuple[0] > yPos;
        })
        rookAdder(rooksLeft - 1, newPossibilities);
        newBoard.togglePiece(yPos, xPos);
      } else {
        newBoard.togglePiece(yPos, xPos);
      }
    }
  }

rookAdder(n, possiblePositions);
return solutionCount;
};
