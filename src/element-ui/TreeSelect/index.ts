import type { App } from 'vue';
import TreeSelect from './BasicTreeSelect';

export { TreeSelect };

export default Object.assign(TreeSelect, {
  install: (app: App) => {
    app.component(TreeSelect.name, TreeSelect);
  }
});
