class Healthy extends Molecule {
  constructor({
    _index,
    px = 200,
    py = 200,
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
    this.color = color(90, 190, 100);
  }
}