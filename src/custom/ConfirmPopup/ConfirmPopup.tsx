import { defineComponent } from 'vue';
import { ElDialog, ElButton } from 'element-plus';
import { confirmPopupProps, ConfirmPopupProps } from './types/props';
import './style/ConfirmPopup.less';

/**
 * 确认弹窗组件
 * @author WuShiLi
 */
export default defineComponent({
  name: 'XConfirmPopup',
  props: confirmPopupProps(),
  emits: ['update:formData', 'confirm', 'cancel', 'update:show'],
  setup(props: ConfirmPopupProps, { emit, slots, attrs }) {
    // 确认回调
    const clickConfirm = () => {
      emit('confirm');
    };
    // 取消回调
    const clickCancel = () => {
      emit('update:show', false);
      emit('cancel');
    };
    return () => (
      <ElDialog
        class="x-confirm-popup my-primary"
        modelValue={props.show}
        width={props.width}
        showClose={props.closable}
        align-center
        destroyOnClose
        closeOnClickModal={false}
        onClose={clickCancel}
        {...attrs}
      >
        {{
          header: ({ close, titleId, titleClass }) =>
            slots.header ? (
              slots.header({ close, titleId, titleClass })
            ) : (
              <span id={titleId} class={titleClass} style={{ paddingTop: 0 }}>
                {props.title}
              </span>
            ),
          default: () => slots.default && slots.default(),
          footer: () => {
            if (!props.footer) {
              return null;
            }
            return slots.footer ? (
              slots.footer({
                clickCancel
              })
            ) : (
              <>
                {props.showCancelBtn && props.cancelText && (
                  <ElButton plain disabled={props.okBtnLoading} onClick={clickCancel}>
                    {props.cancelText}
                  </ElButton>
                )}
                {props.showConfirmBtn && props.confirmText && (
                  <ElButton
                    type={props.type}
                    disabled={props.okBtnLoading || props.disabled}
                    loading={props.okBtnLoading}
                    onClick={clickConfirm}
                  >
                    {props.confirmText}
                  </ElButton>
                )}
              </>
            );
          }
        }}
      </ElDialog>
    );
  }
});
