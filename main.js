
// Using NaN instead of null is a clever hack. See checkForWinner for details.
var spaces = [
  NaN, NaN, NaN,
  NaN, NaN, NaN,
  NaN, NaN, NaN
];

var player1 = 'veggies';
var player2 = 'junkfood';
var currentPlayer = null;
var gameOver = false;

var setNextTurn = function () {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  }
  else {
    currentPlayer = player1;
  }
  $('#turn-label').text(currentPlayer);
};

var checkForWinner = function () {
  // Because (NaN === NaN) is always false, we can safely assume
  // that if three spaces in a row are the same, all three spaces are
  // marked by a player, and not all empty.

  if ( spaces[0] === spaces[1] && spaces[1] === spaces[2]
    || spaces[3] === spaces[4] && spaces[4] === spaces[5]
    || spaces[6] === spaces[7] && spaces[7] === spaces[8]
    // TODO: Check for rest of game winning cases
    || spaces[0] === spaces[4] && spaces[4] === spaces[8]
    || spaces[2] === spaces[4] && spaces[4] === spaces[6]
    
    || spaces[0] === spaces[3] && spaces[3] === spaces[6]
    || spaces[1] === spaces[4] && spaces[4] === spaces[7]
    || spaces[2] === spaces[5] && spaces[5] === spaces[8]
  )
  {
    console.log('somebody won');
    // TODO: Trigger 'game-win' event with the winning player as the event data
    $(document).trigger('game-win', currentPlayer);
  } else if ( 
    (spaces[0] === "veggies" || spaces[0] === "junkfood") && (spaces[1] === "veggies" || spaces[1] === "junkfood") && 
    (spaces[2] === "veggies" || spaces[2] === "junkfood") && (spaces[3] === "veggies" || spaces[3] === "junkfood") && 
    (spaces[4] === "veggies" || spaces[4] === "junkfood") && (spaces[5] === "veggies" || spaces[5] === "junkfood") && 
    (spaces[6] === "veggies" || spaces[6] === "junkfood") && (spaces[7] === "veggies" || spaces[7] === "junkfood") && 
    (spaces[8] === "veggies" || spaces[8] === "junkfood")){
    console.log("Tie game");
    $(document).trigger('game-tie');
  }
};

$(document).on('click', '#board .space', function (e) {
  var spaceNum = $(e.currentTarget).index();

  if (!gameOver) {
    if (spaces[spaceNum] === player1 || spaces[spaceNum] === player2) {
      alert("This space is occupied! Pick another space.")
    } else {
      console.log('You clicked on space #' + spaceNum);
      // Marks the space with the current player's name
      // TODO: Don't mark it unless the space is blank
      spaces[spaceNum] = currentPlayer;
      // Adds a class to elem so css can take care of the visuals
      $('#board .space:eq(' + spaceNum + ')').addClass(currentPlayer);
      checkForWinner();
      setNextTurn();
    }
  } else {
    alert("Game is over. " + currentPlayer + " won the game. Press 'Start New Game'.");
    gameOver = true;
  }
});

$(document).on('game-win', function (e, winner) {
  // TODO: Alert who won the game
  alert("You are the winner, " + winner + "!");
  gameOver = true;
});

$(document).on('game-tie', function (e) {
  alert("Tie game! It's a cat! Start new game.");
  gameOver = true;
});

// In a new game, clear the board space and initialize spaces matrix and reset gameOver status.
$('#new-game').on('click', function() {
  $('#board .space').removeClass('junkfood');
  $('#board .space').removeClass('veggies');
  spaces = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN];
  gameOver = false;
});

// Start the game
setNextTurn();