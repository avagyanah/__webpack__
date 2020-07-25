import { assets } from '../../assets';

const hasProperty = (obj, prop) => {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

export const atlasMiddleware = (resource, next) => {
  const { atlases } = assets;

  if (!hasProperty(atlases, resource.name)) {
    next();
    return;
  }

  const { json, image } = atlases[resource.name];
  const atlas = new PIXI.Spritesheet(PIXI.BaseTexture.from(image.default), json);
  atlas.parse(() => void 0);
  next();
};

export const imageMiddleware = (resource, next) => {
  const { images } = assets;

  if (!hasProperty(images, resource.name)) {
    next();
    return;
  }

  const image = images[resource.name];
  PIXI.Texture.addToCache(new PIXI.Texture.from(image.default));
  next();
};

export const soundMiddleware = (resource, next) => {
  const { sounds } = assets;

  if (!hasProperty(sounds, resource.name)) {
    next();
    return;
  }

  const sound = sounds[resource.name];
  PIXI.sound.add(resource.name, sound.default);
  next();
};
