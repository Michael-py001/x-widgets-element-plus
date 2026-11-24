import type { ExtractPropTypes } from 'vue';
import { ElInputOtp } from 'element-plus';
import type { BasicFormProps } from './basicFormProps';

type Runtime = Partial<ExtractPropTypes<typeof ElInputOtp.props>>;

export interface XInputOtpProps extends Omit<Runtime, 'name'>, BasicFormProps {}
