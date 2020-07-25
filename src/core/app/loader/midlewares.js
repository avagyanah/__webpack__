import { assets } from '../../assets';

export const atlasMiddleware = (resource, next) => {
  const { atlases } = assets;
  const isAtlas = Object.prototype.hasOwnProperty.call(atlases, resource.name);

  if (!isAtlas) {
    next();
    return;
  }

  const { json, image } = atlases[resource.name];
  const atlas = new PIXI.Spritesheet(PIXI.BaseTexture.from(image.default), json);
  atlas.parse(() => void 0);
  next();
};
