import Component from "../engine/Component";
import { random } from "../engine/utils";
import Vector from "../engine/Vector";

export default class Explosion extends Component {
    private ids: Array<number> = [];

    constructor(public pos: Vector, public color: string) {
        super({ name: "explosion" });
    }

    remove() {
        for (const id of this.ids) {
            this.engine.removeById(id);
        }

        super.remove();
    }

    update() {
        if (this.ids.length === 0) {
            this.remove();
        }
    }

    mount() {
        for (let i = 0; i < 20; i++) {
            const p = new ExplosionParticle(this.pos, this.color);
            p.unmount = () => {
                this.ids.splice(i, 1);
            };

            this.ids.push(p.id);
            this.engine.add(p);
        }
    }
}

class ExplosionParticle extends Component {
    pos = new Vector(0, 0);
    vel = new Vector(0, 0);
    acc = new Vector(0, 0);
    r = random(1, 5);
    layer = 2;

    constructor(public initialPos: Vector, public color: string) {
        super({ name: "explosionParticle" });
    }

    mount() {
        const a = random(0, Math.PI * 2);
        this.vel = new Vector(Math.cos(a), Math.sin(a)).setMag(random(1, 5));
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);

        // decay
        this.r -= 0.1;
        if (this.r <= 0) {
            this.remove();
        }
    }

    draw() {
        const { ctx } = this.engine;

        ctx.save();
        ctx.translate(this.initialPos.x, this.initialPos.y);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}
