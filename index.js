const gridContainer = document.querySelector(".grid.container");

function createGrid(size) {
    // const gridSize = 500 / size;
    for (let i = 0; i < size; i++) {
        const row = document.createElement("div");
        row.classList.add("grid-row");

        for (let j = 0; j < size; j++) {
            const grid = document.createElement("div");
            // grid.style.width = `${gridSize}px`;
            // grid.style.height = `${gridSize}px`;
            grid.classList.add("grid-obj");
            row.appendChild(grid);
        }

        gridContainer.appendChild(row);
    }

    const gridObjects = document.querySelectorAll(".grid-obj");
    gridObjects.forEach((element) => {
        element.addEventListener("mouseover", () => {
            element.classList.add("perma-hover");
        });
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
