import type { App } from 'vue';
import RadioGroup from './BasicRadioGroup';

export { RadioGroup };

export default Object.assign(RadioGroup, {
  install: (app: App) => {
    app.component(RadioGroup.name, RadioGroup);
  }
});
