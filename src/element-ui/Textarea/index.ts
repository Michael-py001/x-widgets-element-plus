import type { App } from 'vue';
import Textarea from './BasicTextarea';

export { Textarea };

export default Object.assign(Textarea, {
  install: (app: App) => {
    app.component(Textarea.name, Textarea);
  }
});
