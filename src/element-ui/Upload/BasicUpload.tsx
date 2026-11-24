import { defineComponent } from 'vue';
import { ElUpload } from 'element-plus';
import type { XUploadProps } from './types/props';
import { basicFormProps } from './types/basicFormProps';
import usePropsByCustomForm from './utils/usePropsByCustomForm';
import { pickNativeWidgetProps, WIDGET_FORM_BRIDGE_PROP_KEYS } from '../../utils';

/**
 * 上传适配器：受控值走 fileList，与 AntD 包的 upload 控件对齐。
 */
export default defineComponent({
  name: 'XUpload',
  inheritAttrs: true,
  props: {
    ...ElUpload.props,
    ...basicFormProps()
  },
  setup(props: XUploadProps, { attrs, slots }) {
    return () => {
      const { slotProps } = props;
      const customProps = attrs._is_x_form_item ? usePropsByCustomForm(props) : {};
      const nativeProps = pickNativeWidgetProps(props, WIDGET_FORM_BRIDGE_PROP_KEYS);

      return (
        <ElUpload {...attrs} {...nativeProps} {...customProps} {...props.event}>
          {{ ...slots, ...slotProps }}
        </ElUpload>
      );
    };
  }
});
