/**
 * @description 表单项组件
 * @author WuShiLi
 */

import { defineComponent, computed, unref, ref, toRefs, isRef } from 'vue';
import type { Ref } from 'vue';
import { ElFormItem as FormItem } from 'element-plus';
import { useInjectForm } from '../Form/context';
import formItemStyle from './style/FormItem.module.less';
import type { FormContextProps } from '../Form/context';
import { formItemProps } from './types/props';
import type {
  ColumnForFormItemType,
  FormItemAffixSlotRender,
  FormItemFieldName,
  FormItemProps,
  FormItemSlotRender,
  FormItemSlotRenderContext
} from './types/props';

import Input from '../../element-ui/Input/BasicInput';
import Select from '../../element-ui/Select/BasicSelect';
import Autocomplete from '../../element-ui/Autocomplete/BasicAutocomplete';
import Textarea from '../../element-ui/Textarea/BasicTextarea';
import DatePicker from '../../element-ui/DatePicker';
import TimePicker from '../../element-ui/TimePicker';
import InputNumber from '../../element-ui/InputNumber/BasicInputNumber';
import RadioGroup from '../../element-ui/RadioGroup/BasicRadioGroup';
import Checkbox from '../../element-ui/Checkbox';
import CheckboxGroup from '../../element-ui/CheckboxGroup/BasicCheckboxGroup';
import Switch from '../../element-ui/Switch';
import TreeSelect from '../../element-ui/TreeSelect';
import Text from '../../element-ui/Text/BasicText';
import InputPassword from '../../element-ui/InputPassword';
import InputSearch from '../../element-ui/InputSearch';
import CityPicker from '../../element-ui/CityPicker';
import AreaPicker from '../../element-ui/AreaPicker';
import RangeInput from '../../element-ui/RangeInput';
import Cascader from '../../element-ui/Cascader';
import Rate from '../../element-ui/Rate';
import Slider from '../../element-ui/Slider';
import ColorPicker from '../../element-ui/ColorPicker';
import Mentions from '../../element-ui/Mentions';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

/**
 * 统一返回字段路径。
 *
 * 当前 FormItem / FormPage 体系只允许字符串或字符串路径数组作为字段名。
 */
function getName(name: FormItemFieldName): FormItemFieldName {
  return name;
}

/**
 * 获取 Element Plus FormItem 使用的字段路径。
 *
 * 说明：
 * 1. `ElFormItem.prop`、`validateField`、`clearValidate` 都接受 `string | string[]`；
 * 2. 这里保持原路径结构，不做点路径拼接。
 */
function getFormItemProp(name: FormItemFieldName): FormItemFieldName {
  return name;
}

/**
 * 获取规则对象使用的稳定键名。
 *
 * 说明：
 * 1. `FormRules` 本质上是普通对象索引；
 * 2. 路径数组统一转成点路径字符串，避免直接拿数组当对象 key。
 */
function getFormRuleKey(name: FormItemFieldName): string {
  if (Array.isArray(name)) {
    return name.join('.');
  }
  return name;
}

/**
 * 判断当前 formSlot 是否为 TSX render 函数。
 *
 * @param value formSlot 配置值。
 * @returns 是否为 render 函数。
 */
function isFormItemSlotRender(value: unknown): value is FormItemSlotRender {
  return typeof value === 'function';
}

/**
 * 判断当前 beforeSlot / afterSlot 是否为 TSX render 函数。
 *
 * @param value beforeSlot 或 afterSlot 配置值。
 * @returns 是否为 render 函数。
 */
function isFormItemAffixSlotRender(value: unknown): value is FormItemAffixSlotRender {
  return typeof value === 'function';
}

/**
 * 统一调用字符串命名插槽，并补齐表单项渲染上下文。
 *
 * @param {Record<string, any>} slots 当前组件可用插槽集合。
 * @param {string | undefined} slotName schema 上声明的插槽名称。
 * @param {FormItemSlotRenderContext} slotRenderContext 当前字段上下文。
 * @returns 插槽渲染结果；未命中时返回 null。
 */
function renderNamedSlot(
  slots: Record<string, any>,
  slotName: string | undefined,
  slotRenderContext: FormItemSlotRenderContext
) {
  if (!slotName || !slots[slotName]) {
    return null;
  }

  return slots[slotName]?.(slotRenderContext);
}

const FormItemComponent = defineComponent({
  name: 'CustomFormItem',
  props: {
    ...formItemProps()
  },
  emits: ['clearValidate', 'validateName', 'cityPickerChange'],
  setup(props: FormItemProps, { emit, expose, attrs, slots }) {
    const fieldName = computed(() => props.name);
    const formContext: FormContextProps = useInjectForm();
    const rulesRef = computed(() => {
      return (
        props.rules || (formContext?.rules?.value && formContext?.rules?.value[getFormRuleKey(fieldName.value)]) || []
      );
    });
    const injectData = computed(() => formContext?.model?.value);

    const formInstanceRef = computed(() => formContext?.formInstance?.value);

    const innerOptions = computed(() => {
      if (typeof props.options === 'function') {
        return props.options(props);
      }
      if (props.options) {
        const sourceOptions =
          isRef(props.options) && props.options.value instanceof Array
            ? props.options.value
            : unref(props.options) || [];
        const normalizedOptions = [...sourceOptions];
        return normalizedOptions.map((item) => {
          // 处理value为boolean类型，或者为字符串的false,true 情况
          const normalizedItem = { ...item };
          if (
            normalizedItem.value === 'false' ||
            (typeof normalizedItem.value === 'boolean' && normalizedItem.value === false)
          ) {
            normalizedItem.value = 0;
          } else if (
            normalizedItem.value === 'true' ||
            (typeof normalizedItem.value === 'boolean' && normalizedItem.value === true)
          ) {
            normalizedItem.value = 1;
          }
          return normalizedItem;
        });
      }
      return props.options;
    });
    //组件视图
    const widgetMap: Record<string, any> = {
      'x-input': Input,
      input: Input,
      textarea: Textarea,
      text: Text,
      'input-number': InputNumber,
      'x-select': Select,
      select: Select,
      'tree-select': TreeSelect,
      'radio-group': RadioGroup,
      checkbox: Checkbox,
      'checkbox-group': CheckboxGroup,
      switch: Switch,
      'date-picker': DatePicker,
      'range-picker': DatePicker,
      'time-picker': TimePicker,
      'time-range-picker': TimePicker,
      autocomplete: Autocomplete,
      'auto-complete': Autocomplete,
      'input-password': InputPassword,
      'input-search': InputSearch,
      'city-picker': CityPicker,
      'area-picker': AreaPicker,
      'range-input': RangeInput,
      cascader: Cascader,
      rate: Rate,
      slider: Slider,
      'color-picker': ColorPicker,
      mentions: Mentions
    };
    const cityPicker: Ref<HTMLElement | null> = ref(null);

    expose({
      cityPicker
    });
    const {
      label,
      align,
      beforeText,
      afterText,
      name,
      type,
      cityPickerData,
      cityValidateInfo,
      textBold,
      textValue,
      disabled,
      hideRequiredMark,
      addRequiredMark,
      event,
      labelAlign,
      labelWidth,
      autoLabelHeight,
      validateInfo,
      attributes,
      valueKey,
      labelKey,
      style,
      unitStyle,
      props: _props,
      afterSlot,
      beforeSlot,
      formSlot,
      schemaItem
    } = toRefs(props);

    return () => {
      /** 当前渲染周期实时读取 formData，避免父层替换对象后仍写回旧引用。 */
      const injectFormData = props.formData || unref(injectData) || {};
      const Component = widgetMap[type.value];
      const _event = {
        ...event.value,
        onChange: (value: string) => {
          return event.value?.onChange?.(value, formInstanceRef.value);
        }
      };
      /**
       * 当前字段 render 上下文。
       *
       * 说明：
       * 1. 仅在 formSlot 为 render 函数时使用；
       * 2. 保持 label/prop/rules 容器不变，只把控件区交给 TSX 返回内容。
       */
      const slotRenderContext: FormItemSlotRenderContext = {
        item: (schemaItem.value || props) as ColumnForFormItemType,
        formData: injectFormData,
        name: getName(name.value),
        label: label.value,
        disabled: !!disabled.value,
        rules: rulesRef.value,
        validate: () => formInstanceRef.value?.validateField?.(getFormItemProp(name.value)),
        clearValidate: () => formInstanceRef.value?.clearValidate?.([getFormItemProp(name.value)])
      };
      return (
        <div
          class={{
            [formItemStyle['x-form-item']]: true,
            [formItemStyle['center']]: align.value === 'center',
            [formItemStyle['around']]: align.value === 'around'
          }}
          style={style.value}
          id={`form_item_wrap_${name.value}`}
        >
          <div class={{ [formItemStyle['line']]: !formSlot.value }}>
            {beforeText.value && (
              <span class={formItemStyle['text-unit-left']} style={unitStyle.value}>
                {beforeText.value}
              </span>
            )}
            <div class={formItemStyle.main}>
              <FormItem
                class={[
                  {
                    hideRequiredMark: hideRequiredMark.value,
                    addRequiredMark: addRequiredMark.value,
                    autoLabelHeight: autoLabelHeight.value,
                    formSlotStyle: formSlot.value
                  }
                ]}
                // Element Plus 使用 prop 作为校验字段标识
                prop={getFormItemProp(name.value)}
                label={label.value}
                labelWidth={labelWidth.value}
                labelPosition={labelAlign.value}
                rules={rulesRef.value}
                {...attrs}
                {...attributes.value}
                {...validateInfo.value}
                {...props.selfProps}
              >
                {(isFormItemAffixSlotRender(beforeSlot.value) && beforeSlot.value(slotRenderContext)) ||
                  (typeof beforeSlot.value === 'string' &&
                    renderNamedSlot(slots as Record<string, any>, beforeSlot.value, slotRenderContext))}
                {Component ? (
                  <Component
                    {..._props.value}
                    {...(type.value === 'time-range-picker' ? { isRange: true } : {})}
                    {...(type.value === 'range-picker' ? { type: 'daterange' } : {})}
                    event={_event}
                    disabled={disabled.value}
                    options={innerOptions.value}
                    label={label.value}
                    valueKey={valueKey.value}
                    labelKey={labelKey.value}
                    name={getName(name.value)}
                    formData={injectFormData}
                    cityPickerData={cityPickerData.value}
                    cityValidateInfo={cityValidateInfo.value}
                    validateInfo={validateInfo.value}
                    textBold={textBold.value}
                    textValue={textValue.value}
                    onClearValidate={(name) => emit('clearValidate', name)}
                    onValidateName={(name) => emit('validateName', name)}
                    _is_x_form_item={true}
                    slotProps={props.slotProps}
                  ></Component>
                ) : (
                  (isFormItemSlotRender(formSlot.value) && formSlot.value(slotRenderContext)) ||
                  (typeof formSlot.value === 'string' &&
                    renderNamedSlot(slots as Record<string, any>, formSlot.value, slotRenderContext)) ||
                  slots.default?.(slotRenderContext)
                )}

                {afterText.value && (
                  <span class={formItemStyle['text-unit-right']} style={unitStyle.value}>
                    {afterText.value}
                  </span>
                )}
                {(isFormItemAffixSlotRender(afterSlot.value) && afterSlot.value(slotRenderContext)) ||
                  (typeof afterSlot.value === 'string' &&
                    renderNamedSlot(slots as Record<string, any>, afterSlot.value, slotRenderContext))}
              </FormItem>
            </div>
          </div>
        </div>
      );
    };
  }
});
export default FormItemComponent;
