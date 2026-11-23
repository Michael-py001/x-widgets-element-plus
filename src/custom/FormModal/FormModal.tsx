import { defineComponent, computed, ref, watch, useSlots } from 'vue';
import { cloneDeep } from 'lodash-es';
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup';
import FormPage from '../FormPage/FormPage';
import { formModalProps, FormModalProps } from './types/props';
import { editForm } from '../../utils';
import './style/FormModal.less';

const FORM_MODAL_SHELL_SLOT_NAMES = ['title', 'modalFooter'] as const;

/**
 * 弹窗表单组件
 * @author WuShiLi
 */
export default defineComponent({
  name: 'XFormModal',
  props: formModalProps(),
  emits: ['update:formData', 'confirm', 'cancel', 'update:show'],
  setup(props: FormModalProps, { emit, slots, attrs, expose }) {
    const slot = useSlots();
    const FormPageRef = ref();
    /** 当前弹窗打开时的表单快照，仅用于取消时恢复本次打开前的数据。 */
    const openedFormDataSnapshot = ref<Record<string, any>>({});

    watch(
      () => props.show,
      (visible) => {
        if (visible) {
          // 每次打开弹窗都重建快照，避免不同记录之间仍引用首次挂载时的默认值。
          openedFormDataSnapshot.value = cloneDeep((props.formData as Record<string, any>) || {});
        }
      },
      {
        immediate: true
      }
    );

    // 内部表单数据，支持v-model:formData
    const innerFormData = computed({
      get: () => props.formData || {},
      set: (val) => emit('update:formData', val)
    });
    /** 自定义弹窗底部存在时，视为完全接管默认 footer。 */
    const hasCustomModalFooter = computed(() => !!slots.modalFooter);
    /** 仅下传真正属于表单内容区域的插槽，避免弹窗壳层插槽泄漏到 FormPage。 */
    const formPageSlots = computed(() =>
      Object.keys(slot).reduce(
        (acc, name) => {
          if (FORM_MODAL_SHELL_SLOT_NAMES.includes(name as (typeof FORM_MODAL_SHELL_SLOT_NAMES)[number])) {
            return acc;
          }
          acc[name] = (scopeData: any) => slots[name]?.(scopeData);
          return acc;
        },
        {} as Record<string, any>
      )
    );
    // 确认回调
    function clickConfirm() {
      FormPageRef.value
        ?.validate()
        .then(() => {
          emit('confirm', innerFormData.value);
        })
        .catch((error) => {
          console.warn('validate error:', error);
          // 滚动到第一个错误表单项
          const nameList = Object.keys(error);
          FormPageRef?.value.scrollToField(nameList[0]);
          throw error;
        });
    }
    // 取消回调
    function clickCancel() {
      if (props.autoClose) {
        FormPageRef.value?.resetFields();
        if (props.formData) {
          // 取消时恢复当前打开周期的快照，而不是恢复组件首次挂载时的旧对象状态。
          editForm(props.formData as Record<string, any>, openedFormDataSnapshot.value);
        }
        emit('update:show', false);
        emit('cancel', false);
      } else {
        emit('cancel', false);
      }
    }
    // 暴露方法
    expose({
      resetFields: (nameList?: any) => FormPageRef.value?.resetFields(nameList),
      validateFields: (nameList?: any) => FormPageRef.value?.validateFields(nameList),
      validate: (nameList?: any) => FormPageRef.value?.validate(nameList),
      FormPageRef,
      clickConfirm,
      clickCancel,
      scrollToField: async (name: string) => {
        return FormPageRef?.value.scrollToField(name);
      },
      scrollToFields: async (name: string, options?: any) => {
        return FormPageRef?.value.scrollToFields(name, options);
      }
    });
    return () => (
      <div class="x-form-modal">
        <ConfirmPopup
          width={props.modalWidth}
          title={props.modalTitle}
          show={props.show}
          cancelText={props.cancelText}
          confirmText={props.confirmText}
          okBtnLoading={props.okBtnLoading}
          showCancelBtn={!hasCustomModalFooter.value && props.showCancelBtn}
          showConfirmBtn={!hasCustomModalFooter.value && props.showConfirmBtn}
          footer={props.showFooter}
          disabled={props.disabled || props.loading}
          v-slots={{
            title: slots.title,
            footer: slots.modalFooter
          }}
          {...attrs}
          onConfirm={clickConfirm}
          onCancel={clickCancel}
        >
          <FormPage
            ref={FormPageRef}
            formData={props.formData || innerFormData.value}
            formModel={props.formModel}
            labelWidth={props.labelWidth}
            labelAlign={props.labelAlign}
            fieldsetStyle={props.fieldsetStyle}
            autocomplete={props.autocomplete}
            layout={props.layout}
            asChild
            loading={props.loading}
            disabled={props.disabled}
            {...attrs}
            gutter={props.gutter}
            v-slots={formPageSlots.value}
          />
        </ConfirmPopup>
      </div>
    );
  }
});
