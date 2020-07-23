export class App extends PIXI.Application {
  constructor() {
    super({ backgroundColor: 0xffff00, width: 500, height: 500 });
  }

  init() {
    document.body.appendChild(this.view);
  }

  ready() {
    // const sprite = new PIXI.Sprite.from(PIXI.Texture.from('icon.jpg'));
    // this.stage.addChild(sprite);
  }
}
