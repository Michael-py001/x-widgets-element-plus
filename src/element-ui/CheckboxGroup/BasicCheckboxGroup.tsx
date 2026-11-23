import { computed, defineComponent, unref } from 'vue';
import { ElCheckbox, ElCheckboxGroup } from 'element-plus';
import type { XCheckboxGroupProps } from './types/props';
import { basicFormProps } from './types/basicFormProps';
import usePropsByCustomForm from './utils/usePropsByCustomForm';
import { normalizeWidgetOptions, pickNativeWidgetProps, WIDGET_OPTION_PROP_KEYS } from '../../utils';

/**
 * 将传入的 options 归一化成可直接渲染的多选项列表。
 *
 * @param props CheckboxGroup 当前 props。
 * @returns 归一化后的选项数组。
 */
function useNormalizedOptions(props: XCheckboxGroupProps) {
  return computed(() => {
    // 只保留组件级响应式外壳，具体归一化逻辑统一交给公共 widgets utils。
    return normalizeWidgetOptions(unref(props.options));
  });
}

/**
 * 多选组组件：对 Element Plus CheckboxGroup 进行 widgets 表单适配。
 */
export default defineComponent({
  name: 'XCheckboxGroup',
  inheritAttrs: true,
  props: {
    ...ElCheckboxGroup.props,
    ...basicFormProps()
  },
  setup(props: XCheckboxGroupProps, { attrs, slots }) {
    const { event, valueKey = 'value', labelKey = 'label', slotProps } = props;
    const { _is_x_form_item } = attrs;
    const normalizedOptions = useNormalizedOptions(props);

    return () => {
      let customProps = {};
      const nativeCheckboxGroupProps = pickNativeWidgetProps(props, WIDGET_OPTION_PROP_KEYS);

      // 经过 FormItem 托管时，统一接管 formData + name 的双向绑定。
      if (_is_x_form_item) {
        customProps = usePropsByCustomForm(props);
      }

      const mergedSlots = {
        ...slots,
        ...slotProps
      } as Record<string, (() => any) | undefined>;

      return (
        <ElCheckboxGroup {...attrs} {...nativeCheckboxGroupProps} {...customProps} {...event}>
          {mergedSlots.default
            ? mergedSlots.default()
            : normalizedOptions.value.map((item, index) => {
                const optionValue = item?.[valueKey] ?? item?.value ?? item;
                const optionLabel = item?.[labelKey] ?? item?.label ?? optionValue;

                return (
                  <ElCheckbox key={`${String(optionValue)}-${index}`} value={optionValue}>
                    {String(optionLabel ?? '')}
                  </ElCheckbox>
                );
              })}
        </ElCheckboxGroup>
      );
    };
  }
});
