class Molecule {
  constructor({
    _index,
    px = 100,
    py = 100,
    vx = random(-2.5, 2.5),
    vy = random(-2.5, 2.5),
  }) {
    this.index = _index;
    this.position = createVector(px, py);
    this.velocity = createVector(vx, vy);
    this.radius = random(obj.minMolSize, obj.maxMolSize);
    this.color = color(0, 0, 255);
  }

  render() {
    noStroke()
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
    // Displays the index of the molecule in their centres
    (obj.showText) ? (
      fill(0),
      textSize(16),
      textAlign(CENTER),
      text(this.index, this.position.x, this.position.y + 6)) : null;
  }

  // Reverts the direction of each molecule after they come to the edge of the canvas by inverting the velocity.
  step() {
    (this.position.x > width - this.radius || this.position.x < 0 + this.radius) ?
    this.velocity.x *= -1: null;

    (this.position.y > height - this.radius - graphHeight || this.position.y < 0 + this.radius) ?
    this.velocity.y *= -1: null;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  // Checks if the molecules are intersecting by checking if their radii are overlapping.
  // "check" will create a boolean that is used to check if the molecules are intersecting.
  isIntersecting(_molecule) {
    let distance = dist(this.position.x, this.position.y, _molecule.position.x, _molecule.position.y)
    let gap = distance - this.radius - _molecule.radius;
    let check = (gap <= 0) ? true : false;

    if (check) {
      // dy + dx: the change of the objects' position over time on x + y plane.
      let dx = this.position.x - _molecule.position.x;
      let dy = this.position.y - _molecule.position.y;
      // calculating the distance between molecules
      let normalX = dx / distance;
      let normalY = dy / distance;

      // calculating the inverse effect of intersection on the molecules velocities

      let dVector = (this.velocity.x - _molecule.velocity.x) * normalX;
      dVector += (this.velocity.y - _molecule.velocity.y) * normalY;

      let dvx = dVector * normalX;
      let dvy = dVector * normalY;

      // changing the velocities of each molecule
      this.velocity.x -= dvx;
      this.velocity.y -= dvy;

      let indexVal = _molecule.index;

      molecules[indexVal].velocity.x += dvx;
      molecules[indexVal].velocity.y += dvy;

      // Prints which molecules collided into the console, referring to index and constructor name (molecule type).
      console.log(this.constructor.name + " " + this.index + " hit " + _molecule.constructor.name + " " + _molecule.index);

      return check;
    }
  }

  separate(_otherMolecule) {
    let fixedBall = molecules[_otherMolecule.index];

    let resultantV = p5.Vector.sub(this.position, fixedBall.position);

    let rHeading = resultantV.heading();
    let rDist = (resultantV.mag() - this.radius - fixedBall.radius) / 2;

    // calculated distance taken away from the current position
    let moveX = cos(rHeading) * rDist;
    let moveY = sin(rHeading) * rDist;

    this.position.x -= moveX;
    this.position.y -= moveY;

    molecules[_otherMolecule.index].position.x += moveX;
    molecules[_otherMolecule.index].position.y += moveY;
  }
}