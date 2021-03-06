export const assets = Object.freeze({
  images: {
    bg1: require('../../assets/images/bg/bg-1.jpg'),
    bg2: require('../../assets/images/bg/bg-2.jpg'),
  },

  atlases: {
    main: {
      json: require('../../assets/atlases/main.json'),
      image: require('../../assets/atlases/main.png'),
    },
  },

  'localized-atlases': {
    retry: {
      json: require('../../assets/atlases/retry.json'),
      image: require('../../assets/atlases/retry.png'),
    },
    'well-done': {
      json: require('../../assets/atlases/well-done.json'),
      image: require('../../assets/atlases/well-done.png'),
    },
    'tap-to-continue': {
      json: require('../../assets/atlases/tap-to-continue.json'),
      image: require('../../assets/atlases/tap-to-continue.png'),
    },
  },

  sounds: {
    bark: require('../../assets/sounds/bark.mp3'),
    happySheep: require('../../assets/sounds/happy-sheep.mp3'),
    loop: require('../../assets/sounds/loop.mp3'),
    lose: require('../../assets/sounds/lose.mp3'),
    tap: require('../../assets/sounds/tap.mp3'),
    win: require('../../assets/sounds/win.mp3'),
  },

  particles: {
    confetti: require('../../assets/particles/confetti.json'),
  },

  // spines: {
  //   diamond: require('../../assets/spines/diamond.json'),
  // },
});
