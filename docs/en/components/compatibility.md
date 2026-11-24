# Cross-library compatibility

`x-widgets-element-plus` is built for Vue 3 + Element Plus. The sibling `x-widgets-antdv` package targets Ant Design Vue. Both offer schema-driven widgets, but they are separately built libraries with native framework contracts—not interchangeable implementations.

## Shared concepts

Both packages have root exports for `Input`, `InputNumber`, `RadioGroup`, `Checkbox`, `CheckboxGroup`, `Textarea`, `DatePicker`, `Select`, `Switch`, `TimePicker`, `TreeSelect`, `CustomForm`, `CustomFormItem`, `FormPage`, `SearchForm`, `ConfirmPopup`, `FormModal`, `Table`, and `Tag`. Validate each target package's exports and types during migration; similar names do not promise identical behavior.

| Area | Element Plus package | Ant Design Vue package |
| --- | --- | --- |
| UI peer | Element Plus 2.x | Ant Design Vue 4.x |
| Global base CSS | Element Plus CSS + package CSS | Ant Design Vue reset CSS + package CSS |
| Form schema | `SearchForm.column[]`; `FormPage` / `FormModal.formModel[]` blocks. Render-function slots and `display` / `required` field support are typed. | `column[]` field schemas with Ant Design Vue control props and slot names; see the package-specific field type. |
| Standard table | Element Plus table; schema uses `TableColumn` and `data`. Includes a separate `TableVirtualized` export. | Ant Design Vue table; uses upstream `TableProps`, including its columns and `dataSource` convention. |
| Cascading area | `AreaCascader` with built-in data, custom `treeData`, and `path`/`joined` model values. | `AreaPicker` and `CityPicker` form-item integrations. |
| Shared form controls | `Input`, `InputPassword`, `InputSearch`, `Textarea`, `InputNumber`, `Select`, `TreeSelect`, `RadioGroup`, `Checkbox`, `CheckboxGroup`, `Switch`, `DatePicker`, `RangePicker`, `TimePicker`, `TimeRangePicker`, `Autocomplete`, `Cascader`, `Rate`, `Slider`, `Mentions`, `Transfer`, `Upload`, `Segmented`, `CityPicker`, `AreaPicker`, `RangeInput`, `Text`; schema `type` accepts both bare names and `x-` aliases. | The same controls (including `transfer` and `upload`); AntD spells the autocomplete export `AutoComplete`. |
| Distinctive exports | `Autocomplete`, `Text`, `TableVirtualized`, `AreaCascader`, `LoadingProgress`, `LoadingProgressService`, `CustomTooltip`, `customConfirm`, `ColorPicker`. | `AutoComplete`, Ant Design Vue's broad control re-exports, `FunctionButton`, `GoBack`, `TabPage`, `DropdownButtonList`. |
| Framework-only control | `ColorPicker` (available from Element Plus upstream; Ant Design Vue 4 has no equivalent). | No `ColorPicker`; do not declare `color-picker` in this package's schema. |


Element Plus additionally offers `input-otp`, `input-tag`, and `time-select` form controls (from its upstream; Ant Design Vue 4 has no equivalents). Check these explicitly when porting schemas; do not assume interchangeability.

## Migration checklist

1. Replace the UI peer and its CSS import; do not load both framework styles to imitate parity.
2. Verify every package-root component name. For example, this package exports `Autocomplete`; the Ant Design Vue package uses `AutoComplete`.
3. Adapt table inputs (`data`/`TableColumn` versus Ant Design Vue's `dataSource`/columns), pagination, events, and custom cell slots.
4. Recheck form block structure and field controls against target `ColumnForFormItemType`; schema support has diverged by design.
5. Re-test required levels, value serialization, slots, and responsive layout in the target framework.

Use [the exported catalog](/en/components/) and [schema guide](/en/components/forms) as the current Element Plus contract. Do not guess parity or silently map unsupported props.
