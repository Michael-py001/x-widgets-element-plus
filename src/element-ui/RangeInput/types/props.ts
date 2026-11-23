import type { ExtractPropTypes, PropType } from 'vue';
import { ElInput } from 'element-plus';
import type { BasicFormProps } from './basicFormProps';

type ElementInputProps = Partial<ExtractPropTypes<typeof ElInput.props>>;

export type RangeInputValue = Array<string | number> | null;

export interface XRangeInputProps extends Omit<ElementInputProps, 'modelValue' | 'name'>, BasicFormProps {
  modelValue?: RangeInputValue;
  separator?: string;
}
