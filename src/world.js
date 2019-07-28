import * as PIXI from "pixi.js";
import Building from "./entities/building.js";
import Road from "./entities/road.js";
import AdjustmentFilter from "./filters/AdjustmentFilter.js";
import DisplacementFilter from "./filters/DisplacementFilter.js";
const app = global.app;

export default class World extends PIXI.Container {
  constructor() {
    super();

    app.stage.on("loaded", () => {
      this.populate();
      app.stage.addChild(this);
      this.addLayers();
    });
  }

  populate() {
    // Create a 5x5 grid of bunnies
    let bIndex = 0;
    for (let row = 0; row < 17; row++) {
      for (let col = 0; col < 17; col++) {
        if ((row + col) % 2 === 1) {
          continue;
        }

        let ind = 0;
        if ((row + col) % 4) {
          ind = 1;
        }
        if ((row - col + 4) % 4) {
          ind = ind + 2;
        }

        let element = null;
        if (ind === 0 && row % 4 === 0) {
          bIndex = (bIndex + 1) % 3;
          element = new Building(app.visual.buildings[bIndex]);
        } else {
          element = new Road(app.visual.roads[ind]);
        }
        element.x = ((col + 1) * 130) / 2;
        element.y = ((row + 1) * 66) / 2;
        this.addChild(element);
      }
    }
  }

  addLayers() {
    const textLayer = new PIXI.display.Layer(window.textGroup);
    const nightLayer = new PIXI.display.Layer(window.nightGroup);

    app.stage.addChild(nightLayer);
    nightLayer.useRenderTexture = true;
    nightLayer.clearColor = [0, 0, 0, 1];

    const filter = new AdjustmentFilter();
    filter.saturation = 1.2;
    filter.contrast = 1.6;
    filter.brightness = 0.2;
    filter.blue = 2;
    filter.uniforms.nightTexture = nightLayer.getRenderTexture();
    this.filterArea = app.screen;

    const displacementSprite = PIXI.Sprite.from("res/noize.png");
    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    app.stage.addChild(displacementSprite);
    const filter2 = new DisplacementFilter(displacementSprite);
    filter2.scale.set(100, 100);
    filter2.uniforms.nightTexture = nightLayer.getRenderTexture();
    app.ticker.add(delta => {
      displacementSprite.position.y -= delta;
      displacementSprite.position.y %= displacementSprite.height;
    });

    this.filters = [filter, filter2];

    app.stage.addChild(textLayer);
  }
}

app.world = new World();
