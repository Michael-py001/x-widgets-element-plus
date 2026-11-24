import type { App } from 'vue';
import XInputTag from './BasicInputTag';

export { XInputTag };

export default Object.assign(XInputTag, {
  install: (app: App) => {
    app.component(XInputTag.name, XInputTag);
  }
});
