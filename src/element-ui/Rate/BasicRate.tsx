import { defineComponent } from 'vue';
import { ElRate } from 'element-plus';
import type { XRateProps } from './types/props';
import { basicFormProps } from './types/basicFormProps';
import usePropsByCustomForm from './utils/usePropsByCustomForm';
import { pickNativeWidgetProps, WIDGET_FORM_BRIDGE_PROP_KEYS } from '../../utils';

/**
 * 评分组件适配器。
 */
export default defineComponent({
  name: 'XRate',
  inheritAttrs: true,
  props: {
    ...ElRate.props,
    ...basicFormProps()
  },
  setup(props: XRateProps, { attrs, slots }) {
    return () => {
      const { slotProps } = props;
      const customProps = attrs._is_x_form_item ? usePropsByCustomForm(props) : {};
      const nativeProps = pickNativeWidgetProps(props, WIDGET_FORM_BRIDGE_PROP_KEYS);

      return (
        <ElRate {...attrs} {...nativeProps} {...customProps} {...props.event}>
          {{ ...slots, ...slotProps }}
        </ElRate>
      );
    };
  }
});
