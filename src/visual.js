import * as PIXI from "pixi.js";
const app = global.app;

class VisualModels {
  constructor() {
    app.stage.on("loaded", () => {
      this.createModels();
    });
  }

  createModels() {
    const resources = app.loader.resources;

    const sprites = resources.sprites.textures;
    Object.assign(this, {
      buildings: [
        {
          texture: sprites["buildingTiles_010.png"],
          pivot: { x: 65, y: 59 }
        },
        {
          texture: sprites["buildingTiles_018.png"],
          pivot: { x: 65, y: 59 }
        },
        {
          texture: sprites["buildingTiles_026.png"],
          pivot: { x: 65, y: 59 }
        }
      ],
      roads: [
        {
          texture: sprites["empty.png"]
        },
        {
          texture: sprites["left.png"]
        },
        {
          texture: sprites["top.png"]
        },
        {
          texture: sprites["cross.png"]
        }
      ]
    });
  }
}

app.visual = new VisualModels();
