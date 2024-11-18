document.addEventListener("DOMContentLoaded", () => {
    let prizeDoor; 
    let selectedDoor; 
    let revealedDoor; 
    let doorsClicked = false; // Flag to check if any door has been clicked
  
    const doors = document.querySelectorAll(".door"); // Get all the door elements
    const startGameButton = document.getElementById("startGame");
    const hostActionSection = document.getElementById("hostAction");
    const resultSection = document.getElementById("result");
    const hostMessage = document.getElementById("hostMessage");
    const switchButton = document.getElementById("switch");
    const stickButton = document.getElementById("stick");
    const playAgainButton = document.getElementById("playAgain");
  
    // Function to reset the game
    function resetGame() {
      prizeDoor = Math.ceil(Math.random() * 3); // Randomly set which door has the car
      selectedDoor = null; // Reset selected door
      revealedDoor = null; // Reset revealed door
      doorsClicked = false; // Reset click status
  
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
  
    // Function to reveal the host's door (which has a goat)
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
  
    // Function to reveal the final result after the user makes a choice
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
  
    // Event listener for door clicks
    doors.forEach(door => {
      door.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent event bubbling
  
        if (doorsClicked) return; // Prevent multiple clicks after the first one
  
        const clickedDoor = parseInt(door.dataset.door);
  
        if (selectedDoor || revealedDoor) {
          // If a door has already been selected or revealed, prevent further clicks
          return;
        }
  
        selectedDoor = clickedDoor; // Set the selected door
        doorsClicked = true; // Mark that a door has been clicked
        revealHostDoor(); // Reveal a goat behind one of the other doors
      });
    });
  
    // Event listener for switching doors
    switchButton.addEventListener("click", () => {
      revealFinalChoice(true); // Reveal the final choice after switching
    });
  
    // Event listener for sticking with the selected door
    stickButton.addEventListener("click", () => {
      revealFinalChoice(false); // Reveal the final choice after sticking with the original door
    });
  
    // Event listener for playing again
    playAgainButton.addEventListener("click", resetGame);
  
    // Event listener for starting the game
    startGameButton.addEventListener("click", resetGame);
  
    resetGame(); // Initialize the game when the page loads
  });
  