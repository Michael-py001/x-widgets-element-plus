# 跨库兼容性

`x-widgets-element-plus` 面向 Vue 3 + Element Plus 构建。同系列的 `x-widgets-antdv` 包面向 Ant Design Vue。两者都提供 schema 驱动的组件，但它们是分别构建的库，遵循各自框架的原生契约——并非可以互换的实现。

## 共有概念

两个包都在根目录导出了 `Input`、`InputNumber`、`RadioGroup`、`Checkbox`、`CheckboxGroup`、`Textarea`、`DatePicker`、`Select`、`Switch`、`TimePicker`、`TreeSelect`、`CustomForm`、`CustomFormItem`、`FormPage`、`SearchForm`、`ConfirmPopup`、`FormModal`、`Table` 和 `Tag`。迁移时请逐一核对目标包的导出与类型；名称相似不代表行为一致。

| 领域 | Element Plus 包 | Ant Design Vue 包 |
| --- | --- | --- |
| UI peer 依赖 | Element Plus 2.x | Ant Design Vue 4.x |
| 全局基础 CSS | Element Plus CSS + 本包 CSS | Ant Design Vue reset CSS + 本包 CSS |
| 表单 schema | `SearchForm.column[]`；`FormPage` / `FormModal.formModel[]` 区块。渲染函数插槽与 `display` / `required` 字段支持均有类型。 | `column[]` 字段 schema，使用 Ant Design Vue 的控件 props 与插槽名；详见对应包的字段类型。 |
| 标准表格 | Element Plus 表格；schema 使用 `TableColumn` 与 `data`。另含独立的 `TableVirtualized` 导出。 | Ant Design Vue 表格；使用上游 `TableProps`，包括其 columns 与 `dataSource` 约定。 |
| 级联行政区划 | `AreaCascader`，内置数据、自定义 `treeData`，以及 `path`/`joined` 模型值。 | `AreaPicker` 与 `CityPicker` 表单项集成。 |
| 特色导出 | `Autocomplete`、`Text`、`TableVirtualized`、`AreaCascader`、`LoadingProgress`、`LoadingProgressService`、`CustomTooltip`、`customConfirm`。 | `AutoComplete`、Ant Design Vue 的大量控件重导出、`FunctionButton`、`GoBack`、`TabPage`、`DropdownButtonList`。 |

## 迁移清单

1. 替换 UI peer 依赖及其 CSS 导入；不要为了模仿一致性而同时加载两套框架样式。
2. 核对每一个包根目录组件名。例如本包导出 `Autocomplete`，而 Ant Design Vue 包使用 `AutoComplete`。
3. 适配表格输入（本包的 `data`/`TableColumn` 对比 Ant Design Vue 的 `dataSource`/columns）、分页、事件与自定义单元格插槽。
4. 对照目标包的 `ColumnForFormItemType` 重新核对表单区块结构与字段控件；schema 的支持能力已按设计产生分歧。
5. 在目标框架中重新测试所需层级、值序列化、插槽与响应式布局。

请将[导出清单](/components/)与[schema 指南](/components/forms)作为当前 Element Plus 的契约依据。不要凭猜测判断一致性，也不要静默映射不受支持的 props。
