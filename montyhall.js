document.addEventListener("DOMContentLoaded", () => {
  let prizeDoor;
  let selectedDoor;
  let revealedDoor;
  let doorsClicked = false;

  const doors = document.querySelectorAll(".door");
  const startGameButton = document.getElementById("startGame");
  const hostActionSection = document.getElementById("hostAction");
  const resultSection = document.getElementById("result");
  const hostMessage = document.getElementById("hostMessage");
  const switchButton = document.getElementById("switch");
  const stickButton = document.getElementById("stick");
  const playAgainButton = document.getElementById("playAgain");

  function resetGame() {
    prizeDoor = Math.ceil(Math.random() * 3);
    selectedDoor = null;
    revealedDoor = null;
    doorsClicked = false;

    doors.forEach(door => {
      const inner = door.querySelector(".door-inner");
      const back = door.querySelector(".door-back");
      inner.classList.remove("open");
      back.style.backgroundImage = "url('placeholder.png')";
      door.classList.remove("disabled");
    });

    hostActionSection.style.display = "none";
    resultSection.style.display = "none";
  }

  function revealHostDoor() {
    const possibleDoors = [1, 2, 3].filter(
      door => door !== selectedDoor && door !== prizeDoor
    );
    revealedDoor = possibleDoors[Math.floor(Math.random() * possibleDoors.length)];

    const doorToReveal = document.querySelector(`.door[data-door="${revealedDoor}"]`);
    const inner = doorToReveal.querySelector(".door-inner");
    const back = doorToReveal.querySelector(".door-back");
    back.style.backgroundImage = "url('goat.png')";
    inner.classList.add("open");

    hostActionSection.style.display = "block";
    hostMessage.textContent = "Would you like to switch your choice or stick with it?";
  }

  function revealFinalChoice(isSwitching) {
    const finalChoice = isSwitching
      ? [1, 2, 3].find(door => door !== selectedDoor && door !== revealedDoor)
      : selectedDoor;

    const chosenDoor = document.querySelector(`.door[data-door="${finalChoice}"]`);
    const inner = chosenDoor.querySelector(".door-inner");
    const back = chosenDoor.querySelector(".door-back");
    back.style.backgroundImage = finalChoice === prizeDoor ? "url('car.png')" : "url('goat.png')";
    inner.classList.add("open");

    const outcome = finalChoice === prizeDoor ? "You won the car! 🚗" : "You got a goat! 🐐";
    document.getElementById("outcomeMessage").textContent = outcome;
    resultSection.style.display = "block";
  }

  doors.forEach(door => {
    door.addEventListener("click", (event) => {
      event.stopPropagation();

      if (doorsClicked) return;

      const clickedDoor = parseInt(door.dataset.door);

      if (selectedDoor || revealedDoor) {
        return;
      }

      selectedDoor = clickedDoor;
      doorsClicked = true;
      revealHostDoor();
    });
  });

  switchButton.addEventListener("click", () => {
    revealFinalChoice(true);
  });

  stickButton.addEventListener("click", () => {
    revealFinalChoice(false);
  });

  playAgainButton.addEventListener("click", resetGame);

  startGameButton.addEventListener("click", resetGame);

  resetGame();
});
