
// Scelgo diversi livelli di difficoltà
const difficultySelect = document.getElementById("level");
console.log(difficultySelect);
let difficultyLevel = "easy";
let numberOfBoxes = 100;

// L'utente clicca sul bottone per generare la griglia di gioco
const playButton = document.querySelector(".play-button");
console.log(playButton);
playButton.addEventListener("click", function () {
    // Griglia
    const grid = document.querySelector(".grid");
    // Svuoto l'elemento grid (nel caso in cui già contenga i box)
    grid.innerHTML = "";
    difficultyLevelChoice();
    for (let i = 1; i <= numberOfBoxes; i++) {
        const box = generateGridItem(i);
        grid.append(box);
    }
});

/////////////////////
// FUNCTIONS
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

/**
 * Description aggiunge al box la classe che colora il background, e stampa in console il nunero del box cliccato
 * @returns {any}
 */
function handleClick() {
    this.classList.add("box-clicked");
    const boxNumber = parseInt(this.innerText);
    console.log("Numero del box cliccato: ", boxNumber);
}