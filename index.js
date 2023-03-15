// Сделайте игру. Суть - дана таблица с числами, расположенными в случайном порядке в ячейках таблицы. Числа идут по порядку от 1 до N. Все числа разного размера и цвета. Играющему необходимо по порядку кликать по числам - сначала 1, потом 2 и так далее до N. Если правильная ячейка то фон красим в зеленый, а если неправильная, то красим в красный на полсекунды(предыдущие правильные ячейки не снимают выделение). Должен тикать таймер, на игру дается M секунд. Если не успел найти все числа по порядку - проиграл.

const gameTable = document.querySelector('.game-table')
const reloadBtn = document.querySelector('#reload')
const timerTxt = document.querySelector('.timer')
const startBtn = document.querySelector('#start')
const timerNum = document.querySelector('#timerNum')
const nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]

let interval;
let gameSession = 1
let timer = 75;

const elementPicker = (e) => {
    if( !e.target.classList.contains('unpicked') ) {
        return
    }
    if( +e.target.textContent === gameSession) {
        e.target.style.backgroundColor = 'mediumseagreen'
        if (gameSession === 25) {
            alert('Вы победили!')
            reloadButton()
        }
        gameSession++
    } else {
        e.target.style.backgroundColor = 'crimson'
        setTimeout(() => {
            e.target.style.backgroundColor = 'white'
        },500)
    }
}

const reloadButton = () => {
    addGrid(nums)
    reloadBtn.classList.add('hidden');
    startBtn.classList.remove('hidden');
    timer = 75
    timerNum.textContent = timer;
    clearInterval(interval)
    gameSession = 1
    gameTable.removeEventListener('click', elementPicker)
}

const sortNums = (nums) => nums.sort(() => Math.random() - 0.5);
const getRandomNumberInRange = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const addGrid = (nums) => {
    sortNums(nums)
    gameTable.innerHTML = ``
    for( let i = 0; i < nums.length; i++) {
        const div = document.createElement('div')
        div.className = 'unpicked';
        div.textContent = nums[i];
        div.style.fontSize = `${getRandomNumberInRange(16,40)}px`;
        div.style.color = `rgb(${getRandomNumberInRange(0,255)},${getRandomNumberInRange(0,255)},${getRandomNumberInRange(0,255)})`;
        gameTable.append(div);
    }
}
reloadButton()




reloadBtn.addEventListener('click', reloadButton);

startBtn.addEventListener('click', (e) => {
    reloadBtn.classList.remove('hidden');
    startBtn.classList.add('hidden');
    gameTable.addEventListener('click', elementPicker)
    interval = setInterval(() => {
        timer--;
        timerNum.textContent = timer
        if (timer === 0) {
            reloadButton()
            clearInterval(interval)
            alert('Игра закончилась')
        }
    },1000)  
})



// const timerForGame = () => {
//     const timerElement = document.querySelector('.timer');
//     let seconds = 0;
//     let timerInterval;
//     startBtn.addEventListener('click', function() {
//         seconds = 0;
//         timerElement.innerHTML = '00:00:00';
//         timerInterval = setInterval(function() {
//             seconds++;
//             const hours = Math.floor(seconds / 3600);
//             const minutes = Math.floor((seconds % 3600) / 60);
//             const remainingSeconds = seconds % 60;
//             const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
//             timerElement.innerHTML = formattedTime;
//     }, 1000);
//     });
// }

// timerForGame()

