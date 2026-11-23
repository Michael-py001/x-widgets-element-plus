import { defineComponent, type VNodeChild } from 'vue';
import { ElSelectV2 as Select, ElTooltip } from 'element-plus';
import type { XSelectProps } from './types/props';
import { basicFormProps } from './types/basicFormProps';
import { setFormdata, getValue } from '../../utils';

type SelectSlotScope = Record<string, any>;

/**
 * 判断下拉选项里是否显式提供了取值为空的选项。
 *
 * 约定：`''` 只有在它本身就是某个选项的取值时才当有效值（「全部」这类选项就是靠它实现的），
 * 否则 `''` 与 `null` 一样视为「未选择」，让 placeholder 正常显示。
 *
 * 不这样区分的话，表单数据里初始化成 `''` 的下拉会被当成「选了一个空字符串」：
 * 界面只剩一个空白输入框，placeholder 永不出现，看上去像控件坏了。
 * 选项可能是分组结构（`{ label, options: [...] }`），所以要递归检查。
 *
 * @param options 当前下拉的选项集合。
 * @param valueKey 取值的字段名，跟随 `props.value` 别名。
 * @returns 是否提供了取值为空串的选项。
 */
function hasEmptyValueOption(options: unknown, valueKey: string): boolean {
  if (!Array.isArray(options)) return false;

  return options.some((option) => {
    if (option && typeof option === 'object') {
      const children = (option as Record<string, any>).options;
      if (Array.isArray(children)) return hasEmptyValueOption(children, valueKey);
      return (option as Record<string, any>)[valueKey] === '';
    }
    return option === '';
  });
}

/**
 * 读取 SelectV2 插槽上下文中的展示文本。
 *
 * `label` 插槽直接提供 label，而 `default` 选项插槽只提供 item；后者需要遵循
 * SelectV2 的 props.label 别名，并兼容 widgets 表单桥接层传入的 labelKey。
 */
function getOptionLabel(scope: SelectSlotScope, props: XSelectProps, attrs: Record<string, any>): string {
  if (scope.label !== undefined && scope.label !== null) {
    return String(scope.label);
  }

  const item = scope.item;
  const selectProps = props.props as { label?: string } | undefined;
  const labelKey = selectProps?.label || attrs.labelKey || 'label';

  if (item && typeof item === 'object') {
    return String(item[labelKey] ?? item.label ?? item.value ?? '');
  }

  return String(item ?? scope.value ?? '');
}

/**
 * 为下拉选项和已选值提供统一的全文悬浮提示，同时保留原有插槽内容。
 *
 * 触发节点固定为块级单行容器，确保长文本仍按 SelectV2 的宽度省略，tooltip
 * 则展示完整 label；空文本不创建 tooltip，避免无意义的空浮层。
 */
function renderLabelWithTooltip(label: string, content: VNodeChild): VNodeChild {
  if (!label) {
    return content;
  }

  return (
    <ElTooltip content={label} placement="top">
      <span
        class="x-select-label-tooltip-trigger"
        style={{
          display: 'block',
          width: '100%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
      >
        {content}
      </span>
    </ElTooltip>
  );
}

export default defineComponent({
  name: 'XSelect',
  props: {
    ...basicFormProps(),
    ...Select.props,
    showLabelTooltip: {
      type: Boolean,
      default: false
    }
  },
  setup(props: XSelectProps, { attrs, slots, emit }) {
    const { event, label, placeholder, formData, name } = props;
    const { _is_x_form_item } = attrs; // 经过custom/FormItem处理的标志
    const _event = event || {};

    return () => {
      /**
       * 空串只在选项里真有取值为 `''` 的选项时才当有效值，否则并入空值集合，
       * 交给 Element Plus 显示 placeholder（见 hasEmptyValueOption）。
       */
      const valueKey = (props.props as { value?: string } | undefined)?.value || attrs.valueKey || 'value';
      const basicProps: Record<string, any> = {
        emptyValues: hasEmptyValueOption(props.options, String(valueKey)) ? [null, undefined] : [null, undefined, ''],
        // 清空一律回到 null：让「未选择」只有一种表示，表单侧判断空值不必区分 '' 与 null。
        valueOnClear: null
      };

      // 对于经过custom/FormItem处理的表单项，额外处理
      if (_is_x_form_item && formData) {
        basicProps['onUpdate:modelValue'] = (value: string) => {
          setFormdata(formData, name, value);
        };
        basicProps.modelValue = getValue(formData, name);
        basicProps.placeholder = placeholder || (label ? `请选择${label}` : placeholder);
      }
      const { slotProps } = props;
      const mergedSlots = { ...slots, ...slotProps } as Record<string, (scope?: SelectSlotScope) => VNodeChild>;
      // 这是 widgets 层的控制开关，不应作为未知属性继续落到 Element Plus 根节点；解构保留其余 props 的类型信息。
      const { showLabelTooltip: _showLabelTooltip, ...nativeSelectProps } = props;

      if (!props.showLabelTooltip) {
        return (
          <Select {...attrs} {...nativeSelectProps} {...basicProps} {..._event}>
            {{ ...mergedSlots }}
          </Select>
        );
      }

      const optionSlot = mergedSlots.default;
      const labelSlot = mergedSlots.label;

      return (
        <Select {...attrs} {...nativeSelectProps} {...basicProps} {..._event}>
          {{
            ...mergedSlots,
            default: (scope: SelectSlotScope) => {
              const label = getOptionLabel(scope, props, attrs);
              return renderLabelWithTooltip(label, optionSlot?.(scope) ?? label);
            },
            label: (scope: SelectSlotScope) => {
              const label = getOptionLabel(scope, props, attrs);
              return renderLabelWithTooltip(label, labelSlot?.(scope) ?? label);
            }
          }}
        </Select>
      );
    };
  }
});
