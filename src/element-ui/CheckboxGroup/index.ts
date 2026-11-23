import type { App } from 'vue';
import CheckboxGroup from './BasicCheckboxGroup';

export { CheckboxGroup };

export default Object.assign(CheckboxGroup, {
  install: (app: App) => {
    app.component(CheckboxGroup.name, CheckboxGroup);
  }
});
