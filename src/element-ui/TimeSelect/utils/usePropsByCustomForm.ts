import { getValue, setFormdata } from '../../../utils';
import type { WidgetFormFieldValue } from '../../../utils/handleFormData';
import type { XTimeSelectProps } from '../types/props';

type TimeSelectModelValue = XTimeSelectProps['modelValue'];

/** TimeSelect 受控值走 modelValue，与通用表单桥接一致。 */
export default function usePropsByCustomForm(props: XTimeSelectProps) {
  const { formData, name } = props;
  if (!formData || name === undefined || name === null || name === '') return {};

  return {
    modelValue: getValue(formData, name) as TimeSelectModelValue,
    'onUpdate:modelValue': (value: TimeSelectModelValue) =>
      setFormdata(formData, name, value as WidgetFormFieldValue)
  };
}
