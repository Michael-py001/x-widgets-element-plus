import { defineComponent } from 'vue';
import { ElIcon, ElInput } from 'element-plus';
import { Search } from '@element-plus/icons-vue';
import type { XInputSearchProps } from './types/props';
import { basicFormProps } from './types/basicFormProps';
import usePropsByCustomForm from './utils/usePropsByCustomForm';
import { pickNativeWidgetProps, WIDGET_FORM_BRIDGE_PROP_KEYS } from '../../utils';

/**
 * 搜索输入框适配器：在 Element Plus Input 上补充搜索前缀图标，
 * 并在回车时调用 event.onSearch（若提供）。
 */
export default defineComponent({
  name: 'XInputSearch',
  inheritAttrs: true,
  props: {
    ...ElInput.props,
    ...basicFormProps()
  },
  setup(props: XInputSearchProps, { attrs, slots }) {
    return () => {
      const { slotProps } = props;
      const customProps = attrs._is_x_form_item ? usePropsByCustomForm(props) : {};
      const nativeProps = pickNativeWidgetProps(props, WIDGET_FORM_BRIDGE_PROP_KEYS);
      const searchEvents = {
        ...props.event,
        onKeyup: (event: KeyboardEvent) => {
          props.event?.onKeyup?.(event);
          if (event.key === 'Enter' && typeof props.event?.onSearch === 'function') {
            props.event.onSearch((customProps as Record<string, unknown>).modelValue ?? props.modelValue);
          }
        }
      };

      return (
        <ElInput {...attrs} {...nativeProps} {...customProps} {...searchEvents}>
          {{
            prefix: () => (
              <ElIcon>
                <Search />
              </ElIcon>
            ),
            ...slots,
            ...slotProps
          }}
        </ElInput>
      );
    };
  }
});
