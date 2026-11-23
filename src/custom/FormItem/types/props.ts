import type { ExtractPropTypes, PropType, Ref, Reactive, ComputedRef, VNodeChild } from 'vue';
import type { InputProps, SelectProps, CheckboxProps, RadioProps, FormRules } from 'element-plus';
import type { TextValueFormatter } from '../../../element-ui/Text/types/props';
export type formItemTypes =
  | 'text'
  | 'x-input'
  | 'x-select'
  | 'select'
  | 'tree-select'
  | 'textarea'
  | 'input-number'
  | 'input'
  | 'time-picker'
  | 'date-picker'
  | 'range-picker'
  | 'time-range-picker'
  | 'checkbox'
  | 'checkbox-group'
  | 'radio-group'
  | 'switch'
  | 'autocomplete'
  | 'auto-complete';

/**
 * 表单字段名路径。
 */
export type FormItemFieldName = string | string[];

/**
 * 字段展示条件。
 */
export type FormItemDisplay = boolean | (() => boolean) | Ref<boolean> | ComputedRef<boolean>;

/**
 * 表单块级自定义渲染上下文。
 */
export interface FormSlotRenderContext {
  /** 当前字段 schema。 */
  item: ColumnForFormItemType;
  /** 当前表单数据。 */
  formData: Record<string, any>;
}

/**
 * 表单项级自定义渲染上下文。
 */
export interface FormItemSlotRenderContext extends FormSlotRenderContext {
  /** 当前字段名。 */
  name: FormItemFieldName;
  /** 当前字段标签。 */
  label: string;
  /** 当前字段是否禁用。 */
  disabled: boolean;
  /** 当前字段校验规则。 */
  rules: FormRules[string];
  /** 触发当前字段校验。 */
  validate: () => Promise<any>;
  /** 清理当前字段校验态。 */
  clearValidate: () => void;
}

/**
 * FormPage 中整块替换区域的 render 函数。
 */
export type FormBlockSlotRender = (ctx: FormSlotRenderContext) => VNodeChild;

/**
 * FormItem 中控件区替换的 render 函数。
 */
export type FormItemSlotRender = (ctx: FormItemSlotRenderContext) => VNodeChild;

/**
 * FormItem 中控件前后附加区域的 render 函数。
 */
export type FormItemAffixSlotRender = (ctx: FormItemSlotRenderContext) => VNodeChild;

/**
 * FormItem 运行时基础 props。
 *
 * 说明：
 * 1. 这里只放不依赖 schema 类型本身的字段；
 * 2. 这样可以避免 `ColumnForFormItemType -> ExtractPropTypes -> ColumnForFormItemType` 的递归链。
 */
export const formItemCoreProps = () => {
  return {
    name: {
      type: [String, Array] as PropType<FormItemFieldName>,
      default: ''
    },
    rules: {
      type: [Object, Array] as PropType<FormRules[string]>,
      default: null
    },
    label: {
      type: String as PropType<string>,
      default: ''
    },
    // label 样式
    labelWidth: {
      type: [String, Number] as PropType<string | number>
      // default: () => '100px'
    },
    labelAlign: {
      type: String as PropType<'left' | 'top' | 'right'>,
      default: 'right'
    },
    formData: {
      type: Object as PropType<Ref<Record<string, any>> | Reactive<Record<string, any>> | null>,
      default: null
    },
    attributes: {
      type: Object as PropType<Record<string, any>>,
      default: null
    },
    props: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    },
    validateInfo: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    },
    cityValidateInfo: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    },
    style: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    },
    el: {
      type: String as PropType<formItemTypes>,
      default: ''
    },
    type: {
      type: String as PropType<formItemTypes>,
      default: ''
    },
    cityPickerData: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    },
    beforeText: {
      type: String as PropType<string>,
      default: ''
    },
    afterText: {
      type: String as PropType<string>,
      default: ''
    },
    options: {
      // 支持函数(带参数传入>返回
      //
      // 数据源位置：经 FormPage / FormModal / SearchForm 渲染时，推荐写在 column 顶层 `options`；
      // `column.props.options` 也受支持，由 FormPage 的 resolveColumnOptions 归一到本 prop
      // （顶层优先，显式空数组算作已提供）。直连 FormItem 时请直接用本 prop，不要塞进 `props`：
      // 渲染控件时本 prop 排在 `props` 展开之后，会覆盖 `props.options`。
      type: [Array, Object] as PropType<
        | Array<Record<string, any>>
        | ReadonlyArray<Record<string, any>>
        | Ref<Array<Record<string, any>> | ReadonlyArray<Record<string, any>>>
        | Reactive<Array<Record<string, any>> | ReadonlyArray<Record<string, any>>>
        | ComputedRef<Array<Record<string, any>> | ReadonlyArray<Record<string, any>>>
        | ((props: Record<string, any>) => Array<Record<string, any>> | ReadonlyArray<Record<string, any>>)
      >,
      default: () => []
    },
    valueKey: {
      type: String as PropType<string>,
      default: 'value'
    },
    labelKey: {
      type: String as PropType<string>,
      default: 'label'
    },
    align: {
      type: String as PropType<'left' | 'center' | 'around'>,
      default: 'left'
    },
    event: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    },
    textBold: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    autoLabelHeight: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    disabled: {
      type: [Boolean, Object] as PropType<boolean | object>,
      default: false
    },
    hideRequiredMark: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    addRequiredMark: {
      type: [Boolean, Object] as PropType<boolean | object>,
      default: false
    },
    textValue: {
      // 支持函数`(value, formData)`：取字段原始值后由业务格式化，用于空值占位等纯展示场景。
      type: [String, Number, Boolean, Function] as PropType<string | number | boolean | TextValueFormatter>,
      default: ''
    },
    unitStyle: {
      type: [String, Object] as PropType<string | Record<string, any>>,
      default: () => ({})
    },

    // 支持FormItem本身的全部属性
    selfProps: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    },

    // 支持FormItem插槽内表单组件的全部属性
    slotProps: {
      type: Object as PropType<InputProps & SelectProps & CheckboxProps & RadioProps & any>,
      default: (): any => ({})
    },
    afterSlot: {
      type: [String, Function] as PropType<string | FormItemAffixSlotRender>,
      default: ''
    },
    beforeSlot: {
      type: [String, Function] as PropType<string | FormItemAffixSlotRender>,
      default: ''
    }
  };
};

/**
 * FormItem 完整运行时 props。
 *
 * 在基础 props 之上补齐只在当前组件内部桥接使用的字段。
 */
export const formItemProps = () => {
  return {
    ...formItemCoreProps(),
    formSlot: {
      type: [String, Function] as PropType<string | FormItemSlotRender>,
      default: ''
    },
    /**
     * 当前 schema 项：供 formSlot render 函数读取完整字段配置。
     *
     * 这是 FormPage -> FormItem 的内部桥接字段，不面向业务页面直接传值。
     */
    schemaItem: {
      type: Object as PropType<ColumnForFormItemType | null>,
      default: null
    }
  };
};

export type FormItemCoreProps = ExtractPropTypes<ReturnType<typeof formItemCoreProps>>;
export type FormItemProps = ExtractPropTypes<ReturnType<typeof formItemProps>>;
export type CustomFormItemProps = Partial<FormItemProps>;

export interface ColumnForFormItemType extends Partial<FormItemCoreProps> {
  // city-picker的数据
  columnGroup?: Array<Record<string, any>>;
  //插槽名称或 TSX render 函数
  slot?: string | FormBlockSlotRender;
  // layout 为 inline 时不生效
  colspan?: number;
  display?: FormItemDisplay;
  // 自动生成必填规则
  required?: boolean;
  // 控件区插槽名称或 TSX render 函数
  formSlot?: string | FormItemSlotRender;
  // 控件前置附加插槽名称或 TSX render 函数
  beforeSlot?: string | FormItemAffixSlotRender;
  // 控件后置附加插槽名称或 TSX render 函数
  afterSlot?: string | FormItemAffixSlotRender;
}
