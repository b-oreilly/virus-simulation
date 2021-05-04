let obj = {
    numOfMolecules: 20,
    infectionRate: 0.25, // number of Infected molecules/cases
    viralRate: 0.8, // how quickly the virus is spread in percentage
    recoveryLength: 1000, // how long the infected molecules live
    numRows: 1,
    numCols: 1,
    loopState: true,
    showText: false,
    gridState: false,
    lineState: false,
    bgColor: [225, 225, 225], // background colour
    minMolSize: 10,
    maxMolSize: 10
};

var gui = new dat.gui.GUI();

gui.remember(obj);

section01 = gui.addFolder('Molecules');
section01.add(obj, 'numOfMolecules').min(1).max(250).step(1).onChange(function () {
    setup();
    draw();
});
section01.add(obj, 'infectionRate').min(0).max(1).step(0.01).onChange(function () {
    setup();
    draw();
});
section01.add(obj, 'viralRate').min(0).max(1).step(0.01).onChange(function () {
    setup();
    draw();
});
section01.add(obj, 'recoveryLength').min(600).max(10000).step(10).onChange(function () {
    setup();
    draw();
});

section01.add(obj, 'loopState')
    .onChange(function () {
        checkLoop()
    });

section01.add(obj, 'lineState')
    .onChange(function () {
        draw()
    });

section01.add(obj, 'showText')
    .onChange(function () {
        draw()
    });

section02 = gui.addFolder('Grid');

section02.add(obj, 'gridState')
    .onChange(function () {
        draw()
    });

section02.add(obj, 'numRows').min(1).max(20).step(1).onChange(function () {
    setup();
    draw();
});
section02.add(obj, 'numCols').min(1).max(20).step(1).onChange(function () {
    setup();
    draw();
});

section03 = gui.addFolder('Design');

section03.add(obj, 'minMolSize')
    .min(1)
    .max(50)
    .step(1)
    .onChange(function () {
        setup();
    });

section03.add(obj, 'maxMolSize')
    .min(1)
    .max(50)
    .step(1)
    .onChange(function () {
        setup();
    });

section03.addColor(obj, 'bgColor')
    .onChange(function () {
        refreshGui()
    });