import { defineComponent } from 'vue';
import { ElTreeSelect } from 'element-plus';
import type { XTreeSelectProps } from './types/props';
import { basicFormProps } from './types/basicFormProps';
import usePropsByCustomForm from './utils/usePropsByCustomForm';
import { normalizeWidgetOptions, pickNativeWidgetProps, WIDGET_FORM_BRIDGE_PROP_KEYS } from '../../utils';

export default defineComponent({
  name: 'XTreeSelect',
  inheritAttrs: true,
  props: {
    ...ElTreeSelect.props,
    ...basicFormProps()
  },
  setup(props: XTreeSelectProps, { attrs, slots }) {
    return () => {
      const { slotProps } = props;
      const customProps = attrs._is_x_form_item ? usePropsByCustomForm(props) : {};
      const nativeProps = pickNativeWidgetProps(props, [...WIDGET_FORM_BRIDGE_PROP_KEYS, 'options']);
      // 复用共享归一化逻辑：先复制再交给原生控件，兼容只读数组契约。
      const data = normalizeWidgetOptions(props.options);

      return (
        <ElTreeSelect {...attrs} {...nativeProps} {...customProps} {...props.event} data={data}>
          {{ ...slots, ...slotProps }}
        </ElTreeSelect>
      );
    };
  }
});
