import type { TableV2Props } from 'element-plus';
import type { BasicTableProps } from './basicTableProps';

export interface XTableProps extends Omit<TableV2Props, 'width' | 'height'>, BasicTableProps {
  width?: number;
  height?: number;
}
