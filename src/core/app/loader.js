import { assets } from '../assets';
import { lang } from '../params.json';

// export const atlasMiddleware = (resource, next) => {
//   const { atlases } = assets;
//   const isAtlas = Object.prototype.hasOwnProperty.call(atlases, resource.name);

//   if (!isAtlas) {
//     next();
//     return;
//   }

//   const { json, image } = atlases[resource.name];
//   const atlas = new PIXI.Spritesheet(PIXI.BaseTexture.from(image.default), json);
//   atlas.parse(() => void 0);
//   next();
// };

export class Loader extends PIXI.Loader {
  constructor() {
    super();

    // this.use(atlasMiddleware);
  }

  start() {
    Object.keys(assets).forEach((key) => {
      const entry = assets[key];

      switch (key) {
        case 'images':
          this._loadImages(entry);
          break;
        case 'sounds':
          this._loadSounds(entry);
          break;
        case 'atlases':
          this._loadAtlases(entry);
          break;
        case 'localized-atlases':
          this._loadLocalizedAtlases(entry);
          break;
        case 'spines':
          break;
        case 'particles':
          break;
        default:
          console.error(`Unknown asset type "${entry}"`);
      }
    });

    this.load();
  }

  _loadImages(data) {
    Object.keys(data).forEach((key) => {
      // v1
      // this.add(new PIXI.LoaderResource(key, data[key].default));

      // v2
      PIXI.Texture.addToCache(new PIXI.Texture.from(data[key].default), key);
    });
  }

  _loadSounds(data) {
    Object.keys(data).forEach((key) => {
      // v1
      // this.add(new PIXI.LoaderResource(key, data[key].default));

      // v2
      PIXI.sound.add(key, data[key].default);
    });
  }

  _loadAtlases(data) {
    Object.keys(data).forEach((key) => {
      // v1
      // this.add(new PIXI.LoaderResource(key, data[key].image.default));

      // v2
      const { json, image } = data[key];
      const atlas = new PIXI.Spritesheet(PIXI.BaseTexture.from(image.default), json);
      atlas.parse(() => void 0);
    });
  }

  _loadLocalizedAtlases(data) {
    Object.keys(data).forEach((key) => {
      // v1
      const { json, image } = data[key];
      const frameData = json.frames[`${key}/${lang.value}.png`];

      // frame: {x: 0, y: 57, w: 220, h: 56}
      // pivot: {x: 0.5, y: 0.5}
      // rotated: false
      // sourceSize: {w: 220, h: 56}
      // spriteSourceSize: {x: 0, y: 0, w: 220, h: 56}
      // trimmed: false
      const { frame } = frameData;
      const { x, y, w, h } = frame;
      const texture = new PIXI.Texture(new PIXI.BaseTexture(image.default), new PIXI.Rectangle(x, y, w, h));
      PIXI.Texture.addToCache(texture, key);

      // console.warn(frame);
      // json.frames[key] = frame;

      // const atlas = new PIXI.Spritesheet(PIXI.BaseTexture.from(image.default), json);
      // atlas.parse(() => void 0);
    });
  }
}
