import type { ExtractPropTypes, PropType } from 'vue';
import type { WidgetFormDataRecord, WidgetFormFieldPath } from '../../../utils/handleFormData';

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
  }
});

export type BasicFormProps = Partial<ExtractPropTypes<ReturnType<typeof basicFormProps>>>;
