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
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    pagination: {
      type: Object as PropType<ExtendedPaginationProps>,
      default: () => ({})
    },
    autoResizer: {
      type: Boolean,
      default: false
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
      default: true
    }
  };
};
export type BasicTableProps = Partial<ExtractPropTypes<ReturnType<typeof basicTableProps>>>;
