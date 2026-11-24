import type { ExtractPropTypes, PropType } from 'vue';
import type { WidgetFormDataRecord, WidgetFormFieldPath, WidgetOptionSource } from '../../../utils';

/** 表单桥接 props。options 用于需要候选列表的控件（如 Segmented）。 */
export const basicFormProps = () => ({
  label: { type: String, default: '' },
  props: { type: Object as PropType<Record<string, unknown>>, default: () => ({}) },
  name: { type: [String, Array] as PropType<WidgetFormFieldPath>, default: '' },
  formData: { type: Object as PropType<WidgetFormDataRecord>, default: () => ({}) },
  event: { type: Object as PropType<Record<string, (...args: unknown[]) => unknown>>, default: () => ({}) },
  slotProps: { type: Object as PropType<Record<string, (...args: unknown[]) => unknown>>, default: () => ({}) },
  options: { type: [Array, Object] as PropType<WidgetOptionSource>, default: () => [] }
});

export type BasicFormProps = Partial<ExtractPropTypes<ReturnType<typeof basicFormProps>>>;
