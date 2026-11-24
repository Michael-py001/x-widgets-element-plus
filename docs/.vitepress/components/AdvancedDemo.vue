<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { Input, InputNumber, Select, Tag } from 'x-widgets-element-plus'
import 'element-plus/dist/index.css'

/**
 * 进阶示例：一份字段 schema 同时驱动查询表单与结果过滤。
 * 这里用基础控件手写一个 schema 渲染器，演示「字段定义复用 + 查询联动」的思路；
 * 真实项目中可直接换成包内的 SearchForm（见 Schema 表单文档）。
 */
type FieldType = 'input' | 'input-number' | 'select'

const schema: Array<{ name: string; label: string; type: FieldType; options?: Array<{ label: string; value: string }> }> = [
  { name: 'title', label: '标题', type: 'input' },
  { name: 'state', label: '状态', type: 'select', options: [
    { label: '全部', value: '' },
    { label: '草稿', value: 'draft' },
    { label: '已发布', value: 'published' },
    { label: '已归档', value: 'archived' },
  ] },
  { name: 'minRating', label: '最低评分', type: 'input-number' },
]

const initial = { title: '', state: '', minRating: 0 }
const filters = reactive({ ...initial })
const applied = ref({ ...initial })
const queries = ref(1)

const records = [
  { key: '1', title: '年度进度复盘', state: 'published', owner: '林', rating: 5 },
  { key: '2', title: '成本测算初稿', state: 'draft', owner: '陈', rating: 3 },
  { key: '3', title: '供应商归档', state: 'archived', owner: '王', rating: 4 },
  { key: '4', title: '质量检查清单', state: 'published', owner: '张', rating: 5 },
  { key: '5', title: '风险评估草稿', state: 'draft', owner: '李', rating: 2 },
]

const result = computed(() => records.filter((r) =>
  (!applied.value.title || r.title.includes(applied.value.title)) &&
  (!applied.value.state || r.state === applied.value.state) &&
  (r.rating >= applied.value.minRating)
))

const stateColors: Record<string, string> = { draft: 'default', published: 'green', archived: 'orange' }

function submit(): void {
  applied.value = { ...filters }
  queries.value += 1
}
function reset(): void {
  Object.assign(filters, initial)
  applied.value = { ...initial }
  queries.value += 1
}
</script>

<template>
  <div class="advanced" data-ui>
    <div class="advanced__intro">
      <span class="advanced__badge">进阶</span>
      <p>同一份字段 <code>schema</code> 渲染出查询表单；提交后把条件应用到本地数据表格，演示字段定义复用与查询联动。生产项目可把这里的渲染器换成 <code>SearchForm</code>。</p>
    </div>

    <div class="schema-form">
      <label v-for="f in schema" :key="f.name" class="schema-field">
        <span>{{ f.label }}</span>
        <Input v-if="f.type === 'input'" v-model="filters[f.name]" placeholder="输入关键字" allow-clear />
        <Select v-else-if="f.type === 'select'" v-model="filters[f.name]" :options="f.options" />
        <InputNumber v-else v-model="filters[f.name]" :min="0" :max="5" />
      </label>
      <div class="schema-actions">
        <button class="act primary" type="button" @click="submit">查询</button>
        <button class="act" type="button" @click="reset">重置</button>
      </div>
    </div>

    <div class="advanced__result">
      <div class="advanced__result-head">
        <strong>查询结果</strong>
        <span>共 {{ result.length }} 条 · 第 {{ queries }} 次查询</span>
      </div>
      <table class="result-table">
        <thead><tr><th>标题</th><th>状态</th><th>负责人</th><th>评分</th></tr></thead>
        <tbody>
          <tr v-for="row in result" :key="row.key">
            <td>{{ row.title }}</td>
            <td><Tag :text="row.state" :color="stateColors[row.state] || ''" /></td>
            <td>{{ row.owner }}</td>
            <td>{{ row.rating }}</td>
          </tr>
          <tr v-if="result.length === 0"><td colspan="4" class="empty">没有符合条件的记录，调整查询条件后重试。</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.advanced { border:1px solid var(--vp-c-divider); border-radius:10px; padding:18px; background:var(--vp-c-bg-soft); display:flex; flex-direction:column; gap:16px; }
.advanced__intro { display:flex; align-items:flex-start; gap:12px; }
.advanced__badge { flex:none; font-size:12px; font-weight:600; color:var(--vp-c-brand-1); background:var(--vp-c-bg); border-radius:6px; padding:4px 8px; }
.advanced__intro p { margin:0; font-size:13px; color:var(--vp-c-text-2); line-height:1.5; }
.advanced__intro code { font-size:12px; color:var(--vp-c-text-1); }
.schema-form { display:flex; flex-wrap:wrap; align-items:flex-end; gap:12px; }
.schema-field { display:flex; flex-direction:column; gap:6px; min-width:160px; }
.schema-field > span { font-size:12px; color:var(--vp-c-text-2); }
.schema-field :deep(.el-input),.schema-field :deep(.el-select),.schema-field :deep(.el-input-number) { width:100%; }
.schema-actions { display:flex; gap:8px; }
.act { padding:8px 16px; border:1px solid var(--vp-c-brand-1); border-radius:6px; background:transparent; color:var(--vp-c-brand-1); font-size:13px; cursor:pointer; }
.act.primary { background:var(--vp-c-brand-1); color:#fff; }
.act:hover { opacity:0.85; }
.advanced__result { margin-top:4px; padding:16px; background:var(--vp-c-bg); border-radius:8px; }
.advanced__result-head { display:flex; justify-content:space-between; align-items:baseline; gap:12px; margin-bottom:10px; }
.advanced__result-head strong { font-size:14px; }
.advanced__result-head span { font-size:12px; color:var(--vp-c-text-2); }
.result-table { width:100%; border-collapse:collapse; font-size:13px; }
.result-table th,.result-table td { text-align:left; padding:8px 10px; border-bottom:1px solid var(--vp-c-divider); }
.result-table th { color:var(--vp-c-text-2); font-weight:600; }
.result-table td.empty { text-align:center; color:var(--vp-c-text-2); }
</style>
