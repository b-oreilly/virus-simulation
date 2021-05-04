/** 
 * RULES *
 *
 */

let molecules = [];
let grid = [];
let colWidth, rowHeight;

function setup() {
    createCanvas(750, 750);
    colWidth = width / obj.numCols;
    rowHeight = height / obj.numRows;
    molecules = [];

    // i assigns an index number to each molecule so they can be differentiated in the array
    for (let i = 0; i < obj.numOfMols; i++) {
        let randomNum = random(1);
        if (randomNum < obj.infectionRate) {
            molecules.push(new Infected(i));
        } else {
            molecules.push(new Healthy(i));
        }
    }
    gridify();
    checkLoop();
}

function draw() {
    background(obj.bgColor);

    molecules.forEach((molecule) => {
        molecule.reset();
    });

    splitObjectIntoGrid();

    obj.gridState ? drawGrid() : null;

    molecules.forEach((molecule) => {
        molecule.render();
        molecule.step();
    });

}

/** 
 * A nested for loop that checks if molecules intersect each other & changes colour.
 * The parameter _collection is passed in to keep the checking within the specific grid section
 */
function checkIntersections(_collection) {
    for (let a = 0; a < _collection.length; a++) {
        for (let b = a + 1; b < _collection.length; b++) {
            let moleculeA = molecules[_collection[a]];
            let moleculeB = molecules[_collection[b]];
            if (obj.lineState) {
                stroke(125, 100);
                line(moleculeA.position.x, moleculeA.position.y, moleculeB.position.x, moleculeB.position.y);
            };
            moleculeA.isIntersecting(moleculeB) ? (moleculeA.changeColor(), moleculeB.changeColor()) : null;
        }
    }
}


/** 
 * A nested for loop that checks each section of the grid made up of rows and columns.
 * moleculeCollection is assigned a filtered array of the molecule objects divided and mapped within the grid.
 */
function splitObjectIntoGrid() {

    for (let j = 0; j < obj.numRows; j++) {
        for (let i = 0; i < obj.numCols; i++) {

            let moleculeCollection = molecules.filter(molecule =>
                molecule.position.x > (i * colWidth) &&
                molecule.position.x < ((i + 1) * colWidth) &&
                molecule.position.y > j * rowHeight &&
                molecule.position.y < (j + 1) * rowHeight
            ).map(molecule => molecule.index);

            checkIntersections(moleculeCollection);
        }
    }
}


/** 
 * Takes the square root of the amount of molecules, divides & floors that relative to the number
 * of rows and columns (numDivision) and distributes them evenly by changing their position.
 */
function gridify() {
    let numDivision = ceil(Math.sqrt(obj.numOfMols));
    let spacing = (width - obj.maxMolSize) / numDivision;

    molecules.forEach((molecule, index) => {

        let colPos = (index % numDivision) * spacing;
        let rowPos = floor(index / numDivision) * spacing;
        //console.log(`The col pos ${colPos} and the row pos ${rowPos}`);
        molecule.position.x = colPos + obj.maxMolSize;
        molecule.position.y = rowPos + obj.maxMolSize;

    });
}


/** 
 *
 * Draws a grid using a nested loop iterating columns(i) within rows(j).
 * colWidth and rowWidth are calculated in the setup().
 * The style of grid is defined by fill, stroke and strokeWeight. 
 * There are no parameters required to fulfil the function and no returns.
 *
 */
function drawGrid() {
    noFill();
    stroke(155, 155, 155, 50);
    strokeWeight(1);

    for (let j = 0; j < obj.numRows; j++) {
        for (let i = 0; i < obj.numCols; i++) {
            //
            rect(i * colWidth, j * rowHeight, colWidth, rowHeight)
        }
    }
}


/** 
 * Boolean for the GUI controls to turn on/off the molecules movement on the canvas.
 */
function checkLoop() {
    if (obj.loopState) {
        loop();
    } else {
        noLoop();
    }
}


/** 
 * Resets the GUI slider values to their initial values
 */
function refreshGui() {
    gui.__controllers.forEach(controller => controller.setValue(controller.initialValue));
}