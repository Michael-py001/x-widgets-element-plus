import { getValue, setFormdata } from '../../../utils';
import type { WidgetFormFieldValue } from '../../../utils/handleFormData';
import type { XRateProps } from '../types/props';

type RateModelValue = XRateProps['modelValue'];

export default function usePropsByCustomForm(props: XRateProps) {
  const { formData, name } = props;
  if (!formData || name === undefined || name === null || name === '') return {};

  return {
    modelValue: getValue(formData, name) as RateModelValue,
    'onUpdate:modelValue': (value: RateModelValue) =>
      setFormdata(formData, name, value as WidgetFormFieldValue)
  };
}
