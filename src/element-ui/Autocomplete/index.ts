import type { App } from 'vue';
import Autocomplete from './BasicAutocomplete';

export { Autocomplete };

export default Object.assign(Autocomplete, {
  install: (app: App) => {
    app.component(Autocomplete.name, Autocomplete);
  }
});
