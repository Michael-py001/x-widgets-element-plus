import type { App } from 'vue';
import XTimeSelect from './BasicTimeSelect';

export { XTimeSelect };

export default Object.assign(XTimeSelect, {
  install: (app: App) => {
    app.component(XTimeSelect.name, XTimeSelect);
  }
});
