import type { ExtractPropTypes } from 'vue';
import type { TransferProps as ElementTransferProps } from 'element-plus';
import { transferProps } from 'element-plus';
import type { BasicFormProps } from './basicFormProps';

type ElementTransferPropsRuntime = Partial<ExtractPropTypes<typeof transferProps>>;

/** ElTransfer 的 props 是原生字段别名配置，保留其原生语义。 */
interface TransferProps extends Omit<ElementTransferPropsRuntime, 'name' | 'props'> {}

export interface XTransferProps extends TransferProps, Omit<BasicFormProps, 'props'> {
  props?: ElementTransferProps['props'];
}
