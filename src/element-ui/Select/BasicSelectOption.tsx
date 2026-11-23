import { defineComponent } from 'vue';
import { ElOption as SelectOption } from 'element-plus';

const NativeSelectOption = SelectOption as any;

export default defineComponent({
  name: 'XSelectOption',
  props: (SelectOption as any).props,
  setup(props, { attrs, slots }) {
    return (
      <NativeSelectOption {...attrs} {...props}>
        {{ ...slots }}
      </NativeSelectOption>
    );
  }
});
