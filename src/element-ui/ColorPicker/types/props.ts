import type { ExtractPropTypes } from 'vue';
import { ElColorPicker } from 'element-plus';
import type { BasicFormProps } from './basicFormProps';

type ElementColorPickerProps = Partial<ExtractPropTypes<typeof ElColorPicker.props>>;

export interface XColorPickerProps extends Omit<ElementColorPickerProps, 'name'>, BasicFormProps {}
