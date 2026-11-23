import type { ExtractPropTypes, PropType } from 'vue';
import type { WidgetFormDataRecord, WidgetFormFieldValue } from '../../../utils/handleFormData';
import type { BasicFormProps } from './basicFormProps';

/**
 * 函数式 `textValue`：接收字段原始值，返回真正用于展示的值。
 *
 * 适用于「空值占位」这类只在展示层兜底、又不希望写回表单数据的场景，
 * 例如 `textValue: (val) => val || '--'`。
 */
export type TextValueFormatter = (
  /** 字段原始值，取 `formData[name]`；未传 formData 时为 undefined。 */
  value: WidgetFormFieldValue,
  /** 当前表单数据，便于按整行数据格式化。 */
  formData?: WidgetFormDataRecord
) => WidgetFormFieldValue;

export const textProps = () => {
  return {
    textValue: {
      type: [String, Number, Boolean, Array, Function] as PropType<WidgetFormFieldValue | TextValueFormatter>,
      default: ''
    },
    textBold: {
      type: Boolean,
      default: false
    }
  };
};

export type TextProps = ExtractPropTypes<ReturnType<typeof textProps>>;

export interface XTextProps extends BasicFormProps, TextProps {}
