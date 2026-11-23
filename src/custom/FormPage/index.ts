import FormPage, { __modelTitleRef } from './FormPage';
import type { App, Plugin } from 'vue';

FormPage.install = (app: App) => {
  app.component(FormPage.name as string, FormPage);
};

// 提供静态方法设置标题组件
(FormPage as any).setTitleComponent = (component: any) => {
  if (__modelTitleRef) {
    __modelTitleRef.value = component;
  }
};

export default FormPage as typeof FormPage & Plugin;
