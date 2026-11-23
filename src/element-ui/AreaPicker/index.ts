import type { App } from 'vue';
import XAreaPicker from './BasicAreaPicker';

export { XAreaPicker };

export default Object.assign(XAreaPicker, {
  install: (app: App) => {
    app.component(XAreaPicker.name, XAreaPicker);
  }
});
