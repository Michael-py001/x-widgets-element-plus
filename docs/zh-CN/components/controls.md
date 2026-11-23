# 基础控件

以下是 `x-widgets-element-plus` 导出的直接控件适配器。它们以 Element Plus 为原生契约，并在文档明确的地方增加表单数据桥接。

## 从包根目录导入

```ts
import {
  Autocomplete,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  Input,
  InputNumber,
  RadioGroup,
  Select,
  Switch,
  Text,
  Textarea,
  TimePicker,
  TreeSelect
} from 'x-widgets-element-plus'
import 'element-plus/dist/index.css'
import 'x-widgets-element-plus/style.css'
```

内部源码路径不属于稳定 API。完整根入口清单见[导出的组件](/zh-CN/components/)。

## 数据录入适配器

| 组件 | 用途 | 本包契约 |
| --- | --- | --- |
| `Input` | 单行文本 | 直接使用时支持 `v-model`；在 Schema 中，`name`、`formData`、`label`、`props` 和 `event` 由表单桥接消费。 |
| `Textarea` | 多行文本 | 使用 Element Plus textarea 语义，并支持同样的表单桥接。 |
| `InputNumber` | 数值 | 保留 Element Plus 的 `min`、`max`、`step` 和 `precision`。 |
| `Select` | 单选或多选 | 使用 Element Plus Select 属性，并支持本包的 Schema 桥接。 |
| `TreeSelect` | 从树中选择节点 | 包装 Element Plus TreeSelect；Schema 的 `options` 会归一化为原生 `data`。 |
| `DatePicker` | 日期或日期范围 | 使用 Element Plus DatePicker 属性，并支持本包的 Schema 桥接。 |
| `TimePicker` | 时间或时间范围 | 使用 Element Plus TimePicker 属性；Schema 的 `time-range-picker` 会自动设置 `isRange`。 |
| `RadioGroup` | 单值选项 | `options` 支持数组、只读数组、`Ref` 和 `ComputedRef`；可用 `labelKey`、`valueKey` 指定字段。 |
| `Checkbox` | 单个布尔切换 | 包装 Element Plus Checkbox；Schema 的 `checkbox` 会把布尔值写入字段。 |
| `CheckboxGroup` | 多值选项 | 使用与 `RadioGroup` 相同的选项归一化，模型值应为数组。 |
| `Switch` | 单个布尔切换 | 包装 Element Plus Switch；Schema 的 `switch` 会把布尔值写入字段。 |
| `Autocomplete` | 候选选择 | 本地选项按 `labelKey` 过滤，`valueKey` 遵循 Element Plus 语义；传入 `fetchSuggestions` 时优先使用该回调。 |
| `Text` | 只读展示 | `textValue` 可以是值或格式化函数，不会写回表单模型。 |

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

宿主应用负责选项、请求、loading、权限和副作用。这些适配器不会替你请求业务数据。

## 交互示例

下面的控件使用本地响应式状态；修改关键词或启用状态，可以看到展示结果随之更新。

<ClientOnly><ElementControlDemo /></ClientOnly>

## Schema 桥接

通过 `FormPage`、`FormModal` 或 `SearchForm` 渲染字段时，使用 `ColumnForFormItemType` 与 `FormModelBlock`：

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

Schema 管理的字段不要再传第二个 `v-model`。如果自定义控件仍需保留标签、字段路径和校验容器，请使用 `formSlot`。完整规则见[Schema 表单](/zh-CN/components/forms)。

## 原生与本包边界

- 原生行为以 Element Plus props 与事件为准。
- `Table` 与 `TableVirtualized` 是两套不同契约；`TableColumn` 只适用于普通表格，不适用于 Table V2。
- `DatePicker` 与 `Select` 是包根目录导出和 Schema 适配器；原生属性遵循 Element Plus 契约。
- `AreaCascader` 是公开导出，默认带内置数据，也支持显式 `treeData`；详见独立参考页。
- 生成声明和本文档中没有的 prop 不要自行臆造。
