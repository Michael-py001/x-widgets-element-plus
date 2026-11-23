import { ElTooltip } from 'element-plus';
import type { CSSProperties, VNode } from 'vue';

/**
 * CustomTooltip 组件属性
 */
export interface CustomTooltipProps {
  /** 显示的内容，可以是字符串或数组 */
  content: string | any[];
  /** 当 content 为数组时，使用的分隔符，默认为 ';' */
  separator?: string;
  /** 空数据时显示的内容，默认为 '-' */
  emptyText?: string;
  /** Tooltip 位置，默认为 'top' */
  placement?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end'
    | 'right-start'
    | 'right-end';
  /** Tooltip 内容最大宽度，默认为 '600px' */
  maxWidth?: string;
  /** Tooltip 内容最大高度，默认为 '400px' */
  maxHeight?: string;
  /** 单元格样式 */
  cellStyle?: CSSProperties;
  /** Tooltip 内容样式 */
  tooltipStyle?: CSSProperties;
  /** 当 content 为数组时，用于格式化数组项的自定义渲染函数 */
  formatter?: (item: any, index: number) => string | number;
}

/**
 * CustomTooltip - 通用悬停提示组件
 *
 * 用于在表格单元格中显示内容，当内容为数组时，鼠标悬停时以换行形式展示所有内容。
 * 当内容为字符串时，如果内容过长被截断，悬停时会显示完整内容。
 *
 * @example
 * ```tsx
 * // 数组用法
 * <CustomTooltip content={['Alpha', 'Beta', 'Gamma']} />
 *
 * // 字符串用法
 * <CustomTooltip content="这是一个很长很长的字符串..." />
 *
 * // 自定义
 * <CustomTooltip
 *   content={['A', 'B', 'C']}
 *   separator=" | "
 *   maxWidth="500px"
 * />
 * ```
 */
export function CustomTooltip(props: CustomTooltipProps) {
  const {
    content,
    separator = ';',
    emptyText = '-',
    placement = 'top',
    maxWidth = '600px',
    maxHeight = '400px',
    cellStyle = {},
    tooltipStyle = {},
    formatter
  } = props;

  // 处理空数据
  if (!content || (Array.isArray(content) && content.length === 0)) {
    return <div>{emptyText}</div>;
  }

  let cellContent: string | VNode = '';
  let tooltipContent: VNode | null = null;
  const isArray = Array.isArray(content);

  if (isArray) {
    // 格式化数组项
    const formatItem = (item: any, index: number): string => {
      if (formatter) {
        return String(formatter(item, index));
      }
      return String(item);
    };

    cellContent = content.map((item, index) => formatItem(item, index)).join(separator);
    tooltipContent = (
      <div
        style={{
          maxWidth,
          maxHeight,
          overflowY: 'auto',
          ...tooltipStyle
        }}
      >
        {content.map((item, index) => (
          <div key={index} style={{ marginBottom: index < content.length - 1 ? '4px' : '0' }}>
            {formatItem(item, index)}
          </div>
        ))}
      </div>
    );
  } else {
    cellContent = String(content);
    tooltipContent = <div style={{ maxWidth, wordBreak: 'break-all', ...tooltipStyle }}>{cellContent}</div>;
  }

  // 默认单元格样式
  const defaultCellStyle: CSSProperties = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    ...cellStyle
  };

  return (
    <ElTooltip
      placement={placement}
      v-slots={{
        content: () => tooltipContent
      }}
    >
      <div style={defaultCellStyle}>{cellContent}</div>
    </ElTooltip>
  );
}
