import type { App } from 'vue';
import Checkbox from './BasicCheckbox';

export { Checkbox };

export default Object.assign(Checkbox, {
  install: (app: App) => {
    app.component(Checkbox.name, Checkbox);
  }
});
