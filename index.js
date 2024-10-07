const gridContainer = document.querySelector(".grid.container");

function createGrid(size) {
    const gridSize = 500 / size;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const grid = document.createElement("div");
            grid.style.width = `${gridSize}px`;
            grid.style.height = `${gridSize}px`;
            grid.classList.add("grid-obj");
            gridContainer.appendChild(grid);
        }
    }

    const gridObjects = document.querySelectorAll(".grid-obj");
    gridObjects.forEach((element) => {
        element.addEventListener("mouseover", () => {
            element.classList.add("perma-hover");
        });
    });
}

createGrid(16);
