import type { ExtractPropTypes } from 'vue';
import { timeSelectProps } from 'element-plus';
import type { BasicFormProps } from './basicFormProps';

type Runtime = Partial<ExtractPropTypes<typeof timeSelectProps>>;

export interface XTimeSelectProps extends Omit<Runtime, 'name'>, BasicFormProps {}
