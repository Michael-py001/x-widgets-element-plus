import type { App } from 'vue';
import XRangeInput from './BasicRangeInput';

export { XRangeInput };

export default Object.assign(XRangeInput, {
  install: (app: App) => {
    app.component(XRangeInput.name, XRangeInput);
  }
});
