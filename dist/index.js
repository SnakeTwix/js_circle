"use strict";
const SIZE_Y = 80;
const ASPECT = window.innerWidth / window.innerHeight;
const CELL_SIZE = window.innerHeight / SIZE_Y;
const SIZE_X = Math.floor(window.innerWidth / CELL_SIZE);
let t = 0;
const grid = document.getElementById('grid');
const cells = [];
fillGrid();
setStyles();
draw();
function setStyles() {
    grid.style.gridTemplateColumns = `repeat(${SIZE_X}, ${CELL_SIZE}px)`;
    grid.style.gridTemplateRows = `repeat(${SIZE_Y}, ${CELL_SIZE}px)`;
}
function fillGrid() {
    for (let i = 0; i < SIZE_Y * SIZE_X; i++) {
        cells[i] = document.createElement('div');
        cells[i].classList.add('cell');
        grid.append(cells[i]);
    }
}
function draw() {
    window.requestAnimationFrame(() => draw());
    sphere(t++);
}
function sphere(t) {
    for (let i = 0; i < SIZE_X; i++) {
        for (let j = 0; j < SIZE_Y; j++) {
            let { x, y } = getCoordinates(i, j);
            x *= ASPECT;
            x += Math.sin(t * 0.005);
            y += Math.cos(t * 0.005);
            const dist = distance(x, y);
            let color;
            if (dist < 0.2)
                color = 0;
            else
                color = 255;
            let rgbColor = [color, color, color].join(', ');
            cells[i + j * SIZE_X].style.backgroundColor = `rgb(${rgbColor})`;
        }
    }
}
function getCoordinates(i, j) {
    return { x: (i / SIZE_X) * 2 - 1, y: (j / SIZE_Y) * 2 - 1 };
}
function distance(x, y) {
    return Math.sqrt(x * x + y * y);
}
