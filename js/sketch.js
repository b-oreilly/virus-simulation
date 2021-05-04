/** 
 * Assignment 2 Virus Simulator *
 *          RULES               *
 * This assignment replicates a virus generator with a number of different object types:
 * Healthy, Infected and Recovered.
 * The molecules show how a virus can spread and what affect implementing different social behaviours 
 * like viral rate, lifecycle and recovery have on the outcome.
 * Users have the option of changing these parameters through a GUI located on the top right.
 * A graphical output of results can be seen under the simulation and the results of molecules that are
 * Healthy, Infected and Recovered can been seen as they change.
 */

let molecules = [];
let grid = [];
let graphArray = [];
let graphHeight = 100;
let colWidth, rowHeight;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colWidth = width / obj.numCols;
    rowHeight = height / obj.numRows;
    molecules = [];

    // i assigns an index number to each molecule so they can be differentiated in the array.
    for (let i = 0; i < obj.numOfMolecules; i++) {
        let randomNum = random(1);
        // number of Infected molecules/cases
        if (randomNum < obj.infectionRate) {
            molecules.push(new Infected({
                _index: i
            }));
        } else {
            molecules.push(new Healthy({
                _index: i
            }));
        }
    }
    gridify();
    checkLoop();
}

function draw() {
    background(obj.bgColor);
    splitObjectIntoGrid();
    checkHealth();
    obj.gridState ? drawGrid() : null;
    drawGraph();
    molecules.forEach((molecule) => {
        molecule.render();
        molecule.step();
    });
}


/** 
 * checkIntersections:
 * A nested for/else loop that checks if molecules intersect each other & changes their state.
 * The parameter _collection is passed in to keep the checking within the specific grid section.
 * moleculeA & moleculeB are variables created to check each molecule against one another.
 * If the molecules intersect, separate is called to from the Molecule script to separate them and dock their radius with each other.
 */
function checkIntersections(_collection) {
    for (let a = 0; a < _collection.length; a++) {
        for (let b = a + 1; b < _collection.length; b++) {
            let moleculeA = molecules[_collection[a]];
            let moleculeB = molecules[_collection[b]];
            // GUI controls to display a line between which molecules are checking against one another.
            if (obj.lineState) {
                stroke(125, 100);
                line(moleculeA.position.x, moleculeA.position.y, moleculeB.position.x, moleculeB.position.y);
            };

            if (moleculeA.isIntersecting(moleculeB)) {
                moleculeA.separate(moleculeB);
                // If an Infected molecule intersects with a Healthy molecule,
                // a temporary object is created with the Healthy molecule 's object information
                if (moleculeA.constructor.name == "Infected" && moleculeB.constructor.name == "Healthy") {
                    let randomNum = random();
                    // Taking moleculeB/Healthy info
                    if (randomNum < obj.viralRate) {
                        let tempObject = new Infected({
                            _index: moleculeB.index,
                            px: moleculeB.position.x,
                            py: moleculeB.position.y,
                            vx: moleculeB.velocity.x,
                            vy: moleculeB.velocity.y,
                        });
                        // replacing the Healthy molecule as an Infected one in the array
                        molecules[moleculeB.index] = tempObject;
                    }
                } else if (moleculeB.constructor.name == "Infected" && moleculeA.constructor.name == "Healthy") {
                    let randomNum = random();
                    if (randomNum < obj.viralRate) {
                        let tempObject = new Infected({
                            _index: moleculeA.index,
                            px: moleculeA.position.x,
                            py: moleculeA.position.y,
                            vx: moleculeA.velocity.x,
                            vy: moleculeA.velocity.y,
                        });
                        // replacing the Healthy molecule as an Infected one in the array
                        molecules[moleculeA.index] = tempObject;
                    }
                }
            }
        }
    }
}


/** 
 * splitObjectIntoGrid:
 * A nested for loop that checks each section of the grid made up of rows and columns.
 * moleculeCollection is assigned a filtered array of the molecule objects divided and mapped within the grid.
 */
function splitObjectIntoGrid() {
    for (let j = 0; j < obj.numRows; j++) {
        for (let i = 0; i < obj.numCols; i++) {

            let moleculeCollection = molecules.filter(molecule =>
                molecule.position.x > (i * colWidth) &&
                molecule.position.x < ((i + 1) * colWidth) &&
                molecule.position.y > j * (rowHeight) &&
                molecule.position.y < (j + 1) * (rowHeight)
            ).map(molecule => molecule.index);

            checkIntersections(moleculeCollection);
        }
    }
}


/** 
 * gridify:
 * Takes the square root of the amount of molecules, divides & floors that relative to the number
 * of rows and columns (numDivision) and distributes them evenly by changing their position.
 * Also takes the graph into account and is offset correctly.
 */
function gridify() {
    let numDivision = ceil(Math.sqrt(obj.numOfMolecules));
    let xSpacing = (width - obj.maxMolSize) / numDivision;
    let ySpacing = (height - obj.maxMolSize - graphHeight) / numDivision;

    molecules.forEach((molecule, index) => {
        let colPos = (index % numDivision) * xSpacing;
        let rowPos = floor(index / numDivision) * ySpacing;
        molecule.position.x = colPos + obj.maxMolSize;
        molecule.position.y = rowPos + obj.maxMolSize;
    });
}


/** 
 * drawGraph:
 * Draws a graph by pushing the values of healthy and infected as a visual output of rectangles
 * The style of graph is defined by rectangles and their fill defined by  with no stroke. 
 * There are no parameters required to fulfil the function and no returns.
 */
function drawGraph() {
    // Graph data
    let numInfected = molecules.filter(molecule => molecule.constructor.name == "Infected")
    let numHealthy = molecules.filter(molecule => molecule.constructor.name == "Healthy")
    let numRecovered = molecules.filter(molecule => molecule.constructor.name == "Recovered")

    iHeight = map(numInfected.length, 0, obj.numOfMolecules, 0, graphHeight);
    hHeight = map(numHealthy.length, 0, obj.numOfMolecules, 0, graphHeight);
    rHeight = map(numRecovered.length, 0, obj.numOfMolecules, 0, graphHeight);

    // Graph legend
    noStroke();
    fill(5, 5, 5, 95);
    rect(0, windowHeight - graphHeight, windowWidth, graphHeight); // background
    fill(0); // black text
    textFont('Helvetica');
    textSize(20);
    textAlign(LEFT);
    // this will print the number of healthy and infected molecules below the simulation
    text("Healthy: " + numHealthy.length, 10, windowHeight - graphHeight + 30);
    text("Infected: " + numInfected.length, 10, windowHeight - graphHeight + 60);
    text("Recovered: " + numRecovered.length, 10, windowHeight - graphHeight + 90);

    /** 
     * If the array exceeds half the browser window width,
     * the first value in the array is deleted and replaced 
     * with the new array values being added to the end.
     */

    if (graphArray.length >= windowWidth / 2) {
        graphArray.shift();
    }
    // the number of healthy and infected molecules are pushed into the empty graphArray
    graphArray.push({
        numInfected: numInfected.length,
        numHealthy: numHealthy.length,
        numRecovered: numRecovered.length,
        iHeight: iHeight,
        hHeight: hHeight,
        rHeight: rHeight
    });

    push();
    translate(windowWidth / 2, windowHeight)
    graphArray.forEach(function (data, index) {
        noStroke();
        // Infected data
        fill(160, 25, 35);
        rect(index, 0, 1, -data.iHeight)
        // Healthy data
        fill(90, 190, 100);
        rect(index, -data.iHeight, 1, -data.hHeight)
        // Recovered data
        fill(80, 105, 185);
        rect(index, -data.iHeight - data.hHeight, 1, -data.rHeight);
    })
    pop();
}

/** 
 * checkHealth:
 * checks each of the Infected molecules frames/lifeCycle for recoveryLength and adds it to it's date of birth. 
 * This will tell when the Infected molecule has ran it's course and the molecule's information 
 * is pushed into a temporary object and the newly Recovered object is created.
 */
function checkHealth() {
    molecules.forEach((molecule) => {
        if (frameCount > molecule.dob + molecule.lifeCycle) {
            let tempObject = {
                _index: molecule.index,
                px: molecule.position.x,
                py: molecule.position.y,
                vy: molecule.velocity.x,
                vx: molecule.velocity.y
            }
            molecules.splice(tempObject._index, 1, new Recovered(tempObject));
        }
    });
}

/** 
 * drawGrid:
 * Draws a grid using a nested loop iterating columns(i) within rows(j).
 * colWidth and rowWidth are calculated in the setup().
 * The style of grid is defined by fill, stroke and strokeWeight. 
 * There are no parameters required to fulfil the function and no returns.
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
 * checkLoop:
 * controlls the boolean for the GUI controls to turn on/off the molecules movement on the canvas.
 */
function checkLoop() {
    if (obj.loopState) {
        loop();
    } else {
        noLoop();
    }
}


/** 
 * refreshGui:
 * sets the GUI controller values to their new values.
 */
function refreshGui() {
    gui.__controllers.forEach(controller => controller.setValue(controller.initialValue));
}