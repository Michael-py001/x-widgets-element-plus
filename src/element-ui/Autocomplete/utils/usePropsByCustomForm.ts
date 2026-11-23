import { getValue, setFormdata } from '../../../utils';
import type { XAutocompleteProps } from '../types/props';

interface AutocompleteCustomFormProps {
  modelValue: string | number;
  'onUpdate:modelValue': (value: string | number) => void;
  placeholder?: string;
}

/**
 * 为 Autocomplete 补齐与 Custom FormItem 对接时所需的默认属性。
 *
 * @param props Autocomplete 当前入参。
 * @returns 仅在表单场景下传给 Element Plus 的双向绑定属性。
 */
export default function usePropsByCustomForm(props: XAutocompleteProps): Partial<AutocompleteCustomFormProps> {
  const { formData, name, placeholder, label } = props;

  if (!formData || name === undefined || name === null || name === '') {
    return {};
  }

  return {
    'onUpdate:modelValue': (value: string | number) => {
      setFormdata(formData, name, value);
    },
    modelValue: getValue(formData, name) as string | number,
    placeholder: placeholder || (label ? `请输入${label}` : placeholder)
  };
}
