import { getValue, setFormdata } from '../../../utils';
import type { WidgetFormFieldValue } from '../../../utils/handleFormData';
import type { XMentionsProps } from '../types/props';

type MentionsModelValue = XMentionsProps['modelValue'];

export default function usePropsByCustomForm(props: XMentionsProps) {
  const { formData, name } = props;
  if (!formData || name === undefined || name === null || name === '') return {};

  return {
    modelValue: getValue(formData, name) as MentionsModelValue,
    'onUpdate:modelValue': (value: MentionsModelValue) =>
      setFormdata(formData, name, value as WidgetFormFieldValue)
  };
}
