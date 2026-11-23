import { defineComponent } from 'vue';
import { ElInput } from 'element-plus';
import type { XInputPasswordProps } from './types/props';
import { basicFormProps } from './types/basicFormProps';
import usePropsByCustomForm from './utils/usePropsByCustomForm';
import { pickNativeWidgetProps, WIDGET_FORM_BRIDGE_PROP_KEYS } from '../../utils';

/**
 * 密码输入框适配器：固定使用 Element Plus 的 password 类型。
 */
export default defineComponent({
  name: 'XInputPassword',
  inheritAttrs: true,
  props: {
    ...ElInput.props,
    ...basicFormProps()
  },
  setup(props: XInputPasswordProps, { attrs, slots }) {
    return () => {
      const { slotProps } = props;
      const customProps = attrs._is_x_form_item ? usePropsByCustomForm(props) : {};
      const nativeProps = pickNativeWidgetProps(props, WIDGET_FORM_BRIDGE_PROP_KEYS);

      return (
        <ElInput {...attrs} {...nativeProps} type="password" {...customProps} {...props.event}>
          {{ ...slots, ...slotProps }}
        </ElInput>
      );
    };
  }
});
