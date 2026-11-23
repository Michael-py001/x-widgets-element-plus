import type { App, Component } from 'vue';
import * as components from './components';
export * from './components';
export * from './utils';

const directComponents = ['Table', 'TableVirtualized', 'AreaCascader', 'LoadingProgress', 'CustomTooltip'] as const;

export const install = function (app: App) {
  Object.keys(components).forEach((key) => {
    const component = components[key];
    if (component && typeof component === 'object' && 'install' in component) {
      app.use(component);
    }
  });

  directComponents.forEach((name) => {
    app.component(name, components[name] as Component);
  });

  return app;
};

export default {
  install
};
