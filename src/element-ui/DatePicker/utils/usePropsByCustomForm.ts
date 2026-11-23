import { getValue, setFormdata } from '../../../utils';
import type { DatePickerModelValue, XDatePickerProps } from '../types/props';

interface DatePickerCustomFormProps {
  modelValue: DatePickerModelValue;
  'onUpdate:modelValue': (value: DatePickerModelValue) => void;
  placeholder?: string;
  startPlaceholder?: string;
  endPlaceholder?: string;
}

/**
 * 为 DatePicker 补齐与 Custom FormItem 对接时所需的默认属性。
 *
 * @param props DatePicker 组件当前入参。
 * @returns 仅在表单场景下需要补充到 ElDatePicker 的属性集合。
 */
export default function usePropsByCustomForm(props: XDatePickerProps): Partial<DatePickerCustomFormProps> {
  const { formData, name, placeholder, label, startPlaceholder, endPlaceholder } = props;

  if (!formData || name === undefined || name === null || name === '') {
    return {};
  }

  // 这里的 name 是 widgets 表单字段路径，不是 Element Plus 原生 DatePicker 的 name。
  // 当前字段值统一从外部表单数据中读取，保证 SearchForm / FormPage 行为一致。
  const currentValue = getValue(formData, name) as DatePickerModelValue;

  return {
    'onUpdate:modelValue': (value: DatePickerModelValue) => {
      setFormdata(formData, name, value);
    },
    modelValue: currentValue,
    placeholder: placeholder || (label ? `请选择${label}` : placeholder),
    startPlaceholder: startPlaceholder || '开始日期',
    endPlaceholder: endPlaceholder || '结束日期'
  };
}
