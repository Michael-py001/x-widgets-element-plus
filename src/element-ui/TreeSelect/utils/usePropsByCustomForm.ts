import { getValue, setFormdata } from '../../../utils';
import type { WidgetFormFieldValue } from '../../../utils/handleFormData';
import type { XTreeSelectProps } from '../types/props';

type TreeSelectModelValue = XTreeSelectProps['modelValue'];

export default function usePropsByCustomForm(props: XTreeSelectProps) {
  const { formData, name } = props;
  if (!formData || name === undefined || name === null || name === '') return {};

  return {
    modelValue: getValue(formData, name) as TreeSelectModelValue,
    'onUpdate:modelValue': (value: TreeSelectModelValue) => setFormdata(formData, name, value as WidgetFormFieldValue)
  };
}
