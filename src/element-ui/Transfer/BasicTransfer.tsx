import { defineComponent } from 'vue';
import { ElTransfer, transferProps } from 'element-plus';
import type { XTransferProps } from './types/props';
import { basicFormProps } from './types/basicFormProps';
import usePropsByCustomForm from './utils/usePropsByCustomForm';
import {
  normalizeWidgetOptions,
  pickNativeWidgetProps,
  WIDGET_FORM_BRIDGE_PROP_KEYS
} from '../../utils';

// ElTransfer 的 props 是原生字段别名配置，不能当成桥接私有字段剔除。
const NATIVE_PROP_KEYS = WIDGET_FORM_BRIDGE_PROP_KEYS.filter((key) => key !== 'props');

/**
 * 穿梭框适配器：候选数据取自 widgets 的 options，选中值绑定 modelValue。
 */
export default defineComponent({
  name: 'XTransfer',
  inheritAttrs: true,
  props: {
    ...transferProps,
    ...basicFormProps()
  },
  setup(props: XTransferProps, { attrs, slots }) {
    return () => {
      const { slotProps } = props;
      const customProps = attrs._is_x_form_item ? usePropsByCustomForm(props) : {};
      const nativeProps = pickNativeWidgetProps(props, NATIVE_PROP_KEYS);
      const data = normalizeWidgetOptions(props.options as never);

      return (
        <ElTransfer {...attrs} {...nativeProps} data={data} {...customProps} {...props.event}>
          {{ ...slots, ...slotProps }}
        </ElTransfer>
      );
    };
  }
});
