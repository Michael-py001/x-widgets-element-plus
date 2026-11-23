import type { ExtractPropTypes } from 'vue';
import { ElRate } from 'element-plus';
import type { BasicFormProps } from './basicFormProps';

type ElementRateProps = Partial<ExtractPropTypes<typeof ElRate.props>>;

export interface XRateProps extends Omit<ElementRateProps, 'name'>, BasicFormProps {}
