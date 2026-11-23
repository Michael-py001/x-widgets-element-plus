import { getValue, setFormdata } from '../../../utils';

/**
 * 为 CheckboxGroup 补齐 FormItem 场景下的双向绑定协议。
 *
 * @param props CheckboxGroup 当前 props。
 * @returns 供 Element Plus CheckboxGroup 透传的表单绑定属性。
 */
export default function usePropsByCustomForm(props: any) {
  const { formData, name } = props;

  if (!formData) {
    return {};
  }

  return {
    'onUpdate:modelValue': (value: unknown[]) => {
      setFormdata(formData, name, value as any);
    },
    modelValue: getValue(formData, name)
  };
}
