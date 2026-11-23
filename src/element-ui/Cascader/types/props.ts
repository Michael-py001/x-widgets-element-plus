import type { ExtractPropTypes } from 'vue';
import { ElCascader } from 'element-plus';
import type { BasicFormProps } from './basicFormProps';

type ElementCascaderProps = Partial<ExtractPropTypes<typeof ElCascader.props>>;

interface CascaderProps extends Omit<ElementCascaderProps, 'name' | 'props'> {}

export interface XCascaderProps extends CascaderProps, BasicFormProps {}
