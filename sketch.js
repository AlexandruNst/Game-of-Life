var sqPerLine = 50;
var w;
var grid;
var newGrid;


function setup() {
    createCanvas(900, 900);
    w = floor(width / sqPerLine);
    grid = create2DArray();

    for (var i = 0; i < sqPerLine; i++) {
        for (var j = 0; j < sqPerLine; j++) {
            grid[i][j] = floor(random(2));
        }
    }
}


function draw() {
    background(51);
    noStroke();

    for (var i = 0; i < sqPerLine; i++) {
        for (var j = 0; j < sqPerLine; j++) {
            if (grid[i][j] == 1) {
                fill(0);
            } else {
                fill(255);
            }
            rect(i * w, j * w, w, w);
        }
    }

    newGrid = create2DArray();

    for (var i = 0; i < sqPerLine; i++) {
        for (var j = 0; j < sqPerLine; j++) {

            var current = grid[i][j];
            var neighbours = countNearbyLives(i, j);

            if (current == 0 && neighbours == 3) {
                newGrid[i][j] = 1;
            } else if (current == 1 && (neighbours < 2 || neighbours > 3)) {
                newGrid[i][j] = 0;
            } else {
                newGrid[i][j] = current;
            }
        }
    }

    grid = newGrid;
}

function create2DArray() {
    var arr = new Array(sqPerLine);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(sqPerLine);
    }

    return arr;
}

function countNearbyLives(i, j) {
    var lives = 0;

    for (var x = -1; x <= 1; x++) {
        for (var y = -1; y <= 1; y++) {
            if (i + x >= 0 && i + x < sqPerLine && j + y >= 0 && j + y < sqPerLine) {
                if (!(x == 0 && y == 0)) {
                    lives += grid[i + x][j + y];
                }
            }
        }
    }

    return lives;
}