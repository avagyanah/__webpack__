import { atlasMiddleware } from './loader/midlewares';

export class Loader extends PIXI.Loader {
  constructor() {
    super();

    this.use(atlasMiddleware);
  }

  start(assets) {
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
        case 'spines':
          break;
        case 'particles':
          break;
        case 'images-localized':
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
    Object.keys(data).forEach((key) => this.add(new PIXI.LoaderResource(key, data[key].image.default)));
  }
}
