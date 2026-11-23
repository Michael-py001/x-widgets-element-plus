import type { App } from 'vue';
import XInputSearch from './BasicInputSearch';

export { XInputSearch };

export default Object.assign(XInputSearch, {
  install: (app: App) => {
    app.component(XInputSearch.name, XInputSearch);
  }
});
