import Component from "./Component";

export default class Engine {
    readonly container: HTMLElement;
    readonly canvas: HTMLCanvasElement;
    readonly ctx: CanvasRenderingContext2D;

    private animationId: number = 0;

    components: Array<Component> = [];

    constructor({ container }: { container: HTMLElement }) {
        this.container = container;
        this.canvas = this.createCanvas();
        this.ctx = this.createContext();
    }

    get size() {
        return {
            width: this.container.offsetWidth,
            height: this.container.offsetHeight,
        };
    }

    private createCanvas() {
        // create canvas
        const canvas = document.createElement("canvas");
        this.container.appendChild(canvas);

        // resize canvas
        Object.assign(canvas, this.size);
        Object.assign(canvas.style, {
            width: this.size.width + "px",
            height: this.size.height + "px",
        });

        return canvas;
    }

    private createContext() {
        return this.canvas.getContext("2d")!;
    }

    add(...components: Array<Component>) {
        for (const c of components) {
            c.engine = this;
            c.mount();
            this.components.push(c);
        }

        this.components = this.components.sort((a, b) => a.layer - b.layer);
    }

    removeById(id: number) {
        for (let i = 0; i < this.components.length; i++) {
            const c = this.components[i];
            if (c.id === id) {
                this.components.splice(i, 1);
                c.unmount();
            }
        }
    }

    remove(prefix: string) {
        for (let i = 0; i < this.components.length; i++) {
            const c = this.components[i];
            if (c.name.startsWith(prefix)) {
                this.components.splice(i, 1);
                c.unmount();
            }
        }
    }

    core() {
        const animate = () => {
            this.animationId = requestAnimationFrame(animate);
            this.ctx.clearRect(0, 0, this.size.width, this.size.height);
            this.components.forEach((c) => c.update());
            this.components.forEach((c) => c.draw());
        };

        this.animationId = requestAnimationFrame(animate);
    }

    pause() {
        cancelAnimationFrame(this.animationId);
    }
}
