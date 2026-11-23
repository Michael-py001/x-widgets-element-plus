import { computed, defineComponent } from 'vue';
import type { WidgetFormFieldValue } from '../../utils/handleFormData';
import type { XTextProps } from './types/props';
import { basicFormProps } from './types/basicFormProps';
import { textProps } from './types/props';
import usePropsByCustomForm from './utils/usePropsByCustomForm';
import { pickNativeWidgetProps, WIDGET_TEXT_PROP_KEYS } from '../../utils';

/**
 * 将 Text 组件值归一化为可展示文本。
 *
 * @param value 当前值。
 * @returns 归一化后的文本。
 */
function formatTextValue(value: WidgetFormFieldValue): string {
  if (Array.isArray(value)) {
    return value.map((item) => String(item ?? '')).join('、');
  }

  if (value === null || value === undefined) {
    return '';
  }

  return String(value);
}

/**
 * 只读文本组件：用于 schema-driven form 中的展示型字段。
 */
export default defineComponent({
  name: 'XText',
  inheritAttrs: true,
  props: {
    ...basicFormProps(),
    ...textProps()
  },
  setup(props: XTextProps, { attrs }) {
    /**
     * 展示值统一走解析协议。
     *
     * 说明：
     * 1. 普通值保持原语义；
     * 2. 函数式 `textValue` 由解析层把字段原始值交给业务格式化，独立使用与 FormItem 内行为一致。
     */
    const resolvedTextValue = computed(() => usePropsByCustomForm(props).textValue);

    return () => {
      const nativeTextProps = pickNativeWidgetProps(props, WIDGET_TEXT_PROP_KEYS);

      return (
        <span
          {...attrs}
          {...nativeTextProps}
          style={{
            fontWeight: props.textBold ? 600 : 400
          }}
        >
          {formatTextValue(resolvedTextValue.value)}
        </span>
      );
    };
  }
});
