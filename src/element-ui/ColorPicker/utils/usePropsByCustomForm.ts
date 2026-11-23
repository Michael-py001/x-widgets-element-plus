import { getValue, setFormdata } from '../../../utils';
import type { WidgetFormFieldValue } from '../../../utils/handleFormData';
import type { XColorPickerProps } from '../types/props';

type ColorPickerModelValue = XColorPickerProps['modelValue'];

export default function usePropsByCustomForm(props: XColorPickerProps) {
  const { formData, name } = props;
  if (!formData || name === undefined || name === null || name === '') return {};

  return {
    modelValue: getValue(formData, name) as ColorPickerModelValue,
    'onUpdate:modelValue': (value: ColorPickerModelValue) =>
      setFormdata(formData, name, value as WidgetFormFieldValue)
  };
}
