import { getValue, setFormdata } from '../../../utils';
import type { WidgetFormFieldValue } from '../../../utils/handleFormData';
import type { XSegmentedProps } from '../types/props';

type SegmentedModelValue = XSegmentedProps['modelValue'];

/** Segmented 受控值走 modelValue，与通用表单桥接一致。 */
export default function usePropsByCustomForm(props: XSegmentedProps) {
  const { formData, name } = props;
  if (!formData || name === undefined || name === null || name === '') return {};

  return {
    modelValue: getValue(formData, name) as SegmentedModelValue,
    'onUpdate:modelValue': (value: SegmentedModelValue) =>
      setFormdata(formData, name, value as WidgetFormFieldValue)
  };
}
