let title = document.getElementById('title');
let boxes = document.getElementsByClassName('box');
let score1 = document.getElementById('score1');
let score2 = document.getElementById('score2');
let tie = document.getElementById('tie');
let tapaudio = new Audio("a2.wav");
let audio2 = new Audio("winning.wav");
let ngame = new Audio("tap.wav");
let turn = '0';
let isGame = true;
let cnt = 0;

//function to change the turn from 0->X and vice versa
const changeTurn = () => {
    cnt++;
    return turn == '0' ? 'X' : '0';
}

//function to check win and ties
const checkWin = () => {
    let win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ]
    win.forEach(ele => {
        if(boxes[ele[0]].innerText !== ''){
            //in case somebody wins
            if ((boxes[ele[0]].innerText == boxes[ele[1]].innerText) && (boxes[ele[0]].innerText == boxes[ele[2]].innerText)) {
                isGame = false; 
                console.log(boxes[ele[0]].innerText + "won");
                if(boxes[ele[0]].innerText === 'X') score1.innerText++;
                else score2.innerText++;
                audio2.play();
            }
        }
    })

    //if every cell has a character and nobody won then its a tie.
    if(cnt === 9 && isGame) tie.innerText++;
}

//reset game
const resetBoard = () => {
    cnt = 0;
    turn = '0';
    isGame = true;
    Array.from(boxes).forEach(ele => {
        ele.innerText = '';
    })
}

//event listeners on each cell and updating board
Array.from(boxes).forEach(ele => {
    ele.addEventListener('click', () => {
        if (ele.innerText === '' && isGame) {
            tapaudio.play();
            ele.innerText = turn;
            turn = changeTurn();
            checkWin();
            console.log("Turn for " + turn);
        }
    })

    ele.addEventListener('dblclick', () => {
        if( ele.innerText !== '' && isGame) {
            ele.innerText = '';
            turn = changeTurn();
            console.log('asrgf');
        }
    })
})

//event listener on title
title.addEventListener('dblclick', () => {
    ngame.play();
    resetBoard();
})

//i button even listener
document.getElementById('i-btn').addEventListener('click', ()=>{
    document.querySelector('.info').classList.toggle('active');
})