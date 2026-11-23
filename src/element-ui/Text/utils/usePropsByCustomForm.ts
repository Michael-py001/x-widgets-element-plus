import { getValue } from '../../../utils';

/**
 * 统一解析 Text 组件的展示值。
 *
 * 说明：
 * 1. `textValue` 为函数时表示「格式化函数」：字段原始值先按 `formData[name]` 取出，
 *    再交给业务函数加工，用于空值占位等只影响展示、不写回表单的场景；
 * 2. `textValue` 为普通值时保持原有的只读取值协议。
 *
 * @param props Text 当前 props。
 * @returns 供 Text 组件内部消费的回显值。
 */
export default function usePropsByCustomForm(props: any) {
  const { formData, name, textValue } = props;

  if (typeof textValue === 'function') {
    return {
      textValue: textValue(formData ? getValue(formData, name) : undefined, formData)
    };
  }

  if (!formData) {
    return {
      textValue
    };
  }

  return {
    textValue: textValue ?? getValue(formData, name)
  };
}
