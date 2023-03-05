import Component from "../engine/Component";
import Enemy from "./Enemy";
import Player from "./Player";
import Bullet from "./Bullet";

export default class EnemyManager extends Component {
    constructor() {
        super({ name: "enemyManager" });
    }

    mount() {
        for (let i = 0; i < 10; i++) {
            this.engine.add(new Enemy());
        }
    }

    update() {
        // spawn new enemies
        if (this.engine.frameCount % 100 == 0) {
            this.engine.add(new Enemy());
        }

        const enemies = this.engine.getAllByProp<Array<Enemy>>("name", "enemy");
        const player = this.engine.getByProp<Player>("name", "player");
        const bullets = this.engine.getAllByProp<Array<Bullet>>(
            "name",
            "bullet"
        );

        if (!player) {
            return;
        }

        for (const enemy of enemies) {
            enemy.target(player, bullets);
        }
    }
}
