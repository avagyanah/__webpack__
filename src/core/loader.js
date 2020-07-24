export class Loader extends PIXI.Loader {
  start(assets) {
    Object.keys(assets).forEach((key) => {
      const entry = assets[key];

      switch (key) {
        case 'images':
          this._loadImages(entry);
          break;
        case 'sfx':
          this._loadSounds(entry);
          break;
        default:
          console.error(`Unknown asset type "${asset}"`);
      }
    });

    this.load();
  }

  _loadImages(data) {
    Object.keys(data).forEach((key) => {
      // this.add(key, data[key].default);

      PIXI.Texture.addToCache(new PIXI.Texture.from(data[key].default), key);
    });
  }

  _loadSounds(data) {
    Object.keys(data).forEach((key) => {
      // this.add(key, data[key].default);

      PIXI.sound.add(key, data[key].default);
    });
  }
}
