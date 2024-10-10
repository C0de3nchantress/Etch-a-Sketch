const gridContainer = document.querySelector(".grid.container");

const colorButton = document.querySelector(".color-button");
const rgbButton = document.querySelector(".rgb-button");

let activeButton = null;

function createGrid(size) {
    for (let i = 0; i < size; i++) {
        const row = document.createElement("div");
        row.classList.add("grid-row");

        for (let j = 0; j < size; j++) {
            const grid = document.createElement("div");
            grid.classList.add("grid-obj");
            row.appendChild(grid);
        }
        gridContainer.appendChild(row);
    }
}

function gridStyles(styles) {
    let mouseIsDown = false;
    const gridObjects = document.querySelectorAll(".grid-obj");
    gridObjects.forEach((element) => {
        element.addEventListener("mousedown", () => {
            mouseIsDown = true;
            if (styles.backgroundColor) {
                element.style.backgroundColor = styles.backgroundColor;
            }
        });

        element.addEventListener("mouseover", () => {
            if (mouseIsDown) {
                if (styles.backgroundColor) {
                    element.style.backgroundColor = styles.backgroundColor;
                }
            }
        });
    });
    document.addEventListener("mouseup", () => {
        mouseIsDown = false;
    });
}

createGrid(16);

const sliderValDiv = document.createElement("div");
const sliderContainer = document.querySelector(".slider-container");

sliderContainer.append(sliderValDiv);

const sizeSlider = document.querySelector(".size-slider");
sliderValDiv.textContent = `${sizeSlider.value}x${sizeSlider.value}`;
sizeSlider.addEventListener("input", () => {
    const sizeSliderVal = sizeSlider.value;
    gridContainer.innerHTML = "";
    createGrid(sizeSliderVal);
    sliderValDiv.textContent = `${sizeSliderVal}x${sizeSliderVal}`;

    if (activeButton === colorButton){
        colorButton.click();
    } else if (activeButton === rgbButton){
        rgbButton.click()
    }
    
});

const buttons = document.querySelectorAll("button");
const buttonColorWhenClickedDiv = document.createElement("div");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        buttons.forEach((btn) => {
            btn.style.backgroundColor = "";
            btn.style.color = "";
        });
        button.style.backgroundColor = "#000000";
        button.style.color = "#e9e9ed";

        activeButton = button;
    });
});

const colorInput = document.querySelector(".color-inp");

colorInput.value = "#FFC0CB";
let colorChoice = colorInput.value;

colorInput.addEventListener("input", () => {
    colorChoice = colorInput.value;
    colorButton.click();
});
colorButton.addEventListener("click", () => {
    gridStyles({ backgroundColor: colorChoice });
});

document.addEventListener("DOMContentLoaded", () => {
    colorButton.click();
});


rgbButton.addEventListener("click", () => {
    gridStyles({
        get backgroundColor() {
            return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        }
    });
});
