import type { ExtractPropTypes } from 'vue';
import { ElTreeSelect } from 'element-plus';
import type { BasicFormProps } from './basicFormProps';

type ElementTreeSelectProps = Partial<ExtractPropTypes<typeof ElTreeSelect.props>>;

export interface XTreeSelectProps extends Omit<ElementTreeSelectProps, 'name'>, BasicFormProps {}
