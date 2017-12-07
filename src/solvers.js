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

window.matricize = function(obj) {
  var matrices = [];
  for (var arr in obj) {
    if (Array.isArray(obj[arr])) {
      matrices.push(obj[arr]);
    }
  }
  return matrices;
}

window.findNRooksSolution = function(n) {
  var arg = {n: n};
  var solution = new Board(arg);
  var numRows = arg.n;
  var rowLength = arg.n;
  
  for (var i = 0; i < numRows; i++) {
    var currentArr = solution.get(i);
    for (var j = 0; j < rowLength; j++) {
      currentArr[j] = 1;
      solution.set(i, currentArr);
      if (solution.hasAnyRooksConflicts()) {
        currentArr[j] = 0;
        solution.set(i, currentArr);
      }
    }
  }

  console.log('Single solution for ' + n.n + ' rooks:', JSON.stringify(solution));
  return matricize(solution.attributes);
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var arg = {n: n}; 
  var solution = new Board(arg);
  var numRows = arg.n;
  var rowLength = arg.n;
  var uniqueQueenStart = 0;
  
  var setStartPosition = function(uniqueQueenStart) {
    // if(uniqueQueenStart === 4) {
    // debugger;
    // }
    var rowIndex = Math.floor(uniqueQueenStart / n);
    var colIndex = uniqueQueenStart % n;

    if(uniqueQueenStart === n * n) {
      rowIndex = rowIndex - 1;
      colIndex = n - 1;
    }
    
    var currentRow = solution.get(rowIndex);
    currentRow[colIndex] = 1;
    solution.set(rowIndex, currentRow);    
  }

  while(uniqueQueenStart < n * n + 1) {
    setStartPosition(uniqueQueenStart);
    uniqueQueenStart++;
    var queensPlaced = 1;
    if(queensPlaced === arg.n) {
      return matricize(solution.attributes);
    }
    for (var i = 0; i < numRows; i++) {
      var currentArr = solution.get(i);
      for (var j = 0; j < rowLength; j++) {
        if(currentArr[j] === 0) {
          currentArr[j] = 1;
          solution.set(i, currentArr);
          queensPlaced++;
        }
        if (solution.hasAnyQueensConflicts()) {
          currentArr[j] = 0;
          solution.set(i, currentArr);
          queensPlaced--;
        }
        if(queensPlaced === arg.n) {
          debugger;
          return matricize(solution.attributes);
        }
      }
    }
    solution = new Board(arg);
  }
  console.log('Single solution for ' + arg.n + ' queens:', JSON.stringify(solution));
  return false;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
