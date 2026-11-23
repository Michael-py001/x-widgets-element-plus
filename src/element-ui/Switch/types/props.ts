import type { ExtractPropTypes } from 'vue';
import { ElSwitch } from 'element-plus';
import type { BasicFormProps } from './basicFormProps';

type ElementSwitchProps = Partial<ExtractPropTypes<typeof ElSwitch.props>>;

export interface XSwitchProps extends Omit<ElementSwitchProps, 'name'>, BasicFormProps {}
