import { defineComponent } from 'vue';
import { ElTimePicker } from 'element-plus';
import type { XTimePickerProps } from './types/props';
import { basicFormProps } from './types/basicFormProps';
import usePropsByCustomForm from './utils/usePropsByCustomForm';
import { pickNativeWidgetProps, WIDGET_FORM_BRIDGE_PROP_KEYS } from '../../utils';

export default defineComponent({
  name: 'XTimePicker',
  inheritAttrs: true,
  props: {
    ...ElTimePicker.props,
    ...basicFormProps()
  },
  setup(props: XTimePickerProps, { attrs, slots }) {
    return () => {
      const { slotProps } = props;
      const customProps = attrs._is_x_form_item ? usePropsByCustomForm(props) : {};
      const nativeProps = pickNativeWidgetProps(props, WIDGET_FORM_BRIDGE_PROP_KEYS);

      return (
        <ElTimePicker {...attrs} {...nativeProps} {...customProps} {...props.event}>
          {{ ...slots, ...slotProps }}
        </ElTimePicker>
      );
    };
  }
});
