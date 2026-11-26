# x-widgets-element-plus

[![CI](https://github.com/Michael-py001/x-widgets-element-plus/actions/workflows/ci.yml/badge.svg)](https://github.com/Michael-py001/x-widgets-element-plus/actions/workflows/ci.yml) [![Docs](https://img.shields.io/badge/docs-online-blue.svg)](https://michael-py001.github.io/x-widgets-element-plus/) [![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

> [简体中文](./README.md) | English

**x-widgets-element-plus** is a Vue 3 component library built on Element Plus 2. It turns the recurring "search → modal edit → detail view → table" flow into a set of schema-driven components: declare a field contract once and reuse it across search bars, form pages, and dialogs, without depending on host-application APIs.

The package provides control adapters and typed schema-driven forms, tables, dialogs, feedback and progress widgets, plus `AreaCascader` with built-in China administrative-area data. Everything is exported from the package root, while API requests and business state stay in the host application.

> This package and `x-widgets-antdv` are separate implementations; their frameworks, style systems, and component behavior are not interchangeable.

## Features

- **One typed entry point**: every component and type is exported from the package root, with ESM and CommonJS builds sharing one declaration set.
- **Schema first**: the `ColumnForFormItemType` field contract spans search and form flows — `el` / `type` selects the control, while `props` / `options` / `rules` and slots describe interaction and validation.
- **Business widgets out of the box**: two-column search forms, grouped form pages, modal forms, confirm dialogs, imperative confirm, status tags, cell tooltips, progress overlays, and a province/city/district cascader with built-in data.
- **Feedback & progress**: `ConfirmPopup` controlled dialog, promise-based `customConfirm`, and `LoadingProgressService` with determinate and simulated progress.
- **Agent-ready docs**: bilingual VitePress documentation, `llms.txt`, framework compatibility notes, and a coding-agent skill.

## Requirements

| Dependency | Supported | Notes |
| --- | --- | --- |
| Node.js | 18+ | Host toolchain; a supported active LTS release is recommended. |
| Vue | 3.5+ | Peer dependency. |
| Element Plus | 2.11+ | Peer dependency; import the stylesheet separately. |
| `@element-plus/icons-vue` | 2.3+ | Peer dependency. |

## Quick start

### Install

```sh
npm install x-widgets-element-plus vue element-plus @element-plus/icons-vue
```

Vue, Element Plus, and `@element-plus/icons-vue` are peer dependencies and must be installed by the consuming application.

### Global registration

```ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'x-widgets-element-plus/style.css'
import XWidgets from 'x-widgets-element-plus'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.use(XWidgets)
app.mount('#app')
```

Import Element Plus's stylesheet and this package's stylesheet once in the app entry.

### Import on demand

```ts
import { AreaCascader, SearchForm, Table } from 'x-widgets-element-plus'
import type { AreaNode, ColumnForFormItemType, TableColumn } from 'x-widgets-element-plus'
import 'x-widgets-element-plus/style.css'
```

`AreaCascader` includes built-in administrative-area data; pass `treeData` to supply a custom tree.

## Core usage

### 1. Search form (`SearchForm`)

Fields are declared through `column`; values bind to a host-owned `formData` object (keep the reference stable and mutate it in place):

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
    options: [
      { label: 'Draft', value: 'draft' },
      { label: 'Published', value: 'published' }
    ]
  }
]

function search(values: typeof filters) {
  // Forward values to the page's list query.
  console.log(values)
}
</script>

<template>
  <SearchForm :column="columns" :form-data="filters" @search="search" />
</template>
```

Common `SearchForm` props: `column`, `formData` (required), `labelWidth`, `labelAlign` (`left|right|top`, default `right`), `layout` (`horizontal|vertical|inline`, default `inline`), `colspan`, `gutter`, `verticalGap`, `disabled`, `loading`, `enabledExpand`, `showButtons`, `resetText`, `searchText`, `fixedSearchButton`, `buttonsSlotLayout`. Events: `search`, `reset`, `expand`.

### 2. Form page and modal (`FormPage` / `FormModal`)

`FormPage` and `FormModal` take a grouped `formModel`; create / edit / detail views share one schema:

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { FormModal } from 'x-widgets-element-plus'
import type { FormModelBlock } from 'x-widgets-element-plus'

const visible = ref(false)
const record = reactive({ name: '', category: '' })
const formModel: FormModelBlock[] = [
  {
    title: 'General',
    column: [
      { name: 'name', label: 'Name', el: 'input', required: true },
      {
        name: 'category', label: 'Category', el: 'select',
        options: [{ label: 'Hardware', value: 'hardware' }]
      }
    ]
  }
]

function onConfirm(values: typeof record) {
  console.log(values)
}
</script>

<template>
  <FormModal
    v-model:show="visible"
    modal-title="New record"
    :form-model="formModel"
    :form-data="record"
    layout="horizontal"
    @confirm="onConfirm"
  />
</template>
```

Common `FormModal` props: `modalTitle`, `show` (`v-model:show`), `formModel`, `formData`, `modalWidth` (default `600px`), `labelWidth`, `labelAlign`, `layout` (default `vertical`), `gutter`, `cancelText`, `confirmText`, `showFooter`, `autoClose` (default `true`), `disabled`, `okBtnLoading`. Events: `confirm`, `cancel`, `update:show`.

### 3. Table (`Table`)

`Table` composes `ElTable` / `ElTableColumn`, renders columns from a `TableColumn[]` schema, and can append pagination; standard Element Plus props / events / slots are forwarded:

```vue
<script setup lang="ts">
import { Table } from 'x-widgets-element-plus'
import type { TableColumn } from 'x-widgets-element-plus'

const columns: TableColumn[] = [
  { prop: 'name', label: 'Name', minWidth: 180 },
  { prop: 'status', label: 'Status', width: 120 }
]
const rows = [
  { id: 'a1', name: 'Alpha', status: 'Draft' },
  { id: 'b2', name: 'Beta', status: 'Published' }
]
const pagination = { currentPage: 1, pageSize: 20, total: rows.length }
</script>

<template>
  <Table :columns="columns" :data="rows" :pagination="pagination" :loading="false" />
</template>
```

Wrapper props: `pagination` (pass `false` to disable), `paginationLayout`, `hideOnSinglePage`, `loading`, `border`. Columns support nested `children` and `cellRenderer` (returns a VNode). `TableVirtualized` is a separate Table V2 component with a different contract — not a drop-in replacement.

### 4. Area cascader (`AreaCascader`)

Built-in China administrative-area data, with path-array and joined-string value forms:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { AreaCascader } from 'x-widgets-element-plus'

const area = ref<string[] | null>(null)
</script>

<template>
  <AreaCascader v-model="area" :max-level="3" :min-select-level="2" />
  <pre>{{ area }}</pre>
</template>
```

Common `AreaCascader` props: `v-model`, `valueType` (`path|joined`), `separator`, `treeData`, `maxLevel` (1–3, default 3), `minSelectLevel`, `injectCitySelfLevel`, `priorityProvinces`, `checkStrictly`, `placeholder`, `clearable`, `filterable`. The `change` event always emits a normalized `string[]` path.

### 5. Feedback & progress

`ConfirmPopup` is a controlled confirm dialog (host must set `show` back to `false`); `customConfirm` is imperative and returns `Promise<boolean>`; `LoadingProgressService` provides a progress overlay for long-running tasks:

```ts
import { LoadingProgressService } from 'x-widgets-element-plus'

const progress = LoadingProgressService.show({ title: 'Importing records' })
try {
  await importRecords((percent: number) => progress.update({ progress: percent }))
  progress.update({ progress: 100, progressText: 'Import complete' })
} finally {
  progress.close()
}
```

The service also offers `progress(title, options)`, `autoProgress(title, options)` (timer-driven simulated progress), and `closeAll()`.

## Documented examples

The showcase components in the online docs compose the capabilities above into interactive, real-world scenarios; their source lives in `docs/.vitepress/components/`:

- **Real cases (`RealCaseDemo.vue`)**
  1. **Project management · list query**: a two-column `SearchForm` declares filters; submitting applies the same `formData` to a results table.
  2. **Create / edit modal**: `FormModal` shares one `formModel` across create, edit, and detail; detail only flips `disabled`.
  3. **Cost workbench · inline inputs**: inline layout with an editable cell rendered as a click-to-upload box via a `formSlot` render function.
- **Advanced usage (`AdvancedDemo.vue`)**: one field contract reused across `multi` (`colspan` two-column), `split` (grid via `fieldsetStyle`), `inline` (query bar), and `vertical` (label above) layouts, covering `formSlot` (render function and string slot name), `beforeSlot` / `afterSlot` affixes, block-level `slot`, and `header` / `footer` / `modelTitle` / `btnAfter` slots.

See the [online docs](https://michael-py001.github.io/x-widgets-element-plus/) for the interactive versions, or run `npm run docs:dev` locally.

## Components

### Schema forms & containers

`CustomForm`, `CustomFormItem`, `FormPage`, `SearchForm`, `FormModal` (search uses a flat `column`; form pages/modals use grouped `formModel`).

### Feedback & progress

`ConfirmPopup` (controlled confirm dialog), `customConfirm` (promise-based imperative confirm), `Tag` / `CustomTag` (status tag), `CustomTooltip` (table-cell tooltip), `LoadingProgress` + `LoadingProgressService` (determinate progress overlay).

### Area

`AreaCascader` (built-in province/city/district data), `CityPicker` (`maxLevel=2` schema adapter), `AreaPicker` (`maxLevel=3` schema adapter).

### Tables

`Table` (standard schema table with pagination), `TableVirtualized` (Element Plus Table V2 for large datasets).

### Base control adapters

`Input`, `InputPassword`, `InputSearch`, `InputNumber`, `InputOtp`, `InputTag`, `Textarea`, `Select` (with `SelectOption`), `TreeSelect`, `Cascader`, `Checkbox`, `CheckboxGroup`, `RadioGroup`, `Switch`, `DatePicker`, `TimePicker`, `TimeSelect`, `Autocomplete`, `Mentions`, `Rate`, `Slider`, `ColorPicker`, `RangeInput`, `Transfer`, `Upload`, `Segmented`, `Text`.

Schema `el` / `type` values include `input`, `input-password`, `input-search`, `select`, `tree-select`, `cascader`, `textarea`, `input-number`, `date-picker`, `range-picker`, `time-picker`, `time-range-picker`, `city-picker`, `area-picker`, `range-input`, `rate`, `slider`, `color-picker`, `mentions`, `checkbox`, `checkbox-group`, `radio-group`, `switch`, `autocomplete`, `text`, `transfer`, `upload`, `segmented`, `input-otp`, `input-tag`, `time-select`, with `x-`-prefixed compatibility aliases accepted.

### Utilities

The package root also exports `setFormdata`, `getValue`, `editForm`, `useForm`, `useFormTools`, `pick`, `omit`, `combind`, `pickNativeWidgetProps`, `normalizeWidgetOptions`, and related types.

## Documentation

- 简体中文 (default): https://michael-py001.github.io/x-widgets-element-plus/
- English: https://michael-py001.github.io/x-widgets-element-plus/en/

Docs source lives in `docs/` — Chinese at the root path, English under `docs/en/`. Run `npm run docs:dev` to view locally and `npm run docs:build` to build the static site. The `Deploy documentation` workflow publishes to GitHub Pages on pushes to `main` and on manual dispatch; Pages must use **GitHub Actions** as its build and deployment source. Repository contributors can also use `.agents/skills/x-widgets-element-plus/SKILL.md` with coding agents.

## Development

```sh
npm install
npm run typecheck
npm test
npm run build
npm pack --dry-run
```

Build artifacts are emitted to `dist/` as ESM, CommonJS, TypeScript declarations, and `style.css`.

## License

MIT. See [LICENSE](./LICENSE).
