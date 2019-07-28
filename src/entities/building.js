import * as PIXI from "pixi.js";
const app = global.app;

const names = [
  [
    "Afterlife Tower",
    "Heart Tower",
    "Solidarity Lookout",
    "Supremacy Spire",
    "Fusion Spire",
    "Dream Grounds Mast",
    "Crypt Mountain Obelisk",
    "Ebon Beach Tower",
    "East Range Obelisk",
    "Miracle Morass Obelisk"
  ],
  [
    "bank",
    "sexshop",
    "drugstore",
    "post office",
    "police office",
    "Crazy Panda office",
    "food market",
    "city hall",
    "cinema"
  ]
].flat();
const labelStyle = new PIXI.TextStyle({
  fontFamily: "Arial",
  fontSize: 24,
  fill: "white"
});
export default class Building extends PIXI.Container {
  constructor(visualModel) {
    super();

    this.sprite = new PIXI.Sprite(visualModel.texture);
    this.addChild(this.sprite);
    this.sprite.pivot.copyFrom(visualModel.pivot || { x: 65, y: 59 });

    this.label = new PIXI.Text(
      names[(Math.random() * names.length) | 0],
      labelStyle
    );
    this.addChild(this.label);
    this.label.anchor.set(0.5, -1.0);
    this.label.parentGroup = window.textGroup;

    this.phase = 10 * Math.random();

    app.ticker.add(delta => {
      this.update(delta);
    });

    let light = PIXI.Sprite.from("res/light.png");
    light.position.copyFrom(this.sprite.pivot);
    light.position.y -= 15;
    light.anchor.set(0.5);
    light.parentGroup = window.nightGroup;
    light.scale.set(1.0, 0.5);
    light.blendMode = PIXI.BLEND_MODES.ADD;
    this.sprite.addChild(light);
  }

  update(delta) {
    this.phase += delta * 0.1;
    this.phase %= 10.0;
    if (this.phase > 2.0) {
      this.sprite.y = 0;
      return;
    }
    const par = this.phase - 1;
    this.sprite.y = -50 * (1 - par * par);
  }
}
