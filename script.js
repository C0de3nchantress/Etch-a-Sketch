const gridContainer = document.querySelector(".grid.container");

const colorButton = document.querySelector(".color-button");
const rgbButton = document.querySelector(".rgb-button");
const eraserButton = document.querySelector(".eraser-button");
const clearButton = document.querySelector(".clear-button");
const darkenButton = document.querySelector(".darken-button");
const lightenButton = document.querySelector(".lighten-button");

let activeButton = null;
let activeButtonTemp = null;

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
        element.setAttribute("draggable", false);

        element.addEventListener("mousedown", (e) => {
            e.preventDefault();
            mouseIsDown = true;
            if (styles.backgroundColor) {
                element.style.backgroundColor = styles.backgroundColor;
            }
        });

        element.addEventListener("mouseover", (e) => {
            e.preventDefault();
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
let sizeSliderVal = sizeSlider.value;
sliderValDiv.textContent = `${sizeSliderVal}x${sizeSliderVal}`;

sizeSlider.addEventListener("input", () => {
    sizeSliderVal = sizeSlider.value;
    gridContainer.innerHTML = "";
    createGrid(sizeSliderVal);
    sliderValDiv.textContent = `${sizeSliderVal}x${sizeSliderVal}`;

    if (activeButton === colorButton) {
        colorButton.click();
    } else if (activeButton === rgbButton) {
        rgbButton.click();
    } else if (activeButton === eraserButton) {
        eraserButton.click();
    } else if (activeButton === clearButton) {
        clearButton.click();
    } else if (activeButton === darkenButton) {
        darkenButton.click();
    } else if (activeButton === lightenButton) {
        lightenButton.click();
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

        activeButtonTemp = activeButton;
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
            return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
                Math.random() * 256
            )}, ${Math.floor(Math.random() * 256)})`;
        },
    });
});

eraserButton.addEventListener("click", () => {
    gridStyles({ backgroundColor: "#fefefe" });
});

clearButton.addEventListener("click", () => {
    gridContainer.innerHTML = "";
    createGrid(sizeSliderVal);

    activeButton = activeButtonTemp;
    activeButton.click();
});

function rgbToHsl(rgb) {
    let result = rgb.match(/\d+/g);
    let r = result[0] / 255;
    let g = result[1] / 255;
    let b = result[2] / 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h,
        s,
        l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        let diff = max - min;
        s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);

        switch (max) {
            case r:
                h = (g - b) / diff + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / diff + 2;
                break;
            case b:
                h = (r - g) / diff + 4;
                break;
        }

        h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return [h, s, l];
}

function darkenAndLighten(lightingVal) {
    const gridObjects = document.querySelectorAll(".grid-obj");
    let mouseIsDown = false;

    gridObjects.forEach((element) => {
        element.replaceWith(element.cloneNode(true));
    });

    const updatedGridObjects = document.querySelectorAll(".grid-obj");

    updatedGridObjects.forEach((element) => {
        element.addEventListener("mousedown", (e) => {
            e.preventDefault();
            mouseIsDown = true;
            let currentColor = getComputedStyle(element).backgroundColor;

            let hslColor = rgbToHsl(currentColor);
            hslColor[2] = Math.max(0, hslColor[2] + lightingVal);
            element.style.backgroundColor = `hsl(${hslColor[0]}, ${hslColor[1]}%, ${hslColor[2]}%)`;
        });

        element.addEventListener("mouseover", (e) => {
            e.preventDefault();
            if (mouseIsDown) {
                let currentColor = getComputedStyle(element).backgroundColor;

                let hslColor = rgbToHsl(currentColor);
                hslColor[2] = Math.max(0, hslColor[2] + lightingVal);
                element.style.backgroundColor = `hsl(${hslColor[0]}, ${hslColor[1]}%, ${hslColor[2]}%)`;
            }
        });
    });
    document.addEventListener("mouseup", () => {
        mouseIsDown = false;
    });
}

darkenButton.addEventListener("click", () => {
    darkenAndLighten(-10);
});

lightenButton.addEventListener("click", () => {
    darkenAndLighten(10);
});
