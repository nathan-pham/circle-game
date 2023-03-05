import Component from "../engine/Component";
import Vector from "../engine/Vector";

export default class Bullet extends Component {
    pos: Vector;
    vel = new Vector(5, 0);
    acc = new Vector(0, 0);
    r = 5;

    constructor(pos: Vector) {
        super({ name: "bullet" });
        this.pos = pos;
    }

    update() {
        const {
            size: { width, height },
        } = this.engine;

        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);

        const d = this.r * 2;

        if (
            this.pos.x < d ||
            this.pos.x > width + d ||
            this.pos.y < d ||
            this.pos.y > height + d
        ) {
            this.engine.removeById(this.id);
        }
    }

    draw() {
        const { ctx } = this.engine;

        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2);
        ctx.fill();
    }
}
