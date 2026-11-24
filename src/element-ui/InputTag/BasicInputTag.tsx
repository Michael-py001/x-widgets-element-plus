import { defineComponent } from 'vue';
import { ElInputTag, inputTagProps } from 'element-plus';
import type { XInputTagProps } from './types/props';
import { basicFormProps } from './types/basicFormProps';
import usePropsByCustomForm from './utils/usePropsByCustomForm';
import { pickNativeWidgetProps, WIDGET_FORM_BRIDGE_PROP_KEYS } from '../../utils';

/** 标签输入框适配器：受控值是标签数组，走 modelValue。 */
export default defineComponent({
  name: 'XInputTag',
  inheritAttrs: true,
  props: { ...inputTagProps, ...basicFormProps() },
  setup(props: XInputTagProps, { attrs, slots }) {
    return () => {
      const { slotProps } = props;
      const customProps = attrs._is_x_form_item ? usePropsByCustomForm(props) : {};
      const nativeProps = pickNativeWidgetProps(props, WIDGET_FORM_BRIDGE_PROP_KEYS);

      return (
        <ElInputTag {...attrs} {...nativeProps} {...customProps} {...props.event}>
          {{ ...slots, ...slotProps }}
        </ElInputTag>
      );
    };
  }
});
