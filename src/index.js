import '@armathai/lego';
import '@armathai/pixi-grid';
import { App } from './core/app';
import './core/assets';

function entry() {
  const app = new App();
  app.init();
  app.ready();
}

entry();
