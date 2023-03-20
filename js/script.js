// [X] Generare una griglia di gioco quadrata in cui ogni cella contiene un numero compreso tra 1 e 100.
// [X] Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// [X] I numeri nella lista delle bombe non possono essere duplicati.
// [23, 65, 1, 4,78,15,....];
// [X] In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// [X] La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// [X] Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

// Griglia
const grid = document.querySelector(".grid");
// Scelgo diversi livelli di difficoltà
const difficultySelect = document.getElementById("level");
console.log(difficultySelect);
// Difficoltà iniziale (default)
let difficultyLevel = "easy";
let numberOfBoxes = 100;
// Array con 16 numeri random (le bombe)
let randomNumbers = [];
// Punteggio
let score = 0;
// Punteggio massimo (se si raggiunge, l'utente vince)
let maxScore = 0;

// L'utente clicca sul bottone per generare la griglia di gioco
const playButton = document.querySelector(".play-button");
console.log(playButton);
playButton.addEventListener("click", function () {
    // Ripristino
    grid.innerHTML = "";
    grid.style = "";
    score = 0;
    difficultyLevelChoice();
    // Array con 16 numeri random (le bombe)
    randomNumbers = generateRandomNumbers(16, numberOfBoxes);
    console.log(randomNumbers);
    maxScore = numberOfBoxes - randomNumbers.length;
    console.log("Punteggio massimo possibile: ", maxScore);
    // Inserisco i box nella grid (DOM)
    for (let i = 1; i <= numberOfBoxes; i++) {
        const box = generateGridItem(i);
        grid.append(box);
    }
});

/////////////////////
// FUNCTIONS

// ***** GRID ITEM *****
/**
 * Description Genero un grid item, ossia un box da inserire nella griglia
 * @param {number} indexNumber
 * @returns {element} newBox
 */
function generateGridItem(indexNumber) {
    const newBox = document.createElement("div");
    const number = indexNumber;
    // Controllo difficoltà per cambiare grandezza dei box
    if (difficultyLevel === "easy") {
        newBox.classList.add("grid-item", "grid-item-ten");
    } else if (difficultyLevel === "medium") {
        newBox.classList.add("grid-item", "grid-item-nine");
    } else if (difficultyLevel === "hard") {
        newBox.classList.add("grid-item", "grid-item-seven");
    }
    newBox.innerHTML = number;
    // Al click sul box si avvia la funzione handleClick, la quale aggiunge al box la classe che colora il background
    newBox.addEventListener("click", handleClick);
    return newBox;
}

// ***** SCELTA DIFFICOLTà *****
/**
 * Description Assegno l'input (select) a difficultyLevel, controllo quale sia la difficoltà scelta, e in base a questa il numero di box cambia
 * @returns {}
 */
function difficultyLevelChoice() {
    difficultyLevel = difficultySelect.value;
    console.log(difficultyLevel);
    // Controllo difficoltà per cambiare numero di box all'interno della griglia
    if (difficultyLevel === "easy") {
        numberOfBoxes = 100;
    } else if (difficultyLevel === "medium") {
        numberOfBoxes = 81;
    } else if (difficultyLevel === "hard") {
        numberOfBoxes = 49;
    }
}

// ***** HANDLE CLICK *****
/**
 * Description aggiunge al box la classe che colora il background, e stampa in console il nunero del box cliccato
 * @returns {}
 */
function handleClick() {
    const boxNumber = parseInt(this.innerText);
    console.log("Numero del box cliccato: ", boxNumber);
    // SE il box cliccato è una bomba, il box diventa rosso e il gioco si ferma, comunicando il punteggio
    // ALTRIMENTI il box diventa azzurro, il punteggio aumenta, e si controlla se si è raggiunto il punteggio massimo, quindi la vittoria
    if (randomNumbers.includes(boxNumber)) {
        // Mostro tutte le bombe
        showBombs(numberOfBoxes);
        // Mostro messaggio con punteggio
        console.log("BOMBA!");
        console.log("Il tuo punteggio: ", score);
        grid.style = "pointer-events: none";
        alert(`BOMBA! Partita terminata :( | | IL TUO PUNTEGGIO: ${score}`);
    } else {
        this.classList.add("box-clicked");
        this.style = "pointer-events: none";
        if (score < maxScore) {
            score++; 
            console.log("Punteggio: ", score); 
        }
        checkWin();
    }
}

// ***** NUMERI RANDOM *****
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

/**
 * Description Genera 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
 * @param {number} bombsNumber numero di bombe (16)
 * @param {number} maxNumber limite massimo dei numeri casuali generati
 * @returns {array} numbersRandom array con i numeri casuali generati
*/
function generateRandomNumbers(bombsNumber, maxNumber) {
    const numbersRandom = [];
    while (numbersRandom.length < bombsNumber) {
        const number = getRndInteger(1, maxNumber);
        if (!numbersRandom.includes(number)) {
            numbersRandom.push(number);    
        }    
    }
    return numbersRandom;
}

// ***** CONTROLLO VITTORIA *****
/**
 * Description Controllo se l'utente ha vinto, quindi se ha raggiunto il punteggio massimo possibile
 * @returns {}
 */
function checkWin() {
    if (score === maxScore) {
        console.log("Il tuo punteggio: ", score);
        alert(`HAI VINTO!!! IL TUO PUNTEGGIO: ${score}`)
        grid.style = "pointer-events: none";
    }
}

// ***** MOSTRO TUTTE LE BOMBE *****
/**
 * Description Mostro tutte le bombe
 * @param {number} numberOfBoxes quanti sono tutti i box
 * @returns {}
 */
function showBombs(numberOfBoxes) {
    const allBombs = document.querySelectorAll(".grid-item");
    for (let i = 0; i < numberOfBoxes; i++) {
        if (randomNumbers.includes(parseInt(allBombs[i].innerText))) {
            allBombs[i].innerHTML = "";
            const bombIcon = createBombIcon();
            allBombs[i].append(bombIcon);
            allBombs[i].classList.add("bomb");   
        }
    }
}

/**
 * Description creo l'elemento che contiene l'icona della bomba
 * @returns {element} elemento con icona
 */
function createBombIcon() {
    const iconBomb = document.createElement("i");
    iconBomb.classList.add("fa-solid", "fa-bomb", "fa-xl");
    return iconBomb;
}