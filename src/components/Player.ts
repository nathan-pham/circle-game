import Component from "../engine/Component";
import Vector from "../engine/Vector";
import Bullet from "./Bullet";

export default class Player extends Component {
    pos = new Vector(0, 0);
    layer = 5;
    r = 40;

    constructor() {
        super({ name: "player" });
    }

    mount() {
        this.pos = this.engine.origin.copy();

        addEventListener("click", () => {
            const mouse = new Vector(this.engine.mouse.x, this.engine.mouse.y)
                .sub(this.pos.copy())
                .setMag(5);

            this.engine.add(new Bullet(this.pos.copy(), mouse));
        });
    }

    draw() {
        const {
            ctx,
            size: { width, height },
        } = this.engine;

        ctx.fillStyle = this.engine.config.primary;
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, this.r, 0, Math.PI * 2);
        ctx.fill();
    }
}
