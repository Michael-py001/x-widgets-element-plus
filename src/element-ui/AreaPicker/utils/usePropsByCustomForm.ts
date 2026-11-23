import { getValue, setFormdata } from '../../../utils';
import type { WidgetFormFieldValue } from '../../../utils/handleFormData';
import type { XAreaPickerProps } from '../types/props';

type AreaPickerModelValue = string | string[] | null;

export default function usePropsByCustomForm(props: XAreaPickerProps) {
  const { formData, name } = props;
  if (!formData || name === undefined || name === null || name === '') return {};

  return {
    modelValue: getValue(formData, name) as AreaPickerModelValue,
    'onUpdate:modelValue': (value: AreaPickerModelValue) =>
      setFormdata(formData, name, value as WidgetFormFieldValue)
  };
}
