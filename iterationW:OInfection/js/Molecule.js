// let temp = new Molecule(3, 255, 67);
// this will make a mol with id 3, at 255 x, 67 y yadda yadda


// default params? how to set default parameters for es6 classes js

class Molecule {
  constructor(_i, _x, _y) {
    this.position = createVector(200, 200);
    this.velocity = createVector(random(-2, 2), random(-2, 2));
    this.radius = random(obj.minMolSize, obj.maxMolSize);
    this.color = color(255, 255, 255);
    this.intersectColor = (155, 155, 155);
    this.currentColor = this.color;
    this.index = _i;
  }

  render() {
    noStroke()
    fill(this.currentColor);
    ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
    fill(0);
    (obj.showText) ? (
      textSize(16),
      textAlign(CENTER),
      text(this.index, this.position.x, this.position.y + 6)) : null;
  }

  // changes the colour of the molecules from the GUI
  changeColor() {
    this.currentColor = this.intersectColor;
  }

  // resets the colour of each molecule after they intersect/collide
  reset() {
    this.currentColor = this.color;
  }

  // reverts the direction of each molecule after they come to the edge of the canvas by inverting the velocity
  step() {
    (this.position.x > width - this.radius || this.position.x < 0 + this.radius) ?
    this.velocity.x *= -1: null;

    (this.position.y > height - this.radius || this.position.y < 0 + this.radius) ?
    this.velocity.y *= -1: null;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  // checks if the molecules are intersecting by checking if their radii are overlapping
  // gap and check create a boolean that will be used to change the molecule colour on intersection
  isIntersecting(_mol) {
    //let _otherMolecule = molecules.index;
    let distance = dist(this.position.x, this.position.y, _mol.position.x, _mol.position.y)
    let gap = distance - this.radius - _mol.radius;
    let check = (gap <= 0) ? true : false;

    if (check) {

      // let resultantV = p5.Vector.sub(this.position, _mol.position);

      // let rHeading = resultantV.heading();

      // let moveX = cos(rHeading) * gap / 2;
      // let moveY = sin(rHeading) * gap / 2;

      // this.position.x -= moveX;
      // this.position.y -= moveY;

      // molecules[_mol.index].position.x += moveX;
      // molecules[_mol.index].position.y += moveY;


      // 
      if (obj.bounce) {
        let resultantV = p5.Vector.sub(this.position, _mol.position);

        let rHeading = resultantV.heading();

        let moveX = cos(rHeading) * gap / 2;
        let moveY = sin(rHeading) * gap / 2;

        this.position.x -= moveX;
        this.position.y -= moveY;

        molecules[_mol.index].position.x += moveX;
        molecules[_mol.index].position.y += moveY;


        // dy + dx: the change of the objects' position over time on x + y plane
        let dx = this.position.x - _mol.position.x;
        let dy = this.position.y - _mol.position.y;

        let dist = Math.sqrt(dx * dx + dy * dy);
        // pythagorean theorem

        let normalX = dx / dist;
        let normalY = dy / dist;

        // why are we calculating midpoint? I think 
        // p5 automatically takes midpoint of any ellipse, hence having to add radius/diameter
        let midpointX = (this.position.x.x + _mol.position.x) / 2;
        let midpointY = (this.position.x.y + _mol.position.y) / 2;

        let dVector = (this.velocity.x - _mol.velocity.x) * normalX;
        dVector += (this.velocity.y - _mol.velocity.y) * normalY;

        let dvx = dVector * normalX;
        let dvy = dVector * normalY;

        this.velocity.x -= dvx;
        this.velocity.y -= dvy;

        _mol.velocity.x += dvx;
        _mol.velocity.y += dvy;

        console.log(this.constructor.name + " " + this.index + " hit " + _mol.constructor.name + " " + _mol.index);
      }

      //console.log("Collision");
      //console.log(this.index + " has collided " + _mol.index);
      //console.log(this.state + " " + this.index + " hit " + _mol.state + " " + _mol.index);

      return check;
    }
  }
}