import { getValue, setFormdata } from '../../../utils';
import type { WidgetFormFieldValue } from '../../../utils/handleFormData';
import type { XInputSearchProps } from '../types/props';

type InputSearchModelValue = XInputSearchProps['modelValue'];

export default function usePropsByCustomForm(props: XInputSearchProps) {
  const { formData, name } = props;
  if (!formData || name === undefined || name === null || name === '') return {};

  return {
    modelValue: getValue(formData, name) as InputSearchModelValue,
    'onUpdate:modelValue': (value: InputSearchModelValue) =>
      setFormdata(formData, name, value as WidgetFormFieldValue)
  };
}
