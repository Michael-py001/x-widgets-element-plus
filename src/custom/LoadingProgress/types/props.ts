import type { ExtractPropTypes, PropType } from 'vue';

export const loadingProgressProps = () => ({
  title: {
    type: String as PropType<string>,
    default: '正在处理中...'
  },
  progressText: {
    type: String as PropType<string>,
    default: '正在处理中，请稍后...'
  },
  progress: {
    type: Number as PropType<number>,
    default: 0,
    validator: (value: number) => value >= 0 && value <= 100
  },
  visible: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  maskClosable: {
    type: Boolean as PropType<boolean>,
    default: false
  }
});

export type LoadingProgressProps = ExtractPropTypes<ReturnType<typeof loadingProgressProps>>;
