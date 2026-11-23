import type { App } from 'vue';
import XCascader from './BasicCascader';

export { XCascader };

export default Object.assign(XCascader, {
  install: (app: App) => {
    app.component(XCascader.name, XCascader);
  }
});
