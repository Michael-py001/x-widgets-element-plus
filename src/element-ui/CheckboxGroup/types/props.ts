import type { ExtractPropTypes } from 'vue';
import { ElCheckboxGroup } from 'element-plus';
import type { BasicFormProps } from './basicFormProps';

type ElementCheckboxGroupProps = Partial<ExtractPropTypes<typeof ElCheckboxGroup.props>>;

export interface XCheckboxGroupProps extends Omit<ElementCheckboxGroupProps, 'name'>, BasicFormProps {}
