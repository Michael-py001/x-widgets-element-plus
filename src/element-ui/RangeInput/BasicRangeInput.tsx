import { computed, defineComponent } from 'vue';
import type { PropType } from 'vue';
import { ElInput } from 'element-plus';
import type { RangeInputValue, XRangeInputProps } from './types/props';
import { basicFormProps } from './types/basicFormProps';
import usePropsByCustomForm from './utils/usePropsByCustomForm';
import { pickNativeWidgetProps, WIDGET_FORM_BRIDGE_PROP_KEYS } from '../../utils';
import type { WidgetFormFieldValue } from '../../utils/handleFormData';

/**
 * 区间输入：两个 Element Plus Input 以分隔符相连，模型值为 [start, end]。
 */
export default defineComponent({
  name: 'XRangeInput',
  inheritAttrs: true,
  props: {
    ...ElInput.props,
    modelValue: {
      type: Array as PropType<RangeInputValue>,
      default: () => []
    },
    separator: {
      type: String,
      default: ''
    },
    ...basicFormProps()
  },
  emits: ['update:modelValue', 'change'],
  setup(props: XRangeInputProps, { attrs, slots, emit }) {
    const bridgeProps = computed(() => (attrs._is_x_form_item ? usePropsByCustomForm(props) : {}));
    const currentValue = computed<Array<string | number>>(() => {
      const bridged = bridgeProps.value as Record<string, unknown>;
      const raw = 'modelValue' in bridged ? bridged.modelValue : props.modelValue;
      return Array.isArray(raw) ? raw : [];
    });

    function updateAt(index: number, value: string | number) {
      const next: RangeInputValue = [...currentValue.value];
      next[index] = value;
      emit('update:modelValue', next);
      emit('change', next);
      const bridged = bridgeProps.value as Record<string, (value: WidgetFormFieldValue) => void>;
      bridged['onUpdate:modelValue']?.(next);
      props.event?.onChange?.(next);
    }

    return () => {
      const { slotProps } = props;
      const nativeProps = pickNativeWidgetProps(props, [...WIDGET_FORM_BRIDGE_PROP_KEYS, 'separator', 'modelValue']);
      // separator 是本适配器的布局配置，不应该是 Element Plus Input 的原生 prop。
      const separator = (props.separator as string) || '~';
      const [start, end] = currentValue.value;

      return (
        <div class="x-range-input">
          <ElInput
            {...nativeProps}
            modelValue={start ?? ''}
            onUpdate:modelValue={(value: string | number) => updateAt(0, value)}
          >
            {{ ...slots, ...slotProps }}
          </ElInput>
          <span class="x-range-input__separator">{separator}</span>
          <ElInput
            {...nativeProps}
            modelValue={end ?? ''}
            onUpdate:modelValue={(value: string | number) => updateAt(1, value)}
          >
            {{ ...slots, ...slotProps }}
          </ElInput>
        </div>
      );
    };
  }
});
