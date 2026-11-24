import type { ExtractPropTypes } from 'vue';
import type { SegmentedProps as ElementSegmentedProps } from 'element-plus';
import { segmentedProps } from 'element-plus';
import type { BasicFormProps } from './basicFormProps';

type Runtime = Partial<ExtractPropTypes<typeof segmentedProps>>;

/**
 * ElSegmented 的 `props`（字段别名）与 `options`（候选项）都是原生语义，
 * 保留两者，不引入同名的桥接字段。
 */
interface Native extends Omit<Runtime, 'name'> {}

export interface XSegmentedProps extends Native, Omit<BasicFormProps, 'props' | 'options'> {}
