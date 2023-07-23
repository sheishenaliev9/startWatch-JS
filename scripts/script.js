const second = document.querySelector(".second");
const minute = document.querySelector(".minute");
const hour = document.querySelector(".hour");

const stopBtn = document.querySelector("#stopBtn");
const startBtn = document.querySelector("#startBtn");
const clearBtn = document.querySelector("#clearBtn");
const clearResultsBtn = document.querySelector("#clearResultsBtn");

const blockResults = document.querySelector(".blockResults");

let timer;
let secCounter = 0;
let minCounter = 0;
let hourCounter = 0;
let isStarted = false;

let allResults = [];

// Функция для рендера результатов
function renderResults() {
  blockResults.innerHTML = "";
  allResults.forEach((result) => {
    const resultBlock = document.createElement("div");
    resultBlock.classList.add("resultBlock");
    resultBlock.innerHTML = `${result.hour} hour. ${result.min} min. ${result.sec} sec.`;

    const deleteBtn = document.createElement("button");
    deleteBtn.id = "deleteBtn";
    deleteBtn.innerHTML = '<img src="icons/delete-icon.svg" alt="delete">';
    deleteBtn.onclick = () => deleteResult(result.id);

    blockResults.append(resultBlock);
    resultBlock.append(deleteBtn);
  });
}


// Функция для запуска таймера
function timerStart() {
  timer = setInterval(() => {
    second.innerHTML = ++secCounter < 10 ? "0" + secCounter : secCounter;
    isStarted = true;
    if (isStarted) startBtn.disabled = true;

    if (secCounter === 60) {
      minute.innerHTML = ++minCounter < 10 ? "0" + minCounter : minCounter;
      secCounter = 0;
    } else if (minCounter === 60) {
      hour.innerHTML = ++hourCounter < 10 ? "0" + hourCounter : hourCounter;
      minCounter = 0;
    } else if (hourCounter === 24) clearTimer();
  }, 1000);

  stopBtn.onclick = () => stopTimer(timer);
  startBtn.textContent = "Continue";
}


// Функция для остановки таймера
function stopTimer(props) {
  clearInterval(props);
  isStarted = false;

  if (isStarted === false) startBtn.disabled = false;

  let newResult = {
    id: allResults.length + 1,
    hour: hourCounter,
    min: minCounter,
    sec: secCounter,
  };

  if (allResults.length === 7) {
    alert("Максимум результатов: 7");
    return;
  }
  allResults.push(newResult);

  renderResults();
}

// Функция для удаление выбранного резуьтата
function deleteResult(resultId) {
  let removeResult = allResults.filter((result) => result.id !== resultId);
  allResults = removeResult;

  renderResults();
}


// Функция для очистки таймера
function clearTimer() {
  second.innerHTML = "00";
  minute.innerHTML = "00";
  hour.innerHTML = "00";

  secCounter = 0;
  minCounter = 0;
  hourCounter = 0;
  startBtn.textContent = "Start";
}

// Функция для очистки всех результатов
function clearResults() {
  allResults = [];
  renderResults();
}

stopBtn.onclick = stopTimer;
startBtn.onclick = timerStart;
clearBtn.onclick = clearTimer;
clearResultsBtn.onclick = clearResults;

renderResults();
