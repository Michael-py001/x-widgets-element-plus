import type { SelectV2Props as ElementSelectProps } from 'element-plus';
import type { BasicFormProps } from './basicFormProps';
interface SelectProps extends Omit<ElementSelectProps, 'name' | 'props'> {}
export interface XSelectProps extends SelectProps, BasicFormProps {
  name?: ElementSelectProps['name'] | string;
  /** 是否在下拉项与已选值上显示完整 label 的悬浮提示。默认关闭。 */
  showLabelTooltip?: boolean;
}
