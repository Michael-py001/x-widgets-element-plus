/**
 * @description Form 表单组件
 * @author WuShiLi
 */

import { defineComponent, computed, ref } from 'vue';
import type { Ref } from 'vue';
import { ElForm as Form } from 'element-plus';
import type { FormRules, FormValidateCallback, FormItemProp } from 'element-plus';
import { useProvideForm } from './context';
import type { FormProps } from './types/props';
import { formProps } from './types/props';

const ElementForm = Form as any;

type Arrayable<T> = T | T[];

// export interface FormProps {
//   model?: Record<string, any>;
//   rules?: Record<string, FormRules[]>;
// }

interface formRefType {
  validateField: (props?: Arrayable<FormItemProp>, callback?: FormValidateCallback) => Promise<void> | void;
  validate: (callback?: FormValidateCallback) => Promise<void>;
  resetFields: (props?: Arrayable<FormItemProp> | undefined) => void;
  clearValidate: (props?: Arrayable<FormItemProp> | undefined) => void;
  scrollToField: (name: string) => void;
}

export default defineComponent({
  name: 'CustomForm',
  props: {
    ...Form.formProps,
    ...formProps()
    // model: {
    //   type: Object,
    //   default: () => ({})
    // },
    // rules: {
    //   type: Object,
    //   default: () => ({})
    // }
  },
  useForm: Form.useForm,
  setup(props: FormProps, { slots, expose, attrs }) {
    useProvideForm({
      model: computed(() => props.model),
      rules: computed(() => props.rules),
      formInstance: computed(() => formRef.value)
    });

    const formRef: Ref<formRefType> = ref({} as formRefType);

    expose({
      validateField: (props?: Arrayable<FormItemProp>, callback?: FormValidateCallback) => {
        return (formRef?.value as any)?.validateField(props as any, callback as any);
      },
      validate: (callback?: FormValidateCallback) => {
        return formRef?.value!.validate(callback);
      },
      resetFields: (props?: Arrayable<FormItemProp> | undefined) => {
        return formRef?.value.resetFields(props);
      },
      clearValidate: (props?: Arrayable<FormItemProp> | undefined) => {
        return formRef?.value.clearValidate(props);
      },
      scrollToField: (name) => {
        return formRef?.value.scrollToField(name);
      }
    });
    return () => {
      return (
        <ElementForm
          {...attrs}
          model={props.model}
          rules={props.rules}
          ref={(instance: unknown) => (formRef.value = instance as any)}
          onSubmit={(e: Event) => e.preventDefault()}
        >
          {slots.default?.()}
        </ElementForm>
      );
    };
  }
});
