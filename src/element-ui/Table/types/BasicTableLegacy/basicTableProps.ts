import type { ExtractPropTypes, PropType } from 'vue';
import type { PaginationProps } from 'element-plus';

// 扩展 PaginationProps 以支持 JSX 事件处理器
export interface ExtendedPaginationProps extends Partial<PaginationProps> {
  onSizeChange?: (size: number) => void;
  onCurrentChange?: (page: number) => void;
  onChange?: (currentPage: number, pageSize: number) => void;
  onPrevClick?: (page: number) => void;
  onNextClick?: (page: number) => void;
}

export const basicTableProps = () => {
  return {
    columns: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    data: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    pagination: {
      type: [Object, Boolean] as PropType<ExtendedPaginationProps | boolean>,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    },
    paginationLayout: {
      type: String,
      default: 'sizes,prev, pager, next'
    },
    hideOnSinglePage: {
      type: Boolean,
      default: false
    }
  };
};
export type BasicTableProps = Partial<ExtractPropTypes<ReturnType<typeof basicTableProps>>>;
