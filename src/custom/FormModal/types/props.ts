import type { ExtractPropTypes, PropType } from 'vue';

export const formModalProps = () => ({
  modalTitle: {
    type: String as PropType<string>,
    default: '标题'
  },
  show: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  formModel: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  formData: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({})
  },
  // label 样式
  labelWidth: {
    type: [String, Number] as PropType<string | number>
    // default: () => '100px'
  },
  labelAlign: {
    type: String as PropType<'left' | 'right'>,
    default: 'right'
  },
  modalWidth: {
    type: [String, Number] as PropType<string | number>,
    default: '600px'
  },
  cancelText: {
    type: String as PropType<string>,
    default: '取消'
  },
  confirmText: {
    type: String as PropType<string>,
    default: '确认'
  },
  gutter: {
    type: Number as PropType<number>,
    default: () => 12
  },
  okBtnLoading: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  showCancelBtn: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  showConfirmBtn: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  layout: {
    type: String as PropType<'horizontal' | 'vertical' | 'inline'>,
    default: 'vertical'
  },
  showFooter: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  autoClose: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  fieldsetStyle: {
    type: [Object, String] as PropType<Record<string, any> | string>,
    default: () => ({})
  },
  autocomplete: {
    type: String as PropType<string>,
    default: 'on'
  },
  loading: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  }
});

export type FormModalProps = ExtractPropTypes<ReturnType<typeof formModalProps>>;
