import { defineComponent } from 'vue';
import { ElInputOtp } from 'element-plus';
import type { XInputOtpProps } from './types/props';
import { basicFormProps } from './types/basicFormProps';
import usePropsByCustomForm from './utils/usePropsByCustomForm';
import { pickNativeWidgetProps, WIDGET_FORM_BRIDGE_PROP_KEYS } from '../../utils';

/** 一次性密码输入框适配器：受控值走 modelValue。 */
export default defineComponent({
  name: 'XInputOtp',
  inheritAttrs: true,
  props: { ...ElInputOtp.props, ...basicFormProps() },
  setup(props: XInputOtpProps, { attrs, slots }) {
    return () => {
      const { slotProps } = props;
      const customProps = attrs._is_x_form_item ? usePropsByCustomForm(props) : {};
      const nativeProps = pickNativeWidgetProps(props, WIDGET_FORM_BRIDGE_PROP_KEYS);

      return (
        <ElInputOtp {...attrs} {...nativeProps} {...customProps} {...props.event}>
          {{ ...slots, ...slotProps }}
        </ElInputOtp>
      );
    };
  }
});
