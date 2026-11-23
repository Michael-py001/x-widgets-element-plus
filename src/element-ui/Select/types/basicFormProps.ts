import type { ExtractPropTypes } from 'vue';
export const basicFormProps = () => {
  return {
    label: {
      type: String,
      default: ''
    },
    props: {
      type: Object,
      default: () => ({})
    },
    name: {
      type: String,
      default: ''
    },
    formData: {
      type: Object,
      default: () => ({})
    },
    event: {
      type: Object,
      default: () => ({})
    },
    slotProps: {
      type: Object,
      default: () => ({})
    }
  };
};
export type BasicFormProps = Partial<ExtractPropTypes<ReturnType<typeof basicFormProps>>>;
