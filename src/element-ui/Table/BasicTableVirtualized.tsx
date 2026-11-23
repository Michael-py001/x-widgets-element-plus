import { defineComponent, withDirectives } from 'vue';
import { ElTableV2 as Table, ElAutoResizer, tableV2Props, vLoading, ElPagination } from 'element-plus';
import { basicTableProps, type ExtendedPaginationProps } from './types/basicTableProps';
import type { XTableProps } from './types/props';

/**
 * @description element-plus 表格组件 虚拟化版
 * @usage
 *  <div :style="{ height: tableContainerHeight + 'px' }" :id="uid">
   <Table autoResizer :columns="columns" :data="list" :pagination="pagination" fixed :loading="loading" :estimated-row-height="60"> </Table>
  </div>
  @author WuShiLi
 */

const xTableProps = { ...tableV2Props, ...basicTableProps() };

export default defineComponent({
  name: 'XTable',
  inheritAttrs: true,
  props: xTableProps,
  setup(props: XTableProps, { attrs, slots }) {
    const XTable = ({
      width,
      height,
      attrs,
      props,
      loading
    }: {
      width?: number;
      height?: number;
      attrs?: any;
      props?: any;
      loading?: boolean;
    }) => {
      const tableElement = (
        <Table {...attrs} {...props} width={width} height={height} class={`${props.class} XTable`}>
          {{ ...slots }}
        </Table>
      );
      return withDirectives(tableElement, [[vLoading, !!loading]]);
    };

    const renderPagination = (pagination: ExtendedPaginationProps) => {
      if (pagination && Object.keys(pagination).length > 0) {
        if (props.hideOnSinglePage && pagination.total <= pagination.pageSize) {
          return null;
        } else {
          return (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
              <div>共 {pagination.total} 项数据</div>
              <ElPagination background {...pagination} layout={props.paginationLayout} />
            </div>
          );
        }
      }
      return null;
    };

    return () => {
      const { pagination, autoResizer, ...rest } = props;
      const tableHeight = (height: number) => height - (pagination ? 56 : 0);
      return (
        <>
          {autoResizer ? (
            <ElAutoResizer>
              {{
                default: ({ height, width }: { height: number; width: number }) => (
                  <>
                    <XTable
                      loading={props.loading}
                      width={width || rest.width}
                      height={tableHeight(height || rest.height)}
                      attrs={attrs}
                      props={props}
                    >
                      {{ ...slots }}
                    </XTable>
                    {renderPagination(pagination)}
                  </>
                )
              }}
            </ElAutoResizer>
          ) : (
            <>
              <XTable
                loading={props.loading}
                width={rest.width}
                height={tableHeight(rest.height)}
                attrs={attrs}
                props={props}
              >
                {slots.default?.()}
              </XTable>
              {renderPagination(pagination)}
            </>
          )}
        </>
      );
    };
  }
});
