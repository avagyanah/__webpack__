import { Particle } from '../../utils/particle';
import { assets } from '../assets';
import { Loader } from './loader';

export class App extends PIXI.Application {
  constructor() {
    super({ backgroundColor: 0x0, width: 600, height: 640 });

    this._init();
  }

  _init() {
    document.body.appendChild(this.view);

    this.loader = new Loader();
    this.loader.onStart.add(this._onLoadStart, this);
    this.loader.onLoad.add(this._onLoadProgress, this);
    this.loader.onComplete.add(this._onLoadComplete, this);
    this.loader.start();
  }

  _onLoadStart() {
    console.log(`[ loader ] start`);
  }

  _onLoadProgress(loader) {
    console.log(`[ loader ] progress | ${loader.progress} `);
  }

  _onLoadComplete() {
    console.log(`[ loader ] complete`);

    //
    // particles;
    setTimeout(() => {
      const particle = new Particle(assets.particles.confetti);
      particle.position.set(0, 0);
      particle.scale.set(1, 1);
      this.stage.addChild(particle);
      particle.start();
    }, 100);
    //
    // sounds
    PIXI.sound.play('loop');
    //
    // images
    const img1 = new PIXI.Sprite.from('bg2');
    this.stage.addChild(img1);
    //
    // atlases
    const hand = new PIXI.Sprite.from('ui/hand.png');
    this.stage.addChild(hand);
    //
    // localized
    const retry = new PIXI.Sprite.from('retry');
    this.stage.addChild(retry);
  }
}
