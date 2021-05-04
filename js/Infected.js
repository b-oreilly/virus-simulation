class Infected extends Molecule {
  constructor({
    _index,
    px = 100,
    py = 100,
    vx = random(-2.5, 2.5),
    vy = random(-2.5, 2.5)
  }) {
    super({
      _index,
      px,
      py,
      vx,
      vy
    });
    this.color = color(160, 25, 35);
    // takes the frameRate at which the molecule was infected/born at
    this.dob = frameCount;
    // the amount of frames that the infected molecule will survive for before becoming recovered
    this.lifeCycle = obj.recoveryLength;
  }
  render() {
    super.render();

    //adding a pulsing effect to the molecules
    noFill();
    stroke(this.color);
    strokeWeight(2);
    smooth(); // anti-aliasing
    let diam = map(Math.sin(frameCount / 5), -1, 0.5, this.radius + 10, (obj.maxMolSize + this.radius + 5));
    ellipse(this.position.x, this.position.y, diam, diam);
  }
}