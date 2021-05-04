let obj = {
    numOfMols: 10,
    infectionRate: 0.5,
    numRows: 1,
    numCols: 1,
    showText: true,
    loopState: true,
    gridState: true,
    lineState: false,
    bounce: true,
    healthyColor: [0, 255, 70],
    infectedColor: [235, 70, 50],
    bgColor: [33, 33, 33],
    //intersectColor: [255, 135, 20],
    // recoveredColor: [255, 235, 80],
    minMolSize: 20,
    maxMolSize: 20
};

var gui = new dat.gui.GUI();

gui.remember(obj);

section01 = gui.addFolder('Layout');
section01.add(obj, 'numOfMols').min(1).max(500).step(1).onChange(function () {
    setup();
    draw();
});
section01.add(obj, 'infectionRate').min(0).max(1).step(0.01).onChange(function () {
    setup();
    draw();
});
section01.add(obj, 'numRows').min(1).max(20).step(1).onChange(function () {
    setup();
    draw();
});
section01.add(obj, 'numCols').min(1).max(20).step(1).onChange(function () {
    setup();
    draw();
});

section01.add(obj, 'loopState')
    .onChange(function () {
        checkLoop()
    });
section01.add(obj, 'gridState')
    .onChange(function () {
        draw()
    });
section01.add(obj, 'lineState')
    .onChange(function () {
        draw()
    });
section01.add(obj, 'bounce')
    .onChange(function () {
        splitObjectIntoGrid();
    });

section02 = gui.addFolder('Design');

section02.add(obj, 'showText')
    .onChange(function () {
        draw()
    });
section02.add(obj, 'minMolSize')
    .min(1)
    .max(50)
    .step(1)
    .onChange(function () {
        setup();
    });
section02.add(obj, 'maxMolSize')
    .min(1)
    .max(50)
    .step(1)
    .onChange(function () {
        setup();
    });


section03 = gui.addFolder('Colour');

// section03.addColor(obj, 'infectedColor')
//     .onChange(function () {
//         refreshGui()
//     });

// section03.addColor(obj, 'healthyColor')
//     .onChange(function () {
//         refreshGui()
//     });

section03.addColor(obj, 'bgColor')
    .onChange(function () {
        refreshGui()
    });

// section03.addColor(obj, 'intersectColor')
//     .onChange(function () {
//         refreshGui()
//     });

// section03.addColor(obj, 'intersectColor')
//     .onChange(function () {
//     draw()
// });