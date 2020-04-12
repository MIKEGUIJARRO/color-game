
/* 
    Var declaration
*/

var newColorsBtn = document.querySelector("#new-colors");
var easyBtn = document.querySelector("#easy");
var hardBtn = document.querySelector("#hard");
var buttons = document.querySelectorAll(".button");

var container = document.querySelector(".container");
var title = document.querySelector("#title");
/* var card1 = document.querySelector("#card-1");
var card2 = document.querySelector("#card-2");
var card3 = document.querySelector("#card-3");
var card4 = document.querySelector("#card-4");
var card5 = document.querySelector("#card-5");
var card6 = document.querySelector("#card-6"); */

var cards = document.querySelectorAll(".card-game");

var isEasy = false;
var selectedCard = null;
var opacity = 0.5;
var winnerColor = null;

var cardChecker = [];

/* 
    Click / Hover Listeners
*/
//Individual
newColorsBtn.addEventListener("click", function () {
    mixColors();
});

easyBtn.addEventListener("click", function () {
    isEasy = true;
    this.classList.add("selected");
    enableButtons();
    this.setAttribute("disabled", "disabled");
    displayCards(isEasy);
    mixColors();
});

hardBtn.addEventListener("click", function () {
    isEasy = false;
    this.classList.add("selected");
    enableButtons();
    this.setAttribute("disabled", "disabled");
    displayCards(isEasy);
    mixColors();
});

buttons.forEach(function (button) {
    button.addEventListener("mouseover", function () {
        this.classList.add("hover-button");
    });

    button.addEventListener("mouseout", function () {
        this.classList.remove("hover-button");
    });
});

//General
//Deactivate initial value
hardBtn.classList.add(".selected");
hardBtn.setAttribute("disabled", "disabled");

mixColors();

cards.forEach(function (card, i) {
    cardChecker.push({
        "i": i,
        "checked": false,
    });
    card.addEventListener("mouseover", function () {
        card.classList.add("hover-widget");
    });

    card.addEventListener("mouseout", function () {
        card.classList.remove("hover-widget");
    });

    card.addEventListener("click", function () {
        if (i == selectedCard) {
            console.log("Ganaste");
            animateCSS(card, "rubberBand", "fast", null);
            container.style.background = winnerColor;
            title.textContent = "You Won!";

        } else {
            if (cardChecker[i].checked === false) {
                console.log("Intenta de nuevo");
                card.classList.remove("hinge");
                animateCSS(card, "hinge", "slow", function () {
                    card.classList.add("incorrect");
                });
                cardChecker[i].checked = true;
            }
        }
    });
});





//Function
function getRandomColor() {
    var random = Math.round(Math.random() * 256);
    //console.log(random);
    return random;
}

function displayCards(isEasy) {
    if (!isEasy) {
        cards.forEach(function (card) {
            card.classList.remove("display-none");
        });
    } else {
        cards.forEach(function (card, i) {
            if (i >= cards.length / 2) {
                card.classList.add("display-none");
            }
        });
    }
}

function mixColors() {
    var totalCards = !isEasy ? cards.length : cards.length / 2;
    selectedCard = Math.floor(Math.random() * totalCards);

    console.log("SelectedNumber = " + selectedCard + "\tisEasy: " + isEasy);
    restartCards();
    restartTitle();
    cards.forEach(function (card, i) {
        var r = getRandomColor();
        var g = getRandomColor();
        var b = getRandomColor();

        card.style.background = "rgb(" + r + ", " + g + "," + b + ")";
        if (i == selectedCard) {
            setColorSpan(r, g, b);
            winnerColor = "rgba(" + r + ", " + g + "," + b + "," + opacity + ")";
        }
    });
}

function enableButtons() {
    buttons.forEach(function (button) {
        button.removeAttribute("disabled");
        button.classList.remove("selected");
        button.classList.remove("hover-button");
    });
}

function setColorSpan(r, g, b) {
    var spanR = document.querySelector("#r");
    var spanG = document.querySelector("#g");
    var spanB = document.querySelector("#b");

    spanR.textContent = r;
    spanG.textContent = g;
    spanB.textContent = b;
}
function restartTitle() {
    title.innerHTML = "RGB (<span id=\"r\">46</span>, <span id=\"g\">131</span>, <span id=\"b\">250</span>)";
    console.log(title.innerHTML);
}
function restartCards() {
    cards.forEach(function (card) {
        card.classList.remove("incorrect");
    });

    cardChecker.forEach(function(card) {
        card.checked = false;
    });
}

function animateCSS(element, animationName, animationSpeed, callback) {

    element.classList.add('animated', animationName, animationSpeed);

    function handleAnimationEnd() {
        element.classList.remove('animated', animationName)
        element.removeEventListener('animationend', handleAnimationEnd);

        if (typeof callback === 'function') callback();
    }

    element.addEventListener('animationend', handleAnimationEnd);
}