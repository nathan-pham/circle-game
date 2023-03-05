import Component from "../engine/Component";
import { choice, random } from "../engine/utils";
import Vector from "../engine/Vector";
import Bullet from "./Bullet";
import Player from "./Player";

export default class Enemy extends Component {
    pos = new Vector(0, 0);
    vel = new Vector(0, 0);
    acc = new Vector(0, 0);
    r = random(10, 50);
    color = "transparent";

    constructor() {
        super({ name: "enemy" });
    }

    mount() {
        const a = random(0, Math.PI * 2);
        const vmax = Math.max(this.engine.size.width, this.engine.size.height);

        this.pos = new Vector(Math.cos(a) * vmax, Math.sin(a) * vmax).add(
            this.engine.origin.copy()
        );

        this.color = choice([
            this.engine.config.secondary,
            this.engine.config.secondaryLighter,
            this.engine.config.primaryLighter,
        ]);
    }

    target(player: Player, bullets: Array<Bullet>) {
        this.vel = player.pos.copy().sub(this.pos).setMag(1);
        for (const bullet of bullets) {
            if (this.pos.dist(bullet.pos) < bullet.r + this.r) {
                this.r -= this.engine.config.bulletDamage;
                this.engine.removeById(bullet.id);
            }
        }
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);

        if (this.r <= this.engine.config.bulletDamage) {
            this.engine.removeById(this.id);
        }
    }

    draw() {
        const { ctx } = this.engine;

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2);
        ctx.fill();
    }
}
