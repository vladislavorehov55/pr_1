function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const $btnStart = document.querySelector('button');
const $rect = document.querySelector('.rect');
const $playField = document.querySelector('.play-field');
const $time = document.querySelector('#time');
const $result = document.querySelector('#result');
const $headerTime = document.querySelector('.header-time');
const $headerResult = document.querySelector('.header-result');
const $input = document.querySelector('input');
let score = 0;

function displayRect() {
    const rectSize = getRandom(5, 100);
    $rect.style.width = $rect.style.height = rectSize + 'px';
    const playFieldSize = $playField.getBoundingClientRect();
    $rect.style.top = getRandom(0, playFieldSize.height - rectSize) + 'px';
    $rect.style.left = getRandom(0, playFieldSize.width - rectSize) + 'px';
    $rect.classList.remove('hide');
    const red = getRandom(0, 256);
    const green = getRandom(0, 256);
    const blue = getRandom(0, 256);
    $rect.style.backgroundColor = `rgb(${red},${green},${blue})`;
}

function startGame() {
    score = 0;
    hide($headerResult);
    show($headerTime);
    $time.textContent = $input.value;
    $input.setAttribute('disabled', 'true');
    const interval = setInterval(function () {
        const time = +$time.textContent;
        if (time <= 0) {
            clearInterval(interval);
            endGame();
        } else {
            $time.textContent = +$time.textContent - 1;
        }
    }, 1000);
}
function endGame() {
    hide($rect);
    hide($headerTime);
    show($headerResult);
    $result.textContent = score;
    show($btnStart);
    $input.removeAttribute('disabled');
}
function hide($node) {
    $node.classList.add('hide');
}
function show($node) {
    $node.classList.remove('hide');
}
$btnStart.addEventListener('click', function () {
    hide($btnStart);
    startGame();
    displayRect();
});
$rect.addEventListener('click', function () {
    score += 1;
    displayRect();
});
$input.addEventListener('input', function () {
    show($headerTime);
    hide($headerResult);
    $time.textContent = $input.value;
});
