import FormItem from './FormItem';
import type { App } from 'vue';
import type {
  ColumnForFormItemType,
  FormBlockSlotRenderContext,
  FormItemAffixSlotRender,
  FormBlockSlotRender,
  FormItemCoreProps,
  FormItemFieldName,
  FormItemProps,
  FormItemSlotRender,
  FormItemSlotRenderContext,
  FormSlotRenderContext
} from './types/props';

export { FormItem };
export default Object.assign(FormItem, {
  install: (app: App) => {
    app.component(FormItem.name, FormItem);
  }
});

export type {
  ColumnForFormItemType,
  FormBlockSlotRenderContext,
  FormItemAffixSlotRender,
  FormBlockSlotRender,
  FormItemCoreProps,
  FormItemFieldName,
  FormItemProps,
  FormItemSlotRender,
  FormItemSlotRenderContext,
  FormSlotRenderContext
};
