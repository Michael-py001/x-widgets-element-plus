import { getValue, setFormdata } from '../../../utils';

/**
 * 为 textarea 组件补齐表单场景下的默认绑定行为。
 *
 * @param props 组件入参。
 * @returns 与表单联动所需的补充属性。
 */
export default function usePropsByCustomForm(props: any) {
  const { formData, name, placeholder, label } = props;

  let saveProps = {};
  if (formData) {
    saveProps = {
      'onUpdate:modelValue': (value: string) => {
        setFormdata(formData, name, value);
      },
      modelValue: getValue(formData, name),
      placeholder: placeholder || (label ? `请输入${label}` : placeholder)
    };
  }

  return saveProps;
}
