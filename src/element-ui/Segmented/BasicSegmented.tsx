import { defineComponent } from 'vue';
import { ElSegmented, segmentedProps } from 'element-plus';
import type { XSegmentedProps } from './types/props';
import { basicFormProps } from './types/basicFormProps';
import usePropsByCustomForm from './utils/usePropsByCustomForm';
import { pickNativeWidgetProps, WIDGET_FORM_BRIDGE_PROP_KEYS } from '../../utils';

// ElSegmented 的 props（字段别名）与 options（候选项）都是原生语义，不能当桥接私有字段剔除。
const NATIVE_PROP_KEYS = WIDGET_FORM_BRIDGE_PROP_KEYS.filter((key) => key !== 'props');

/** 分段控制器适配器：候选项直接使用原生 options，选中值绑定 modelValue。 */
export default defineComponent({
  name: 'XSegmented',
  inheritAttrs: true,
  props: { ...segmentedProps, ...basicFormProps() },
  setup(props: XSegmentedProps, { attrs, slots }) {
    return () => {
      const { slotProps } = props;
      const customProps = attrs._is_x_form_item ? usePropsByCustomForm(props) : {};
      const nativeProps = pickNativeWidgetProps(props, NATIVE_PROP_KEYS);

      return (
        <ElSegmented {...attrs} {...nativeProps} {...customProps} {...props.event}>
          {{ ...slots, ...slotProps }}
        </ElSegmented>
      );
    };
  }
});
