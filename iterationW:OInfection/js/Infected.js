class Infected extends Molecule {
  constructor(_i) {
    super(_i);
    //this.color = color(255, 0, 0);
    this.color = obj.infectedColor;
    this.intersectColor = color(75, 0, 0);
  }

  // isIntersecting(_mol) {
  //   if (Molecule.constructor.name == Infected) {
  //     //if (this.constructor.name === "Infected" && _mol.constructor.name === "Healthy") {
  //       //this.constructor.isIntersecting(moleculeB) ? (moleculeA.changeColor(), moleculeB.changeColor()) : null;
  //       //obj.bounce = true;
  //       molecules.splice(_mol.index, 1);
  //       //Infected.push(new Infected, _mol.index, 1);
  //     //}
  //   }

//   isIntersecting(_mol) {
//     if (this.constructor.name == "infected", _mol.constructor.name == "healthy") {
//       molecules.splice(_mol.index, 1)
//       molecules.push(new Infected);

//     }

//   }
} 