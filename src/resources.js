import * as PIXI from "pixi.js";
const loader = new PIXI.Loader();
const app = global.app;
app.loader = loader;

const loadOptions = { crossOrigin: true };

loader.baseUrl = "res/";
// loader.add('010', 'buildingTiles_010.png', loadOptions)
// .add('018', 'buildingTiles_018.png', loadOptions)
// .add('026', 'buildingTiles_026.png', loadOptions)
// .add('road_left', 'road/left.png', loadOptions)
// .add('road_top', 'road/top.png', loadOptions)
// .add('road_empty', 'road/empty.png', loadOptions)
// .add('road_cross', 'road/cross.png', loadOptions)
loader.add("sprites", "spritesheet1.json", loadOptions);

loader.load(() => {
  app.stage.emit("loaded");
});
