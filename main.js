
// Using NaN instead of null is a clever hack. See checkForWinner for details.
var spaces = [
  NaN, NaN, NaN,
  NaN, NaN, NaN,
  NaN, NaN, NaN
];

var player1 = 'veggies';
var player2 = 'junkfood';
var currentPlayer = null;
var gameOver = true;

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
    || spaces[2] === spaces[4] && spaces[6] === spaces[6]
    
    || spaces[0] === spaces[3] && spaces[3] === spaces[6]
    || spaces[1] === spaces[4] && spaces[4] === spaces[7]
    || spaces[3] === spaces[5] && spaces[5] === spaces[8]
  )
  {
    console.log('somebody won');
    // TODO: Trigger 'game-win' event with the winning player as the event data
    $(document).trigger('game-win', currentPlayer);
  }
};

$(document).on('click', '#board .space', function (e) {
  if (gameOver) {
    var spaceNum = $(e.currentTarget).index();

    if (spaces[spaceNum] === player1 || spaces[spaceNum] === player2) {
      alert("Occupied! Pick another space.");
    } else {
      console.log('You clicked on space #' + spaceNum);
      // Marks the space with the current player's name
      // TODO: Don't mark it unless the space is blank
      spaces[spaceNum] = currentPlayer;
      // Adds a class to elem so css can take care of the visuals
      $('#board .space:eq(' + spaceNum + ')').addClass(currentPlayer);
      setNextTurn();
    }
    checkForWinner();
  } else {
    alert("Game is over. Press 'Start New Game' to start new game.");
  }
});

$(document).on('game-win', function (e, winner) {
  // TODO: Alert who won the game
  alert("You are the winner, " + winner + "!");
  gameOver = false;
});

$('#start-game').on('click', function(){
  $('#board .space').removeClass('junkfood');
  $('#board .space').removeClass('veggies');
  spaces = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN];
  gameOver = true;
});

// Start the game
setNextTurn();