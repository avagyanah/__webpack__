import { assets } from '../assets';

export const getWinConfettiParticleConfig = (x, y) => {
  return {
    x,
    y,
    data: assets.particles.confetti,
  };
};
