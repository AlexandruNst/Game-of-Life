var sqPerLine = 50;
var w;
var grid;
var newGrid;
var keyP;
var randP;
var buttonP;
var startButton;
var check = false;


function setup() {
    createCanvas(900, 930);
    w = floor(width / sqPerLine);
    grid = create2DArray();

    for (var i = 0; i < sqPerLine; i++) {
        for (var j = 0; j < sqPerLine; j++) {
            grid[i][j] = 0;
        }
    }

    startButton = createButton("Start");
    startButton.style('font-size', '30px');
    startButton.position(width / 2 - 30, 700);
    startButton.size(100, 60);
    startButton.mousePressed(play);

    keyP = false;
    randP = false;
    buttonP = false;
}


function draw() {

    if (!buttonP) {
        textAlign(CENTER);

        background(255);
        textSize(60);
        fill(0);
        text("The Game of Life", width / 2, 200);

        stroke(0, 0, 0, 20);
        strokeWeight(4);
        fill(0);
        rect(70, 300, 35, 35);

        noStroke();
        textSize(30);
        fill(0);
        text("Black cells are alive", 270, 330);

        stroke(0, 0, 0, 20);
        strokeWeight(4);
        fill(255);
        rect(470, 300, 35, 35);

        noStroke();
        textSize(30);
        fill(0);
        text("White cells are dead", 670, 330);

        textSize(28);
        text("Any dead cell with 3 live neighbours becomes alive", width / 2, 430);
        text("Any live cell with less than 2 live neighbours dies", width / 2, 500);
        text("Any live cell with more than 3 live neighbours dies", width / 2, 550);
        text("Can you come up with patterns to keep the system moving?", width / 2, 620);


        //button.hide();



        // textAlign(CENTER);
        // textSize(15);
        // text("text", 0, 20);

    } else if (randP && !keyP) {
        //button.hide();
        fillGrid();
        write("You can add or remove live cells, as well as wipe the board. Press enter to run the game.");
    } else if (keyP == false) {
        //button.hide();
        fillGrid();
        write("Enter live cells. Press 'r' to randomise or 'w' to wipe the board. Press enter to run the game.");
        check = true;

    } else {
        //button.hide();
        fillGrid();
        write("Game is running. Press enter again to pause. Press 'w' to wipe the board and start again.");

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
}

function mousePressed() {
    for (var i = 0; i < sqPerLine; i++) {
        for (var j = 0; j < sqPerLine; j++) {
            if (check && mouseX > i * w && mouseX < i * w + w && mouseY > j * w + 30 && mouseY < j * w + w + 30) {
                if (grid[i][j] == 0) {
                    grid[i][j] = 1;
                } else {
                    grid[i][j] = 0;
                }
                break;
            }
        }
    }
}

function keyTyped() {
    if (key == 'r') {
        if (!keyP && buttonP) {
            for (var i = 0; i < sqPerLine; i++) {
                for (var j = 0; j < sqPerLine; j++) {
                    grid[i][j] = floor(random(2));
                }
            }

            keyP = false;
            randP = true;
        }
    }

    if (key == 'w' && buttonP) {
        for (var i = 0; i < sqPerLine; i++) {
            for (var j = 0; j < sqPerLine; j++) {
                grid[i][j] = 0;
            }
        }

        randP = false;
        keyP = false;
    }

    if (keyCode == 13 && buttonP) {
        if (!keyP) {
            keyP = true;
        } else if (keyP) {
            keyP = false;
        }
    }
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

function fillGrid() {
    background(255);
    strokeWeight(2);
    stroke(0, 0, 0, 20);

    for (var i = 0; i < sqPerLine; i++) {
        for (var j = 0; j < sqPerLine; j++) {
            if (grid[i][j] == 1) {
                fill(0);
            } else {
                fill(255);
            }
            rect(i * w, j * w + 30, w - 3, w - 3);
        }
    }
}

function write(words) {
    strokeWeight(2);
    stroke(255);
    fill(0);
    textSize(19);
    text(words, 1, 20);
}

function play() {
    startButton.hide();
    buttonP = true;
    textAlign(LEFT);

    //return false;

}