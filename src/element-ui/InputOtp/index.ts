import type { App } from 'vue';
import XInputOtp from './BasicInputOtp';

export { XInputOtp };

export default Object.assign(XInputOtp, {
  install: (app: App) => {
    app.component(XInputOtp.name, XInputOtp);
  }
});
