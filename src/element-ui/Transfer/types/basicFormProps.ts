import type { ExtractPropTypes, PropType } from 'vue';
import type {
  WidgetFormDataRecord,
  WidgetFormFieldPath,
  WidgetOptionSource
} from '../../../utils';

/**
 * Transfer 适配器的表单桥接 props。
 *
 * 说明：`props` 在本适配器里保留 Element Plus 原生语义（字段别名配置），
 * 与 Mentions / Cascader 一致，因此 usePropsByCustomForm 不会消费它。
 */
export const basicFormProps = () => ({
  label: {
    type: String,
    default: ''
  },
  props: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({})
  },
  name: {
    type: [String, Array] as PropType<WidgetFormFieldPath>,
    default: ''
  },
  formData: {
    type: Object as PropType<WidgetFormDataRecord>,
    default: () => ({})
  },
  event: {
    type: Object as PropType<Record<string, (...args: unknown[]) => unknown>>,
    default: () => ({})
  },
  slotProps: {
    type: Object as PropType<Record<string, (...args: unknown[]) => unknown>>,
    default: () => ({})
  },
  /** 候选数据，映射到 ElTransfer 的 data。 */
  options: {
    type: [Array, Object] as PropType<WidgetOptionSource>,
    default: () => []
  }
});

export type BasicFormProps = Partial<ExtractPropTypes<ReturnType<typeof basicFormProps>>>;
