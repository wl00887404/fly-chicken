import deg from "./deg";
import ChickenLeg from "./ChickenLeg";

class FlyChicken {
  constructor({ source }) {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.source = source;
    this.fps = 1000 / 60;

    this.setCanvasSize();
    window.onresize = this.setCanvasSize;

    this.chickenLegs = [];
    this.addChickenLeg(this.width / 2, this.height / 2);
    window.chickenLegs = this.chickenLegs;
  }

  setCanvasSize = () => {
    const { innerWidth, innerHeight } = window;

    this.width = innerWidth;
    this.height = innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  };

  clear = () => {
    const { ctx, width, height } = this;
    ctx.clearRect(0, 0, width, height);
  };

  drawChickenLeg = ({ x, y, size, rotate, halfSize }) => {
    const { ctx, source } = this;
    const center = 0 - halfSize;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotate * deg);
    ctx.drawImage(source, center, center, size, size);
    ctx.restore();
  };

  start() {
    const {
      requestAnimationFrame,
      fps,
      startCannon,
      followMouse,
      stopCannon
    } = this;

    document.body.onmousedown = startCannon;
    document.body.onmousemove = followMouse;
    document.body.onmouseup = stopCannon;

    this.ticker = setInterval(() => {
      const { width, height, chickenLegs } = this;
      chickenLegs.forEach(chickenLeg => chickenLeg.move(width, height));
    }, fps);

    requestAnimationFrame();
  }

  requestAnimationFrame = () => {
    const { chickenLegs, clear, drawChickenLeg, requestAnimationFrame } = this;

    clear();
    chickenLegs.forEach(drawChickenLeg);

    window.requestAnimationFrame(requestAnimationFrame);
  };

  addChickenLeg(x, y) {
    this.chickenLegs.push(new ChickenLeg(this.width, this.height, x, y));
  }

  followMouse = ({ clientX, clientY }) => {
    if (this.cannon === undefined) return;

    this.x = clientX;
    this.y = clientY;
  };

  startCannon = ({ clientX, clientY }) => {
    this.x = clientX;
    this.y = clientY;

    this.cannon = setInterval(() => {
      this.addChickenLeg(this.x, this.y);
    }, 100);
  };

  stopCannon = () => {
    clearInterval(this.cannon);

    this.cannon = undefined;
  };
}

export default FlyChicken;
