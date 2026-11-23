import { defineComponent } from 'vue';
import { ElAutocomplete as Autocomplete } from 'element-plus';
import type { XAutocompleteProps } from './types/props';
import { basicFormProps } from './types/basicFormProps';
import usePropsByCustomForm from './utils/usePropsByCustomForm';
import { getAutoCompletePropsFromOptions } from './utils/useFetchSuggestionsByOptions';
import { pickNativeWidgetProps, WIDGET_AUTOCOMPLETE_PROP_KEYS } from '../../utils';

type AutocompleteEvent = (...args: unknown[]) => unknown;

/**
 * 合并 FormItem 的模型回写和业务层同名事件。
 *
 * FormItem 必须先写回 `formData`，业务事件才能基于最新输入值处理字段联动。
 */
function mergeUpdateModelValueEvent(
  formUpdate: AutocompleteEvent | undefined,
  businessUpdate: AutocompleteEvent | undefined
): AutocompleteEvent | undefined {
  if (!formUpdate) {
    return businessUpdate;
  }

  if (!businessUpdate) {
    return formUpdate;
  }

  return (...args: unknown[]) => {
    formUpdate(...args);
    businessUpdate(...args);
  };
}

/**
 * Autocomplete 表单适配器。
 *
 * 支持直接使用与 FormItem Schema 两种模式。未提供 Element Plus 的
 * `fetchSuggestions` 时，组件会根据 options 和 labelKey 生成本地候选；
 * valueKey 始终决定选中项写入输入框与表单模型的字段。
 */
export default defineComponent({
  name: 'XAutocomplete',
  inheritAttrs: true,
  props: {
    ...((Autocomplete as any).props),
    ...basicFormProps()
  },
  setup(props: XAutocompleteProps, { attrs, slots }) {
    const { _is_x_form_item } = attrs;

    return () => {
      const nativeAutocompleteProps = pickNativeWidgetProps(props, WIDGET_AUTOCOMPLETE_PROP_KEYS);
      const customProps = _is_x_form_item ? usePropsByCustomForm(props) : {};
      const event = props.event || {};
      const mergedEvent = { ...event };
      const updateModelValue = mergeUpdateModelValueEvent(
        customProps['onUpdate:modelValue'],
        event['onUpdate:modelValue']
      );

      // 直接使用 Widget 时，v-model 的监听器位于 attrs；没有桥接事件时不能用 undefined 覆盖它。
      if (updateModelValue) {
        mergedEvent['onUpdate:modelValue'] = updateModelValue;
      }
      const autoProps = getAutoCompletePropsFromOptions({
        options: props.options,
        valueKey: props.valueKey,
        labelKey: props.labelKey,
        userProvidedFetch: !!nativeAutocompleteProps.fetchSuggestions
      });
      const mergedSlots = { ...slots, ...props.slotProps };

      return (
        <Autocomplete {...attrs} {...nativeAutocompleteProps} {...autoProps} {...customProps} {...mergedEvent}>
          {{ ...mergedSlots }}
        </Autocomplete>
      );
    };
  }
});
