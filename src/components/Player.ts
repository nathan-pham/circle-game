import Component from "../engine/Component";
import Vector from "../engine/Vector";
import Bullet from "./Bullet";

export default class Player extends Component {
    pos = new Vector(0, 0);
    layer = 5;

    constructor() {
        super({ name: "player" });
    }

    mount() {
        const {
            size: { width, height },
        } = this.engine;
        this.pos = new Vector(width / 2, height / 2);

        addEventListener("click", () => {
            this.engine.add(new Bullet(this.pos.copy()));
        });
    }

    draw() {
        const {
            ctx,
            size: { width, height },
        } = this.engine;

        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, 20, 0, Math.PI * 2);
        ctx.fill();
    }
}
