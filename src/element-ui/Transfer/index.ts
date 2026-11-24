import type { App } from 'vue';
import XTransfer from './BasicTransfer';

export { XTransfer };

export default Object.assign(XTransfer, {
  install: (app: App) => {
    app.component(XTransfer.name, XTransfer);
  }
});
