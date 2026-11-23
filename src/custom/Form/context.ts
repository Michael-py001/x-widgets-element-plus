import type { InjectionKey, ComputedRef } from 'vue';
import { provide, inject, computed } from 'vue';
export interface FormContextProps {
  model?: ComputedRef<any>;
  rules?: ComputedRef<{ [k: string]: any } | undefined>;
  formInstance?: ComputedRef<any>;
}
export const FormContextKey: InjectionKey<FormContextProps> = Symbol('formContextKey');

export const useProvideForm = (state: FormContextProps) => {
  provide(FormContextKey, state);
};

export const useInjectForm = () => {
  return inject(FormContextKey, {
    model: computed(() => undefined),
    rules: computed(() => undefined),
    formInstance: computed(() => undefined)
  });
};
