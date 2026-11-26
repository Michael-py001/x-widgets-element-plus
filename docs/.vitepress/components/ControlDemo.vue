<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { SearchForm, Tag } from 'x-widgets-element-plus'
import type { ColumnForFormItemType } from 'x-widgets-element-plus'
import CodeBlock from './CodeBlock.vue'
import demoSource from './ControlDemo.vue?raw'
import 'element-plus/dist/index.css'

/**
 * 基础用法：用一份 ColumnForFormItemType schema 驱动 SearchForm，
 * 字段不各自绑 v-model，而是把值写进同一个 formData。提交后驱动下方结果表。
 * 这是本包 Schema 桥接的核心：字段定义一次，查询与展示共用同一份契约。
 */
const filters = reactive({ projectName: '', ownerUnit: '', projectType: '' })

const columns: ColumnForFormItemType[] = [
  { name: 'projectName', label: '项目名称', el: 'input', colspan: 12,
    props: { clearable: true, placeholder: '输入项目名称' } },
  { name: 'ownerUnit', label: '业主单位', el: 'input', colspan: 12,
    props: { clearable: true, placeholder: '输入业主单位' } },
  { name: 'projectType', label: '项目类型', el: 'select', colspan: 12,
    options: [
      { label: '全部', value: '' },
      { label: '燃机', value: 'gas' },
      { label: '输电', value: 'grid' },
      { label: '海风', value: 'offshore' },
    ],
    props: { clearable: true } },
]

const records = [
  { key: '1', projectName: '燃机造价分析', ownerUnit: '华东院', projectType: 'gas', stage: '已发布' },
  { key: '2', projectName: '特高压线路评估', ownerUnit: '国网设计院', projectType: 'grid', stage: '草稿' },
  { key: '3', projectName: '近海风电场测算', ownerUnit: '中广核', projectType: 'offshore', stage: '已发布' },
  { key: '4', projectName: '燃机改扩建估算', ownerUnit: '华能', projectType: 'gas', stage: '已归档' },
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
      <table>
        <thead><tr><th>项目名称</th><th>业主单位</th><th>类型</th><th>状态</th></tr></thead>
        <tbody>
          <tr v-for="row in result" :key="row.key">
            <td>{{ row.projectName }}</td>
            <td>{{ row.ownerUnit }}</td>
            <td>{{ row.projectType }}</td>
            <td><Tag :text="row.stage" :type="row.stage === '已发布' ? 'success' : row.stage === '草稿' ? 'primary' : 'info'" /></td>
          </tr>
          <tr v-if="result.length === 0"><td colspan="4" class="empty">没有匹配的记录</td></tr>
        </tbody>
      </table>
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
table { width:100%; border-collapse:collapse; font-size:13px; }
th,td { text-align:left; padding:8px 10px; border-bottom:1px solid var(--vp-c-divider); }
th { color:var(--vp-c-text-2); font-weight:600; }
td.empty { text-align:center; color:var(--vp-c-text-2); }
@media (max-width:640px){ th,td { padding:6px; font-size:12px; } }
</style>
