# Schema forms

`SearchForm` accepts one flat `column` array. `FormPage` and `FormModal` accept a `formModel` array of blocks; each block has a `column` array. The host owns the model and handles API requests.

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
  // Use these values in the host application's list query.
  console.log(values)
}
</script>

<template>
  <SearchForm :column="columns" :form-data="filters" @search="search" />
</template>
```

`SearchForm` emits `search(values)`, `reset(values)`, and `expand(isExpanded)`. It declares `update:formData`, but the current component does not emit replacement objects; field edits mutate the supplied model. Search validates before emitting; reset clears form fields and waits one Vue tick before emitting the reset values. It also exposes `validate`, `resetFields`, `clearValidate`, and `getSelectedAddressName`.

### SearchForm props

| Prop | Type / default | Purpose |
| --- | --- | --- |
| `column` | `ColumnForFormItemType[]`, `[]` | Flat field schema. |
| `formData` | `Record<string, any>`, `{}` (required) | Bound form values. Keep the object stable and mutate it in place. |
| `labelWidth` | `string \| number`, undefined | Element Plus label width. |
| `labelAlign` | `left \| right \| top`, `right` | Label alignment. |
| `layout` | `horizontal \| vertical \| inline`, `inline` | Inline mode places built-in buttons beside the form; other modes place them below. |
| `colspan`, `gutter`, `verticalGap` | `24`, `12`, `0` | Grid span, row spacing, and field spacing. |
| `disabled`, `loading` | `undefined`, `false` | Disable fields and indicate/disable loading actions. |
| `autocomplete` | `on` | Native form autocomplete value. |
| `resetText`, `searchText` | `重置`, `查询` | Button labels; an empty string hides that button. |
| `showButtons`, `enabledExpand` | `true`, `true` | Toggle built-in actions and automatic expand/collapse. |
| `fixedSearchButton` | `false` | Reserved layout prop in the current public type; no separate positioning behavior is applied by the component. |
| `buttonsSlotLayout` | `space-between` | Flex alignment of built-in buttons and `btnAfter`. |

Slots: `btnAfter` appends content in the button row; `default` renders content after the form. Schema-declared field slots pass through to `FormPage` / `FormItem`.

## FormPage sections

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

A `FormModelBlock` supports `title`, `display`, `style`, `class`, `fieldsetStyle`, `disabled`, and `column`. `FormPage` props also include `labelWidth`, `labelAlign`, `layout` (`horizontal`, `vertical`, `inline`), `colspan`, `gutter`, `verticalGap`, `disabled`, `loading`, `extraHeight`, `asChild`, and `autocomplete`. It exposes validation/reset methods aligned with Element Plus Form.

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

The `confirm` event fires with the current form data after validation succeeds. Cancel emits `cancel(false)`; with `autoClose` (default `true`), it also resets the fields, restores the data snapshot captured when the modal opened, and emits `update:show(false)`. With `autoClose=false`, it leaves the modal open and does not restore the snapshot.

| Prop | Type / default | Purpose |
| --- | --- | --- |
| `modalTitle`, `show`, `formModel`, `formData` | `string` (`标题`), `false`, `[]`, `{}` | Dialog title, visibility, section schema, and bound values. |
| `modalWidth` | `string \| number`, `600px` | Dialog width. |
| `labelWidth` | `string \| number`, undefined | Element Plus form label width. |
| `labelAlign`, `layout` | `right`, `vertical` | Label alignment and form layout (`horizontal`, `vertical`, `inline`). |
| `gutter` | `number`, `12` | Form grid spacing. |
| `cancelText`, `confirmText` | `取消`, `确认` | Default footer button labels. |
| `showCancelBtn`, `showConfirmBtn`, `showFooter` | `true` | Toggle default footer controls. A `modalFooter` slot takes over the default buttons. |
| `okBtnLoading`, `loading`, `disabled` | `false` | Confirmation loading state and form/dialog interaction state. |
| `autoClose` | `true` | Reset/restore and close on cancel when enabled. |
| `fieldsetStyle`, `autocomplete` | `{}`, `on` | Form presentation and native autocomplete value. |

Events: `confirm(formData)`, `cancel(false)`, `update:show(visible)`. `update:formData` is declared but the current implementation mutates the supplied model object; do not rely on it to emit replacement objects.

Slots: `title` customizes the dialog title, `modalFooter` replaces the default footer, and field slots from the schema pass through to `FormPage` / `FormItem`.

Exposed methods: `resetFields`, `validateFields`, `validate`, `scrollToField`, `scrollToFields`, `clickConfirm`, `clickCancel`, and `FormPageRef`.

## Field schema

Use the exported `ColumnForFormItemType` for each field. Common keys include:

| Field | Meaning |
| --- | --- |
| `name`, `label` | Model path and visible label. `name` may be a string or path array. |
| `el` / `type` | Control kind: `input` (`x-input` alias), `input-password`, `input-search`, `select` (`x-select` alias), `tree-select`, `cascader`, `textarea`, `input-number`, `date-picker`, `range-picker` (date range), `time-picker`, `time-range-picker`, `city-picker`, `area-picker`, `range-input`, `rate`, `slider`, `color-picker`, `mentions`, `checkbox`, `checkbox-group`, `radio-group`, `switch`, `autocomplete` (`auto-complete` alias), or `text`. |
| `props` | Element Plus control props. |
| `options` | Choice data; supports arrays and reactive/function data sources. Top-level `options` takes precedence over `props.options`. |
| `rules`, `required` | Element Plus validation rules and generated required rules. |
| `display` | Boolean, ref/computed boolean, or function controlling field visibility. |
| `colspan`, `disabled` | Layout span and field-level disabled state. |
| `slot`, `formSlot`, `beforeSlot`, `afterSlot` | Slot name or typed render callback, depending on the slot position. |
| `selfProps`, `slotProps`, `event` | Props for the form item/control and forwarded control event handlers. |

For the complete contract and render callback contexts, use the exported `ColumnForFormItemType`, `FormItemProps`, `FormItemSlotRenderContext`, and `FormBlockSlotRender` types. Prefer schema props over manually constructing controls; use render slots for truly custom content.

## Ownership

Keep the object passed as `formData` stable and owned by the consuming page. These components do not issue requests, own domain state, or serialize form data for your API.
