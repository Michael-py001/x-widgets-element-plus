import { defineComponent } from 'vue';
import { ElInput as Input } from 'element-plus';
import { basicFormProps } from './types/basicFormProps';
import type { XTextareaProps } from './types/props';
import usePropsByCustomForm from './utils/usePropsByCustomForm';

/**
 * 文本域组件：对 Element Plus Input 进行语义封装，固定使用 textarea 模式。
 */
export default defineComponent({
  name: 'XTextarea',
  inheritAttrs: true,
  props: {
    ...Input.props,
    ...basicFormProps()
  },
  setup(props: XTextareaProps, { attrs, slots }) {
    const { event } = props;
    const { _is_x_form_item } = attrs;

    return () => {
      let customProps = {};

      // 经过 FormItem 托管时，自动补齐 formData/name 的双向绑定与默认占位文案。
      if (_is_x_form_item) {
        customProps = usePropsByCustomForm(props);
      }

      const { slotProps } = props;

      return (
        <Input {...attrs} {...props} {...customProps} {...event} type="textarea">
          {{ ...slots, ...slotProps }}
        </Input>
      );
    };
  }
});
