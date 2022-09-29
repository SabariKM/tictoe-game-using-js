const box = document.querySelectorAll(".box");
const actionBtn = document.querySelector("#play-pause-btn");
const restartGame = document.querySelector("#restart-btn");
const container = document.querySelector(".container");
let initialValue = "X";
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
function callBacks(val, itr) {
  if (val == "X") {
    itr.innerHTML = "O";
    itr.classList.add("disabledInner");
  } else if (val == "O") {
    itr.innerHTML = "X";
    itr.classList.add("disabledInner");
  }
}
function oWinningCombo() {
  if(oWinningArray.length >= 3) {  
    for(let i = 0; i<winningCombinations.length; i++)    
    {
      let comparedValues = oWinningArray.filter(result => winningCombinations[i].includes(result));
      if(comparedValues.length == 3) {
        container.classList.add("oWins");
      }
      checkResult1 = comparedValues.length;
    }    
  }  
  return checkResult1;
}
function xWinningCombo() {
  if(xWinningArray.length >= 3) {  
    for(let i = 0; i<winningCombinations.length; i++)    
    {
      let comparedValues = xWinningArray.filter(result => winningCombinations[i].includes(result));
      if(comparedValues.length == 3) {
        container.classList.add("xWins");
      }
      checkResult2 = comparedValues.length;
    }    
  }
  return checkResult2;
}
function draw(drawCheck) {
   if(drawCheck.length === 9 && checkResult1 !== 3 && checkResult2 !== 3) {
    container.classList.add("draw");
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
    } 
    else if (initialValue == "O") {
      callBacks("O", itr);
      initialValue = "X";
      xWinningArray.push(index);  
      xWinningCombo();
      let notCalledX = xWinningCombo()
      draw(drawCheck,notCalledX)
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
restartGame.addEventListener("click", (event) => {
  for (const itr of box) {
    itr.innerHTML = "";
    xWinningArray = [];
    oWinningArray = [];
    itr.classList.remove("disabledInner");
    container.classList.remove("disabled");
    actionBtn.innerHTML = "Pause";
    container.classList.remove("oWins");
    container.classList.remove("xWins");
    container.classList.remove("draw");
    initialValue = "X";
  }
});




// box.forEach((itr)=>  (  itr.addEventListener("click",(event) => {
//     if(dd=="X"){
//         callBacks("X",itr)
//         dd="O";
//     }else if(dd=="O"){
//         callBacks("O",itr)
//         dd="X";
//     }
// })))

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

// =========================================================
//  MY LOGIC 
// =========================================================

// O Condition
// if (oWinningArray.length <= 3) {
//   for (let i = 0; i <= winningCombinations.length; i++) {
//     let oresultValue =
//       winningCombinations[i]?.toLocaleString() ==
//       oWinningArray?.sort()?.toLocaleString();
//     if (oresultValue == true) {
//       container.classList.add("oWins");
//     }          
//   }
// }
// else if(oWinningArray.length > 3)
// {
//   for (i = 0; i <= winningCombinations.length; i++) {
//     debugger
//     let arrayWinngCombo = winningCombinations[i]?.toLocaleString();
//     let splitArray = oWinningArray?.sort()?.toLocaleString()?.split(arrayWinngCombo);
//     if(splitArray.length == 2) {
//       let removeSplit = splitArray.filter((x)=> {return x !==""});
//       let splittedArr = oWinningArray?.toLocaleString().split(removeSplit);
//       let returnArray = splittedArr.filter((x)=> {return x !==""});
//       let comparedArray = arrayWinngCombo?.includes(
//         returnArray?.toLocaleString()
//       );
//       if(comparedArray == true) {
//         container.classList.add("oWins");
//       }         
//     } else {  
//       let comparedArray = arrayWinngCombo?.includes(
//         splitArray?.toLocaleString()
//       );
//       if(comparedArray == true) {
//         container.classList.add("oWins");
//       }          
//     }    
//   }
// }
// X Conditon
// if (xWinningArray.length <= 3) {
//   for (let i = 0; i <= winningCombinations.length; i++) {
//     let xresultValue =
//       winningCombinations[i]?.sort()?.toLocaleString() ==
//       xWinningArray?.sort()?.toLocaleString();
//     if (xresultValue == true) {
//       container.classList.add("xWins");
//     }
//   }
// } 
// else 
// {
//   for (i = 0; i <= winningCombinations.length; i++) {          
//     let arrayWinngCombo = winningCombinations[i]?.toLocaleString();
//     let splitArray = xWinningArray?.sort()?.toLocaleString()?.split(arrayWinngCombo);          
//     if(splitArray.length == 2) {
//       let removeSplit = splitArray.filter((x)=> {return x !==""});
//       let splittedArr = xWinningArray?.toLocaleString().split(removeSplit);
//       let returnArray = splittedArr.filter((x)=> {return x !==""});
//       let comparedArray = arrayWinngCombo?.includes(
//         returnArray?.toLocaleString()
//       );
//       if(comparedArray == true) {
//         container.classList.add("xWins");
//       }         
//     } else {  
//       let comparedArray = arrayWinngCombo?.includes(
//         splitArray?.toLocaleString()
//       );
//       if(comparedArray == true) {
//         container.classList.add("xWins");
//       }          
//     }     
//   }
// }
