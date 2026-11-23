import type { ExtractPropTypes } from 'vue';
import { ElTimePicker } from 'element-plus';
import type { BasicFormProps } from './basicFormProps';

type ElementTimePickerProps = Partial<ExtractPropTypes<typeof ElTimePicker.props>>;

export interface XTimePickerProps extends Omit<ElementTimePickerProps, 'name'>, BasicFormProps {}
