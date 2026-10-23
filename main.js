document.addEventListener("DOMContentLoaded", () => {
  const username = prompt("Введіть імʼя");
  if (!username || !username.trim().length) {
    return alert("Ви не ввели імʼя, перезавантажте сторінку.");
  }

  const wins = { user: 0, computer: 0 };
  const user = createUser(username);
  const computer = createUser("Computer");
  const { button } = createGenerateButton();

  button.addEventListener("click", () => {
    const { userNumber, computerNumber } = generateNumbers();

    user.currentNumber.textContent = userNumber;
    computer.currentNumber.textContent = computerNumber;

    if (userNumber > computerNumber) {
      wins.user++;
      user.winsCounter.textContent = wins.user;
    } else {
      wins.computer++;
      computer.winsCounter.textContent = wins.computer;
    }

    if (wins.user >= 3 || wins.computer >= 3) {
      console.log(
        "wins.user = ",
        wins.user,
        " wins.computer = ",
        wins.computer,
      );
      const winner = wins.user > wins.computer ? username : "Computer";

      if (winner) {
        alert(`Переможець – ${winner}!`);
        user.winsCounter.textContent = "0";
        user.currentNumber.textContent = "0";
        computer.winsCounter.textContent = "0";
        computer.currentNumber.textContent = "0";
        wins.user = 0;
        wins.computer = 0;
      }
    }
  });

  const container = document.createElement("div");
  container.classList.add("container");
  container.append(user.container, button, computer.container);
  document.body.append(container);
});

function generateNumbers() {
  const userNumber = Math.floor(Math.random() * 10);
  const computerNumber = Math.floor(Math.random() * 10);

  if (userNumber === computerNumber) {
    return generateNumbers();
  }

  return {
    userNumber,
    computerNumber,
  };
}

function createGenerateButton() {
  const button = document.createElement("button");
  button.classList.add("generate-button");
  button.textContent = "Generate";

  return {
    button,
  };
}

function createUser(name) {
  const container = document.createElement("div");
  container.classList.add("user-container");

  const username = document.createElement("span");
  username.classList.add("user-name");
  username.textContent = name;

  const winsCounter = document.createElement("span");
  winsCounter.classList.add("user-counter");
  winsCounter.textContent = "0";

  const currentNumber = document.createElement("span");
  currentNumber.classList.add("user-current-number");
  currentNumber.textContent = "0";

  container.append(username, winsCounter, currentNumber);

  return {
    container,
    winsCounter,
    currentNumber,
  };
}
