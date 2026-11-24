import type { App } from 'vue';
import XSegmented from './BasicSegmented';

export { XSegmented };

export default Object.assign(XSegmented, {
  install: (app: App) => {
    app.component(XSegmented.name, XSegmented);
  }
});
