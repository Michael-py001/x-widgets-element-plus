import type { ExtractPropTypes, PropType } from 'vue';
import type { FormRules } from 'element-plus';
export const formProps = () => {
  return {
    model: {
      type: Object as PropType<Record<string, any>>,
      default: (): Record<string, any> => ({})
    },
    rules: {
      type: Object as PropType<FormRules>,
      default: (): FormRules => ({})
    }
  };
};

export type FormProps = ExtractPropTypes<ReturnType<typeof formProps>>;
