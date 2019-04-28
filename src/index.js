import "@babel/polyfill";

import "./style.scss";
import "./stats";

import FlyChicken from "./FlyChicken";

const src = "https://s3-ap-northeast-1.amazonaws.com/wl00887404/chickenLeg.svg";

const main = async () => {
  const image = new Image();
  image.src = src;
  await new Promise(resolve => (image.onload = resolve));

  const source = document.createElement("canvas");
  source.width = 100;
  source.height = 100;
  source.getContext("2d").drawImage(image, 0, 0);

  const dream = new FlyChicken({ source });
  dream.start();
};

main();
