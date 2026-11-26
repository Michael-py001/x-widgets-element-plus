# x-widgets-element-plus

[![CI](https://github.com/Michael-py001/x-widgets-element-plus/actions/workflows/ci.yml/badge.svg)](https://github.com/Michael-py001/x-widgets-element-plus/actions/workflows/ci.yml) [![Docs](https://img.shields.io/badge/docs-online-blue.svg)](https://michael-py001.github.io/x-widgets-element-plus/) [![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

> 简体中文 | [English](./README.en.md)

**x-widgets-element-plus** 是基于 Element Plus 2 的 Vue 3 组件库。它把项目里反复出现的「查询表单 → 弹窗编辑 → 详情展示 → 表格列表」流程沉淀为一套 Schema 驱动的组件：字段契约只声明一次，就能在搜索栏、表单页、弹窗之间复用，而不依赖宿主应用的私有 API。

组件包括控件适配器与带类型的 Schema 表单、表格、弹窗、反馈与进度组件，以及内置中国省市区数据的 `AreaCascader`。所有组件从包根目录导出，API 请求与业务状态始终留在宿主应用中。

> 本包与 `x-widgets-antdv` 是两套独立实现，框架、样式体系及组件行为均不可互换。

## 特性

- **统一类型入口**：所有组件与类型均从包根目录导出，ESM 与 CommonJS 共享同一份类型声明。
- **Schema 优先**：`ColumnForFormItemType` 字段契约贯穿查询与表单流程，`el` / `type` 选择控件，`props` / `options` / `rules` 与各类插槽描述交互与校验。
- **业务控件开箱即用**：双列查询表单、分组表单页、弹窗表单、确认弹窗、命令式确认、状态标签、单元格提示、进度遮罩，以及内置数据的省市区级联选择器。
- **反馈与进度**：`ConfirmPopup` 受控弹窗、`customConfirm` 返回 Promise、`LoadingProgressService` 支持确定进度与自动模拟进度。
- **面向 Agent 的文档**：双语 VitePress 文档、`llms.txt`、框架兼容性说明与编码 Agent 技能。

## 环境要求

| 依赖 | 支持版本 | 说明 |
| --- | --- | --- |
| Node.js | 18+ | 宿主应用工具链，建议使用受支持的活跃 LTS 版本。 |
| Vue | 3.5+ | peer 依赖。 |
| Element Plus | 2.11+ | peer 依赖；样式表需单独引入。 |
| `@element-plus/icons-vue` | 2.3+ | peer 依赖。 |

## 快速上手

### 安装

```sh
npm install x-widgets-element-plus vue element-plus @element-plus/icons-vue
```

Vue、Element Plus 与 `@element-plus/icons-vue` 均为 peer 依赖，需由宿主应用自行安装。

### 全局注册

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

在应用入口引入一次 Element Plus 样式与本包样式。

### 按需引入

```ts
import { AreaCascader, SearchForm, Table } from 'x-widgets-element-plus'
import type { AreaNode, ColumnForFormItemType, TableColumn } from 'x-widgets-element-plus'
import 'x-widgets-element-plus/style.css'
```

`AreaCascader` 内置行政区数据；传入 `treeData` 可使用自定义树。

## 核心用法

### 1. 查询表单（SearchForm）

字段通过 `column` 声明，值绑定在宿主持有的 `formData` 上（保持对象引用稳定，原地修改）：

```vue
<script setup lang="ts">
import { reactive } from 'vue'
import { SearchForm } from 'x-widgets-element-plus'
import type { ColumnForFormItemType } from 'x-widgets-element-plus'

const filters = reactive({ name: '', state: '' })
const columns: ColumnForFormItemType[] = [
  { name: 'name', label: '名称', el: 'input', props: { clearable: true } },
  {
    name: 'state', label: '状态', el: 'select',
    options: [
      { label: '草稿', value: 'draft' },
      { label: '已发布', value: 'published' }
    ]
  }
]

function search(values: typeof filters) {
  // 将 values 交给页面的列表查询
  console.log(values)
}
</script>

<template>
  <SearchForm :column="columns" :form-data="filters" @search="search" />
</template>
```

`SearchForm` 常用 props：`column`、`formData`（必填）、`labelWidth`、`labelAlign`（`left|right|top`，默认 `right`）、`layout`（`horizontal|vertical|inline`，默认 `inline`）、`colspan`、`gutter`、`verticalGap`、`disabled`、`loading`、`enabledExpand`、`showButtons`、`resetText`、`searchText`、`fixedSearchButton`、`buttonsSlotLayout`。事件：`search`、`reset`、`expand`。

### 2. 表单页与弹窗（FormPage / FormModal）

`FormPage`、`FormModal` 使用分组的 `formModel`，新增 / 编辑 / 详情可共用同一份 Schema：

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { FormModal } from 'x-widgets-element-plus'
import type { FormModelBlock } from 'x-widgets-element-plus'

const visible = ref(false)
const record = reactive({ name: '', category: '' })
const formModel: FormModelBlock[] = [
  {
    title: '基本信息',
    column: [
      { name: 'name', label: '名称', el: 'input', required: true },
      {
        name: 'category', label: '分类', el: 'select',
        options: [{ label: '硬件', value: 'hardware' }]
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
    modal-title="新增记录"
    :form-model="formModel"
    :form-data="record"
    layout="horizontal"
    @confirm="onConfirm"
  />
</template>
```

`FormModal` 常用 props：`modalTitle`、`show`（`v-model:show`）、`formModel`、`formData`、`modalWidth`（默认 `600px`）、`labelWidth`、`labelAlign`、`layout`（默认 `vertical`）、`gutter`、`cancelText`、`confirmText`、`showFooter`、`autoClose`（默认 `true`）、`disabled`、`okBtnLoading`。事件：`confirm`、`cancel`、`update:show`。

### 3. 表格（Table）

`Table` 组合 `ElTable` / `ElTableColumn`，按 `TableColumn[]` 渲染列，并可附加分页；标准 Element Plus props / 事件 / 插槽均会透传：

```vue
<script setup lang="ts">
import { Table } from 'x-widgets-element-plus'
import type { TableColumn } from 'x-widgets-element-plus'

const columns: TableColumn[] = [
  { prop: 'name', label: '名称', minWidth: 180 },
  { prop: 'status', label: '状态', width: 120 }
]
const rows = [
  { id: 'a1', name: 'Alpha', status: '草稿' },
  { id: 'b2', name: 'Beta', status: '已发布' }
]
const pagination = { currentPage: 1, pageSize: 20, total: rows.length }
</script>

<template>
  <Table :columns="columns" :data="rows" :pagination="pagination" :loading="false" />
</template>
```

包装层 props：`pagination`（传 `false` 关闭）、`paginationLayout`、`hideOnSinglePage`、`loading`、`border`。列支持 `children` 嵌套与 `cellRenderer`（返回 VNode）。`TableVirtualized` 是独立的 Table V2 组件，契约不同，不能直接替换。

### 4. 省市区级联（AreaCascader）

内置中国行政区数据，支持路径数组与拼接字符串两种值形态：

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

`AreaCascader` 常用 props：`v-model`、`valueType`（`path|joined`）、`separator`、`treeData`、`maxLevel`（1–3，默认 3）、`minSelectLevel`、`injectCitySelfLevel`、`priorityProvinces`、`checkStrictly`、`placeholder`、`clearable`、`filterable`。`change` 事件始终返回规范化的 `string[]` 路径。

### 5. 反馈与进度

`ConfirmPopup` 为受控确认弹窗（需手动把 `show` 置回 `false`）；`customConfirm` 是命令式确认，返回 `Promise<boolean>`；`LoadingProgressService` 用于长耗时任务的进度遮罩：

```ts
import { LoadingProgressService } from 'x-widgets-element-plus'

const progress = LoadingProgressService.show({ title: '正在导入记录' })
try {
  await importRecords((percent: number) => progress.update({ progress: percent }))
  progress.update({ progress: 100, progressText: '导入完成' })
} finally {
  progress.close()
}
```

服务还提供 `progress(title, options)`、`autoProgress(title, options)`（定时模拟进度）与 `closeAll()`。

## 文档案例

在线文档的展示组件把上面这些能力组合成可直接操作的真实场景，源码位于 `docs/.vitepress/components/`：

- **真实案例（`RealCaseDemo.vue`）**
  1. **项目管理 · 列表查询**：双列 `SearchForm` 声明查询字段，提交后用同一份 `formData` 过滤结果表格。
  2. **新增 / 编辑弹窗**：`FormModal` 中新增、编辑、详情共用一份 `formModel`，详情仅切换 `disabled`。
  3. **测算工作台 · 行内入参**：`inline` 布局下的行内编辑，通过 `formSlot` 渲染函数把字段渲染成点击上传区。
- **进阶用法（`AdvancedDemo.vue`）**：同一套字段契约在 `multi`（`colspan` 两列）、`split`（`fieldsetStyle` 网格分栏）、`inline`（查询栏）、`vertical`（标签在上）四种布局下复用；覆盖 `formSlot`（渲染函数与字符串插槽名）、`beforeSlot` / `afterSlot` 前后缀、块级 `slot`、`header` / `footer` / `modelTitle` 与 `btnAfter` 插槽。

可直接在[在线文档](https://michael-py001.github.io/x-widgets-element-plus/)中查看交互效果，或本地运行 `npm run docs:dev`。

## 组件一览

### Schema 表单与容器

`CustomForm`、`CustomFormItem`、`FormPage`、`SearchForm`、`FormModal`（查询使用扁平 `column`，表单页/弹窗使用分组 `formModel`）。

### 反馈与进度

`ConfirmPopup`（受控确认弹窗）、`customConfirm`（Promise 式命令确认）、`Tag` / `CustomTag`（状态标签）、`CustomTooltip`（表格单元格提示）、`LoadingProgress` + `LoadingProgressService`（确定进度遮罩）。

### 地区

`AreaCascader`（内置省市区数据）、`CityPicker`（`maxLevel=2` Schema 适配器）、`AreaPicker`（`maxLevel=3` Schema 适配器）。

### 表格

`Table`（标准 Schema 表格，支持分页）、`TableVirtualized`（Element Plus Table V2，面向大数据量）。

### 基础控件适配器

`Input`、`InputPassword`、`InputSearch`、`InputNumber`、`InputOtp`、`InputTag`、`Textarea`、`Select`（含 `SelectOption`）、`TreeSelect`、`Cascader`、`Checkbox`、`CheckboxGroup`、`RadioGroup`、`Switch`、`DatePicker`、`TimePicker`、`TimeSelect`、`Autocomplete`、`Mentions`、`Rate`、`Slider`、`ColorPicker`、`RangeInput`、`Transfer`、`Upload`、`Segmented`、`Text`。

Schema 的 `el` / `type` 支持 `input`、`input-password`、`input-search`、`select`、`tree-select`、`cascader`、`textarea`、`input-number`、`date-picker`、`range-picker`、`time-picker`、`time-range-picker`、`city-picker`、`area-picker`、`range-input`、`rate`、`slider`、`color-picker`、`mentions`、`checkbox`、`checkbox-group`、`radio-group`、`switch`、`autocomplete`、`text`、`transfer`、`upload`、`segmented`、`input-otp`、`input-tag`、`time-select`，并接受 `x-` 前缀的兼容别名。

### 工具函数

包根目录还导出 `setFormdata`、`getValue`、`editForm`、`useForm`、`useFormTools`、`pick`、`omit`、`combind`、`pickNativeWidgetProps`、`normalizeWidgetOptions` 等工具与相关类型。

## 文档

- 中文（默认）：https://michael-py001.github.io/x-widgets-element-plus/
- English：https://michael-py001.github.io/x-widgets-element-plus/en/

文档源码在 `docs/`，中文位于根路径、英文位于 `docs/en/`。运行 `npm run docs:dev` 本地查看，`npm run docs:build` 构建静态站点。`Deploy documentation` 工作流会在推送到 `main` 及手动触发时发布到 GitHub Pages；Pages 的构建与部署来源需选择 **GitHub Actions**。仓库贡献者可配合 `.agents/skills/x-widgets-element-plus/SKILL.md` 使用编码 Agent。

## 开发

```sh
npm install
npm run typecheck
npm test
npm run build
npm pack --dry-run
```

构建产物输出到 `dist/`，包含 ESM、CommonJS、TypeScript 声明与 `style.css`。

## License

MIT。详见 [LICENSE](./LICENSE)。
