import { assets } from './assets';
import { Loader } from './loader';

export class App extends PIXI.Application {
  constructor() {
    super({ backgroundColor: 0xffffff, width: 500, height: 500 });

    this._init();
  }

  _init() {
    document.body.appendChild(this.view);

    this.loader = new Loader();
    this.loader.onStart.add(this._onLoadStart, this);
    this.loader.onLoad.add(this._onLoadProgress, this);
    this.loader.onComplete.add(this._onLoadComplete, this);
    this.loader.start(assets);
  }

  _onLoadStart(loader) {
    console.log(`[ loader ] start`);
  }

  _onLoadProgress(loader, resource) {
    console.log(`[ loader ] progress | ${loader.progress}`);
  }

  _onLoadComplete() {
    console.log(`[ loader ] complete`);

    PIXI.sound.play('loop');

    const img1 = new PIXI.Sprite.from('bg2');
    this.stage.addChild(img1);
  }
}
