import { getValue, setFormdata } from '../../../utils';
import type { WidgetFormFieldValue } from '../../../utils/handleFormData';
import type { XSwitchProps } from '../types/props';

type SwitchModelValue = XSwitchProps['modelValue'];

export default function usePropsByCustomForm(props: XSwitchProps) {
  const { formData, name } = props;
  if (!formData || name === undefined || name === null || name === '') return {};

  return {
    modelValue: getValue(formData, name) as SwitchModelValue,
    'onUpdate:modelValue': (value: SwitchModelValue) => setFormdata(formData, name, value as WidgetFormFieldValue)
  };
}
