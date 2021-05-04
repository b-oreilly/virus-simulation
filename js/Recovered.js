class Recovered extends Molecule {
    constructor({
        _index,
        px = 100,
        py = 100,
        vx = random(-2.5, 2.5),
        vy = random(-2.5, 2.5),
    }) {
        super({
            _index,
            px,
            py,
            vx,
            vy
        });
        this.color = color(80, 105, 185);
    }
}