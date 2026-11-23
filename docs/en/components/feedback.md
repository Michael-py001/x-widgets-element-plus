# Dialogs, tags & tooltips

This page documents the public contracts of `ConfirmPopup`, `customConfirm` (with `CustomConfirmOptions` and `ConfirmCancelStatus`), `Tag`, and `CustomTooltip`. All names are imported from `x-widgets-element-plus`; internal source paths are not a stable API.

## ConfirmPopup

A controlled confirmation dialog built on Element Plus `ElDialog`. Visibility is driven by the `show` prop (`v-model:show` is supported).

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { ConfirmPopup } from 'x-widgets-element-plus'

const visible = ref(false)
const loading = ref(false)

function onConfirm() {
  loading.value = true
  // perform the work, then set loading = false and visible = false
}
</script>

<template>
  <ConfirmPopup
    v-model:show="visible"
    title="Delete record"
    confirm-text="Delete"
    type="danger"
    :ok-btn-loading="loading"
    @confirm="onConfirm"
  >
    <p>This action cannot be undone.</p>
  </ConfirmPopup>
</template>
```

### Props

| Prop | Type | Default | Purpose |
| --- | --- | --- | --- |
| `show` | `boolean` | `false` | Dialog visibility; `update:show` is emitted on cancel/close. |
| `title` | `string` | `标题` | Header text when the `header` slot is not used. |
| `width` | `string \| number` | `500px` | Dialog width (Element Plus `width`). |
| `type` | `primary \| success \| warning \| danger` | `primary` | Confirm button type. |
| `confirmText` | `string` | `确认` | Confirm button label. |
| `cancelText` | `string` | `取消` | Cancel button label. |
| `showConfirmBtn` | `boolean` | `true` | Show the confirm button. |
| `showCancelBtn` | `boolean` | `true` | Show the cancel button. |
| `okBtnLoading` | `boolean` | `false` | Loading state; also disables both footer buttons. |
| `disabled` | `boolean` | `false` | Disables the confirm button. |
| `closable` | `boolean` | `true` | Shows the dialog close (X) control. |
| `footer` | `boolean` | `true` | When `false`, no default footer is rendered. |

### Events

| Event | Payload | When |
| --- | --- | --- |
| `confirm` | none | Confirm button clicked. The component does **not** close itself; set `show = false` in the host. |
| `cancel` | none | Cancel button clicked or dialog closed. |
| `update:show` | `false` | Emitted alongside `cancel`; enables `v-model:show`. |
| `update:formData` | — | Declared in `emits` but not emitted by the current implementation; do not rely on it. |

### Slots

| Slot | Slot props | Purpose |
| --- | --- | --- |
| `header` | `{ close, titleId, titleClass }` | Replaces the default `title` header. |
| `default` | — | Dialog body. |
| `footer` | `{ clickCancel }` | Replaces the default cancel/confirm buttons. |

`closeOnClickModal` is disabled, so clicking the mask does not close the dialog; closing happens through the X control, the cancel button, or a host-driven `show` change.

## customConfirm, CustomConfirmOptions, ConfirmCancelStatus

`customConfirm` is an imperative confirm dialog. It mounts a modal to `document.body` and returns a `Promise<boolean>`; it is browser-only. `CustomConfirmOptions` is the options type and `ConfirmCancelStatus` is the rejection value used when the user cancels.

```ts
import { customConfirm } from 'x-widgets-element-plus'

// Pattern 1: onConfirm callback
customConfirm({
  message: 'Delete this record?',
  type: 'danger',
  onConfirm: async () => {
    await deleteRecord()
  }
})

// Pattern 2: .then — async work shows loading automatically
customConfirm({ message: 'Delete this record?' })
  .then(async () => {
    await deleteRecord()
  })
  .catch((error) => {
    if (error?.status === 'cancel') return // user cancelled
    // handle a failed operation
  })
```

### CustomConfirmOptions

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `title` | `string` | `''` | Modal title. |
| `message` | `string` | — | Body message, rendered as the default slot. |
| `type` | `primary \| danger` | `primary` | Modal tone/icon. |
| `confirmText` | `string` | `确定` | Confirm button label. |
| `cancelText` | `string` | `取消` | Cancel button label. |
| `showConfirmBtn` | `boolean` | `true` | Show the confirm button. |
| `showCancelBtn` | `boolean` | `true` | Show the cancel button. |
| `onConfirm` | `() => Promise<void> \| void` | — | When provided, runs on confirm; an async return keeps loading until it settles. |

### Return and cancellation

- Resolves with `true` on confirm.
- Rejects with `ConfirmCancelStatus` (`{ status: 'cancel' }`) on cancel or close; check `error?.status === 'cancel'` in `.catch`.
- With `onConfirm`, loading is shown while the callback runs and the modal closes when it resolves. If it throws, loading stops and the confirm state resets so the user can retry.
- Without `onConfirm`, the first confirm resolves the promise and the `.then` callback runs; an async return automatically shows loading until it settles, and a rejection resets the state for retry.

## Tag

A lightweight status tag. Exported as `Tag`; the component name is `CustomTag`. It can render from the `text` prop or the default slot.

```vue
<script setup lang="ts">
import { Tag } from 'x-widgets-element-plus'

function onClose(event: Event) {
  console.log('closed', event)
}
</script>

<template>
  <Tag text="Published" type="success" />
  <Tag text="Failed" status="FAIL" round />
  <Tag text="Removable" closable @close="onClose" />
</template>
```

### Props

| Prop | Type | Default | Purpose |
| --- | --- | --- | --- |
| `text` | `string` | `''` | Tag text; used as the native `title` tooltip. |
| `status` | `string` | `''` | Looks up a style in `statusMap`. |
| `type` | `success \| warning \| danger \| info \| primary \| default` | `default` | Predefined style type. |
| `size` | `large \| default \| small` | `default` | Tag size. |
| `closable` | `boolean` | `false` | Shows a close icon. |
| `disabled` | `boolean` | `false` | Suppresses the `click` event. |
| `color` / `backgroundColor` / `borderColor` | `string` | `''` | Direct colors; these override `statusMap` values. |
| `round` | `boolean` | `false` | Rounded corners. |
| `className` | `string` | `''` | Extra class name. |
| `statusMap` | `Record<string, { color?: string; backgroundColor?: string; borderColor?: string }>` | built-in map | Maps `status` values to colors. Defaults include `SUCCESS`, `NO`, `FAIL`, `PASS_NOTICE`, `PASS_WARNING`, `ERROR`, `PRIMARY`. |

### Events and behavior

| Event | Payload | When |
| --- | --- | --- |
| `click` | `Event` | Tag clicked; not emitted when `disabled`. |
| `close` | `Event` | Close icon clicked; the event's propagation is stopped. |

The `default` slot supplies tag content; when `text` is absent, its plain text is extracted for the native `title` tooltip. The component renders nothing when neither `text` nor the default slot is provided.

## CustomTooltip

`CustomTooltip` is a function component wrapping Element Plus `ElTooltip`, intended for table cells. Its options type is `CustomTooltipProps`, exported from the package root.

```vue
<script setup lang="ts">
import { CustomTooltip } from 'x-widgets-element-plus'
</script>

<template>
  <CustomTooltip :content="['Alpha', 'Beta', 'Gamma']" separator=" | " />
  <CustomTooltip content="A long value that will be truncated in the cell" />
</template>
```

| Prop | Type | Default | Purpose |
| --- | --- | --- | --- |
| `content` | `string \| any[]` | required | Value to display; an array renders one line per item in the tooltip. |
| `separator` | `string` | `;` | Joins array items in the cell text. |
| `emptyText` | `string` | `-` | Shown for empty content. |
| `placement` | Element Plus tooltip placement | `top` | Tooltip position. |
| `maxWidth` | `string` | `600px` | Tooltip content max width. |
| `maxHeight` | `string` | `400px` | Tooltip content max height (enables scrolling). |
| `cellStyle` | `CSSProperties` | `{}` | Cell element style; default applies ellipsis truncation. |
| `tooltipStyle` | `CSSProperties` | `{}` | Tooltip content style. |
| `formatter` | `(item: any, index: number) => string \| number` | — | Formats each array item for both cell and tooltip. |

For array content, the cell shows items joined by `separator` and the tooltip lists them line by line. For string content, the cell truncates with ellipsis and the tooltip shows the full text. Empty content renders `emptyText` with no tooltip.

## Related pages

- [Exported components](/en/components/)
- [Utility & type exports](/en/components/exports)
- [AreaCascader](/en/components/area-cascader)
- [Cross-library compatibility](/en/components/compatibility)
