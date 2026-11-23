import type { InputProps } from 'element-plus';
import type { BasicFormProps } from './basicFormProps';

export interface XInputProps extends InputProps, BasicFormProps {
  name?: InputProps['name'] | string;
}
