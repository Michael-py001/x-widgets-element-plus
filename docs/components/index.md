# Exported components

This catalog follows the package-root exports in `src/components.ts`. Import from `x-widgets-element-plus`; deep source paths are not stable public API.

## Controls

`Autocomplete`, `AreaPicker`, `Cascader`, `Checkbox`, `CheckboxGroup`, `CityPicker`, `ColorPicker`, `DatePicker`, `Input`, `InputNumber`, `InputPassword`, `InputSearch`, `Mentions`, `RadioGroup`, `RangeInput`, `Rate`, `Select`, `SelectOption`, `Slider`, `Switch`, `TimePicker`, `TreeSelect`, `Table`, `TableVirtualized`, `Textarea`, and `Text`.

## Business widgets

`ConfirmPopup`, `CustomForm`, `CustomFormItem`, `FormModal`, `FormPage`, `SearchForm`, `Tag`, `AreaCascader`, `LoadingProgress`, and `LoadingProgressService`.

`CustomTooltip` is exported from the root through the tooltip module. The root also re-exports `customConfirm` (with `CustomConfirmOptions` and `ConfirmCancelStatus`), and AreaCascader data/normalization helpers including `CITY_SELF_LEVEL`, `PRIORITY_PROVINCES`, `chinaAreaVersion`, `getChinaAreaData`, `setChinaAreaData`, `clipAreaTree`, `sortPriorityProvinces`, `AreaNode`, `AreaMaxLevel`, `AreaMinSelectLevel`, `BuildAreaOptionsConfig`, `NormalizeAreaPathConfig`, `buildAreaOptions`, `chinaAreaData`, `formatAreaValue`, `injectCitySelfLevel`, `normalizeAreaPath`, and `parseAreaValue`. Their props, events, return values, and behavior are documented in [Dialogs, tags & tooltips](/components/feedback), [AreaCascader](/components/area-cascader), and [Utility & type exports](/components/exports).

## Common import pattern

```ts
import {
  AreaCascader,
  CustomForm,
  FormPage,
  SearchForm,
  Table,
  TableVirtualized,
  Tag,
} from 'x-widgets-element-plus'
import type {
  AreaNode,
  ColumnForFormItemType,
  FormModelBlock,
  SearchFormProps,
  TableColumn,
} from 'x-widgets-element-plus'
```

## Distinguish the table options

`Table` is the package's standard table widget and exposes Element Plus table props together with `TableColumn` and the shared pagination options. `TableVirtualized` uses Element Plus Table V2 and is intended for large row counts; its dimensions and cell/column options follow that implementation rather than the standard table. Check the respective exported prop types before switching between them.

## Related pages

- [Controls](/components/controls)
- [Schema forms](/components/forms)
- [Table and virtualization](/components/table)
- [Dialogs, tags & tooltips](/components/feedback)
- [AreaCascader](/components/area-cascader)
- [Utility & type exports](/components/exports)
- [Cross-library compatibility](/components/compatibility)
