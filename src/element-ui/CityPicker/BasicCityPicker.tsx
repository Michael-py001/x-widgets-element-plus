import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import AreaCascader from '../../AreaCascader';
import type { XCityPickerProps } from './types/props';
import { basicFormProps } from './types/basicFormProps';
import usePropsByCustomForm from './utils/usePropsByCustomForm';
import { pickNativeWidgetProps, WIDGET_OPTION_PROP_KEYS } from '../../utils';

// FormItem 注入的桥接字段不应继续落到 AreaCascader / 原生 DOM。
const PRIVATE_ATTR_KEYS = [
  ...WIDGET_OPTION_PROP_KEYS,
  '_is_x_form_item',
  'onClearValidate',
  'onValidateName',
  'validateInfo',
  'cityPickerData',
  'cityValidateInfo',
  'textBold',
  'textValue'
];

/**
 * 城市选择器：基于内置省市区数据的 AreaCascader，固定展示到市级（maxLevel=2）。
 */
export default defineComponent({
  name: 'XCityPicker',
  inheritAttrs: true,
  props: {
    modelValue: {
      type: [String, Array] as PropType<string | string[] | null>,
      default: null
    },
    ...basicFormProps()
  },
  emits: ['update:modelValue'],
  setup(props: XCityPickerProps, { attrs, slots, emit }) {
    return () => {
      const customProps = attrs._is_x_form_item
        ? usePropsByCustomForm(props)
        : {
            modelValue: props.modelValue,
            'onUpdate:modelValue': (value: string | string[] | null) => emit('update:modelValue', value)
          };
      const nativeProps = pickNativeWidgetProps(attrs, PRIVATE_ATTR_KEYS);
      const changeEvent = props.event?.onChange
        ? { onChange: (path: string[]) => props.event?.onChange?.(path) }
        : {};

      return (
        <AreaCascader {...nativeProps} maxLevel={2} {...customProps} {...changeEvent}>
          {{ ...slots }}
        </AreaCascader>
      );
    };
  }
});
