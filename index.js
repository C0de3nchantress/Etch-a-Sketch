const container = document.querySelector(".grid.container");

for (let i = 0; i < 128; i++) {
    for (let j = 0; j < 128; j++) {
        const grid = document.createElement("div");
        grid.classList.add("grid-obj");
        container.appendChild(grid);
    }
}


const gridObjects = document.querySelectorAll(".grid-obj");
gridObjects.forEach(element => {
    element.addEventListener("mouseover", () => {
        element.classList.add("perma-hover");
    });
});