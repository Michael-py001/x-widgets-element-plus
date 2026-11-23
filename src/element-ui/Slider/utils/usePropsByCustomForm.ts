import { getValue, setFormdata } from '../../../utils';
import type { WidgetFormFieldValue } from '../../../utils/handleFormData';
import type { XSliderProps } from '../types/props';

type SliderModelValue = XSliderProps['modelValue'];

export default function usePropsByCustomForm(props: XSliderProps) {
  const { formData, name } = props;
  if (!formData || name === undefined || name === null || name === '') return {};

  return {
    modelValue: getValue(formData, name) as SliderModelValue,
    'onUpdate:modelValue': (value: SliderModelValue) =>
      setFormdata(formData, name, value as WidgetFormFieldValue)
  };
}
