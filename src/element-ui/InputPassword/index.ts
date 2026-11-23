import type { App } from 'vue';
import XInputPassword from './BasicInputPassword';

export { XInputPassword };

export default Object.assign(XInputPassword, {
  install: (app: App) => {
    app.component(XInputPassword.name, XInputPassword);
  }
});
