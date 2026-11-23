import type { App } from 'vue';
import DatePicker from './BasicDatePicker';

export { DatePicker };

export default Object.assign(DatePicker, {
  install: (app: App) => {
    app.component(DatePicker.name, DatePicker);
  }
});
