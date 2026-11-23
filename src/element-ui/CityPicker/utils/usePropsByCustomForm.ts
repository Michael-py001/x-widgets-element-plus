import { getValue, setFormdata } from '../../../utils';
import type { WidgetFormFieldValue } from '../../../utils/handleFormData';
import type { XCityPickerProps } from '../types/props';

type CityPickerModelValue = string | string[] | null;

export default function usePropsByCustomForm(props: XCityPickerProps) {
  const { formData, name } = props;
  if (!formData || name === undefined || name === null || name === '') return {};

  return {
    modelValue: getValue(formData, name) as CityPickerModelValue,
    'onUpdate:modelValue': (value: CityPickerModelValue) =>
      setFormdata(formData, name, value as WidgetFormFieldValue)
  };
}
