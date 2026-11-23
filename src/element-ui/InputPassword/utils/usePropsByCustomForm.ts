import { getValue, setFormdata } from '../../../utils';
import type { WidgetFormFieldValue } from '../../../utils/handleFormData';
import type { XInputPasswordProps } from '../types/props';

type InputPasswordModelValue = XInputPasswordProps['modelValue'];

export default function usePropsByCustomForm(props: XInputPasswordProps) {
  const { formData, name } = props;
  if (!formData || name === undefined || name === null || name === '') return {};

  return {
    modelValue: getValue(formData, name) as InputPasswordModelValue,
    'onUpdate:modelValue': (value: InputPasswordModelValue) =>
      setFormdata(formData, name, value as WidgetFormFieldValue)
  };
}
