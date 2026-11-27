# 基础控件

以下是 `x-widgets-element-plus` 导出的直接控件适配器。它们以 Element Plus 为原生契约，并在文档明确的地方增加表单数据桥接。

## 从包根目录导入

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

内部源码路径不属于稳定 API。完整根入口清单见[导出的组件](/components/)。

## 数据录入适配器

| 组件 | 用途 | 本包契约 |
| --- | --- | --- |
| `Input` | 单行文本 | 直接使用时支持 `v-model`；在 Schema 中，`name`、`formData`、`label`、`props` 和 `event` 由表单桥接消费。 |
| `InputPassword` | 密码输入 | Element Plus Input 固定 `type="password"`；Schema 值 `input-password`。 |
| `InputSearch` | 搜索输入 | Element Plus Input 带搜索前缀图标；回车触发 `event.onSearch`；Schema 值 `input-search`。 |
| `Textarea` | 多行文本 | 使用 Element Plus textarea 语义，并支持同样的表单桥接。 |
| `InputNumber` | 数值 | 保留 Element Plus 的 `min`、`max`、`step` 和 `precision`。 |
| `Select` | 单选或多选 | 使用 Element Plus Select 属性，并支持本包的 Schema 桥接。 |
| `Cascader` | 多级级联选择 | 包装 Element Plus Cascader；Schema 的 `options` 会归一化；Schema 值 `cascader`。 |
| `TreeSelect` | 从树中选择节点 | 包装 Element Plus TreeSelect；Schema 的 `options` 会归一化为原生 `data`。 |
| `CityPicker` | 市级地区选择 | 通过 `AreaCascader` 使用内置行政区数据（`maxLevel=2`）；Schema 值 `city-picker`。 |
| `AreaPicker` | 区级地区选择 | 通过 `AreaCascader` 使用内置行政区数据（`maxLevel=3`）；Schema 值 `area-picker`。 |
| `RangeInput` | 双值区间 | 两个 Element Plus Input 由分隔符连接；写入 `[start, end]` 数组；Schema 值 `range-input`。 |
| `Rate` | 星级评分 | 包装 Element Plus Rate；Schema 值 `rate`。 |
| `Slider` | 数值滑块 | 包装 Element Plus Slider；Schema 值 `slider`。 |
| `ColorPicker` | 颜色选择 | 包装 Element Plus ColorPicker；Schema 值 `color-picker`。 |
| `Mentions` | `@` 提及输入 | 基于 Element Plus `ElMention`；Schema 的 `options` 会归一化；Schema 值 `mentions`。 |
| `DatePicker` | 日期或日期范围 | 使用 Element Plus DatePicker 属性，并支持本包的 Schema 桥接。 |
| `TimePicker` | 时间或时间范围 | 使用 Element Plus TimePicker 属性；Schema 的 `time-range-picker` 会自动设置 `isRange`。 |
| `RadioGroup` | 单值选项 | `options` 支持数组、只读数组、`Ref` 和 `ComputedRef`；可用 `labelKey`、`valueKey` 指定字段。 |
| `Checkbox` | 单个布尔切换 | 包装 Element Plus Checkbox；Schema 的 `checkbox` 会把布尔值写入字段。 |
| `CheckboxGroup` | 多值选项 | 使用与 `RadioGroup` 相同的选项归一化，模型值应为数组。 |
| `Switch` | 单个布尔切换 | 包装 Element Plus Switch；Schema 的 `switch` 会把布尔值写入字段。 |
| `Autocomplete` | 候选选择 | 本地选项按 `labelKey` 过滤，`valueKey` 遵循 Element Plus 语义；传入 `fetchSuggestions` 时优先使用该回调。 |
| `Transfer` | 穿梭框 | 包装 Element Plus Transfer；Schema 的 `options` 归一化为原生 `data`，选中值走 `modelValue`；Schema 值 `transfer`。 |
| `Upload` | 文件上传 | 包装 Element Plus Upload；受控值是 `fileList`（非 `value`/`modelValue`）；Schema 值 `upload`。 |
| `Text` | 只读展示 | `textValue` 可以是值或格式化函数，不会写回表单模型。 |
| `Segmented` | 分段控制器 | 包装 Element Plus Segmented；Schema 的 `options` 即候选项；Schema 值 `segmented`。 |
| `InputOtp` | 一次性密码输入 | 包装 Element Plus InputOtp；`modelValue` 保存验证码；Schema 值 `input-otp`。 |
| `InputTag` | 标签输入 | 包装 Element Plus InputTag；`modelValue` 保存标签数组；Schema 值 `input-tag`。 |
| `TimeSelect` | 固定间隔时间选择 | 包装 Element Plus TimeSelect；Schema 值 `time-select`。 |

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

可运行示例见独立页面：[基础案例](/components/cases-basic)（基础用法、控件画廊）与[进阶案例](/components/cases-advanced)（进阶布局、真实案例）；插槽写法见[插槽用法](/components/slots)。

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

Schema 管理的字段不要再传第二个 `v-model`。如果自定义控件仍需保留标签、字段路径和校验容器，请使用 `formSlot`。完整规则见[Schema 表单](/components/forms)。

控件 `type` 同时接受裸名（`input`、`transfer`、`upload` 等）和 `x-` 前缀别名（`x-input`、`x-transfer`、`x-upload` 等）；两者指向同一个适配器，方便与 `x-widgets-antdv` 的 Schema 写法保持一致。

## 原生与本包边界

- 原生行为以 Element Plus props 与事件为准。
- `Table` 与 `TableVirtualized` 是两套不同契约；`TableColumn` 只适用于普通表格，不适用于 Table V2。
- `DatePicker` 与 `Select` 是包根目录导出和 Schema 适配器；原生属性遵循 Element Plus 契约。
- `AreaCascader` 是公开导出，默认带内置数据，也支持显式 `treeData`；详见独立参考页。`CityPicker` 与 `AreaPicker` 是基于它的固定层级 Schema 适配器。
- `Mentions` 对应 Element Plus 的 `ElMention`（组件导出名）；其原生 `props` 字段保留 ElMention 的选项别名含义，而非表单桥接含义。
- 生成声明和本文档中没有的 prop 不要自行臆造。
