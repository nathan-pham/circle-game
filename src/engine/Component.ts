import Engine from "./Engine";

export default class Component {
    engine!: Engine;
    name: string;
    id = Math.random();
    layer = 0;

    constructor({ name }: { name: string }) {
        this.name = name;
    }

    remove() {
        this.engine.removeById(this.id);
    }

    mount() {}

    unmount() {}

    draw() {}

    update() {}
}
