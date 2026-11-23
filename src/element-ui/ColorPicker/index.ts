import type { App } from 'vue';
import XColorPicker from './BasicColorPicker';

export { XColorPicker };

export default Object.assign(XColorPicker, {
  install: (app: App) => {
    app.component(XColorPicker.name, XColorPicker);
  }
});
