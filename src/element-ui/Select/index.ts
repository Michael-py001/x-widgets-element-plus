import type { App } from 'vue';
import Select from './BasicSelect';
import SelectOption from './BasicSelectOption';

export { Select, SelectOption };

export default Object.assign(Select, {
  install: (app: App) => {
    app.component(Select.name, Select);
    app.component(SelectOption.name, SelectOption);
  }
});
