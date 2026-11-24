import type { ExtractPropTypes } from 'vue';
import { inputTagProps } from 'element-plus';
import type { BasicFormProps } from './basicFormProps';

type Runtime = Partial<ExtractPropTypes<typeof inputTagProps>>;

export interface XInputTagProps extends Omit<Runtime, 'name'>, BasicFormProps {}
