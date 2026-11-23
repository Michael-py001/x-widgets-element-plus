import { defineComponent, PropType } from 'vue';
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup';
import './styles/CustomConfirmModal.less';

const iconMap = {
  danger: 'i-solar:danger-circle-bold',
  primary: 'i-solar:info-circle-bold'
};
const colorMap = {
  danger: 'var(--el-color-danger)',
  primary: 'var(--el-color-primary)'
};

export default defineComponent({
  name: 'CustomConfirmModal',
  props: {
    show: Boolean,
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String as PropType<'primary' | 'danger'>,
      default: 'primary'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    showCancelBtn: {
      type: Boolean,
      default: true
    },
    showConfirmBtn: {
      type: Boolean,
      default: true
    },
    okBtnLoading: Boolean,
    disabled: Boolean
  },
  emits: ['confirm', 'cancel', 'update:show'],
  setup(props, { emit, slots }) {
    const handleConfirm = () => emit('confirm');
    const handleCancel = () => {
      emit('update:show', false);
      emit('cancel');
    };
    return () => (
      <ConfirmPopup
        class="x-custom-confirm-modal"
        show={props.show}
        type={props.type}
        closable={true}
        width="400px"
        showCancelBtn={props.showCancelBtn}
        showConfirmBtn={props.showConfirmBtn}
        confirmText={props.confirmText}
        cancelText={props.cancelText}
        okBtnLoading={props.okBtnLoading}
        disabled={props.disabled}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onUpdate:show={(v) => emit('update:show', v)}
      >
        {{
          header: () => (
            <header class="flex items-center pt-[9px]">
              <span class={iconMap[props.type]} style={{ color: colorMap[props.type], fontSize: '22px' }}></span>
              <span class="ml-4 text-4 text-[#20262d] font-semibold">{props.title}</span>
            </header>
          ),
          default: () => slots.default?.()
        }}
      </ConfirmPopup>
    );
  }
});
