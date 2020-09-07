/*
  Minimax Tic-Tac-Toe Player
*/

import { switchPlayer } from './board';

// Setup a scoring object for scoring completed boards.
const SCORES = {
  X: 1,
  Draw: 0,
  O: -1,
};

/**
 * Takes the current board and the player to make the move and returns the move which minimizes the maximum loss.
 * @param {TTTBoard} board - Takes a representation of the TTTBoard Class.
 * @param {String} player - The player for which the best move should be calculated.
 */
function mmMove(board, player) {
  let checkWin = board.checkWin();

  // If the current board has completed return the associated score
  // along with -1 indicating that the board has completed.
  if (checkWin !== null) {
    return [SCORES[checkWin], -1];
  } else {
    // Setup an object to keep track of all possible results at each level of the tree.
    const movesFound = {
      [SCORES.X]: [],
      [SCORES.Draw]: [],
      [SCORES.O]: [],
    };

    // Call all the available moves at each level and recursively calculate the scores.
    for (let move of board.getEmptySquares()) {
      let clonedBoard = board.clone();
      clonedBoard.move(move, player);
      let [score] = mmMove(clonedBoard, switchPlayer(player));
      movesFound[score].push(move);
    }

    // Maximize the scores within the movesFound object.
    let scores = [];
    for (let score in movesFound) {
      if (movesFound[score].length > 0) {
        scores.push(score * SCORES[player]);
      }
    }

    // Return any element of the array having the maximum score.
    let score = Math.max(...scores) * SCORES[player];
    const scoresArray = movesFound[score];
    return [score, scoresArray[Math.floor(Math.random() * scoresArray.length)]];
  }
}

/**
 * Takes the current board and the player to make the move and in turn calls mmMove.
 * @param {TTTBoard} board - Takes a representation of the TTTBoard Class.
 * @param {String} player - The player for which the best move should be calculated.
 */
function moveWrapper(board, player) {
  const move = mmMove(board, player);
  return move[1] !== -1 ? move[1] : 'Returned invalid move -1';
}

export default moveWrapper;
