import { defineComponent } from 'vue';
import { ElDatePicker } from 'element-plus';
import type { XDatePickerNativeProps, XDatePickerProps } from './types/props';
import { basicFormProps } from './types/basicFormProps';
import usePropsByCustomForm from './utils/usePropsByCustomForm';
import { pickNativeWidgetProps, WIDGET_FORM_BRIDGE_PROP_KEYS } from '../../utils';

/**
 * DatePicker 表单适配器。
 *
 * 说明：
 * 1. 复用 widgets FormItem 的 `_is_x_form_item` 协议；
 * 2. 统一接管 `formData + name` 到 `modelValue` 的双向绑定；
 * 3. 占位文案默认跟随字段标签，避免页面层重复拼接。
 */
export default defineComponent({
  name: 'XDatePicker',
  inheritAttrs: true,
  props: {
    ...ElDatePicker.props,
    ...basicFormProps()
  },
  setup(props: XDatePickerProps, { attrs, slots }) {
    const { event } = props;
    const { _is_x_form_item } = attrs;

    return () => {
      let customProps = {};

      // 经过 FormItem 包装的场景统一走表单适配逻辑，避免页面侧重复手写绑定。
      if (_is_x_form_item) {
        customProps = usePropsByCustomForm(props);
      }
      const { slotProps } = props;
      const nativeDatePickerProps = pickNativeWidgetProps(
        props,
        WIDGET_FORM_BRIDGE_PROP_KEYS
      ) as XDatePickerNativeProps;

      return (
        <ElDatePicker {...attrs} {...nativeDatePickerProps} {...customProps} {...event}>
          {{ ...slots, ...slotProps }}
        </ElDatePicker>
      );
    };
  }
});
