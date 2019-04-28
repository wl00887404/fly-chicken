import random from "lodash/random";
import deg from "./deg";

const sign = () => (random(0, 1) ? -1 : 1);

class ChickenLeg {
  constructor(width, height, x, y) {
    const size = random(50, 100);
    const halfSize = size / 2;
    const rotate = random(0, 360);
    const next = {
      x: 6 * Math.cos(rotate * deg),
      y: 6 * Math.sin(rotate * deg),
      rotate: random(3, 8) * sign()
    };

    Object.assign(this, {
      size,
      x,
      y,
      rotate,
      next,
      halfSize
    });
  }
  move(width, height) {
    let { halfSize } = this;
    let { x, y, rotate } = this.next;
    this.x = this.x + x;
    this.y = this.y + y;
    this.rotate = (this.rotate + rotate) % 360;

    if (this.x < halfSize || this.x > width - halfSize) {
      this.x = this.x < halfSize ? halfSize : width - halfSize;
      this.next.x *= -1;
    }
    if (this.y < halfSize || this.y > height - halfSize) {
      this.y = this.y < halfSize ? halfSize : height - halfSize;
      this.next.y *= -1;
    }
  }
}

export default ChickenLeg;
