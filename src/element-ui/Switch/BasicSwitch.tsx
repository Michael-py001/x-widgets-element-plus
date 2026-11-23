import { defineComponent } from 'vue';
import { ElSwitch } from 'element-plus';
import type { XSwitchProps } from './types/props';
import { basicFormProps } from './types/basicFormProps';
import usePropsByCustomForm from './utils/usePropsByCustomForm';
import { pickNativeWidgetProps, WIDGET_FORM_BRIDGE_PROP_KEYS } from '../../utils';

export default defineComponent({
  name: 'XSwitch',
  inheritAttrs: true,
  props: {
    ...ElSwitch.props,
    ...basicFormProps()
  },
  setup(props: XSwitchProps, { attrs, slots }) {
    return () => {
      const { slotProps } = props;
      const customProps = attrs._is_x_form_item ? usePropsByCustomForm(props) : {};
      const nativeProps = pickNativeWidgetProps(props, WIDGET_FORM_BRIDGE_PROP_KEYS);

      return (
        <ElSwitch {...attrs} {...nativeProps} {...customProps} {...props.event}>
          {{ ...slots, ...slotProps }}
        </ElSwitch>
      );
    };
  }
});
