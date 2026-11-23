import { defineComponent, withDirectives, ref } from 'vue';
import { ElTable, ElTableColumn, vLoading, ElPagination } from 'element-plus';
import { basicTableProps, type ExtendedPaginationProps } from './types/BasicTableLegacy/basicTableProps';
import type { XTableProps, TableColumn } from './types/BasicTableLegacy/props';

const xTableProps = { ...(ElTable as any).props, ...basicTableProps() };

/**
 * 表格溢出气泡使用的 popper 类名。
 *
 * Element Plus 的内建 tooltip 默认不限制宽度，长单元格内容（例如设备原始数据那类
 * 上百字的参数串）会撑成单行、横向盖住整张表格。这里统一挂一个类名，由全局样式
 * 限制最大宽度，让过长内容自动换行。
 *
 * 调用方仍可通过 `tooltipOptions` 传入自己的 popperClass 覆盖。
 */
const OVERFLOW_TOOLTIP_POPPER_CLASS = 'x-table-overflow-tooltip';

/**
 * @description element-plus 表格组件 传统版
 * @usage `<Table :columns="columns" :data="list" :pagination="pagination" :loading="loading" :height="tableContainerHeight" :id="uid"> </Table>`
 *
 * @author WuShiLi
 */
export default defineComponent({
  name: 'XTable',
  inheritAttrs: true,
  props: xTableProps,
  emits: (ElTable as any).emits,
  setup(props: XTableProps, { attrs, slots, emit, expose }) {
    // 创建表格实例的引用
    const tableRef = ref();
    const renderColumns = (columns: TableColumn[]) => {
      return columns.map((column, index) => {
        const slotObj: Record<string, any> = {};

        // 自定义渲染单元格
        if (column.cellRenderer) {
          slotObj.default = ({ row, $index }: { row: any; $index: number }) => {
            const cellData = row[column.prop || column.dataKey || ''];
            return column.cellRenderer!({
              cellData,
              rowData: row,
              rowIndex: $index,
              columns: columns,
              column,
              columnIndex: index
            });
          };
        }

        if (column.slots?.default && slots[column.slots.default]) {
          slotObj.default = slots[column.slots.default];
        }
        if (column.slots?.header && slots[column.slots.header]) {
          slotObj.header = slots[column.slots.header];
        }

        const hasChildren = Array.isArray(column.children) && column.children.length > 0;

        return (
          <ElTableColumn
            key={column.key || column.prop || index}
            prop={hasChildren ? undefined : column.prop || (column.dataKey as string)}
            label={column.label || column.title}
            width={column.width}
            minWidth={column.minWidth}
            fixed={column.fixed}
            sortable={column.sortable}
            sortMethod={column.sortMethod}
            align={column.align}
            headerAlign={column.headerAlign}
            showOverflowTooltip={column.showOverflowTooltip}
            formatter={column.formatter}
            type={column.type}
            index={column.index}
            columnKey={column.columnKey}
            className={column.className}
            labelClassName={column.labelClassName}
            selectable={column.selectable}
            reserveSelection={column.reserveSelection}
            filters={column.filters}
            filterPlacement={column.filterPlacement}
            filterMultiple={column.filterMultiple}
            filterMethod={column.filterMethod}
            filteredValue={column.filteredValue}
            resizable={column.resizable}
            v-slots={slotObj}
          >
            {hasChildren ? renderColumns(column.children as TableColumn[]) : null}
          </ElTableColumn>
        );
      });
    };

    const XTable = ({ attrs, props, loading }: { attrs?: any; props?: any; loading?: boolean }) => {
      const { columns, data, ...tableProps } = props;

      // 创建事件处理器对象，将所有事件转发给父组件
      const eventHandlers: Record<string, any> = {};
      const tableEmits = (ElTable as any).emits as string[] | undefined;
      if (tableEmits) {
        tableEmits.forEach((eventName) => {
          const handlerName = `on${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`;
          eventHandlers[handlerName] = (...args: any[]) => emit(eventName as any, ...args);
        });
      }

      // Element Plus 2.x 只在 table 级 border 为 true 时才挂载列宽拖拽交互
      // （见其 table-header/event-helper 对 props.border 的判断），因此这里默认开启；
      // 应用主题已把 --el-table-border 置为 0，开启后不会额外画出单元格分割线。
      // 调用方仍可通过 :border="false" 显式关闭。
      const tableElement = (
        <ElTable
          ref={tableRef}
          {...attrs}
          {...tableProps}
          border={props.border ?? true}
          // 必须放在 {...tableProps} 之后，否则列级 showOverflowTooltip 会退回 EP 的无限宽默认值
          tooltipOptions={{
            popperClass: OVERFLOW_TOOLTIP_POPPER_CLASS,
            ...tableProps.tooltipOptions
          }}
          {...eventHandlers}
          data={data}
          class={`${props.class} XTable`}
        >
          {columns && renderColumns(columns)}
          {slots.default?.()}
        </ElTable>
      );
      return withDirectives(tableElement, [[vLoading, !!loading]]);
    };

    const renderPagination = (pagination: ExtendedPaginationProps | boolean) => {
      if (pagination && typeof pagination === 'object' && Object.keys(pagination).length > 0) {
        if (props.hideOnSinglePage) {
          return null;
        } else {
          return (
            <div class="flex items-center justify-between py-[12px] text-[14px] text-[#424B56]">
              <div>共 {pagination.total} 项数据</div>
              <ElPagination background {...pagination} layout={props.paginationLayout} />
            </div>
          );
        }
      }
      return null;
    };

    // 暴露ElTable的方法给外部使用
    expose({
      // 选择相关方法
      clearSelection: () => tableRef.value?.clearSelection(),
      getSelectionRows: () => tableRef.value?.getSelectionRows(),
      toggleRowSelection: (row: any, selected?: boolean) => tableRef.value?.toggleRowSelection(row, selected),
      toggleAllSelection: () => tableRef.value?.toggleAllSelection(),

      // 展开相关方法
      toggleRowExpansion: (row: any, expanded?: boolean) => tableRef.value?.toggleRowExpansion(row, expanded),

      // 当前行相关方法
      setCurrentRow: (row: any) => tableRef.value?.setCurrentRow(row),

      // 排序和过滤方法
      clearSort: () => tableRef.value?.clearSort(),
      clearFilter: (columnKeys?: string[]) => tableRef.value?.clearFilter(columnKeys),

      // 布局方法
      doLayout: () => tableRef.value?.doLayout(),

      // 手动排序方法
      sort: (prop: string, order: string) => tableRef.value?.sort(prop, order),

      // 滚动方法
      scrollTo: (options: ScrollToOptions | number, yCoord?: number) => tableRef.value?.scrollTo(options, yCoord),
      setScrollTop: (top: number) => tableRef.value?.setScrollTop(top),
      setScrollLeft: (left: number) => tableRef.value?.setScrollLeft(left),

      // 获取原始ElTable实例（用于访问其他可能的方法）
      getTableRef: () => tableRef.value
    });

    return () => {
      const { pagination, ...rest } = props;
      return (
        <>
          <XTable loading={props.loading} attrs={attrs} props={rest}>
            {slots.default?.()}
          </XTable>
          {renderPagination(pagination as ExtendedPaginationProps | boolean)}
        </>
      );
    };
  }
});
