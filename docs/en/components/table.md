# Table and virtualization

The standard `Table` composes Element Plus `ElTable` / `ElTableColumn`, renders columns from a schema, and can append Element Plus pagination. `TableVirtualized` is a separate Element Plus Table V2 component for large datasets; it does not share every standard-table column or slot option.

## Standard Table

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

`TableColumn` extends Element Plus table column properties and adds `title`, `dataKey`, `key`, nested `children`, named `slots`, and `cellRenderer`. A `cellRenderer` receives `{ cellData, rowData, rowIndex, columns, column, columnIndex }` and returns a Vue VNode. `columns` and `data` are schema and row input; use application code for remote data fetching.

### Wrapper options

| Prop | Default | Purpose |
| --- | --- | --- |
| `pagination` | `{}` | Pass Element Plus pagination props to render the pager; `false` disables it. |
| `paginationLayout` | `sizes,prev, pager, next` | Pager layout string. |
| `hideOnSinglePage` | `false` | When `true`, the wrapper suppresses its pagination rendering. |
| `loading` | `false` | Display the loading directive. |
| `border` | `true` when omitted | Enables Element Plus column resize behavior; pass `false` to opt out. |

Other standard Element Plus table props, events, and default slots are forwarded. The component exposes common selection, expansion, sorting, layout, and scroll methods; `TableExposeInstance` is exported.

## TableVirtualized

Use `TableVirtualized` only when the host can provide the virtualized table's required dimensions and V2 column configuration. Its contract is intentionally not inferred from `TableColumn`; consult the package-exported component declaration and Element Plus Table V2 reference for its exact props. Do not replace `Table` with it without rechecking renderers, slots, selection, and pagination behavior.
