import type { App } from 'vue';
import XSlider from './BasicSlider';

export { XSlider };

export default Object.assign(XSlider, {
  install: (app: App) => {
    app.component(XSlider.name, XSlider);
  }
});
