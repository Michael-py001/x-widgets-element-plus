import type { ExtractPropTypes, PropType } from 'vue';

export const confirmPopupProps = () => ({
  title: {
    type: String as PropType<string>,
    default: '标题'
  },
  show: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  width: {
    type: [String, Number] as PropType<string | number>,
    default: '500px'
  },
  cancelText: {
    type: String as PropType<string>,
    default: '取消'
  },
  confirmText: {
    type: String as PropType<string>,
    default: '确认'
  },
  showCancelBtn: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  showConfirmBtn: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  okBtnLoading: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  closable: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  footer: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  type: {
    type: String as PropType<'primary' | 'success' | 'warning' | 'danger'>,
    default: 'primary'
  }
});

export type ConfirmPopupProps = ExtractPropTypes<ReturnType<typeof confirmPopupProps>>;
