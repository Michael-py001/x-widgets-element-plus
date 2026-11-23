import Input from './BasicInput';
import type { App } from 'vue';

export { Input };

export default Object.assign(Input, {
  install: (app: App) => {
    app.component(Input.name, Input);
  }
});
