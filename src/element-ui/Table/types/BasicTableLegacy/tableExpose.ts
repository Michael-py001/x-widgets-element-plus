/**
 * ElTable组件暴露的方法类型定义
 */
export interface TableExposeInstance {
  // 选择相关方法
  /** 清空选中项 */
  clearSelection: () => void;
  /** 返回当前选中的行 */
  getSelectionRows: () => any[];
  /** 切换某一行的选中状态 */
  toggleRowSelection: (row: any, selected?: boolean) => void;
  /** 切换全选状态 */
  toggleAllSelection: () => void;

  // 展开相关方法
  /** 切换行展开状态 */
  toggleRowExpansion: (row: any, expanded?: boolean) => void;

  // 当前行相关方法
  /** 设置当前行 */
  setCurrentRow: (row: any) => void;

  // 排序和过滤方法
  /** 清空排序条件 */
  clearSort: () => void;
  /** 清空过滤条件 */
  clearFilter: (columnKeys?: string[]) => void;

  // 布局方法
  /** 重新布局Table */
  doLayout: () => void;

  // 手动排序方法
  /** 手动排序 */
  sort: (prop: string, order: string) => void;

  // 滚动方法
  /** 滚动到指定位置 */
  scrollTo: (options: ScrollToOptions | number, yCoord?: number) => void;
  /** 设置垂直滚动位置 */
  setScrollTop: (top: number) => void;
  /** 设置水平滚动位置 */
  setScrollLeft: (left: number) => void;

  // 获取原始ElTable实例（用于访问其他可能的方法）
  /** 获取原始ElTable实例 */
  getTableRef: () => any;
}
