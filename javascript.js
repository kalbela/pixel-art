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
            } else tile.style.backgroundColor = "#fffffff5";
            tile.style.width = `${containerWidth/totalTiles}px`;
            tile.style.height = `${containerHeight/totalTiles}px`;
            container.appendChild(tile);
        }
    }
}


let colorInput = document.querySelector("input[type=color]");
let color = colorInput.value;;

colorInput.addEventListener("input", () => {
    color = colorInput.value;
})

container.addEventListener("click", paint);

function paint(e) {
    e.target.style.backgroundColor = color;
}