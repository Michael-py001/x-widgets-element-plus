# 表格与虚拟滚动

标准 `Table` 组合了 Element Plus 的 `ElTable` / `ElTableColumn`，按 schema 渲染列，并可追加 Element Plus 分页。`TableVirtualized` 是面向大数据集的另一个 Element Plus Table V2 组件；它并不共享标准表格的全部列选项与插槽选项。

## 标准 Table

```vue
<script setup lang="ts">
import { Table } from 'x-widgets-element-plus'
import type { TableColumn } from 'x-widgets-element-plus'

const columns: TableColumn[] = [
  { prop: 'name', label: 'Name', minWidth: 180 },
  { prop: 'status', label: 'Status', width: 120 },
]
const rows = [
  { id: 'a1', name: 'Alpha', status: 'Draft' },
  { id: 'b2', name: 'Beta', status: 'Published' },
]
const pagination = { currentPage: 1, pageSize: 20, total: rows.length }
</script>

<template>
  <Table :columns="columns" :data="rows" :pagination="pagination" :loading="false" />
</template>
```

`TableColumn` 扩展了 Element Plus 表格列属性，并新增 `title`、`dataKey`、`key`、嵌套 `children`、具名 `slots` 和 `cellRenderer`。`cellRenderer` 接收 `{ cellData, rowData, rowIndex, columns, column, columnIndex }`，返回一个 Vue VNode。`columns` 与 `data` 是 schema 与行数据输入；远程数据请求请放在应用代码中。

### 封装选项

| Prop | 默认值 | 用途 |
| --- | --- | --- |
| `pagination` | `{}` | 传入 Element Plus 分页 props 以渲染分页器；传 `false` 可关闭。 |
| `paginationLayout` | `sizes,prev, pager, next` | 分页器布局字符串。 |
| `hideOnSinglePage` | `false` | 为 `true` 时，封装组件不渲染分页。 |
| `loading` | `false` | 显示加载指令。 |
| `border` | 省略时为 `true` | 开启 Element Plus 列宽调整行为；传 `false` 可关闭。 |

其他标准 Element Plus 表格 props、事件与默认插槽均会透传。组件暴露了常用的选择、展开、排序、布局与滚动方法；`TableExposeInstance` 已导出。

## TableVirtualized

只有在宿主能够提供虚拟表格所需的尺寸与 V2 列配置时，才使用 `TableVirtualized`。它的契约并非从 `TableColumn` 推断而来；确切 props 请查阅包导出的组件声明与 Element Plus Table V2 参考文档。在未重新核对渲染器、插槽、选择与分页行为之前，请勿用它直接替换 `Table`。
