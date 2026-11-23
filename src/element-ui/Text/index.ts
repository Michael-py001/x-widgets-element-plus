import type { App } from 'vue';
import Text from './BasicText';

export { Text };

export default Object.assign(Text, {
  install: (app: App) => {
    app.component(Text.name, Text);
  }
});
