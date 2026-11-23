import type { TableProps, TableColumnCtx } from 'element-plus';
import type { VNode } from 'vue';
import type { BasicTableProps } from './basicTableProps';

// 从 element-plus 移植的 cellRenderer 相关类型定义
export type RowCommonParams = {
  rowData: any;
  rowIndex: number;
};

export type ColumnCommonParams = {
  columns: TableColumn[];
  column: TableColumn;
  columnIndex: number;
};

export type CellRendererParams = {
  cellData: any;
} & RowCommonParams &
  ColumnCommonParams;

export type CellRenderer = (params: CellRendererParams) => VNode;
export interface TableColumn extends Partial<Omit<TableColumnCtx<any>, 'children' | 'id'>> {
  // 自定义属性
  title?: string;
  dataKey?: string;
  key?: string;
  cellRenderer?: CellRenderer;
  children?: TableColumn[];

  // 扩展的插槽配置
  slots?: {
    default?: string;
    header?: string;
  };
}

export interface XTableProps extends Omit<TableProps<any>, 'data'>, BasicTableProps {
  columns?: TableColumn[];
  data?: any[];
}
