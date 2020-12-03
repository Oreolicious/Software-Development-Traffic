class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    normalize() {
        let newX = this.x / ((this.x ** 2 + this.y ** 2) ** 0.5);
        let newY = this.y / ((this.x ** 2 + this.y ** 2) ** 0.5);
        this.x = newX;
        this.y = newY;
    }
    length() {
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }
    rotate(degrees) {
        let newX = Math.cos(degrees) * this.x - Math.sin(degrees) * this.y
        let newY = Math.sin(degrees) * this.x + Math.cos(degrees) * this.y
        this.x = newX;
        this.y = newY;
    }
    moveToward(targetPoint, currentPos, factor) {
        let difference = new Vector2D(targetPoint.x - currentPos.x, targetPoint.y - currentPos.y)
        difference.normalize();
        this.x = (this.x + difference.x * factor) / 2
        this.y = (this.y + difference.y * factor) / 2
    }
}