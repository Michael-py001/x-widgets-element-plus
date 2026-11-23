import { getValue, setFormdata } from '../../../utils';
import type { WidgetFormFieldValue } from '../../../utils/handleFormData';
import type { XRangeInputProps } from '../types/props';

type RangeInputModelValue = Array<string | number> | null;

export default function usePropsByCustomForm(props: XRangeInputProps) {
  const { formData, name } = props;
  if (!formData || name === undefined || name === null || name === '') return {};

  return {
    modelValue: getValue(formData, name) as RangeInputModelValue,
    'onUpdate:modelValue': (value: RangeInputModelValue) =>
      setFormdata(formData, name, value as WidgetFormFieldValue)
  };
}
