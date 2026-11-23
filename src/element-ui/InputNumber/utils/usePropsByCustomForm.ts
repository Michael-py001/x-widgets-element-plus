import { getValue, setFormdata } from '../../../utils';

/**
 * 为 InputNumber 补齐 FormItem 场景下的双向绑定协议。
 *
 * @param props InputNumber 当前 props。
 * @returns 供 Element Plus InputNumber 透传的表单绑定属性。
 */
export default function usePropsByCustomForm(props: any) {
  const { formData, name } = props;

  if (!formData) {
    return {};
  }

  return {
    'onUpdate:modelValue': (value: number | undefined) => {
      setFormdata(formData, name, value);
    },
    modelValue: getValue(formData, name)
  };
}
