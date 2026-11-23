/**
 * widgets 表单组件允许写入的字段值类型。
 *
 * 这里覆盖输入、选择、日期单值和日期范围等常见表单场景，
 * 保持边界可控，不退化成无约束的 any。
 */
export type WidgetFormFieldPrimitive = string | number | boolean | Date | null | undefined;
export type WidgetFormFieldValue = WidgetFormFieldPrimitive | WidgetFormFieldPrimitive[];
export type WidgetFormDataRecord = Record<string | number, any>;
export type WidgetFormFieldPath = string | Array<string | number>;

/**
 * 按字段路径回写表单数据。
 *
 * @param formData 外部表单数据对象。
 * @param name 字段名或双层路径。
 * @param value 组件当前值。
 */
export function setFormdata(formData: WidgetFormDataRecord, name: WidgetFormFieldPath, value: WidgetFormFieldValue) {
  if (Array.isArray(name)) {
    if (name.length === 2) {
      const [name1, name2] = name;
      formData[name1][name2] = value;
      return;
    }
  } else {
    formData[name] = value;
  }
}

/**
 * 按字段路径读取表单数据。
 *
 * @param formData 外部表单数据对象。
 * @param name 字段名或双层路径。
 * @returns 当前字段值。
 */
export function getValue(formData: WidgetFormDataRecord, name: WidgetFormFieldPath): WidgetFormFieldValue {
  if (Array.isArray(name)) {
    const [name1, name2] = name;
    return formData[name1][name2];
  }
  return formData[name];
}
