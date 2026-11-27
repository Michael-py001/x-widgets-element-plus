<script setup lang="ts">
import { computed, h, reactive, ref } from 'vue'
import { SearchForm, Table, Tag } from 'x-widgets-element-plus'
import type { ColumnForFormItemType, TableColumn } from 'x-widgets-element-plus'
import CodeBlock from './CodeBlock.vue'
import demoSource from './ControlDemo.vue?raw'
import 'element-plus/dist/index.css'

/**
 * 基础用法：用一份 ColumnForFormItemType schema 驱动 SearchForm，
 * 字段不各自绑 v-model，而是把值写进同一个 formData。提交后驱动下方结果表。
 * 这是本包 Schema 桥接的核心：字段定义一次，查询与展示共用同一份契约。
 */
const filters = reactive<{ projectName: string; ownerUnit: string; projectType: string | null }>({
  projectName: '', ownerUnit: '', projectType: null,
})

const columns: ColumnForFormItemType[] = [
  { name: 'projectName', label: '项目名称', el: 'input', colspan: 12,
    props: { clearable: true, placeholder: '输入项目名称' } },
  { name: 'ownerUnit', label: '业主单位', el: 'input', colspan: 12,
    props: { clearable: true, placeholder: '输入业主单位' } },
  { name: 'projectType', label: '项目类型', el: 'select', colspan: 12,
    options: [
      { label: '燃机', value: 'gas' },
      { label: '输电', value: 'grid' },
      { label: '海风', value: 'offshore' },
    ],
    props: { clearable: true, placeholder: '全部类型' } },
]

const records = [
  { key: '1', projectName: '燃机造价分析', ownerUnit: '华东院', projectType: 'gas', stage: '已发布' },
  { key: '2', projectName: '特高压线路评估', ownerUnit: '国网设计院', projectType: 'grid', stage: '草稿' },
  { key: '3', projectName: '近海风电场测算', ownerUnit: '中广核', projectType: 'offshore', stage: '已发布' },
  { key: '4', projectName: '燃机改扩建估算', ownerUnit: '华能', projectType: 'gas', stage: '已归档' },
]

const typeLabel: Record<string, string> = { gas: '燃机', grid: '输电', offshore: '海风' }
const resultColumns: TableColumn[] = [
  { prop: 'projectName', label: '项目名称', width: 210 },
  { prop: 'ownerUnit', label: '业主单位', width: 185 },
  { label: '类型', width: 125,
    cellRenderer: ({ rowData }) => typeLabel[rowData.projectType] || '—' },
  { label: '状态', width: 100,
    cellRenderer: ({ rowData }) => h(Tag, {
      text: rowData.stage,
      type: rowData.stage === '已发布' ? 'success' : rowData.stage === '草稿' ? 'primary' : 'info',
    }) },
]

const applied = ref({ ...filters })
const runs = ref(1)
const result = computed(() => records.filter((r) =>
  (!applied.value.projectName || r.projectName.includes(applied.value.projectName)) &&
  (!applied.value.ownerUnit || r.ownerUnit.includes(applied.value.ownerUnit)) &&
  (!applied.value.projectType || r.projectType === applied.value.projectType)
))

function onSearch(values: typeof filters): void {
  applied.value = { ...values }
  runs.value += 1
}
function onReset(values: typeof filters): void {
  applied.value = { ...values }
  runs.value += 1
}
</script>

<template>
  <div class="schema-demo" data-ui>
    <div class="schema-demo__head">
      <span class="tag">基础用法</span>
      <p>字段只写一次 <code>column</code> schema，由 <code>SearchForm</code> 渲染成查询表单（<code>colspan=12</code> 两列）；值统一写入 <code>formData</code>。试着填写后点「查询」。</p>
    </div>

    <SearchForm
      :column="columns"
      :form-data="filters"
      layout="horizontal"
      label-width="90px"
      @search="onSearch"
      @reset="onReset"
    />

    <div class="result">
      <div class="result__head">
        <strong>查询结果</strong>
        <span>{{ result.length }} 条 · 第 {{ runs }} 次查询</span>
      </div>
      <Table :columns="resultColumns" :data="result" :pagination="false" />
    </div>

    <CodeBlock :code="demoSource" />
  </div>
</template>

<style scoped>
.schema-demo { border:1px solid var(--vp-c-divider); border-radius:10px; padding:18px; background:var(--vp-c-bg-soft); display:flex; flex-direction:column; gap:16px; }
.schema-demo__head { display:flex; align-items:flex-start; gap:12px; }
.tag { flex:none; font-size:12px; font-weight:600; color:var(--vp-c-brand-1); background:var(--vp-c-bg); border-radius:6px; padding:4px 8px; }
.schema-demo__head p { margin:0; font-size:13px; color:var(--vp-c-text-2); line-height:1.5; }
.schema-demo__head code { font-size:12px; color:var(--vp-c-text-1); }
.result { padding:16px; background:var(--vp-c-bg); border-radius:8px; }
.result__head { display:flex; justify-content:space-between; align-items:baseline; gap:12px; margin-bottom:10px; }
.result__head strong { font-size:14px; }
.result__head span { font-size:12px; color:var(--vp-c-text-2); }
.result :deep(.XTable) { width:100%; }
</style>
