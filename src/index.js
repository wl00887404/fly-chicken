import random from "lodash/random";

import "./style.scss";
import "./stats";

import { src, deg } from "./const";
import ChickenLeg from "./ChickenLeg";

class FlyChicken {
  constructor() {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.setCanvasSize();
    window.onresize = this.setCanvasSize;

    this.chickenLegs = [];
    this.addChickenLeg(this.width / 2, this.height / 2);
  }

  setCanvasSize = () => {
    let { innerWidth, innerHeight } = window;
    this.width = innerWidth;
    this.height = innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  };

  clear = () => {
    let { ctx, width, height } = this;
    ctx.clearRect(0, 0, width, height);
  };

  drawChickenLeg = ({ x, y, size, rotate, halfSize }) => {
    const { ctx } = this;
    halfSize *= -1;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotate * deg);
    ctx.drawImage(chickenLeg, halfSize, halfSize, size, size);
    ctx.restore();
  };

  crazyTime() {
    const { requestAnimationFrame } = this;
    const fps = 1000 / 60;

    this.ticker = setInterval(() => {
      const { width, height, chickenLegs } = this;
      chickenLegs.forEach(chickenLeg => {
        chickenLeg.move(width, height);
      });
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

  followMouse({ clientX, clientY }) {
    if (this.cannon === undefined) return;
    this.x = clientX;
    this.y = clientY;
  }

  startCannon({ clientX, clientY }) {
    this.x = clientX;
    this.y = clientY;
    this.cannon = setInterval(() => {
      this.addChickenLeg(this.x, this.y);
    }, 100);
  }

  stopCannon() {
    clearInterval(this.cannon);
    this.cannon = undefined;
  }
}

const dream = new FlyChicken();

const chickenLeg = new Image();
chickenLeg.src = src;
chickenLeg.width = 100;
chickenLeg.height = 100;
chickenLeg.onload = () => dream.crazyTime();

document.body.onmousedown = dream.startCannon.bind(dream);
document.body.onmousemove = dream.followMouse.bind(dream);
document.body.onmouseup = dream.stopCannon.bind(dream);
