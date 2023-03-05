import Component from "./Component";
import Vector from "./Vector";

export default class Engine {
    readonly container: HTMLElement;
    readonly canvas: HTMLCanvasElement;
    readonly ctx: CanvasRenderingContext2D;

    private animationId = 0;
    frameCount = 0;

    components: Array<Component> = [];
    mouse = { x: 0, y: 0, down: false };
    state: Record<string, any> = {};
    config = {
        bg: "#efefd0",
        primary: "#004e89",
        primaryLighter: "#1a659e",
        secondary: "#ff6b35",
        secondaryLighter: "#f7c59f",
        bulletDamage: 10,
    };

    constructor({ container }: { container: HTMLElement }) {
        this.container = container;

        this.canvas = this.createCanvas();
        this.ctx = this.createContext();
        this.addEventListeners();
    }

    get size() {
        return {
            width: this.container.offsetWidth,
            height: this.container.offsetHeight,
        };
    }

    get origin() {
        return new Vector(this.size.width / 2, this.size.height / 2);
    }

    private addEventListeners() {
        const updateMouse = (clientX: number, clientY: number) => {
            const bbox = this.container.getBoundingClientRect();
            this.mouse.x = clientX - bbox.left;
            this.mouse.y = clientY - bbox.top;
        };

        this.canvas.addEventListener("mousedown", (e) => {
            this.mouse.down = true;
            updateMouse(e.clientX, e.clientY);
        });

        this.canvas.addEventListener("mousemove", (e) => {
            updateMouse(e.clientX, e.clientY);
        });

        this.canvas.addEventListener("mouseup", (e) => {
            this.mouse.down = false;
            updateMouse(e.clientX, e.clientY);
        });
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

    getIndexByProp(key: keyof Component, prop: any) {
        return this.components.findIndex((c) => c[key] === prop);
    }

    getByProp<T = Component>(key: keyof Component, prop: any) {
        return this.components.find((c) => c[key] === prop) as T;
    }

    getAllByProp<T = Component>(key: keyof Component, prop: any) {
        return this.components.filter((c) => c[key] === prop) as T;
    }

    removeById(id: number) {
        const idx = this.getIndexByProp("id", id);
        if (idx < 0) {
            return;
        }

        const c = this.components[idx];
        this.components.splice(idx, 1);
        c.unmount();
    }

    core() {
        const animate = () => {
            this.animationId = requestAnimationFrame(animate);
            this.frameCount += 1;
            if (this.frameCount === Number.MAX_SAFE_INTEGER) {
                this.frameCount = 0;
            }

            this.ctx.fillStyle = this.config.bg;
            this.ctx.fillRect(0, 0, this.size.width, this.size.height);

            for (let i = this.components.length - 1; i >= 0; i--) {
                const c = this.components[i];
                c.update();
            }

            for (let i = 0; i < this.components.length; i++) {
                const c = this.components[i];
                c.draw();
            }
        };

        this.animationId = requestAnimationFrame(animate);
    }

    pause() {
        cancelAnimationFrame(this.animationId);
    }
}
