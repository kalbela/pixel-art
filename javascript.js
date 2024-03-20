let container = document.querySelector(".canvas-container");
let containerWidth = window.getComputedStyle(container).getPropertyValue("width").slice(0, -2);
let containerHeight = window.getComputedStyle(container).getPropertyValue("height").slice(0, -2);

let range = document.querySelector("input[type=range]");
let rangeMsg = document.querySelector(".range-msg");

let totalTiles = range.value;
createCanvas();

range.addEventListener("input", () => {
    rangeMsg.textContent = `${range.value} X ${range.value}`;
    totalTiles = range.value;
})

range.addEventListener("change", createCanvas);

function createCanvas() {
    container.replaceChildren();
    for (let column = 0; column < totalTiles; ++column) {
        for (let row = 0; row < totalTiles; ++row) {
            let tile = document.createElement("div");
            if (row%2 === 0 && column % 2 === 0 || row % 2 !== 0 && column % 2 !== 0) {
                tile.style.backgroundColor = "#d9d9d9ec";
                tile.setAttribute("id", "ash");
            } else tile.style.backgroundColor = "#fffffff5";
            tile.style.width = `${containerWidth/totalTiles}px`;
            tile.style.height = `${containerHeight/totalTiles}px`;
            container.appendChild(tile);
        }
    }
}


let colorInput = document.querySelector("input[type=color]");
let color = colorInput.value;

let rainbowColor = document.querySelector(".rainbow");
let rainbowColorOn = false;

let eraser = document.querySelector(".eraser");
let eraserOn = false;

rainbowColor.addEventListener("click", () => {
    if (!eraserOn) {
        rainbowColorOn = !rainbowColorOn;
        rainbowColor.classList.toggle("selected-btn");
    }
})

eraser.addEventListener("click", () => {
    if (!rainbowColorOn) {
        eraserOn = !eraserOn;
        eraser.classList.toggle("selected-btn");
    }
})

colorInput.addEventListener("input", () => {
    color = colorInput.value;
})

container.addEventListener("click", paint);

function paint(e) {
    if (rainbowColorOn) e.target.style.backgroundColor = generateRandomColor();
    else if (eraserOn) {
        if (e.target.id == "ash") e.target.style.backgroundColor = "#d9d9d9ec";
        else e.target.style.backgroundColor = "#fffffff5";
    }
    else e.target.style.backgroundColor = color;
}

function generateRandomColor() {
    let min = 50, max = 255;
    let r = Math.floor(Math.random() * (max-min + 1)) + min;
    let g = Math.floor(Math.random() * (max-min + 1)) + min;
    let b = Math.floor(Math.random() * (max-min + 1)) + min;
    return `rgb(${r}, ${g}, ${b})`;
}

let reset = document.querySelector(".reset");

reset.addEventListener("click", resetCanvas);

function resetCanvas() {
    range.value = 16;
    totalTiles = range.value;
    rangeMsg.textContent = "16 X 16";
    createCanvas();
    rainbowColorOn = false;
    eraserOn = false;
    colorInput.value = "#000000";
    color = colorInput.value;
    rainbowColor.classList.remove("selected-btn");
    eraser.classList.remove("selected-btn");
}