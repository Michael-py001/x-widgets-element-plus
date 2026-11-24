import type { App } from 'vue';
import XUpload from './BasicUpload';

export { XUpload };

export default Object.assign(XUpload, {
  install: (app: App) => {
    app.component(XUpload.name, XUpload);
  }
});
