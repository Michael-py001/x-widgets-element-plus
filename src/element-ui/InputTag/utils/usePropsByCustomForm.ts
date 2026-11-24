import { getValue, setFormdata } from '../../../utils';
import type { WidgetFormFieldValue } from '../../../utils/handleFormData';
import type { XInputTagProps } from '../types/props';

type InputTagModelValue = XInputTagProps['modelValue'];

/** InputTag 受控值走 modelValue，与通用表单桥接一致。 */
export default function usePropsByCustomForm(props: XInputTagProps) {
  const { formData, name } = props;
  if (!formData || name === undefined || name === null || name === '') return {};

  return {
    modelValue: getValue(formData, name) as InputTagModelValue,
    'onUpdate:modelValue': (value: InputTagModelValue) =>
      setFormdata(formData, name, value as WidgetFormFieldValue)
  };
}
