import * as PIXI from "pixi.js";
const app = global.app;

export default class Road extends PIXI.Container {
  constructor(visualModel) {
    super();

    this.sprite = new PIXI.Sprite(visualModel.texture);
    this.addChild(this.sprite);
    this.sprite.pivot.set(66, 33);
  }
}
