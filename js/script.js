// [X] Generare una griglia di gioco quadrata in cui ogni cella contiene un numero compreso tra 1 e 100.
// [X] Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// [X] I numeri nella lista delle bombe non possono essere duplicati.
// [23, 65, 1, 4,78,15,....];
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

// Griglia
const grid = document.querySelector(".grid");
// Scelgo diversi livelli di difficoltà
const difficultySelect = document.getElementById("level");
console.log(difficultySelect);
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
    // Svuoto l'elemento grid (nel caso in cui già contenga i box)
    grid.innerHTML = "";
    difficultyLevelChoice();
    randomNumbers = generateRandomNumbers(16, numberOfBoxes);
    console.log(randomNumbers);
    maxScore = numberOfBoxes - randomNumbers.length;
    console.log(maxScore);
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
    if (randomNumbers.includes(boxNumber)) {
        this.classList.add("bomb");
        console.log("BOMBA!");
        grid.style = "pointer-events: none";
        alert("BOMBA! Partita terminata :(");
    } else {
        this.classList.add("box-clicked");
        if (score < maxScore) {
            score++; 
            console.log(score); 
        } else if (score === maxScore) {
            alert("HAI VINTO!!!")
            console.log(score);
            grid.style = "pointer-events: none";
        }
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
