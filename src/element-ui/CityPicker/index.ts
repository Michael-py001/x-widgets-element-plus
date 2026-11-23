import type { App } from 'vue';
import XCityPicker from './BasicCityPicker';

export { XCityPicker };

export default Object.assign(XCityPicker, {
  install: (app: App) => {
    app.component(XCityPicker.name, XCityPicker);
  }
});
