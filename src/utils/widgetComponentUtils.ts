import { unref } from 'vue';
import type { ComputedRef, Ref } from 'vue';

/**
 * widgets 表单桥接层的通用私有字段。
 *
 * 这些字段只在 `FormItem/SearchForm/FormPage` 等 widgets 体系内部消费，
 * 不能继续透传给 Element Plus 原生组件或原生 DOM。
 */
export const WIDGET_FORM_BRIDGE_PROP_KEYS = ['label', 'props', 'name', 'formData', 'event', 'slotProps'] as const;

/**
 * 带 options 语义的 widgets 通用私有字段。
 *
 * 这类字段除了表单桥接字段外，还包含组件内部渲染选项时使用的配置键。
 */
export const WIDGET_OPTION_PROP_KEYS = [...WIDGET_FORM_BRIDGE_PROP_KEYS, 'options', 'valueKey', 'labelKey'] as const;

/**
 * Autocomplete 的 widgets 私有字段。
 *
 * `valueKey` 是 Element Plus 原生属性，决定选中候选写入输入框和表单模型的字段，
 * 因此不能和通用 options 组件一样剔除；`labelKey` 只用于本地候选检索。
 */
export const WIDGET_AUTOCOMPLETE_PROP_KEYS = [...WIDGET_FORM_BRIDGE_PROP_KEYS, 'options', 'labelKey'] as const;

/**
 * Text 组件的 widgets 私有字段。
 *
 * `textValue / textBold` 只服务于展示协议，不应直接落到原生 DOM 属性上。
 */
export const WIDGET_TEXT_PROP_KEYS = [...WIDGET_FORM_BRIDGE_PROP_KEYS, 'textValue', 'textBold'] as const;

export type WidgetOptionPrimitive = string | number | boolean;
export type WidgetOptionItem = Record<string, any> | WidgetOptionPrimitive;
export type WidgetOptionList = Array<WidgetOptionItem> | ReadonlyArray<WidgetOptionItem>;
export type WidgetOptionSource = WidgetOptionList | Ref<WidgetOptionList> | ComputedRef<WidgetOptionList> | undefined;

/**
 * 从 widgets 组件完整 props 中剔除私有字段，生成可安全透传的原生 props。
 *
 * 说明：
 * 1. 这里会先复制一份 props，再删除 widgets 私有字段，避免修改响应式源对象；
 * 2. 该函数只负责字段剥离，不负责补默认值或做业务归一化；
 * 3. 适用于 Element Plus 包装组件以及需要避免私有字段落到原生 DOM 的展示组件。
 *
 * @param props widgets 组件完整 props。
 * @param privateKeys 需要从原生透传结果中剔除的 widgets 私有字段列表。
 * @returns 可安全继续透传的原生 props。
 */
export function pickNativeWidgetProps<T extends Record<string, any>, K extends readonly (keyof T)[]>(
  props: T,
  privateKeys: K
): Omit<T, K[number]> {
  const nativeProps = { ...props } as Record<string, any>;

  privateKeys.forEach((key) => {
    delete nativeProps[key as string];
  });

  return nativeProps as Omit<T, K[number]>;
}

/**
 * 将 widgets 选项源归一化成统一的可渲染数组。
 *
 * 说明：
 * 1. 支持 plain array、`ReadonlyArray`、`Ref`、`ComputedRef`；
 * 2. 归一化前会先复制数组，避免只读数组在后续流程中被误当成可变集合；
 * 3. 基础值会被包装成 `{ label, value }` 结构，对象值保持原样透传。
 *
 * @param optionsSource widgets 组件接收的选项源。
 * @returns 可直接参与渲染的标准化选项数组。
 */
export function normalizeWidgetOptions(optionsSource: WidgetOptionSource): Array<Record<string, any>> {
  const rawOptions = unref(optionsSource);

  if (!Array.isArray(rawOptions)) {
    return [];
  }

  return [...rawOptions].map((item) => {
    if (typeof item === 'object' && item !== null) {
      return item;
    }

    return {
      label: String(item),
      value: item
    };
  });
}
