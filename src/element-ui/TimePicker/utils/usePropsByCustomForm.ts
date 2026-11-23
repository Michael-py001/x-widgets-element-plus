import { getValue, setFormdata } from '../../../utils';
import type { WidgetFormFieldValue } from '../../../utils/handleFormData';
import type { XTimePickerProps } from '../types/props';

type TimePickerModelValue = XTimePickerProps['modelValue'];

export default function usePropsByCustomForm(props: XTimePickerProps) {
  const { formData, name } = props;
  if (!formData || name === undefined || name === null || name === '') return {};

  return {
    modelValue: getValue(formData, name) as TimePickerModelValue,
    'onUpdate:modelValue': (value: TimePickerModelValue) =>
      setFormdata(formData, name, value as WidgetFormFieldValue)
  };
}
