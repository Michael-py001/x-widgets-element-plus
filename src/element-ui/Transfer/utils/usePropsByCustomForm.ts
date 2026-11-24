import { getValue, setFormdata } from '../../../utils';
import type { WidgetFormFieldValue } from '../../../utils/handleFormData';
import type { XTransferProps } from '../types/props';

type TransferModelValue = XTransferProps['modelValue'];

/** Transfer 的选中值走 ElTransfer 的 modelValue，与通用表单桥接一致。 */
export default function usePropsByCustomForm(props: XTransferProps) {
  const { formData, name } = props;
  if (!formData || name === undefined || name === null || name === '') return {};

  return {
    modelValue: getValue(formData, name) as TransferModelValue,
    'onUpdate:modelValue': (value: TransferModelValue) =>
      setFormdata(formData, name, value as WidgetFormFieldValue)
  };
}
