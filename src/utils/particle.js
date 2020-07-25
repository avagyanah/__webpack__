export class Particle extends PIXI.particles.core.ParticleEffect {
  start() {
    super.start();
    PIXI.Ticker.shared.add(this.update, this);
  }

  update() {
    super.update(PIXI.Ticker.shared.deltaMS);
  }

  destroy() {
    PIXI.Ticker.shared.remove(this.update, this);
    super.destroy();
  }
}
