import { defineComponent } from 'vue';
import { ElInput as Input } from 'element-plus';
import { XInputProps } from './types/props';
import { basicFormProps } from './types/basicFormProps';
import usePropsByCustomForm from './utils/usePropsByCustomForm';

export default defineComponent({
  name: 'XInput',
  inheritAttrs: true,
  props: {
    ...Input.props,
    ...basicFormProps()
  },
  setup(props: XInputProps, { attrs, slots }) {
    const { event } = props;
    const { _is_x_form_item } = attrs;

    return () => {
      let customProps = {};

      // 对于经过custom/FormItem处理的表单项，额外处理
      if (_is_x_form_item) {
        customProps = usePropsByCustomForm(props);
      }
      const { slotProps } = props;

      return (
        <Input {...attrs} {...props} {...customProps} {...event}>
          {{ ...slots, ...slotProps }}
        </Input>
      );
    };
  }
});
