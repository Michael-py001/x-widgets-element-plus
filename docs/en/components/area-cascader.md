# AreaCascader

`AreaCascader` wraps Element Plus Cascader with package-provided China administrative-area data. Use the built-in tree by default, or supply `treeData` when the consuming application owns a different tree.

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

## Props and model

| Prop | Default | Purpose |
| --- | --- | --- |
| `v-model` | `null` | Selected path (`string[]`) or joined string. |
| `valueType` | `path` | Emit a path array, or a joined string with `valueType="joined"`. |
| `separator` | `-` | Separator used for joined values. |
| `treeData` | package data | Custom `AreaNode[]`; node shape is `{ value, label, children? }`. |
| `maxLevel` | `3` | Show province only (`1`), province/city (`2`), or province/city/district (`3`). |
| `minSelectLevel` | `1` | Minimum accepted selection level; a shorter non-empty selection is normalized to empty. |
| `injectCitySelfLevel` | `false` | At level 3, selecting a city can normalize to its “city-level” child. |
| `priorityProvinces` | `[]` | Names to put first in the province options. |
| `checkStrictly` | `true` | Cascader parent/child selection behavior. |
| `placeholder`, `clearable`, `filterable`, `disabled` | Standard defaults | Passed to the Element Plus Cascader presentation. |
| `invalidMessage` | `''` | Optional warning text when a selection is below the required level. |

The `change` event emits the normalized `string[]` path even when the `v-model` value is configured as a joined string. Built-in data is bundled with this package; custom trees can use the exported `AreaNode` type. Utility exports such as `buildAreaOptions`, `parseAreaValue`, `formatAreaValue`, and `normalizeAreaPath` are available for application-side transformation.

## Helpers & types

The package root re-exports the following AreaCascader helpers and types from `src/components.ts`. Import them from `x-widgets-element-plus`; deep source paths are not stable API.

### Helpers

| Export | Signature (source-backed) | Purpose |
| --- | --- | --- |
| `CITY_SELF_LEVEL` | `string` constant, `'市本级'` | Value/label of the synthetic city-level node injected under a city. |
| `clipAreaTree` | `(nodes: AreaNode[], maxLevel: number, currentLevel?: number) => AreaNode[]` | Recursively trims children beyond `maxLevel` so the cascader has no extra column. |
| `sortPriorityProvinces` | `(nodes: AreaNode[], priorityProvinces?: string[]) => AreaNode[]` | Moves named provinces to the front, preserving the order of the rest. |
| `buildAreaOptions` | `(source?, config?: BuildAreaOptionsConfig) => AreaNode[]` | Builds cascader options: optional city-level injection, then level clipping, then priority sorting. |
| `injectCitySelfLevel` | `(nodes: AreaNode[]) => AreaNode[]` | Adds a `CITY_SELF_LEVEL` child to every city (first among districts). |
| `PRIORITY_PROVINCES` | `string[]` (currently empty) | Reusable example list of priority province values; the component does not sort by default. |
| `normalizeAreaPath` | `(path?: string[] \| null, config?: NormalizeAreaPathConfig) => string[]` | Normalizes a selection: drops paths shorter than `minSelectLevel`, fills city-level, truncates to `maxLevel`. |
| `parseAreaValue` | `(value?: string \| string[] \| null, separator?: string) => string[]` | Parses a joined string (or array) into a path; also accepts `/` and `／` separators. |
| `formatAreaValue` | `(path: string[], separator?: string) => string` | Joins a path into a submission string; empty path returns `''`. |
| `chinaAreaData` | `AreaNode[]` | The built-in China administrative-area tree. |
| `chinaAreaVersion` | `Ref<number>` | Reactive version counter incremented when a non-empty tree is injected. |
| `getChinaAreaData` | `() => AreaNode[]` | Returns the active injected tree, or the bundled tree when none is injected. |
| `setChinaAreaData` | `(nodes: AreaNode[] \| null \| undefined) => void` | Replaces the active tree when passed a non-empty array; empty input leaves the active tree unchanged. |

### Types

| Type | Definition (source-backed) | Purpose |
| --- | --- | --- |
| `AreaMaxLevel` | `1 \| 2 \| 3` | Maximum visible level: province / city / district. |
| `AreaMinSelectLevel` | `1 \| 2 \| 3` | Minimum accepted selection level; shorter non-empty selections are cleared. |
| `BuildAreaOptionsConfig` | `{ maxLevel?: AreaMaxLevel; injectCitySelfLevel?: boolean; priorityProvinces?: string[] }` | Options for `buildAreaOptions`; city-level injection applies only when `maxLevel` is `3`. |
| `NormalizeAreaPathConfig` | `{ minSelectLevel?: AreaMinSelectLevel; maxLevel?: AreaMaxLevel; injectCitySelfLevel?: boolean }` | Options for `normalizeAreaPath`. |
| `AreaNode` | `{ value: string; label: string; children?: AreaNode[]; [key: string]: unknown }` | Cascader option shape, aligned with Element Plus `CascaderOption`. |

## Related pages

- [Exported components](/en/components/)
- [Dialogs, tags & tooltips](/en/components/feedback)
- [Utility & type exports](/en/components/exports)

