const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;
  const setBoard = (index, value) => {
    board[index] = value;
  };
  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  return { getBoard, setBoard, resetBoard };
})();

gameBoard.getBoard();

const displayController = (() => {
  // Add functions to update the game board display, display messages, etc.

  const renderBoard = () => {
    const board = gameBoard.getBoard();
    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell, index) => {
      cell.textContent = board[index];
    });
  };

  const showModal = (message) => {
    document.getElementById("modal-title").textContent = message;
    document.getElementById("modal").classList.remove("hidden");
    document.getElementById("modal").style.visibility = "visible"; // Add this line
  };

  const hideModal = () => {
    document.getElementById("modal").classList.add("hidden");
    document.getElementById("modal").style.visibility = "hidden"; // Add this line
  };

  return { renderBoard, showModal, hideModal };
})();

const playerFactory = (name, marker) => {
  return { name, marker };
};

const gameControler = (() => {
  let player1 = playerFactory("Player 1", "X");
  let player2 = playerFactory("Player 2", "O");
  let activePlayer = player1;

  const switchPlayer = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
  };

  const playTurn = (index) => {
    let board = gameBoard.getBoard();
    if (board[index] === "" && !checkWin()) {
      gameBoard.setBoard(index, activePlayer.marker);
      displayController.renderBoard();
      let winner = checkWin();
      if (winner) {
        displayController.showModal(`Player ${winner} wins!`);
        return;
      } else if (board.every((cell) => cell !== "")) {
        displayController.showModal("It's a tie!");
        return;
      }
      switchPlayer();
    }
  };

  const checkWin = () => {
    const board = gameBoard.getBoard();
    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let combo of winCombos) {
      if (
        board[combo[0]] !== "" &&
        board[combo[0]] === board[combo[1]] &&
        board[combo[0]] === board[combo[2]]
      ) {
        return board[combo[0]];
      }
    }
    return false;
  };

  const startGame = () => {
    
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => playTurn(index));
    });
    displayController.renderBoard();
  };

  return { startGame };
})();

gameControler.startGame();

document.getElementById("play-again").addEventListener("click", () => {
  gameBoard.resetBoard();
  displayController.renderBoard();
  displayController.hideModal();
});
