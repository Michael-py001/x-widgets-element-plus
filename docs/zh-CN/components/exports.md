# 工具与类型导出

包根目录（`src/index.ts`）重新导出 `src/components.ts` 与 `src/utils` 的全部内容，以及 Vue 插件 `install` 与默认导出。本页以简要用途罗列这些根目录级的工具与公开类型。请从 `x-widgets-element-plus` 导入；内部源码路径不属于稳定 API。组件清单见[导出的组件](/zh-CN/components/)。

## 插件

| 导出 | 类型 | 用途 |
| --- | --- | --- |
| `install` | 函数 | Vue 插件，注册所有可安装组件以及直接注册组件（`Table`、`TableVirtualized`、`AreaCascader`、`LoadingProgress`、`CustomTooltip`）。 |
| 默认导出 | 对象 | `{ install }`，用于 `app.use(XWidgets)`。 |

## 表单数据工具（`src/utils/handleFormData.ts`）

| 导出 | 类型 | 用途 |
| --- | --- | --- |
| `setFormdata` | 函数 | 按字段名或双元素路径将组件值写入 `formData`。 |
| `getValue` | 函数 | 按字段名或双元素路径从 `formData` 读取值。 |
| `WidgetFormFieldPrimitive` | 类型 | `string \| number \| boolean \| Date \| null \| undefined`。 |
| `WidgetFormFieldValue` | 类型 | 基础值或基础值数组。 |
| `WidgetFormDataRecord` | 类型 | 表单数据对象的 `Record<string \| number, any>`。 |
| `WidgetFormFieldPath` | 类型 | `string \| Array<string \| number>`。 |

## 表单辅助函数（`src/utils/useForm.ts`）

| 导出 | 类型 | 用途 |
| --- | --- | --- |
| `editForm` | 函数 | 将 `record` 中匹配的键就地复制到 `formData`；任一参数缺失时抛错。 |
| `useForm` | 函数 | 返回 `{ formData, editForm, resetForm }`；`resetForm` 恢复初始化时克隆的值。 |
| `combind` | 函数 | 将 `newData` 中匹配的键就地复制到 `oldData`。 |
| `omit` | 函数 | 返回剔除指定键后的 `data` 浅拷贝。 |
| `pick` | 函数 | 返回仅包含指定键的 `data` 浅拷贝。 |

## 表单规则辅助函数（`src/utils/useFormTools.ts`）

| 导出 | 类型 | 用途 |
| --- | --- | --- |
| `useFormTools` | 函数 | 返回 schema 表单辅助函数：`createSearchFormRules`、`createFormPageRules`、`checkDisplay`、`isShow`、`setDefaultValue`、`getSelectedAddressName`，以及 `cityPickerData` / `cityPickerNames` ref。 |

## Widget props 工具（`src/utils/widgetComponentUtils.ts`）

| 导出 | 类型 | 用途 |
| --- | --- | --- |
| `WIDGET_FORM_BRIDGE_PROP_KEYS` | 常量 | 透传给原生控件前需剥离的表单桥接私有键。 |
| `WIDGET_OPTION_PROP_KEYS` | 常量 | 桥接键加上 `options`、`valueKey`、`labelKey`。 |
| `WIDGET_AUTOCOMPLETE_PROP_KEYS` | 常量 | 桥接键加上 `options`、`labelKey`（保留原生 `valueKey`）。 |
| `WIDGET_TEXT_PROP_KEYS` | 常量 | 桥接键加上 `textValue`、`textBold`。 |
| `pickNativeWidgetProps` | 函数 | 复制 props 并剔除私有键，使结果可安全展开到原生元素。 |
| `normalizeWidgetOptions` | 函数 | 将选项源（数组 / `Ref` / `ComputedRef`）归一化为可渲染数组，基础值包装为 `{ label, value }`。 |
| `WidgetOptionPrimitive` | 类型 | `string \| number \| boolean`。 |
| `WidgetOptionItem` | 类型 | 选项项：对象记录或基础值。 |
| `WidgetOptionList` | 类型 | 可变或只读的选项项数组。 |
| `WidgetOptionSource` | 类型 | 选项数组、`Ref`、`ComputedRef` 或 `undefined`。 |

## 来自 `src/components.ts` 的公开类型

### 表单与字段类型

| 类型 | 来源 | 用途 |
| --- | --- | --- |
| `TextValueFormatter` | Text | `Text.textValue` 的格式化函数类型。 |
| `ColumnForFormItemType` | FormItem | 表单/搜索字段的 schema。 |
| `FormItemAffixSlotRender`、`FormItemSlotRender`、`FormBlockSlotRender`、`FormSlotRenderContext`、`FormItemSlotRenderContext` | FormItem | 类型化的渲染回调与插槽上下文。 |
| `FormItemCoreProps`、`FormItemFieldName`、`FormItemProps` | FormItem | 表单项 prop 与字段名类型。 |
| `FormModelBlock`、`FormPageProps` | FormPage | 分组区块 schema 与 `FormPage` props。 |
| `SearchFormProps` | SearchForm | `SearchForm` 的 props。 |

### 表格类型

| 类型 | 用途 |
| --- | --- |
| `TableColumn` | 标准 `Table` 的列定义。 |
| `TableExposeInstance` | `Table` 暴露的实例类型。 |
| `ExtendedPaginationProps` | 与表格共享的扩展分页选项。 |

### 弹窗、反馈与进度类型

| 类型 | 用途 |
| --- | --- |
| `CustomConfirmOptions` | `customConfirm` 的配置。 |
| `ConfirmCancelStatus` | 确认取消时的拒绝值（`{ status: 'cancel' }`）。 |
| `LoadingProgressProps` | `LoadingProgress` 的 props。 |
| `LoadingProgressOptions`、`LoadingProgressInstance` | 服务配置与 `LoadingProgressService` 返回的实例。 |
| `CustomTooltipProps` | `CustomTooltip` 的 props。 |

### AreaCascader 类型

`AreaNode`、`AreaMaxLevel`、`AreaMinSelectLevel`、`BuildAreaOptionsConfig` 与 `NormalizeAreaPathConfig` 已在 [AreaCascader](/zh-CN/components/area-cascader) 中列出。

## 相关页面

- [导出的组件](/zh-CN/components/)
- [弹窗、标签与提示](/zh-CN/components/feedback)
- [AreaCascader](/zh-CN/components/area-cascader)
