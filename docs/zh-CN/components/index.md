# 导出的组件

本清单对应 `src/components.ts` 中包根目录的导出。请从 `x-widgets-element-plus` 导入；内部源码路径不属于稳定的公开 API。

## 基础控件

`Autocomplete`、`Checkbox`、`CheckboxGroup`、`DatePicker`、`Input`、`InputNumber`、`RadioGroup`、`Select`、`SelectOption`、`Switch`、`TimePicker`、`TreeSelect`、`Table`、`TableVirtualized`、`Textarea` 和 `Text`。

## 业务组件

`ConfirmPopup`、`CustomForm`、`CustomFormItem`、`FormModal`、`FormPage`、`SearchForm`、`Tag`、`AreaCascader`、`LoadingProgress` 和 `LoadingProgressService`。

`CustomTooltip` 通过 tooltip 模块从包根目录导出。根目录还重新导出了 `customConfirm`（含 `CustomConfirmOptions` 与 `ConfirmCancelStatus`），以及 AreaCascader 的数据/归一化辅助函数，包括 `CITY_SELF_LEVEL`、`PRIORITY_PROVINCES`、`chinaAreaVersion`、`getChinaAreaData`、`setChinaAreaData`、`clipAreaTree`、`sortPriorityProvinces`、`AreaNode`、`AreaMaxLevel`、`AreaMinSelectLevel`、`BuildAreaOptionsConfig`、`NormalizeAreaPathConfig`、`buildAreaOptions`、`chinaAreaData`、`formatAreaValue`、`injectCitySelfLevel`、`normalizeAreaPath` 和 `parseAreaValue`。其 props、事件、返回值与行为详见[弹窗、标签与提示](/zh-CN/components/feedback)、[AreaCascader](/zh-CN/components/area-cascader)与[工具与类型导出](/zh-CN/components/exports)。

## 常见导入方式

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

## 区分两种表格

`Table` 是本包的标准表格组件，包含 Element Plus 表格 props、`TableColumn` 以及共享的分页选项。`TableVirtualized` 基于 Element Plus Table V2，面向大行数场景；其尺寸与单元格/列选项遵循 V2 的实现，而非标准表格。在两者之间切换前，请先查看各自导出的 prop 类型。

## 相关页面

- [基础控件](/zh-CN/components/controls)
- [Schema 表单](/zh-CN/components/forms)
- [表格与虚拟滚动](/zh-CN/components/table)
- [弹窗、标签与提示](/zh-CN/components/feedback)
- [AreaCascader](/zh-CN/components/area-cascader)
- [工具与类型导出](/zh-CN/components/exports)
- [跨库兼容性](/zh-CN/components/compatibility)
