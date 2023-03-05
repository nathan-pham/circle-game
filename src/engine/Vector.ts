export default class Vector {
    constructor(public x: number = 0, public y: number = 0) {}

    add(other: Vector) {
        this.x += other.x;
        this.y += other.y;

        return this;
    }

    sub(other: Vector) {
        this.x -= other.x;
        this.y -= other.y;

        return this;
    }

    mult(scalar: number) {
        this.x *= scalar;
        this.y *= scalar;

        return this;
    }

    div(scalar: number) {
        this.x /= scalar;
        this.y /= scalar;

        return this;
    }

    mag() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    dist(other: Vector) {
        return Math.sqrt(
            Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2)
        );
    }

    normalize() {
        this.div(this.mag());

        return this;
    }

    setMag(mag: number) {
        return this.normalize().mult(mag);
    }

    heading() {
        return Math.atan(this.y / this.x);
    }

    copy() {
        return new Vector(this.x, this.y);
    }
}
