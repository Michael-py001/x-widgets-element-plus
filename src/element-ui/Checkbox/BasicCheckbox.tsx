import { defineComponent } from 'vue';
import { ElCheckbox } from 'element-plus';
import type { XCheckboxProps } from './types/props';
import { basicFormProps } from './types/basicFormProps';
import usePropsByCustomForm from './utils/usePropsByCustomForm';
import { pickNativeWidgetProps, WIDGET_FORM_BRIDGE_PROP_KEYS } from '../../utils';

export default defineComponent({
  name: 'XCheckbox',
  inheritAttrs: true,
  props: {
    ...ElCheckbox.props,
    ...basicFormProps()
  },
  setup(props: XCheckboxProps, { attrs, slots }) {
    return () => {
      const { slotProps } = props;
      const customProps = attrs._is_x_form_item ? usePropsByCustomForm(props) : {};
      const nativeProps = pickNativeWidgetProps(props, WIDGET_FORM_BRIDGE_PROP_KEYS);

      return (
        <ElCheckbox {...attrs} {...nativeProps} {...customProps} {...props.event}>
          {{ ...slots, ...slotProps }}
        </ElCheckbox>
      );
    };
  }
});
