import type { PropType, ExtractPropTypes } from 'vue';
import type { FormRules } from 'element-plus';
import type { ColumnForFormItemType } from '../../FormItem/types/props';
import type { Ref, UnwrapRef } from 'vue';

export const searchFormProps = () => {
  return {
    // 表单字段配置（直接使用column数组，不分区块）
    column: {
      type: Array as PropType<Array<ColumnForFormItemType>>,
      default: () => []
    },
    // 表单数据
    formData: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({}),
      required: true
    },
    // label 样式
    labelWidth: {
      type: [String, Number] as PropType<string | number>
      // default: () => '80px'
    },
    // 标签文本对齐方式
    labelAlign: {
      type: String as PropType<'left' | 'right' | 'top'>,
      default: 'right'
    },
    // 表单布局
    layout: {
      type: String as PropType<'horizontal' | 'vertical' | 'inline'>,
      default: 'inline'
    },
    // 字段 colspan
    colspan: {
      type: Number as PropType<number>,
      default: 24
    },
    // 表单间隔
    gutter: {
      type: [Number, Array] as PropType<number>,
      default: 12
    },
    // 是否禁用
    disabled: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined as unknown as boolean | undefined
    },
    // 字段垂直间隔
    verticalGap: {
      type: [String, Number] as PropType<string | number>,
      default: '0'
    },
    // 表单自动填充
    autocomplete: {
      type: String as PropType<'on' | 'off' | string>,
      default: 'on'
    },
    // 加载中
    loading: {
      type: Boolean,
      default: false
    },
    // 重置按钮文字，传空则不显示按钮
    resetText: {
      type: String,
      default: '重置'
    },
    // 搜索按钮文字，传空则不显示按钮
    searchText: {
      type: String,
      default: '查询'
    },
    // 是否显示按钮
    showButtons: {
      type: Boolean,
      default: true
    },
    // 是否开启展开收起功能
    enabledExpand: {
      type: Boolean,
      default: true
    },
    // 固定搜索按钮右侧
    fixedSearchButton: {
      type: Boolean,
      default: false
    },
    // 按钮布局
    buttonsSlotLayout: {
      type: String as PropType<'space-between' | 'flex-start' | 'flex-end' | 'center'>,
      default: 'space-between'
    }
  };
};

export type SearchFormProps = Partial<ExtractPropTypes<ReturnType<typeof searchFormProps>>>;

// 使用element-plus的FormRules类型
export type RulesType = FormRules;

// 表单数据类型
export type FormDataType = Record<string, any>;
