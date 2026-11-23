import { defineComponent } from 'vue';
import { ElMention, mentionProps } from 'element-plus';
import type { XMentionsProps } from './types/props';
import { basicFormProps } from './types/basicFormProps';
import usePropsByCustomForm from './utils/usePropsByCustomForm';
import {
  normalizeWidgetOptions,
  pickNativeWidgetProps,
  WIDGET_FORM_BRIDGE_PROP_KEYS
} from '../../utils';

// Element Plus Mention 的 props 是原生候选字段别名配置，不能当成桥接私有字段剔除。
const NATIVE_PROP_KEYS = WIDGET_FORM_BRIDGE_PROP_KEYS.filter((key) => key !== 'props');

/**
 * 提及（@）输入框适配器：基于 Element Plus ElMention。
 */
export default defineComponent({
  name: 'XMentions',
  inheritAttrs: true,
  props: {
    ...mentionProps,
    ...basicFormProps()
  },
  setup(props: XMentionsProps, { attrs, slots }) {
    return () => {
      const { slotProps } = props;
      const customProps = attrs._is_x_form_item ? usePropsByCustomForm(props) : {};
      const nativeProps = pickNativeWidgetProps(props, NATIVE_PROP_KEYS);
      const options = normalizeWidgetOptions(props.options as never);

      return (
        <ElMention {...attrs} {...nativeProps} options={options} {...customProps} {...props.event}>
          {{ ...slots, ...slotProps }}
        </ElMention>
      );
    };
  }
});
