# Utility & type exports

The package root (`src/index.ts`) re-exports everything from `src/components.ts` and `src/utils`, plus the Vue plugin `install` and a default export. This page catalogs those root-level utilities and public types with concise purposes. Import from `x-widgets-element-plus`; deep source paths are not stable API. For the component catalog see [Exported components](/components/).

## Plugin

| Export | Kind | Purpose |
| --- | --- | --- |
| `install` | function | Vue plugin that registers every installable component plus direct components (`Table`, `TableVirtualized`, `AreaCascader`, `LoadingProgress`, `CustomTooltip`). |
| default | object | `{ install }`, for `app.use(XWidgets)`. |

## Form-data utilities (`src/utils/handleFormData.ts`)

| Export | Kind | Purpose |
| --- | --- | --- |
| `setFormdata` | function | Writes a widget value into `formData` by field name or a two-element path. |
| `getValue` | function | Reads a value from `formData` by field name or a two-element path. |
| `WidgetFormFieldPrimitive` | type | `string \| number \| boolean \| Date \| null \| undefined`. |
| `WidgetFormFieldValue` | type | A primitive or an array of primitives. |
| `WidgetFormDataRecord` | type | `Record<string \| number, any>` for form-data objects. |
| `WidgetFormFieldPath` | type | `string \| Array<string \| number>`. |

## Form helpers (`src/utils/useForm.ts`)

| Export | Kind | Purpose |
| --- | --- | --- |
| `editForm` | function | Copies matching keys from `record` into `formData` in place; throws if either argument is missing. |
| `useForm` | function | Returns `{ formData, editForm, resetForm }`; `resetForm` restores values cloned at initialization. |
| `combind` | function | Copies matching keys from `newData` into `oldData` in place. |
| `omit` | function | Returns a shallow copy of `data` without the listed keys. |
| `pick` | function | Returns a shallow copy of `data` containing only the listed keys. |

## Form-rule helpers (`src/utils/useFormTools.ts`)

| Export | Kind | Purpose |
| --- | --- | --- |
| `useFormTools` | function | Returns helpers for schema forms: `createSearchFormRules`, `createFormPageRules`, `checkDisplay`, `isShow`, `setDefaultValue`, `getSelectedAddressName`, and refs `cityPickerData` / `cityPickerNames`. |

## Widget prop utilities (`src/utils/widgetComponentUtils.ts`)

| Export | Kind | Purpose |
| --- | --- | --- |
| `WIDGET_FORM_BRIDGE_PROP_KEYS` | const | Private form-bridge keys stripped before passing props to native controls. |
| `WIDGET_OPTION_PROP_KEYS` | const | Bridge keys plus `options`, `valueKey`, `labelKey`. |
| `WIDGET_AUTOCOMPLETE_PROP_KEYS` | const | Bridge keys plus `options`, `labelKey` (keeps native `valueKey`). |
| `WIDGET_TEXT_PROP_KEYS` | const | Bridge keys plus `textValue`, `textBold`. |
| `pickNativeWidgetProps` | function | Copies props and removes private keys so the result is safe to spread onto native elements. |
| `normalizeWidgetOptions` | function | Normalizes an option source (array / `Ref` / `ComputedRef`) into a renderable array, wrapping primitive values as `{ label, value }`. |
| `WidgetOptionPrimitive` | type | `string \| number \| boolean`. |
| `WidgetOptionItem` | type | A record or a primitive option item. |
| `WidgetOptionList` | type | A mutable or readonly array of option items. |
| `WidgetOptionSource` | type | Option list, `Ref`, `ComputedRef`, or `undefined`. |

## Public types from `src/components.ts`

### Form & field types

| Type | Source | Purpose |
| --- | --- | --- |
| `TextValueFormatter` | Text | Formatter type for `Text.textValue`. |
| `ColumnForFormItemType` | FormItem | Field schema for form/search columns. |
| `FormItemAffixSlotRender`, `FormItemSlotRender`, `FormBlockSlotRender`, `FormSlotRenderContext`, `FormItemSlotRenderContext` | FormItem | Typed render callbacks and slot contexts. |
| `FormItemCoreProps`, `FormItemFieldName`, `FormItemProps` | FormItem | Form-item prop and field-name types. |
| `FormModelBlock`, `FormPageProps` | FormPage | Grouped section schema and `FormPage` props. |
| `SearchFormProps` | SearchForm | `SearchForm` props. |

### Table types

| Type | Purpose |
| --- | --- |
| `TableColumn` | Column definition for the standard `Table`. |
| `TableExposeInstance` | Instance type exposed by `Table`. |
| `ExtendedPaginationProps` | Extended pagination options shared with the table. |

### Dialog, feedback & progress types

| Type | Purpose |
| --- | --- |
| `CustomConfirmOptions` | Options for `customConfirm`. |
| `ConfirmCancelStatus` | Rejection value (`{ status: 'cancel' }`) on confirm cancellation. |
| `LoadingProgressProps` | Props for `LoadingProgress`. |
| `LoadingProgressOptions`, `LoadingProgressInstance` | Service options and the instance returned by `LoadingProgressService`. |
| `CustomTooltipProps` | Props for `CustomTooltip`. |

### AreaCascader types

`AreaNode`, `AreaMaxLevel`, `AreaMinSelectLevel`, `BuildAreaOptionsConfig`, and `NormalizeAreaPathConfig` are cataloged in [AreaCascader](/components/area-cascader).

## Related pages

- [Exported components](/components/)
- [Dialogs, tags & tooltips](/components/feedback)
- [AreaCascader](/components/area-cascader)
