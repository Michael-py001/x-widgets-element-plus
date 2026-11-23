import type { App } from 'vue';
import InputNumber from './BasicInputNumber';

export { InputNumber };

export default Object.assign(InputNumber, {
  install: (app: App) => {
    app.component(InputNumber.name, InputNumber);
  }
});
