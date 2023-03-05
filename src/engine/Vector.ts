export default class Vector {
    constructor(public x: number = 0, public y: number = 0) {}

    add(other: Vector) {
        this.x += other.x;
        this.y += other.y;
        return this;
    }

    mult(scalar: number) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    copy() {
        return new Vector(this.x, this.y);
    }
}
