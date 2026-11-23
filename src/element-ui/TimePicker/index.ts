import type { App } from 'vue';
import TimePicker from './BasicTimePicker';

export { TimePicker };

export default Object.assign(TimePicker, {
  install: (app: App) => {
    app.component(TimePicker.name, TimePicker);
  }
});
