const formLogo = document.querySelector('.form__logo');
const inputVal = document.querySelector('.input__val');
const logo = document.querySelector('.logo');
const btnSection = document.querySelector('.btn__section');
const btnWalk = document.querySelector('.btn__walk');
const btnEat = document.querySelector('.btn__eat');
const btnWater = document.querySelector('.btn__water');

const health = document.querySelector('.health');
const happiness = document.querySelector('.happiness');
const famine = document.querySelector('.famine');
const thirst = document.querySelector('.thirst');
const day = document.querySelector('.day');
const btnHealth = document.querySelector('.btn__health');

const tamagochi = {
    name: '',
    health: 100,
    famine: 100,
    thirst: 100,
    happiness: 100,
    disease: false,
    day: 0
}

function toHeal() {
    let random = Math.floor(Math.random() * 3);
    if (random === 2) {
        tamagochi.disease = false;
        alert('Лечение прошло успешно )');
    } else {
        alert('Вам не удалось вылечить питомца');
    }
}

function disease() {
    if (tamagochi.health <= 90 && tamagochi.disease === false) {
        console.log(tamagochi.disease);
        let random = Math.floor(Math.random() * 5);
        console.log(random);
        if (random === 3) {
            tamagochi.disease = true;
            alert(`${tamagochi.name} заболел`);
            return true;
        }
    }
}

function walkTamagochi() {
    if (tamagochi.happiness <= 90) {
        let randomHappiness = Math.floor(Math.random() * 10);
        let randomFamine = Math.floor(Math.random() * 5);
        let randomThirst = Math.floor(Math.random() * 5);
        let randomHealth = Math.floor(Math.random() * 5);

        tamagochi.happiness += randomHappiness;
        tamagochi.health -= randomHealth;
        tamagochi.famine -= randomFamine;
        tamagochi.thirst -= randomThirst;
        valueTamagochi();
    } else {
        alert('Он и так счастлив');
    }
}

function eatTamagochi() {
    if (tamagochi.famine <= 90) {
        tamagochi.health++;
        tamagochi.famine++;
        valueTamagochi();
    } else {
        alert('Он не хочет есть');
    }
}

function waterTamagochi() {
    if (tamagochi.thirst <= 90) {
        tamagochi.health++;
        tamagochi.thirst++;
        valueTamagochi();
    } else {
        alert('Он не хочет пить');
    }
}

function valueTamagochi() {
    if (tamagochi.health > 100) {
        tamagochi.health = 100;
    }
    if (tamagochi.happiness > 100) {
        tamagochi.happiness = 100;
    }
    if (tamagochi.famine > 100) {
        tamagochi.famine = 100;
    }
    if (tamagochi.thirst > 100) {
        tamagochi.thirst = 100;
    }
    health.innerHTML = tamagochi.health;
    happiness.innerHTML = tamagochi.happiness;
    famine.innerHTML = tamagochi.famine;
    thirst.innerHTML = tamagochi.thirst;
    day.innerHTML = tamagochi.day;
}

function currentTamagochi(n = 1) {
    tamagochi.health -= n;
    tamagochi.famine--;
    tamagochi.thirst--;
    tamagochi.happiness--;

    if (tamagochi.health < 30 || tamagochi.famine < 30 || tamagochi.thirst < 30 || tamagochi.happiness < 30) {
        alert(`Увы но тамагочи не выдержал, он прожил - ${tamagochi.day} дней`);
        window.location.reload();
    }
}

function checkTamagochi() {
    if (tamagochi.disease === true) {
        currentTamagochi(3);
    } else {
        currentTamagochi();
    }
    valueTamagochi();
}

new Promise((resolve, reject) => {
    formLogo.onsubmit = function (e) {
        e.preventDefault();
        if (inputVal.value.length > 3 && inputVal.value.length < 10) {
            let newElem = document.createElement('div');
            newElem.innerHTML = inputVal.value;
            logo.appendChild(newElem);
            formLogo.remove(inputVal);
            tamagochi.name = inputVal.value;
            valueTamagochi();
            btnSection.style.display = 'flex';
            resolve();
        } else {
            reject('Имя должно содержать от 4 до 9 символов');
        }
    }
}).then(() => {
    btnWalk.onclick = function () {
        walkTamagochi();
    };
    btnWater.onclick = function () {
        waterTamagochi();
    };
    btnEat.onclick = function () {
        eatTamagochi();
    };
    btnHealth.onclick = function () {
        if(tamagochi.disease === true){
            toHeal();
        }else {
            alert(tamagochi.name + ' здоров');
        }
    }
    setInterval(function () {
        disease();
    }, 3000);
    setInterval(function () {
        checkTamagochi();
    }, 3000)
    setInterval(function () {
        tamagochi.day++;
    }, 10000)
}).catch((err) => {
    alert(err);
    window.location.reload();
});
