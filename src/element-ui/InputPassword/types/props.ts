import type { ExtractPropTypes } from 'vue';
import { ElInput } from 'element-plus';
import type { BasicFormProps } from './basicFormProps';

type ElementInputProps = Partial<ExtractPropTypes<typeof ElInput.props>>;

export interface XInputPasswordProps extends Omit<ElementInputProps, 'name'>, BasicFormProps {}
