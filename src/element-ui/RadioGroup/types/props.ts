import type { ExtractPropTypes } from 'vue';
import { ElRadioGroup } from 'element-plus';
import type { BasicFormProps } from './basicFormProps';

type ElementRadioGroupProps = Partial<ExtractPropTypes<typeof ElRadioGroup.props>>;

export interface XRadioGroupProps extends Omit<ElementRadioGroupProps, 'name'>, BasicFormProps {}
