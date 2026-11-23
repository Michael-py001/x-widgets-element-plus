import { defineComponent } from 'vue';
import { ElCascader } from 'element-plus';
import type { XCascaderProps } from './types/props';
import { basicFormProps } from './types/basicFormProps';
import usePropsByCustomForm from './utils/usePropsByCustomForm';
import {
  normalizeWidgetOptions,
  pickNativeWidgetProps,
  WIDGET_FORM_BRIDGE_PROP_KEYS
} from '../../utils';

// Element Plus Cascader 的 props 是原生字段别名配置，不能当成桥接私有字段剔除。
const NATIVE_PROP_KEYS = WIDGET_FORM_BRIDGE_PROP_KEYS.filter((key) => key !== 'props');

/**
 * 级联选择器适配器：复用 widgets 选项归一化与表单桥接协议。
 */
export default defineComponent({
  name: 'XCascader',
  inheritAttrs: true,
  props: {
    ...ElCascader.props,
    ...basicFormProps()
  },
  setup(props: XCascaderProps, { attrs, slots }) {
    return () => {
      const { slotProps } = props;
      const customProps = attrs._is_x_form_item ? usePropsByCustomForm(props) : {};
      const nativeProps = pickNativeWidgetProps(props, NATIVE_PROP_KEYS);
      const options = normalizeWidgetOptions(props.options as never);

      return (
        <ElCascader {...attrs} {...nativeProps} options={options} {...customProps} {...props.event}>
          {{ ...slots, ...slotProps }}
        </ElCascader>
      );
    };
  }
});
