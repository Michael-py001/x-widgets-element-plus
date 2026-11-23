import { getValue, setFormdata } from '../../../utils';
import type { WidgetFormFieldValue } from '../../../utils/handleFormData';
import type { XCascaderProps } from '../types/props';

type CascaderModelValue = XCascaderProps['modelValue'];

export default function usePropsByCustomForm(props: XCascaderProps) {
  const { formData, name } = props;
  if (!formData || name === undefined || name === null || name === '') return {};

  return {
    modelValue: getValue(formData, name) as CascaderModelValue,
    'onUpdate:modelValue': (value: CascaderModelValue) =>
      setFormdata(formData, name, value as WidgetFormFieldValue)
  };
}
