import { computed, defineComponent, unref } from 'vue';
import { ElRadio, ElRadioGroup } from 'element-plus';
import type { XRadioGroupProps } from './types/props';
import { basicFormProps } from './types/basicFormProps';
import usePropsByCustomForm from './utils/usePropsByCustomForm';
import { normalizeWidgetOptions, pickNativeWidgetProps, WIDGET_OPTION_PROP_KEYS } from '../../utils';

/**
 * 将传入的 options 归一化成可直接渲染的单选项列表。
 *
 * @param props RadioGroup 当前 props。
 * @returns 归一化后的选项数组。
 */
function useNormalizedOptions(props: XRadioGroupProps) {
  return computed(() => {
    // 只保留组件级响应式外壳，具体归一化逻辑统一交给公共 widgets utils。
    return normalizeWidgetOptions(unref(props.options));
  });
}

/**
 * 单选组组件：对 Element Plus RadioGroup 进行 widgets 表单适配。
 */
export default defineComponent({
  name: 'XRadioGroup',
  inheritAttrs: true,
  props: {
    ...ElRadioGroup.props,
    ...basicFormProps()
  },
  setup(props: XRadioGroupProps, { attrs, slots }) {
    const { event, valueKey = 'value', labelKey = 'label', slotProps } = props;
    const { _is_x_form_item } = attrs;
    const normalizedOptions = useNormalizedOptions(props);

    return () => {
      let customProps = {};
      const nativeRadioGroupProps = pickNativeWidgetProps(props, WIDGET_OPTION_PROP_KEYS);

      // 经过 FormItem 托管时，统一接管 formData + name 的双向绑定。
      if (_is_x_form_item) {
        customProps = usePropsByCustomForm(props);
      }

      const mergedSlots = {
        ...slots,
        ...slotProps
      } as Record<string, (() => any) | undefined>;

      return (
        <ElRadioGroup {...attrs} {...nativeRadioGroupProps} {...customProps} {...event}>
          {mergedSlots.default
            ? mergedSlots.default()
            : normalizedOptions.value.map((item, index) => {
                const optionValue = item?.[valueKey] ?? item?.value ?? item;
                const optionLabel = item?.[labelKey] ?? item?.label ?? optionValue;

                return (
                  <ElRadio key={`${String(optionValue)}-${index}`} value={optionValue}>
                    {String(optionLabel ?? '')}
                  </ElRadio>
                );
              })}
        </ElRadioGroup>
      );
    };
  }
});
