import type { ComputedRef, ExtractPropTypes, PropType, Ref } from 'vue';
import type { WidgetFormDataRecord, WidgetFormFieldPath } from '../../../utils/handleFormData';

type WidgetOptionList = Array<Record<string, any>> | ReadonlyArray<Record<string, any>>;

/**
 * CheckboxGroup 与自定义表单体系对接时的基础扩展属性。
 */
export const basicFormProps = () => {
  return {
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
    options: {
      type: [Array, Object] as PropType<WidgetOptionList | Ref<WidgetOptionList> | ComputedRef<WidgetOptionList>>,
      default: () => []
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    labelKey: {
      type: String,
      default: 'label'
    }
  };
};

export type BasicFormProps = Partial<ExtractPropTypes<ReturnType<typeof basicFormProps>>>;
