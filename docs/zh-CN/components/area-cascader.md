# AreaCascader 行政区划级联

`AreaCascader` 在 Element Plus Cascader 之上封装了本包提供的中国行政区划数据。默认使用内置树；当消费方应用持有另一份树时，可通过 `treeData` 传入。

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

## Props 与模型

| Prop | 默认值 | 用途 |
| --- | --- | --- |
| `v-model` | `null` | 选中路径（`string[]`）或用连接符合并的字符串。 |
| `valueType` | `path` | 派发路径数组，或通过 `valueType="joined"` 派发连接后的字符串。 |
| `separator` | `-` | 合并值所使用的分隔符。 |
| `treeData` | 包内置数据 | 自定义 `AreaNode[]`；节点结构为 `{ value, label, children? }`。 |
| `maxLevel` | `3` | 仅显示省份（`1`）、省份/城市（`2`），或省份/城市/区县（`3`）。 |
| `minSelectLevel` | `1` | 接受的最小选择层级；低于该层级的非空选择会被归一化为 `null` 空值。 |
| `injectCitySelfLevel` | `false` | 在三级模式下，选择城市时可归一化为该城市的“市级”子节点。 |
| `priorityProvinces` | `[]` | 在省份选项中前置显示的省份名称。 |
| `checkStrictly` | `true` | Cascader 的父子节点选择行为。 |
| `placeholder`、`clearable`、`filterable`、`disabled` | 标准默认值 | 透传给 Element Plus Cascader 的展示属性。 |
| `invalidMessage` | `''` | 当选择低于要求层级时的可选提示文字。 |

即使 `v-model` 被配置为连接字符串，`change` 事件也会派发归一化后的 `string[]` 路径。内置数据随本包一起打包；自定义树可使用导出的 `AreaNode` 类型。应用侧还可以使用 `buildAreaOptions`、`parseAreaValue`、`formatAreaValue` 和 `normalizeAreaPath` 等工具导出进行数据转换。

## 辅助函数与类型

包根目录通过 `src/components.ts` 重新导出以下 AreaCascader 辅助函数与类型。请从 `x-widgets-element-plus` 导入；内部源码路径不属于稳定 API。

### 辅助函数

| 导出 | 签名（依据源码） | 用途 |
| --- | --- | --- |
| `CITY_SELF_LEVEL` | 字符串常量，`'市本级'` | 注入到市节点下的合成“市级”节点的 value/label。 |
| `clipAreaTree` | `(nodes: AreaNode[], maxLevel: number, currentLevel?: number) => AreaNode[]` | 递归裁剪超过 `maxLevel` 的子节点，避免级联多出一列。 |
| `sortPriorityProvinces` | `(nodes: AreaNode[], priorityProvinces?: string[]) => AreaNode[]` | 将指定省份前置，其余保持相对顺序。 |
| `buildAreaOptions` | `(source?, config?: BuildAreaOptionsConfig) => AreaNode[]` | 生成级联选项：按需注入市本级，再裁剪层级，最后按优先省份排序。 |
| `injectCitySelfLevel` | `(nodes: AreaNode[]) => AreaNode[]` | 为每个市添加 `CITY_SELF_LEVEL` 子节点（置于区县最前）。 |
| `PRIORITY_PROVINCES` | `string[]`（当前为空） | 可复用的优先省份示例列表；组件默认不排序。 |
| `normalizeAreaPath` | `(path?: string[] \| null, config?: NormalizeAreaPathConfig) => string[]` | 归一化选择：丢弃短于 `minSelectLevel` 的路径、补齐市本级、截断到 `maxLevel`。 |
| `parseAreaValue` | `(value?: string \| string[] \| null, separator?: string) => string[]` | 将连接字符串（或数组）解析为路径；同时接受 `/` 与 `／` 分隔符。 |
| `formatAreaValue` | `(path: string[], separator?: string) => string` | 将路径连接为提交用字符串；空路径返回 `''`。 |
| `chinaAreaData` | `AreaNode[]` | 内置的中国行政区划树。 |
| `chinaAreaVersion` | `Ref<number>` | 注入非空数据时递增的响应式版本计数。 |
| `getChinaAreaData` | `() => AreaNode[]` | 返回当前注入的数据；未注入时返回包内置数据。 |
| `setChinaAreaData` | `(nodes: AreaNode[] \| null \| undefined) => void` | 传入非空数组时替换当前数据；空值不会改变当前数据。 |

### 类型

| 类型 | 定义（依据源码） | 用途 |
| --- | --- | --- |
| `AreaMaxLevel` | `1 \| 2 \| 3` | 最大展示层级：省 / 市 / 区县。 |
| `AreaMinSelectLevel` | `1 \| 2 \| 3` | 最低可选层级；低于该层级的非空选择会被清空。 |
| `BuildAreaOptionsConfig` | `{ maxLevel?: AreaMaxLevel; injectCitySelfLevel?: boolean; priorityProvinces?: string[] }` | `buildAreaOptions` 的配置；市本级注入仅在 `maxLevel` 为 `3` 时生效。 |
| `NormalizeAreaPathConfig` | `{ minSelectLevel?: AreaMinSelectLevel; maxLevel?: AreaMaxLevel; injectCitySelfLevel?: boolean }` | `normalizeAreaPath` 的配置。 |
| `AreaNode` | `{ value: string; label: string; children?: AreaNode[]; [key: string]: unknown }` | 级联选项结构，与 Element Plus `CascaderOption` 对齐。 |

## 相关页面

- [导出的组件](/zh-CN/components/)
- [弹窗、标签与提示](/zh-CN/components/feedback)
- [工具与类型导出](/zh-CN/components/exports)

