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

rainbowColor.addEventListener("click", () => {
    rainbowColorOn = !rainbowColorOn;
})

let eraser = document.querySelector(".eraser");
let eraserOn = false;

eraser.addEventListener("click", () => {
    eraserOn = !eraserOn;
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