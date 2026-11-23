# Schema 表单

`SearchForm` 接收一个扁平的 `column` 数组。`FormPage` 与 `FormModal` 接收由区块组成的 `formModel` 数组；每个区块包含一个 `column` 数组。表单模型与 API 请求由宿主应用负责。

## SearchForm

```vue
<script setup lang="ts">
import { reactive } from 'vue'
import { SearchForm } from 'x-widgets-element-plus'
import type { ColumnForFormItemType } from 'x-widgets-element-plus'

const filters = reactive({ name: '', state: '' })
const columns: ColumnForFormItemType[] = [
  { name: 'name', label: 'Name', el: 'input', props: { clearable: true } },
  {
    name: 'state', label: 'State', el: 'select',
    options: [{ label: 'Draft', value: 'draft' }, { label: 'Published', value: 'published' }],
  },
]

function search(values: typeof filters) {
  // 在宿主应用里使用这些值发起列表查询。
  console.log(values)
}
</script>

<template>
  <SearchForm :column="columns" :form-data="filters" @search="search" />
</template>
```

`SearchForm` 会触发 `search(values)`、`reset(values)` 和 `expand(isExpanded)` 事件。它声明了 `update:formData`，但当前组件不会派发替换后的对象；字段编辑是直接修改传入的模型对象。查询前会先做校验；重置会清空表单字段，并等待一个 Vue tick 后再派发重置后的值。它还暴露了 `validate`、`resetFields`、`clearValidate` 和 `getSelectedAddressName` 方法。

### SearchForm props

| Prop | 类型 / 默认值 | 用途 |
| --- | --- | --- |
| `column` | `ColumnForFormItemType[]`，`[]` | 扁平的字段 schema。 |
| `formData` | `Record<string, any>`，`{}`（必填） | 绑定的表单值。请保持该对象引用稳定，并就地修改它。 |
| `labelWidth` | `string \| number`，undefined | Element Plus 标签宽度。 |
| `labelAlign` | `left \| right \| top`，`right` | 标签对齐方式。 |
| `layout` | `horizontal \| vertical \| inline`，`inline` | inline 模式把内置按钮放在表单旁边；其他模式把按钮放在表单下方。 |
| `colspan`、`gutter`、`verticalGap` | `24`、`12`、`0` | 栅格占位、行间距与字段间距。 |
| `disabled`、`loading` | `undefined`、`false` | 禁用字段，以及显示/禁用加载态按钮。 |
| `autocomplete` | `on` | 原生表单 autocomplete 值。 |
| `resetText`、`searchText` | `重置`、`查询` | 按钮文字；传空字符串可隐藏对应按钮。 |
| `showButtons`、`enabledExpand` | `true`、`true` | 控制内置按钮与自动展开/收起。 |
| `fixedSearchButton` | `false` | 当前公开类型中的预留布局 prop；组件本身不施加额外的定位行为。 |
| `buttonsSlotLayout` | `space-between` | 内置按钮与 `btnAfter` 的 flex 对齐方式。 |

插槽：`btnAfter` 在按钮行追加内容；`default` 在表单之后渲染内容。schema 中声明的字段插槽会透传给 `FormPage` / `FormItem`。

## FormPage 区块

```ts
import type { FormModelBlock } from 'x-widgets-element-plus'

const formModel: FormModelBlock[] = [
  {
    title: 'General',
    column: [
      { name: 'name', label: 'Name', el: 'input', required: true },
      {
        name: 'category', label: 'Category', el: 'select',
        options: [{ label: 'Hardware', value: 'hardware' }],
      },
    ],
  },
]
```

```vue
<FormPage :form-model="formModel" :form-data="record" layout="horizontal" />
```

`FormModelBlock` 支持 `title`、`display`、`style`、`class`、`fieldsetStyle`、`disabled` 和 `column`。`FormPage` 的 props 还包括 `labelWidth`、`labelAlign`、`layout`（`horizontal`、`vertical`、`inline`）、`colspan`、`gutter`、`verticalGap`、`disabled`、`loading`、`extraHeight`、`asChild` 和 `autocomplete`。它暴露的校验/重置方法与 Element Plus Form 保持一致。

## FormModal

```vue
<FormModal
  v-model:show="visible"
  :form-model="formModel"
  :form-data="record"
  modal-title="Edit record"
  @confirm="save"
/>
```

校验通过后，`confirm` 事件会携带当前表单数据触发。取消会触发 `cancel(false)`；在 `autoClose`（默认 `true`）下，它还会重置字段、恢复弹窗打开时捕获的数据快照，并派发 `update:show(false)`。当 `autoClose=false` 时，弹窗保持打开，也不会恢复快照。

| Prop | 类型 / 默认值 | 用途 |
| --- | --- | --- |
| `modalTitle`、`show`、`formModel`、`formData` | `string`（`标题`）、`false`、`[]`、`{}` | 弹窗标题、显隐状态、区块 schema 与绑定的值。 |
| `modalWidth` | `string \| number`，`600px` | 弹窗宽度。 |
| `labelWidth` | `string \| number`，undefined | Element Plus 表单标签宽度。 |
| `labelAlign`、`layout` | `right`、`vertical` | 标签对齐方式与表单布局（`horizontal`、`vertical`、`inline`）。 |
| `gutter` | `number`，`12` | 表单栅格间距。 |
| `cancelText`、`confirmText` | `取消`、`确认` | 底部按钮默认文字。 |
| `showCancelBtn`、`showConfirmBtn`、`showFooter` | `true` | 控制默认底部控件。`modalFooter` 插槽会接管默认按钮。 |
| `okBtnLoading`、`loading`、`disabled` | `false` | 确认按钮加载态，以及表单/弹窗的交互状态。 |
| `autoClose` | `true` | 启用时，取消会重置/恢复并关闭弹窗。 |
| `fieldsetStyle`、`autocomplete` | `{}`、`on` | 表单呈现样式与原生 autocomplete 值。 |

事件：`confirm(formData)`、`cancel(false)`、`update:show(visible)`。`update:formData` 虽有声明，但当前实现是直接修改传入的模型对象；不要依赖它派发替换后的对象。

插槽：`title` 自定义弹窗标题，`modalFooter` 替换默认底部区域，schema 中的字段插槽会透传给 `FormPage` / `FormItem`。

暴露方法：`resetFields`、`validateFields`、`validate`、`scrollToField`、`scrollToFields`、`clickConfirm`、`clickCancel` 和 `FormPageRef`。

## 字段 schema

每个字段请使用导出的 `ColumnForFormItemType`。常见键包括：

| 字段 | 含义 |
| --- | --- |
| `name`、`label` | 模型路径与可见标签。`name` 可以是字符串或路径数组。 |
| `el` / `type` | 控件类型：`input`（别名 `x-input`）、`input-password`、`input-search`、`select`（别名 `x-select`）、`tree-select`、`cascader`、`textarea`、`input-number`、`date-picker`、`range-picker`（日期范围）、`time-picker`、`time-range-picker`、`city-picker`、`area-picker`、`range-input`、`rate`、`slider`、`color-picker`、`mentions`、`checkbox`、`checkbox-group`、`radio-group`、`switch`、`autocomplete`（别名 `auto-complete`）或 `text`。 |
| `props` | Element Plus 控件 props。 |
| `options` | 选项数据；支持数组以及响应式/函数数据源。顶层 `options` 优先于 `props.options`。 |
| `rules`、`required` | Element Plus 校验规则与自动生成的必填规则。 |
| `display` | 布尔值、ref/computed 布尔值，或控制字段显隐的函数。 |
| `colspan`、`disabled` | 布局占位与字段级禁用状态。 |
| `slot`、`formSlot`、`beforeSlot`、`afterSlot` | 插槽名称或类型化渲染回调，取决于插槽位置。 |
| `selfProps`、`slotProps`、`event` | 传给表单项/控件的 props，以及转发的控件事件处理函数。 |

如需完整契约与渲染回调上下文，请使用导出的 `ColumnForFormItemType`、`FormItemProps`、`FormItemSlotRenderContext` 和 `FormBlockSlotRender` 类型。优先使用 schema props，而不是手工构造控件；只有真正自定义的内容才使用渲染插槽。

## 数据归属

请保持传给 `formData` 的对象引用稳定，并由消费方页面持有。这些组件不会发起请求、不持有业务状态，也不会为你的 API 序列化表单数据。
