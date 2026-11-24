import { getValue, setFormdata } from '../../../utils';
import type { WidgetFormFieldValue } from '../../../utils/handleFormData';
import type { XInputOtpProps } from '../types/props';

type InputOtpModelValue = XInputOtpProps['modelValue'];

/** InputOtp 受控值走 modelValue，与通用表单桥接一致。 */
export default function usePropsByCustomForm(props: XInputOtpProps) {
  const { formData, name } = props;
  if (!formData || name === undefined || name === null || name === '') return {};

  return {
    modelValue: getValue(formData, name) as InputOtpModelValue,
    'onUpdate:modelValue': (value: InputOtpModelValue) =>
      setFormdata(formData, name, value as WidgetFormFieldValue)
  };
}
