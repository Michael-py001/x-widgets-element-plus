import { PropType, ExtractPropTypes } from 'vue';

export const tagProps = () => {
  return {
    // 标签文本内容
    text: {
      type: String as PropType<string>,
      default: ''
    },
    // 标签状态值，用于判断样式
    status: {
      type: String as PropType<string>,
      default: ''
    },
    // 标签类型，预定义的样式类型
    type: {
      type: String as PropType<'success' | 'warning' | 'danger' | 'info' | 'primary' | 'default'>,
      default: 'default'
    },
    // 标签尺寸
    size: {
      type: String as PropType<'large' | 'default' | 'small'>,
      default: 'default'
    },
    // 是否可关闭
    closable: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    // 是否禁用
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    // 标签颜色（优先级高于type）
    color: {
      type: String as PropType<string>,
      default: ''
    },
    // 背景颜色
    backgroundColor: {
      type: String as PropType<string>,
      default: ''
    },
    // 边框颜色
    borderColor: {
      type: String as PropType<string>,
      default: ''
    },
    // 是否为圆角标签
    round: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    // 自定义样式类名
    className: {
      type: String as PropType<string>,
      default: ''
    },
    // 状态映射配置，用于根据status值动态设置样式
    statusMap: {
      type: Object as PropType<Record<string, { color?: string; backgroundColor?: string; borderColor?: string }>>,
      default: () => ({
        SUCCESS: {
          color: 'var(--el-color-success)',
          backgroundColor: '#D6F4D4'
        },
        NO: {
          color: '#20262D',
          backgroundColor: '#DCE0EA'
        },
        FAIL: {
          color: 'var(--el-color-danger)',
          backgroundColor: '#fbdfde'
        },
        // 通过（注意）
        PASS_NOTICE: {
          color: '#E69D00',
          backgroundColor: '#FAF7D1'
        },
        // 通过（预警）
        PASS_WARNING: {
          color: '#F57416',
          backgroundColor: '#FFE7D5'
        },
        // 异常
        ERROR: {
          color: '#F57416',
          backgroundColor: '#FFE7D5'
        },
        // 主题色
        PRIMARY: {
          color: 'var(--el-color-primary)',
          backgroundColor: '#e8eff8'
        }
      })
    }
  };
};

export type TagProps = Partial<ExtractPropTypes<ReturnType<typeof tagProps>>>;

// 标签状态类型
export type TagStatusType = 'SUCCESS' | 'NO' | string;

// 标签样式配置类型
export type TagStyleConfig = {
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
};
