// "use strict"
const windowNum = document.querySelector('.windowNum');

const $hours = document.querySelector('.timer__hours');
const $minutes = document.querySelector('.timer__minutes');
const $seconds = document.querySelector('.timer__seconds');

let butt__start = document.querySelector('.butt__start');
let butt__stop = document.querySelector('.butt__stop');

let timer = document.querySelector('.timer__container');

let initHours = document.querySelector('.initial__hours');
let initMinutes = document.querySelector('.initial__minutes');
let initSeconds = document.querySelector('.initial__seconds');

let textMinutes = document.querySelector('.text-minutes');
let textSeconds = document.querySelector('.text-seconds');

let reset = document.querySelector('.reset');

let hoursAnimation = document.querySelector('.hours-animation');
let minutesAnimation = document.querySelector('.minutes-animation');
let secondsAnimation = document.querySelector('.seconds-animation');

let left = document.querySelectorAll('.left');
let right = document.querySelectorAll('.right');

let nuumbHours;
let nuumbMinutes;
let nuumbSeconds;

let timerId;

let NewnuumbHours = 0;
let NewnuumbMinutes = 0;
let NewnuumbSeconds = 0;

let percentDegHours;
let percentDegMinutes;
let percentDegSeconds;

let difftDegHours;
let difftDegMinutes;

let presentDegMinutes = 360;
let presentDegHour = 360;
let presentDeg;
let nextDeg;
let diffDeg;

let counter = 0;
let newDeg;
let newDegMinutes;
let newDegHour;

function percentDeg(a) {
    return 360 / a
}

butt__start.addEventListener('click', () => {
    if (initSeconds.value > 60) {
        initSeconds.classList.add('invalid');
        textSeconds.classList.add('invalid')
        initSeconds.addEventListener("input", () => initSeconds.classList.remove('invalid'))
        initSeconds.addEventListener("input", () => textSeconds.classList.remove('invalid'))

    } else if (initMinutes.value > 60) {
        initMinutes.classList.add('invalid')
        textMinutes.classList.add('invalid')
        initMinutes.addEventListener("input", () => initMinutes.classList.remove('invalid'))
        initMinutes.addEventListener("input", () => textMinutes.classList.remove('invalid'))

    } else {
        windowNum.classList.add('windowNone');
        timer.classList.remove('windowNone');

        if (NewnuumbSeconds == 0 && NewnuumbMinutes == 0 && NewnuumbHours == 0) {
            nuumbHours = initHours.value;
            nuumbMinutes = initMinutes.value;
            nuumbSeconds = initSeconds.value;
        } else {
            nuumbHours = NewnuumbHours;
            nuumbMinutes = NewnuumbMinutes;
            nuumbSeconds = NewnuumbSeconds;
        }

        percentDegHours = percentDeg(nuumbHours);
        difftDegHours = ((360 / (nuumbHours * 60 * 60)) / 5);
        hoursAnimation.style.cssText = `background-image:conic-gradient(#fff ${nuumbHours * percentDegHours}deg, transparent 0);`

        difftDegMinutes = ((360 / (nuumbMinutes * 60)) / 5);
        minutesAnimation.style.cssText = `background-image:conic-gradient(#fff ${nuumbMinutes * percentDegMinutes}deg, transparent 0);`

        percentDegSeconds = percentDeg(nuumbSeconds);
        secondsAnimation.style.cssText = `background-image:conic-gradient(#fff ${nuumbSeconds * percentDegSeconds}deg, transparent 0);`

        presentDeg = nuumbSeconds * percentDegSeconds;
        nextDeg = (nuumbSeconds - 1) * percentDegSeconds;
        diffDeg = (nextDeg - presentDeg) / 5;
        newDeg = presentDeg;

        newDegMinutes = presentDegMinutes;
        newDegHour = presentDegHour;


        butt__stop.classList.add('stop-active');

        timerId = setInterval(recurs, 200);
    }
})

butt__stop.addEventListener('click', () => {
    NewnuumbHours = nuumbHours;
    NewnuumbMinutes = nuumbMinutes;
    NewnuumbSeconds = nuumbSeconds;
    clearInterval(timerId);
    butt__stop.classList.remove('stop-active')
}
);

function recurs() {
    // склонение числительных
    function declensionNum(num, words) {
        return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
    }

    if (counter == 4) {
        if (nuumbSeconds > 0) {
            nuumbSeconds = nuumbSeconds - 1;
            presentDeg = nuumbSeconds * percentDegSeconds;
            nextDeg = (nuumbSeconds - 1) * percentDegSeconds;
            diffDeg = (nextDeg - presentDeg) / 5;
            newDeg = presentDeg;
            secondsAnimation.style.cssText = `
            background-image:conic-gradient(#fff ${newDeg}deg, transparent 0);`

            newDegMinutes = newDegMinutes - difftDegMinutes;
            minutesAnimation.style.cssText = `
            background-image:conic-gradient(#fff ${newDegMinutes}deg, transparent 0);`

            newDegHour = newDegHour - difftDegHours;

            hoursAnimation.style.cssText = `
            background-image:conic-gradient(#fff ${newDegHour}deg, transparent 0);`
            counter = 0;
        } else if (nuumbMinutes > 0) {
            nuumbMinutes = nuumbMinutes - 1;
            nuumbSeconds = 59;
            presentDeg = 360;
            nextDeg = 59 * 6;
            diffDeg = (nextDeg - presentDeg) / 5;
            newDeg = presentDeg;

            percentDegSeconds = percentDeg(59);

            newDegMinutes -= difftDegMinutes;
            minutesAnimation.style.cssText = `
            background-image:conic-gradient(#fff ${newDegMinutes}deg, transparent 0);`


            secondsAnimation.style.cssText = `
            background-image:conic-gradient(#fff 360deg, transparent 0);`
            counter = 0;

        } else if (nuumbHours > 0) {
            nuumbHours = nuumbHours - 1;
            nuumbMinutes = 59;
            nuumbSeconds = 60;
            percentDegSeconds = percentDeg(nuumbSeconds);

            newDegMinutes = 360;
            difftDegMinutes = (360 / (nuumbMinutes * 60) / 5);
            newDegMinutes -= difftDegMinutes;
            minutesAnimation.style.cssText = `
            background-image:conic-gradient(#fff ${newDegMinutes}deg, transparent 0);`

            newDegHour -= difftDegHours;

            hoursAnimation.style.cssText = `
            background-image:conic-gradient(#fff ${newDegHour}deg, transparent 0);`
            counter = 0;


        } else {
            prompt('Конец времени');
            clearInterval(timerID);
        }
    } else {
        newDeg += diffDeg;

        secondsAnimation.style.cssText = `
        background-image:conic-gradient(#fff ${newDeg}deg, transparent 0);`

        newDegMinutes -= difftDegMinutes;
        minutesAnimation.style.cssText = `
        background-image:conic-gradient(#fff ${newDegMinutes}deg, transparent 0);`
        counter++;

        newDegHour -= difftDegHours;

        hoursAnimation.style.cssText = `
        background-image:conic-gradient(#fff ${newDegHour}deg, transparent 0);`
    }

    $hours.textContent = nuumbHours;
    $minutes.textContent = nuumbMinutes < 10 ? '0' + nuumbMinutes : nuumbMinutes;
    $seconds.textContent = nuumbSeconds < 10 ? '0' + nuumbSeconds : nuumbSeconds;
    $hours.dataset.title = declensionNum(nuumbHours, ['година', 'години', 'годин']);
    $minutes.dataset.title = declensionNum(nuumbMinutes, ['хвилина', 'хвилини', 'хвилин']);
    $seconds.dataset.title = declensionNum(nuumbSeconds, ['секунда', 'секунди', 'секунд']);
}


left.forEach(e => {
    e.addEventListener('click', () => {
        let clickParent = e.closest('.windowNum__block');
        let clickParentClass = clickParent.classList[1];
        let classToId = '#' + clickParentClass;
        let leftInput = clickParent.querySelector(`${classToId}`);

        if (leftInput.value > 0) {
            return leftInput.value -= 1;
        }
    })
});

right.forEach(e => {
    e.addEventListener('click', () => {
        let clickParentR = e.closest('.windowNum__block');
        let clickParentClassR = clickParentR.classList[1];
        let classToIdR = '#' + clickParentClassR;
        let rightInput = clickParentR.querySelector(`${classToIdR}`);
        console.log(typeof (rightInput.value));
        console.log(String(rightInput.value.length));
        if (String(rightInput.value).length == 0) {
            rightInput.value = 0;
        }
        if (rightInput.value < rightInput.max) {
            return rightInput.value = parseInt(rightInput.value) + 1;
        }
    })
});

reset.addEventListener('click', () => {
    clearInterval(timerId);
    butt__stop.classList.remove('stop-active')
    windowNum.classList.remove('windowNone');
    timer.classList.add('windowNone');
    // windowNum.classList.add('windowNone');
    //     timer.classList.remove('windowNone');
    nuumbHours = 0;
    nuumbMinutes = 0;
    nuumbSeconds = 0;
    NewnuumbHours = 0;
    NewnuumbMinutes = 0;
    NewnuumbSeconds = 0;
});