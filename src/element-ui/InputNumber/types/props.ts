import type { ExtractPropTypes } from 'vue';
import { ElInputNumber } from 'element-plus';
import type { BasicFormProps } from './basicFormProps';

type ElementInputNumberProps = Partial<ExtractPropTypes<typeof ElInputNumber.props>>;

export interface XInputNumberProps extends Omit<ElementInputNumberProps, 'name'>, BasicFormProps {}
