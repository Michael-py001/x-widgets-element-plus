import { defineComponent } from 'vue';
import { ElInputNumber } from 'element-plus';
import type { XInputNumberProps } from './types/props';
import { basicFormProps } from './types/basicFormProps';
import usePropsByCustomForm from './utils/usePropsByCustomForm';
import { pickNativeWidgetProps, WIDGET_FORM_BRIDGE_PROP_KEYS } from '../../utils';

/**
 * 数字输入组件：对 Element Plus InputNumber 进行 widgets 表单适配。
 */
export default defineComponent({
  name: 'XInputNumber',
  inheritAttrs: true,
  props: {
    ...ElInputNumber.props,
    ...basicFormProps()
  },
  setup(props: XInputNumberProps, { attrs }) {
    const { event } = props;
    const { _is_x_form_item } = attrs;

    return () => {
      let customProps = {};
      const nativeInputNumberProps = pickNativeWidgetProps(props, WIDGET_FORM_BRIDGE_PROP_KEYS);

      // 经过 FormItem 托管时，统一接管 formData + name 的双向绑定。
      if (_is_x_form_item) {
        customProps = usePropsByCustomForm(props);
      }

      return <ElInputNumber {...attrs} {...nativeInputNumberProps} {...customProps} {...event}></ElInputNumber>;
    };
  }
});
