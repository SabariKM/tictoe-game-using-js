const box = document.querySelectorAll(".box");
const actionBtn = document.querySelector("#play-pause-btn");
const restartGame = document.querySelector("#restart-btn");
const chooseBtn = document.querySelector("#choose-btn");
const container = document.querySelector(".container");
const activePlayer = document.querySelector(".playerSymbol");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
let randomVal = Math.random().toFixed();
let initialValue = randomVal == "0" ? "O" : "X";
let isDisable = false;
let xWinningArray = [];
let oWinningArray = [];
let drawCheck = [];
let checkResult1;
let checkResult2;
let winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function defaultVal() {
  if (randomVal == 0) {
    player1.innerHTML = "X";
    player2.innerHTML = "O";
  } else {
    player1.innerHTML = "O";
    player2.innerHTML = "X";
  }
}


function activePlayerChk() {}

function callBacks(val, itr) {
  if (val == "X") {
    itr.innerHTML = "O";
    if(player1.innerHTML=="O" && itr.innerHTML=="O"){      
      activePlayer.classList.add("activePlayer");
    }else{
      activePlayer.classList.remove("activePlayer");
    }
    itr.classList.add("disabledInner");
  } else if (val == "O") {
    itr.innerHTML = "X";
    if(player1.innerHTML=="X"&&itr.innerHTML=="X"){
      activePlayer.classList.add("activePlayer");
    }else{
      activePlayer.classList.remove("activePlayer");
    }
    itr.classList.add("disabledInner");
  }
}
function oWinningCombo() {
  if (oWinningArray.length >= 3) {
    for (let i = 0; i < winningCombinations.length; i++) {
      let comparedValues = oWinningArray.filter((result) =>
        winningCombinations[i].includes(result)
      );
      if (comparedValues.length == 3) {
        container.classList.add("oWins");
        checkResult1 = comparedValues.length;
        container.classList.add("disabledInner");
        if(player1.innerHTML == "O") {
          activePlayer.classList.remove("activePlayer");
        } else {
          activePlayer.classList.add("activePlayer");
        }
      }
    }
  }
  return checkResult1;
}
function xWinningCombo() {
  if (xWinningArray.length >= 3) {
    for (let i = 0; i < winningCombinations.length; i++) {
      let comparedValues = xWinningArray.filter((result) =>
        winningCombinations[i].includes(result)
      );
      if (comparedValues.length == 3) {
        container.classList.add("xWins");
        checkResult2 = comparedValues.length;
        container.classList.add("disabledInner");
        if(player1.innerHTML == "X") {
          activePlayer.classList.remove("activePlayer");
        } else {
          activePlayer.classList.add("activePlayer");
        }
      }
    }
  }
  return checkResult2;
}
function draw(drawCheck) {
  if (drawCheck.length === 9 && checkResult1 !== 3 && checkResult2 !== 3) {
    container.classList.add("draw");
    container.classList.add("disabledInner");
    activePlayer.classList.remove("activePlayer");
  }
}
box.forEach((itr, index) =>
  itr.addEventListener("click", (event) => {
    drawCheck.push(index);
    if (initialValue == "X") {
      callBacks("X", itr);
      initialValue = "O";
      oWinningArray.push(index);
      oWinningCombo();
      draw(drawCheck);
    } else if (initialValue == "O") {
      callBacks("O", itr);
      initialValue = "X";
      xWinningArray.push(index);
      xWinningCombo();
      let notCalledX = xWinningCombo();
      draw(drawCheck, notCalledX);
    }
  })
);
actionBtn.addEventListener("click", (event) => {
  if (isDisable == false) {
    isDisable = true;
    container.classList.add("disabled");
    actionBtn.innerHTML = "Play";
  } else {
    isDisable = false;
    container.classList.remove("disabled");
    actionBtn.innerHTML = "Pause";
  }
});




// =======================================================
// Restart Button Function
// =======================================================

// restartGame.addEventListener("click", (event) => {
//   for (const itr of box) {
//     itr.innerHTML = "";
//     xWinningArray = [];
//     oWinningArray = [];
//     drawCheck = [];
//     itr.classList.remove("disabledInner");
//     container.classList.remove("disabled");
//     container.classList.remove("disabledInner");
//     activePlayer.classList.remove("activePlayer");
//     actionBtn.innerHTML = "Pause";
//     container.classList.remove("oWins");
//     container.classList.remove("xWins");
//     container.classList.remove("draw");
//     randomVal = Math.random(1 * 2).toFixed();
//     initialValue = randomVal == "0" ? "O" : "X";
//   }
// });

// for (const itr of box) {
//     itr.addEventListener("click",(event) => {
//         if(dd=="X"){
//             callBacks("X",itr);
//             dd="O";
//             oWinningArray.push(itr);
//             console.log(oWinningArray);
//         }else if(dd=="O"){
//             callBacks("O",itr);
//             dd="X";
//             xWinningArray.push(itr);
//             console.log(xWinningArray);
//         }
//     });
//     //console.log(oWinningArray);
//     //console.log(xWinningArray);
// }
