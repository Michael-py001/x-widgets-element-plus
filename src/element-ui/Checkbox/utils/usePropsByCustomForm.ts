import { getValue, setFormdata } from '../../../utils';
import type { WidgetFormFieldValue } from '../../../utils/handleFormData';
import type { XCheckboxProps } from '../types/props';

type CheckboxModelValue = XCheckboxProps['modelValue'];

export default function usePropsByCustomForm(props: XCheckboxProps) {
  const { formData, name } = props;
  if (!formData || name === undefined || name === null || name === '') return {};

  return {
    modelValue: getValue(formData, name) as CheckboxModelValue,
    'onUpdate:modelValue': (value: CheckboxModelValue) => setFormdata(formData, name, value as WidgetFormFieldValue)
  };
}
