# Controls

These are the direct control adapters exported by `x-widgets-element-plus`. They keep Element Plus as the native contract and add the package's form-data bridge where documented.

## Import from the package root

```ts
import {
  AreaPicker,
  Autocomplete,
  Cascader,
  Checkbox,
  CheckboxGroup,
  CityPicker,
  ColorPicker,
  DatePicker,
  Input,
  InputNumber,
  InputPassword,
  InputSearch,
  InputOtp,
  InputTag,
  Mentions,
  RadioGroup,
  RangeInput,
  Rate,
  Select,
  Slider,
  Switch,
  Text,
  Segmented,
  TimeSelect,
  Textarea,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload
} from 'x-widgets-element-plus'
import 'element-plus/dist/index.css'
import 'x-widgets-element-plus/style.css'
```

Internal source paths are not a stable API. See [Exported components](/en/components/) for the complete root catalog.

## Data-entry adapters

| Component | Use it for | Package-specific contract |
| --- | --- | --- |
| `Input` | Single-line text | Supports direct `v-model`; in a schema, `name`, `formData`, `label`, `props`, and `event` are consumed by the form bridge. |
| `InputPassword` | Password entry | Element Plus Input with `type="password"`; schema `input-password`. |
| `InputSearch` | Search entry | Element Plus Input with a search prefix icon; `event.onSearch` runs on Enter; schema `input-search`. |
| `Textarea` | Multiline text | Uses Element Plus textarea semantics with the same form bridge. |
| `InputNumber` | Numeric values | Keeps Element Plus `min`, `max`, `step`, and `precision`. |
| `Select` | Select one or more values | Uses Element Plus select props and supports the package's schema bridge. |
| `Cascader` | Multi-level selection | Wraps Element Plus Cascader; schema `options` are normalized; schema `cascader`. |
| `TreeSelect` | Select a node from a tree | Wraps Element Plus TreeSelect; schema `options` are normalized into native `data`. |
| `CityPicker` | City-level area selection | Built-in China area data via `AreaCascader` (`maxLevel=2`); schema `city-picker`. |
| `AreaPicker` | District-level area selection | Built-in China area data via `AreaCascader` (`maxLevel=3`); schema `area-picker`. |
| `RangeInput` | Two-value range | Two Element Plus inputs joined by a separator; writes a `[start, end]` array; schema `range-input`. |
| `Rate` | Star rating | Wraps Element Plus Rate; schema `rate`. |
| `Slider` | Numeric slider | Wraps Element Plus Slider; schema `slider`. |
| `ColorPicker` | Color selection | Wraps Element Plus ColorPicker; schema `color-picker`. |
| `Mentions` | `@` mention input | Uses Element Plus `ElMention`; schema `options` are normalized; schema `mentions`. |
| `DatePicker` | Date or date range | Uses Element Plus date-picker props and supports the package's schema bridge. |
| `TimePicker` | Time or time range | Uses Element Plus time-picker props; schema `time-range-picker` sets `isRange` automatically. |
| `RadioGroup` | One value from options | `options` accepts arrays, readonly arrays, `Ref`, and `ComputedRef`; `labelKey` and `valueKey` customize fields. |
| `Checkbox` | Single boolean toggle | Wraps Element Plus checkbox; schema `checkbox` writes a boolean to the field. |
| `CheckboxGroup` | Multiple values | Uses the same option normalization as `RadioGroup`; the model should be an array. |
| `Switch` | Single boolean toggle | Wraps Element Plus switch; schema `switch` writes a boolean to the field. |
| `Autocomplete` | Candidate selection | Local options are filtered by `labelKey`; `valueKey` follows Element Plus semantics. A supplied `fetchSuggestions` callback takes precedence. |
| `Transfer` | Transfer list | Wraps Element Plus Transfer; schema `options` are normalized into native `data`, selected keys use `modelValue`; schema `transfer`. |
| `Upload` | File upload | Wraps Element Plus Upload; the controlled value is `fileList` (not `value`/`modelValue`); schema `upload`. |
| `Text` | Read-only display | `textValue` can be a value or formatter; it never writes back to the form model. |
| `Segmented` | Segmented control | Wraps Element Plus Segmented; schema `options` are the candidates; schema `segmented`. |
| `InputOtp` | One-time password | Wraps Element Plus InputOtp; `modelValue` holds the code; schema `input-otp`. |
| `InputTag` | Tag input | Wraps Element Plus InputTag; `modelValue` holds the tag array; schema `input-tag`. |
| `TimeSelect` | Fixed-interval time select | Wraps Element Plus TimeSelect; schema `time-select`. |

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Autocomplete, Input, RadioGroup } from 'x-widgets-element-plus'

const keyword = ref('')
const enabled = ref(true)
const names = [{ label: 'Alpha', value: 'alpha' }, { label: 'Beta', value: 'beta' }]
</script>

<template>
  <Input v-model="keyword" placeholder="Search records" clearable />
  <RadioGroup v-model="enabled" :options="[{ label: 'Enabled', value: true }, { label: 'Disabled', value: false }]" />
  <Autocomplete v-model="keyword" :options="names" />
</template>
```

The host application owns options, requests, loading state, permissions, and side effects. These adapters do not fetch domain data for you.

## Interactive example

### Basic usage

One `column` schema is rendered by `SearchForm` into a query form (`colspan=12`, two columns); all field values write into a single `formData` object, then filter the results below. Try a project name, owner, or type, then click "Search".

<ClientOnly><ElementControlDemo /></ClientOnly>

### Advanced usage

Switch between "multi-column / split / inline": the same field contract renders three ways — `colspan` grid, `fieldsetStyle` split columns, and an inline `SearchForm`. Slots cover `formSlot` render functions, `beforeSlot`/`afterSlot` affixes, and a named string `slot`. Click "Attachment" to try the slot.

<ClientOnly><ElementAdvancedDemo /></ClientOnly>

### Real-page case

Three composables from real pages, reduced to one interactive demo that shows schema bridging in production scenarios:

1. **Project management · list query** (`useBasicProjectSearchForm`): a two-column (`colspan=12`) query form; submitting filters the table from the same `formData`.
2. **Create / edit modal** (`useBasicProjectFormModal`): detail, edit and create share one `formModel`; detail mode only flips `disabled`.
3. **Cost workbench · inline inputs** (`useGeneralCostEditForm`): `colspan` has no effect in an `inline` layout; a `formSlot` render function turns a field into a click-to-upload box.

Try searching, creating a project, then editing or viewing its details to see one field contract reused across all three scenarios.

<ClientOnly><ElementRealCaseDemo /></ClientOnly>

### Control gallery

The scenarios above mostly use text and select fields. Here 20+ form controls are written into **one `column` schema** and rendered by `FormPage` into a single `formData`; editing any control updates the model below live. This is schema bridging, not importing each component and binding its own `v-model`.

<ClientOnly><ElementControlGallery /></ClientOnly>

## Schema bridge

Use `ColumnForFormItemType` and `FormModelBlock` when fields are rendered through `FormPage`, `FormModal`, or `SearchForm`:

```ts
const formModel: FormModelBlock[] = [
  {
    title: 'Record',
    column: [
      { name: 'name', label: 'Name', type: 'input', required: true },
      {
        name: 'state',
        label: 'State',
        type: 'radio-group',
        options: [
          { label: 'Draft', value: 'draft' },
          { label: 'Published', value: 'published' }
        ]
      }
    ]
  }
]
```

Do not add a second `v-model` to a schema-managed field. Use `formSlot` when a custom control still needs the label, field path, and validation container. See [Schema forms](/en/components/forms) for the complete rules.

A control `type` accepts both the bare name (`input`, `transfer`, `upload`, ...) and an `x-` prefixed alias (`x-input`, `x-transfer`, `x-upload`, ...); both resolve to the same adapter, keeping schema syntax consistent with `x-widgets-antdv`.

## Native and package boundaries

- Element Plus props and events remain the source of truth for native behavior.
- `Table` and `TableVirtualized` are separate contracts; `TableColumn` is for the standard table, not Table V2.
- `DatePicker` and `Select` are package-root exports and schema adapters; their native props follow Element Plus.
- `AreaCascader` is a package export with built-in data and an explicit `treeData` override; see its dedicated reference. `CityPicker` and `AreaPicker` are fixed-level schema adapters over it.
- `Mentions` follows Element Plus `ElMention` (the component export name); its native `props` field keeps ElMention's option-alias meaning, not the form-bridge meaning.
- If a prop is absent from the generated declarations and these docs, do not invent it.
