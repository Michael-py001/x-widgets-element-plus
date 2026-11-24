import { defineComponent } from 'vue';
import { ElTimeSelect, timeSelectProps } from 'element-plus';
import type { XTimeSelectProps } from './types/props';
import { basicFormProps } from './types/basicFormProps';
import usePropsByCustomForm from './utils/usePropsByCustomForm';
import { pickNativeWidgetProps, WIDGET_FORM_BRIDGE_PROP_KEYS } from '../../utils';

/** 固定间隔时间选择器适配器：受控值走 modelValue。 */
export default defineComponent({
  name: 'XTimeSelect',
  inheritAttrs: true,
  props: { ...timeSelectProps, ...basicFormProps() },
  setup(props: XTimeSelectProps, { attrs, slots }) {
    return () => {
      const { slotProps } = props;
      const customProps = attrs._is_x_form_item ? usePropsByCustomForm(props) : {};
      const nativeProps = pickNativeWidgetProps(props, WIDGET_FORM_BRIDGE_PROP_KEYS);

      return (
        <ElTimeSelect {...attrs} {...nativeProps} {...customProps} {...props.event}>
          {{ ...slots, ...slotProps }}
        </ElTimeSelect>
      );
    };
  }
});
