import ConfirmPopup from './ConfirmPopup';
import type { App } from 'vue';

ConfirmPopup.install = (app: App) => {
  app.component(ConfirmPopup.name as string, ConfirmPopup);
};

export default ConfirmPopup;
