let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// Two Players: PlayerX , PlayerO;
let turnO = true;
let movesCount = 0; // Keep track of the number of moves

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (box.innerText === "") {
      box.innerText = turnO ? "O" : "X";
      turnO = !turnO;
      box.disabled = true;
      movesCount++; // Increment move count
      checkWinner();
    }
  });
});

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    msgContainer.classList.add("show");
    disableAllBoxes();
};

const showTie = () => {
    msg.innerText = "It's a Tie!";
    msgContainer.classList.remove("hide");
    msgContainer.classList.add("show");
};

const disableAllBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const resetGame = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    msgContainer.classList.add("hide");
    msgContainer.classList.remove("show");
    turnO = true;
    movesCount = 0; // Reset move count
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return;
        }
    }

    // Check for a tie if all boxes are filled and no winner is found
    if (movesCount === 9) {
        showTie();
    }
};
