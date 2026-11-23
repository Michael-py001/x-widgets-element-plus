import type { App } from 'vue';
import Switch from './BasicSwitch';

export { Switch };

export default Object.assign(Switch, {
  install: (app: App) => {
    app.component(Switch.name, Switch);
  }
});
