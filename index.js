const gridContainer = document.querySelector(".grid.container");

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

    let mouseIsDown = false;
    const gridObjects = document.querySelectorAll(".grid-obj");
    gridObjects.forEach((element) => {
        element.addEventListener("mousedown", () => {
            mouseIsDown = true;
            element.classList.add("perma-hover");
        });

        element.addEventListener("mouseover", () => {
            if (mouseIsDown) {
                element.classList.add("perma-hover");
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
});

const buttons = document.querySelectorAll("button");
const buttonColorWhenClickedDiv = document.createElement("div");
buttonColorWhenClickedDiv.style.backgroundColor = "black"
buttonColorWhenClickedDiv.classList.add("button-color-when-clicked")


buttons.forEach((button) => {
    button.addEventListener("click", () => {
        buttons.forEach((btn) => {
            btn.style.backgroundColor = "";
            btn.style.color = "";
        });
        button.style.backgroundColor = "#000000"
        button.style.color = "#e9e9ed"
    })
})
