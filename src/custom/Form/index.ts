import Form from './Form';
import FormItem from '../FormItem/FormItem';
import type { App, Plugin } from 'vue';

Form.Item = FormItem;
Form.install = (app: App) => {
  app.component(Form.name, Form);
  return app;
};
export default Form as typeof Form &
  Plugin & {
    readonly Item: typeof FormItem;
  };
