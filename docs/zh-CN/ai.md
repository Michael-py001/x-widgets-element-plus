# AI 与编码 Agent 指南

本包附带一份 Agent skill：`.agents/skills/x-widgets-element-plus/SKILL.md`；该文件会随 npm 包发布，并复制到 VitePress 构建产物的 `/agents/skills/x-widgets-element-plus/SKILL.md`。它用于指导编码 Agent 选对框架、基于真实的导出与类型编写代码，并验证改动。

## 给 Agent 提供正确的上下文

1. 明确说明宿主应用使用 **Vue 3 + Element Plus 2**。
2. 指定使用 `x-widgets-element-plus`；不要混入 Ant Design Vue 包。
3. 让 Agent 参考本页以及 `.agents/skills/x-widgets-element-plus/SKILL.md`。
4. 要求从包根目录导入，并加载 Element Plus CSS 与本包 CSS。
5. 要求其在适用场景使用 `ColumnForFormItemType`、`FormModelBlock`、`TableColumn` 和 `AreaNode`。
6. 将 API 访问与业务行为保留在宿主应用中；通过 props 把数据传给组件。
7. 通过 typecheck、测试、构建与文档构建进行验证。

## 上下文文件

- [`/llms.txt`](/llms.txt)：部署后的精简检索索引；源文件为 `docs/public/llms.txt`。
- [导出清单](/zh-CN/components/)：包根目录导出的名称与类型。
- [基础控件](/zh-CN/components/controls)：直接控件适配器与原生契约边界。
- [Schema 表单](/zh-CN/components/forms)：SearchForm、FormPage、字段 schema 与事件。
- [表格](/zh-CN/components/table)：标准表格与虚拟滚动表格的契约差异。
- [AreaCascader](/zh-CN/components/area-cascader)：选中值与层级规则。
- [LoadingProgress](/zh-CN/components/loading-progress)：组件与命令式服务的生命周期。
- [兼容性](/zh-CN/components/compatibility)：相对 Ant Design Vue 的迁移限制。

## Prompt 模板

> 请用 `x-widgets-element-plus` 在我的 Vue 3 + Element Plus 应用中实现这个页面。先阅读该包的组件清单与 skill。只使用包根目录的导出以及已声明的 props/类型。用 `ColumnForFormItemType` 定义字段，用 `FormModelBlock[]` 定义 FormPage 的分组区块，并根据文档中的契约选择 `Table` 或 `TableVirtualized`。数据请求保留在应用侧，加载 Element Plus 与本包的 CSS，并如实报告实际运行的本地检查。不要臆测 Ant Design Vue 的 API，也不要凭空发明组件 prop。

## 事实依据（Ground truth）

源码导出列表是 `src/components.ts`；各组件的封装契约位于组件类型文件与生成的类型声明中。Element Plus 原生行为请以框架文档为准。如果文档与类型声明不一致，以本版本的声明/源码为准，并上报该差异以便修正。
