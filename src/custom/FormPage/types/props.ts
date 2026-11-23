import type { CSSProperties, VNode } from 'vue';
import type { ExtractPropTypes, PropType } from 'vue';
import type { ColumnForFormItemType } from '../../FormItem/types/props';

// 表单模型中单个组块的类型定义
export interface FormModelBlock {
  // 标题
  title?: string | VNode;
  // 是否展示该块
  display?: boolean;
  // 自定义样式与类名
  style?: CSSProperties | string;
  class?: string | Record<string, any>;
  // 字段集合
  column: Array<ColumnForFormItemType>;
  // 分块级别的 fieldset 样式
  fieldsetStyle?: CSSProperties | string;
  // 是否禁用
  disabled?: boolean;
}

// FormPage 组件 props 定义（与 SFC 版本保持一致）
export const formPageProps = () => ({
  // 表单字段模型
  formModel: {
    type: Array as PropType<Array<FormModelBlock>>,
    default: () => []
  },
  // 表单数据
  formData: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({})
  },
  // label 样式
  labelWidth: {
    type: [String, Number] as PropType<string | number>
    // default: () => '100px'
  },
  // 标签文本对齐方式
  labelAlign: {
    type: String as PropType<'left' | 'right' | 'top'>,
    default: 'right'
  },
  // 是否显示 loading（容器层）
  loading: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  // 作为子组件
  asChild: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  // 字段垂直间隔
  verticalGap: {
    type: [String, Number] as PropType<string | number>,
    default: '0'
  },
  // 表单容器多余高度
  extraHeight: {
    type: [String, Number] as PropType<string | number>,
    default: 0
  },
  // 表单布局
  layout: {
    type: String as PropType<'horizontal' | 'vertical' | 'inline'>,
    default: 'horizontal'
  },
  // 字段 colspan layout 为 inline 时不生效
  colspan: {
    type: Number as PropType<number>,
    default: 24
  },
  // 表单间隔
  gutter: {
    type: Number as PropType<number>,
    default: 12
  },
  // 是否禁用
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined as unknown as boolean | undefined
  },
  // 根 fieldset 的样式
  fieldsetStyle: {
    type: [Object, String] as PropType<CSSProperties | string>,
    default: () => ({})
  },
  // 表单自动填充
  autocomplete: {
    type: String as PropType<'on' | 'off' | string>,
    default: 'on'
  }
});

export type FormPageProps = ExtractPropTypes<ReturnType<typeof formPageProps>>;
