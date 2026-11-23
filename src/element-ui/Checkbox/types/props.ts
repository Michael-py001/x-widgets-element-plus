import type { ExtractPropTypes } from 'vue';
import { ElCheckbox } from 'element-plus';
import type { BasicFormProps } from './basicFormProps';

type ElementCheckboxProps = Partial<ExtractPropTypes<typeof ElCheckbox.props>>;

export interface XCheckboxProps extends Omit<ElementCheckboxProps, 'name'>, BasicFormProps {}
