/* =====================================================
   FADE-IN SECTIONS
===================================================== */

const sections = document.querySelectorAll(".fade");

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }

        });

    },
    {
        threshold: 0.15
    }
);

sections.forEach((section) => {
    observer.observe(section);
});


/* =====================================================
   GAME ELEMENTS
===================================================== */

const openGame = document.getElementById("openGame");
const gameModal = document.getElementById("gameModal");
const gameClose = document.getElementById("gameClose");

const startBtn = document.getElementById("startBtn");

const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");

const gameTitle = document.getElementById("gameTitle");
const gameArea = document.getElementById("gameArea");

const completeModal = document.getElementById("completeModal");
const closeComplete = document.getElementById("closeComplete");


let score = 0;
let timeLeft = 30;

let heartInterval = null;
let timerInterval = null;


/* =====================================================
   OPEN GAME
===================================================== */

openGame.addEventListener("click", () => {

    gameModal.style.display = "flex";

    resetGame();

});


/* =====================================================
   CLOSE GAME
===================================================== */

gameClose.addEventListener("click", () => {

    gameModal.style.display = "none";

    clearInterval(heartInterval);
    clearInterval(timerInterval);

});


/* =====================================================
   RESET GAME
===================================================== */

function resetGame() {

    clearInterval(heartInterval);
    clearInterval(timerInterval);

    score = 0;

    timeLeft = 30;

    gameTitle.textContent =
        "Catch the Choco & Kitty! ";

    scoreDisplay.textContent =
        "Chocolates Caught: 0";

    timerDisplay.textContent =
        "Time Left: 30s";

    startBtn.textContent =
        "Start Game";

    startBtn.style.display =
        "inline-block";

    gameArea.innerHTML = "";

}


/* =====================================================
   START GAME
===================================================== */

startBtn.addEventListener("click", () => {

    if (startBtn.textContent === "Try Again") {
        resetGame();
    }

    if (startBtn.textContent === "Close") {
        gameModal.style.display = "none";
        return;
    }

    startBtn.style.display = "none";

    startFalling();

    startTimer();

});


/* =====================================================
   FALLING HEARTS + KITTY
===================================================== */

function startFalling() {

    heartInterval = setInterval(() => {

        const isKitty =
            Math.random() < 0.1;

        const item = document.createElement(
            isKitty ? "img" : "span"
        );

        item.classList.add(
            isKitty ? "kitty" : "heart"
        );


        if (isKitty) {

            item.src =
                "assets/kitty.png";

            item.alt =
                "Cute kitty";

        } else {

            item.textContent =
                "🍫";

        }


        item.style.left =
            Math.random() * 88 + "%";


        gameArea.appendChild(item);


        /* Click item */

        item.addEventListener("click", () => {

            score += isKitty ? 3 : 1;

            scoreDisplay.textContent =
                `Chocolates Caught: ${score}`;


            item.remove();


            if (score >= 15) {

                endGame(true);

            }

        });


        /* Remove after falling */

        setTimeout(() => {

            if (item.parentElement) {
                item.remove();
            }

        }, 3000);


    }, 650);

}


/* =====================================================
   TIMER
===================================================== */

function startTimer() {

    timerInterval = setInterval(() => {

        timeLeft--;

        timerDisplay.textContent =
            `Time Left: ${timeLeft}s`;


        if (timeLeft <= 0) {

            endGame(false);

        }

    }, 1000);

}


/* =====================================================
   END GAME
===================================================== */

function endGame(won) {

    clearInterval(heartInterval);

    clearInterval(timerInterval);


    document
        .querySelectorAll(".heart, .kitty")
        .forEach((element) => {
            element.remove();
        });


    startBtn.style.display =
        "inline-block";


    if (won) {

        gameModal.style.display =
            "none";


        setTimeout(() => {

            completeModal.style.display =
                "flex";

            launchConfetti();

        }, 350);


    } else {

        gameTitle.textContent =
            `Game Over! 😢 You caught ${score} chocolates!`;

        startBtn.textContent =
            "Try Again";

    }

}


/* =====================================================
   COMPLETE POPUP
===================================================== */

closeComplete.addEventListener("click", () => {

    completeModal.style.display =
        "none";

});


/* =====================================================
   CONFETTI
===================================================== */

function launchConfetti() {

    for (let i = 0; i < 45; i++) {

        const confetti =
            document.createElement("div");


        confetti.classList.add(
            "confetti"
        );


        confetti.style.left =
            Math.random() * 100 + "%";


        confetti.style.backgroundColor =
            `hsl(${Math.random() * 360}, 80%, 65%)`;


        confetti.style.animationDelay =
            Math.random() * 1.5 + "s";


        completeModal
            .querySelector(".modal-content")
            .appendChild(confetti);


        setTimeout(() => {

            confetti.remove();

        }, 4500);

    }

}


/* =====================================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
===================================================== */

gameModal.addEventListener("click", (event) => {

    if (event.target === gameModal) {

        gameModal.style.display =
            "none";

        clearInterval(heartInterval);

        clearInterval(timerInterval);

    }

});


completeModal.addEventListener("click", (event) => {

    if (event.target === completeModal) {

        completeModal.style.display =
            "none";

    }

});