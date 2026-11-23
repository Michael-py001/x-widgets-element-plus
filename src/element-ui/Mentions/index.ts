import type { App } from 'vue';
import XMentions from './BasicMentions';

export { XMentions };

export default Object.assign(XMentions, {
  install: (app: App) => {
    app.component(XMentions.name, XMentions);
  }
});
