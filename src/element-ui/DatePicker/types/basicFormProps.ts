import type { ExtractPropTypes, PropType } from 'vue';
import type { WidgetFormDataRecord, WidgetFormFieldPath } from '../../../utils/handleFormData';

/**
 * DatePicker 与自定义表单体系对接时的基础扩展属性。
 *
 * 说明：
 * 1. 这里单独维护 DatePicker 的表单扩展类型，避免继续借用其他组件目录下的类型定义；
 * 2. `name` 允许字符串和双层路径数组，以兼容 FormItem 当前的字段映射方式；
 * 3. `event` 与 `slotProps` 保持对象透传，供 widgets 封装层统一接线。
 */
export const basicFormProps = () => {
  return {
    label: {
      type: String,
      default: ''
    },
    props: {
      type: Object as PropType<Record<string, unknown>>,
      default: () => ({})
    },
    name: {
      type: [String, Array] as PropType<WidgetFormFieldPath>,
      default: ''
    },
    formData: {
      type: Object as PropType<WidgetFormDataRecord>,
      default: () => ({})
    },
    event: {
      type: Object as PropType<Record<string, (...args: unknown[]) => unknown>>,
      default: () => ({})
    },
    slotProps: {
      type: Object as PropType<Record<string, (...args: unknown[]) => unknown>>,
      default: () => ({})
    }
  };
};

export type BasicFormProps = Partial<ExtractPropTypes<ReturnType<typeof basicFormProps>>>;
