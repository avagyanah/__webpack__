import { assets } from './assets';

export class App extends PIXI.Application {
  constructor() {
    super({ backgroundColor: 0x0, width: 500, height: 500 });

    this._init();
  }

  _init() {
    document.body.appendChild(this.view);

    this._ready();
  }

  _ready() {
    const { images, sfx } = assets;

    // image
    Object.keys(images).forEach((entry) => {
      PIXI.Texture.addToCache(new PIXI.Texture.from(images[entry].default), entry);
    });

    const img1 = new PIXI.Sprite.from('bg1');
    this.stage.addChild(img1);

    // sfx
    Object.keys(sfx).forEach((entry) => {
      PIXI.sound.add(entry, sfx[entry].default);
    });

    PIXI.sound.play('tap');
  }
}
