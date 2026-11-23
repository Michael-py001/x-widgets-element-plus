import { defineComponent } from 'vue';
import { ElSlider } from 'element-plus';
import type { XSliderProps } from './types/props';
import { basicFormProps } from './types/basicFormProps';
import usePropsByCustomForm from './utils/usePropsByCustomForm';
import { pickNativeWidgetProps, WIDGET_FORM_BRIDGE_PROP_KEYS } from '../../utils';

/**
 * 滑块组件适配器。
 */
export default defineComponent({
  name: 'XSlider',
  inheritAttrs: true,
  props: {
    ...ElSlider.props,
    ...basicFormProps()
  },
  setup(props: XSliderProps, { attrs, slots }) {
    return () => {
      const { slotProps } = props;
      const customProps = attrs._is_x_form_item ? usePropsByCustomForm(props) : {};
      const nativeProps = pickNativeWidgetProps(props, WIDGET_FORM_BRIDGE_PROP_KEYS);

      return (
        <ElSlider {...attrs} {...nativeProps} {...customProps} {...props.event}>
          {{ ...slots, ...slotProps }}
        </ElSlider>
      );
    };
  }
});
