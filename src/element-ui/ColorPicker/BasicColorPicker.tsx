import { defineComponent } from 'vue';
import { ElColorPicker } from 'element-plus';
import type { XColorPickerProps } from './types/props';
import { basicFormProps } from './types/basicFormProps';
import usePropsByCustomForm from './utils/usePropsByCustomForm';
import { pickNativeWidgetProps, WIDGET_FORM_BRIDGE_PROP_KEYS } from '../../utils';

/**
 * 颜色选择器适配器。
 */
export default defineComponent({
  name: 'XColorPicker',
  inheritAttrs: true,
  props: {
    ...ElColorPicker.props,
    ...basicFormProps()
  },
  setup(props: XColorPickerProps, { attrs, slots }) {
    return () => {
      const { slotProps } = props;
      const customProps = attrs._is_x_form_item ? usePropsByCustomForm(props) : {};
      const nativeProps = pickNativeWidgetProps(props, WIDGET_FORM_BRIDGE_PROP_KEYS);

      return (
        <ElColorPicker {...attrs} {...nativeProps} {...customProps} {...props.event}>
          {{ ...slots, ...slotProps }}
        </ElColorPicker>
      );
    };
  }
});
