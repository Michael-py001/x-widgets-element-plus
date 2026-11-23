import type { App } from 'vue';
import XRate from './BasicRate';

export { XRate };

export default Object.assign(XRate, {
  install: (app: App) => {
    app.component(XRate.name, XRate);
  }
});
