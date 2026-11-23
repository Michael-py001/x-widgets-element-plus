# 弹窗、标签与提示

本页说明 `ConfirmPopup`、`customConfirm`（含 `CustomConfirmOptions` 与 `ConfirmCancelStatus`）、`Tag` 和 `CustomTooltip` 的公开契约。所有名称均从 `x-widgets-element-plus` 导入；内部源码路径不属于稳定 API。

## ConfirmPopup

基于 Element Plus `ElDialog` 的受控确认弹窗。显示状态由 `show` prop 驱动（支持 `v-model:show`）。

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { ConfirmPopup } from 'x-widgets-element-plus'

const visible = ref(false)
const loading = ref(false)

function onConfirm() {
  loading.value = true
  // 执行操作，完成后设置 loading = false 与 visible = false
}
</script>

<template>
  <ConfirmPopup
    v-model:show="visible"
    title="删除记录"
    confirm-text="删除"
    type="danger"
    :ok-btn-loading="loading"
    @confirm="onConfirm"
  >
    <p>此操作不可撤销。</p>
  </ConfirmPopup>
</template>
```

### Props

| Prop | 类型 | 默认值 | 用途 |
| --- | --- | --- | --- |
| `show` | `boolean` | `false` | 弹窗显示状态；取消/关闭时派发 `update:show`。 |
| `title` | `string` | `标题` | 未使用 `header` 插槽时的标题文字。 |
| `width` | `string \| number` | `500px` | 弹窗宽度（Element Plus `width`）。 |
| `type` | `primary \| success \| warning \| danger` | `primary` | 确认按钮类型。 |
| `confirmText` | `string` | `确认` | 确认按钮文字。 |
| `cancelText` | `string` | `取消` | 取消按钮文字。 |
| `showConfirmBtn` | `boolean` | `true` | 是否显示确认按钮。 |
| `showCancelBtn` | `boolean` | `true` | 是否显示取消按钮。 |
| `okBtnLoading` | `boolean` | `false` | 加载状态；同时禁用两个底部按钮。 |
| `disabled` | `boolean` | `false` | 禁用确认按钮。 |
| `closable` | `boolean` | `true` | 是否显示关闭（X）控件。 |
| `footer` | `boolean` | `true` | 为 `false` 时不渲染默认底部区域。 |

### 事件

| 事件 | 载荷 | 触发时机 |
| --- | --- | --- |
| `confirm` | 无 | 点击确认按钮。组件**不会**自行关闭；请在宿主中设置 `show = false`。 |
| `cancel` | 无 | 点击取消按钮或弹窗关闭。 |
| `update:show` | `false` | 与 `cancel` 同时派发，用于支持 `v-model:show`。 |
| `update:formData` | — | 在 `emits` 中声明但当前实现未派发；请勿依赖。 |

### 插槽

| 插槽 | 插槽属性 | 用途 |
| --- | --- | --- |
| `header` | `{ close, titleId, titleClass }` | 替换默认 `title` 标题。 |
| `default` | — | 弹窗正文。 |
| `footer` | `{ clickCancel }` | 替换默认取消/确认按钮。 |

`closeOnClickModal` 已禁用，点击遮罩不会关闭弹窗；关闭仅通过 X 控件、取消按钮，或宿主修改 `show` 实现。

## customConfirm、CustomConfirmOptions、ConfirmCancelStatus

`customConfirm` 是命令式确认弹窗。它向 `document.body` 挂载一个模态框，并返回 `Promise<boolean>`；仅可在浏览器环境使用。`CustomConfirmOptions` 为配置类型，`ConfirmCancelStatus` 为用户取消时的拒绝值类型。

```ts
import { customConfirm } from 'x-widgets-element-plus'

// 方式 1：onConfirm 回调
customConfirm({
  message: '确定删除这条记录吗？',
  type: 'danger',
  onConfirm: async () => {
    await deleteRecord()
  }
})

// 方式 2：.then —— 异步工作会自动显示 loading
customConfirm({ message: '确定删除这条记录吗？' })
  .then(async () => {
    await deleteRecord()
  })
  .catch((error) => {
    if (error?.status === 'cancel') return // 用户取消
    // 处理操作失败
  })
```

### CustomConfirmOptions

| 字段 | 类型 | 默认值 | 用途 |
| --- | --- | --- | --- |
| `title` | `string` | `''` | 模态框标题。 |
| `message` | `string` | — | 正文消息，渲染到默认插槽。 |
| `type` | `primary \| danger` | `primary` | 模态框基调/图标。 |
| `confirmText` | `string` | `确定` | 确认按钮文字。 |
| `cancelText` | `string` | `取消` | 取消按钮文字。 |
| `showConfirmBtn` | `boolean` | `true` | 是否显示确认按钮。 |
| `showCancelBtn` | `boolean` | `true` | 是否显示取消按钮。 |
| `onConfirm` | `() => Promise<void> \| void` | — | 提供时在确认时执行；返回 Promise 时保持 loading 直到完成。 |

### 返回值与取消

- 确认时以 `true` resolve。
- 取消或关闭时以 `ConfirmCancelStatus`（`{ status: 'cancel' }`）reject；在 `.catch` 中用 `error?.status === 'cancel'` 判断。
- 使用 `onConfirm` 时，回调执行期间显示 loading，resolve 后关闭弹窗；若抛出异常，loading 停止并重置确认状态，允许重试。
- 不使用 `onConfirm` 时，首次确认即 resolve promise 并执行 `.then` 回调；返回异步结果时自动显示 loading 直至完成，失败时重置状态以允许重试。

## Tag

轻量级状态标签。导出名为 `Tag`，组件名为 `CustomTag`。可通过 `text` prop 或默认插槽渲染内容。

```vue
<script setup lang="ts">
import { Tag } from 'x-widgets-element-plus'

function onClose(event: Event) {
  console.log('closed', event)
}
</script>

<template>
  <Tag text="已发布" type="success" />
  <Tag text="失败" status="FAIL" round />
  <Tag text="可移除" closable @close="onClose" />
</template>
```

### Props

| Prop | 类型 | 默认值 | 用途 |
| --- | --- | --- | --- |
| `text` | `string` | `''` | 标签文字；同时作为原生 `title` 提示。 |
| `status` | `string` | `''` | 在 `statusMap` 中查找样式。 |
| `type` | `success \| warning \| danger \| info \| primary \| default` | `default` | 预定义样式类型。 |
| `size` | `large \| default \| small` | `default` | 标签尺寸。 |
| `closable` | `boolean` | `false` | 是否显示关闭图标。 |
| `disabled` | `boolean` | `false` | 为 `true` 时不派发 `click`。 |
| `color` / `backgroundColor` / `borderColor` | `string` | `''` | 直接设置颜色；优先级高于 `statusMap`。 |
| `round` | `boolean` | `false` | 圆角标签。 |
| `className` | `string` | `''` | 额外的样式类名。 |
| `statusMap` | `Record<string, { color?: string; backgroundColor?: string; borderColor?: string }>` | 内置映射 | 将 `status` 值映射到颜色。默认包含 `SUCCESS`、`NO`、`FAIL`、`PASS_NOTICE`、`PASS_WARNING`、`ERROR`、`PRIMARY`。 |

### 事件与行为

| 事件 | 载荷 | 触发时机 |
| --- | --- | --- |
| `click` | `Event` | 点击标签；`disabled` 时不派发。 |
| `close` | `Event` | 点击关闭图标；会阻止事件冒泡。 |

`default` 插槽提供标签内容；当未传 `text` 时，会提取插槽纯文本作为原生 `title` 提示。当 `text` 与默认插槽均未提供时，组件不渲染任何内容。

## CustomTooltip

`CustomTooltip` 是基于 Element Plus `ElTooltip` 的函数式组件，用于表格单元格。其属性类型 `CustomTooltipProps` 从包根目录导出。

```vue
<script setup lang="ts">
import { CustomTooltip } from 'x-widgets-element-plus'
</script>

<template>
  <CustomTooltip :content="['Alpha', 'Beta', 'Gamma']" separator=" | " />
  <CustomTooltip content="在单元格中会被截断的长文本" />
</template>
```

| Prop | 类型 | 默认值 | 用途 |
| --- | --- | --- | --- |
| `content` | `string \| any[]` | 必填 | 要显示的内容；数组时提示框中每项一行。 |
| `separator` | `string` | `;` | 单元格文字中连接数组项的分隔符。 |
| `emptyText` | `string` | `-` | 内容为空时显示。 |
| `placement` | Element Plus tooltip 位置 | `top` | 提示框位置。 |
| `maxWidth` | `string` | `600px` | 提示内容最大宽度。 |
| `maxHeight` | `string` | `400px` | 提示内容最大高度（可滚动）。 |
| `cellStyle` | `CSSProperties` | `{}` | 单元格样式；默认启用省略号截断。 |
| `tooltipStyle` | `CSSProperties` | `{}` | 提示内容样式。 |
| `formatter` | `(item: any, index: number) => string \| number` | — | 格式化每个数组项，用于单元格与提示框。 |

数组内容时，单元格用 `separator` 连接各项，提示框逐行列出。字符串内容时，单元格以省略号截断，提示框显示完整文本。内容为空时渲染 `emptyText`，且不显示提示框。

## 相关页面

- [导出的组件](/zh-CN/components/)
- [工具与类型导出](/zh-CN/components/exports)
- [AreaCascader](/zh-CN/components/area-cascader)
- [跨库兼容性](/zh-CN/components/compatibility)
