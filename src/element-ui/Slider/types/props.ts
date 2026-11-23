import type { ExtractPropTypes } from 'vue';
import { ElSlider } from 'element-plus';
import type { BasicFormProps } from './basicFormProps';

type ElementSliderProps = Partial<ExtractPropTypes<typeof ElSlider.props>>;

export interface XSliderProps extends Omit<ElementSliderProps, 'name'>, BasicFormProps {}
