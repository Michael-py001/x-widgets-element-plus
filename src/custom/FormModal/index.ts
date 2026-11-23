import FormModal from './FormModal';
import type { App } from 'vue';

FormModal.install = (app: App) => {
  app.component(FormModal.name as string, FormModal);
};

export default FormModal;
