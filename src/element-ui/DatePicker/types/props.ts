import type { DatePickerProps as ElementDatePickerProps } from 'element-plus';
import type { WidgetFormFieldPath, WidgetFormFieldPrimitive } from '../../../utils/handleFormData';
import type { BasicFormProps } from './basicFormProps';

type DatePickerBaseValue = Exclude<WidgetFormFieldPrimitive, boolean>;
interface DatePickerProps extends Omit<ElementDatePickerProps, 'name' | 'props'> {}

/**
 * DatePicker 在 widgets 体系里允许的值类型。
 *
 * 单值场景支持字符串、数字、日期对象和空值；
 * 范围场景复用相同基础值类型的数组表示。
 */
export type DatePickerModelValue = DatePickerBaseValue | DatePickerBaseValue[];

/**
 * DatePicker 组件的统一属性定义。
 */
export interface XDatePickerProps extends DatePickerProps, BasicFormProps {
  /**
   * widgets 表单字段路径。
   *
   * 说明：
   * 1. 这里的 `name` 只服务于 `FormItem/SearchForm/FormPage` 的表单联动；
   * 2. 它不是 Element Plus 原生 DatePicker 的 `name`，不会直接透传给 `ElDatePicker`。
   */
  name?: WidgetFormFieldPath;
}

/**
 * 允许透传给 Element Plus DatePicker 的原生属性。
 *
 * 不包含 widgets 自定义扩展字段，尤其不包含表单字段路径语义下的 `name`。
 */
export type XDatePickerNativeProps = DatePickerProps;
