<script setup lang="ts">
import { computed, reactive } from 'vue'
import {
  Input,
  InputNumber,
  Select,
  RadioGroup,
  Segmented,
  Checkbox,
  Switch,
  Rate,
  Slider,
  Tag,
} from 'x-widgets-element-plus'
import 'element-plus/dist/index.css'

/**
 * 组件展示台：每个控件从包根目录导入，使用真实 v-model 绑定到本地状态。
 * 控件按数据录入 / 选择 / 开关确认 / 反馈比例分组，右侧读数随操作实时更新。
 */
const initial = {
  keyword: '',
  amount: 12,
  status: 'draft',
  mode: 'list',
  notify: true,
  agreed: false,
  rating: 4,
  progress: 60,
}
const model = reactive({ ...initial })

const statusOptions = [
  { label: '草稿', value: 'draft' },
  { label: '已发布', value: 'published' },
  { label: '已归档', value: 'archived' },
]
const modeOptions = [
  { label: '列表', value: 'list' },
  { label: '网格', value: 'grid' },
]

const flags = computed(() => [
  { label: '通知', on: model.notify },
  { label: '已确认', on: model.agreed },
])

function reset(): void {
  Object.assign(model, initial)
}
</script>

<template>
  <div class="showcase" data-ui>
    <div class="showcase__grid">
      <section class="demo-group">
        <h3 class="demo-group__title">数据录入</h3>
        <div class="demo-group__body">
          <label class="field">
            <span>文本输入 <code>Input</code></span>
            <Input v-model="model.keyword" placeholder="输入关键字" clearable />
          </label>
          <label class="field">
            <span>数字输入 <code>InputNumber</code></span>
            <InputNumber v-model="model.amount" :min="0" :max="999" />
          </label>
        </div>
      </section>

      <section class="demo-group">
        <h3 class="demo-group__title">选择</h3>
        <div class="demo-group__body">
          <label class="field">
            <span>下拉选择 <code>Select</code></span>
            <Select v-model="model.status" :options="statusOptions" />
          </label>
          <label class="field">
            <span>分段控制 <code>Segmented</code></span>
            <Segmented v-model="model.mode" :options="modeOptions" />
          </label>
          <label class="field">
            <span>单选组 <code>RadioGroup</code></span>
            <RadioGroup v-model="model.status" :options="statusOptions" />
          </label>
        </div>
      </section>

      <section class="demo-group">
        <h3 class="demo-group__title">开关与确认</h3>
        <div class="demo-group__body">
          <label class="field field--inline">
            <span>开关 <code>Switch</code></span>
            <Switch v-model="model.notify" />
          </label>
          <label class="field field--inline">
            <span>复选框 <code>Checkbox</code></span>
            <Checkbox v-model="model.agreed">我已阅读</Checkbox>
          </label>
        </div>
      </section>

      <section class="demo-group">
        <h3 class="demo-group__title">反馈与比例</h3>
        <div class="demo-group__body">
          <label class="field field--inline">
            <span>评分 <code>Rate</code></span>
            <Rate v-model="model.rating" />
          </label>
          <label class="field">
            <span>滑块 <code>Slider</code></span>
            <Slider v-model="model.progress" />
          </label>
        </div>
      </section>
    </div>

    <aside class="readout">
      <h3 class="readout__title">实时表单状态</h3>
      <dl class="readout__list">
        <div><dt>关键字</dt><dd>{{ model.keyword || '—' }}</dd></div>
        <div><dt>数量</dt><dd>{{ model.amount }}</dd></div>
        <div><dt>状态</dt><dd><Tag :text="model.status" type="primary" /></dd></div>
        <div><dt>视图</dt><dd>{{ model.mode }}</dd></div>
        <div><dt>评分</dt><dd>{{ model.rating }} / 5</dd></div>
        <div><dt>进度</dt><dd>{{ model.progress }}%</dd></div>
      </dl>
      <div class="readout__flags">
        <Tag
          v-for="f in flags"
          :key="f.label"
          :text="`${f.label}：${f.on ? '开' : '关'}`"
          :type="f.on ? 'success' : 'info'"
        />
      </div>
      <button class="readout__reset" type="button" @click="reset">重置状态</button>
    </aside>
  </div>
</template>

<style scoped>
.showcase { display:grid; grid-template-columns:minmax(0,1fr) 280px; gap:14px; align-items:start; }
.showcase__grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:14px; }
.demo-group,.readout { border:1px solid var(--vp-c-divider); border-radius:10px; padding:18px; background:var(--vp-c-bg-soft); }
.demo-group__title,.readout__title { margin:0 0 14px; font-size:15px; font-weight:600; color:var(--vp-c-text-1); }
.demo-group__body { display:flex; flex-direction:column; gap:14px; }
.field { display:flex; flex-direction:column; gap:6px; }
.field--inline { flex-direction:row; align-items:center; justify-content:space-between; gap:12px; }
.field > span { font-size:13px; color:var(--vp-c-text-2); }
.field code { font-size:12px; color:var(--vp-c-brand-1); }
.field :deep(.el-input),.field :deep(.el-select),.field :deep(.el-input-number),.field :deep(.el-radio-group) { width:100%; }
.field :deep(.el-radio-group) { flex-wrap:wrap; row-gap:6px; }
.readout__list { margin:0; display:flex; flex-direction:column; gap:10px; }
.readout__list > div { display:flex; justify-content:space-between; align-items:center; gap:12px; }
.readout__list dt { font-size:13px; color:var(--vp-c-text-2); }
.readout__list dd { margin:0; font-size:13px; font-weight:600; color:var(--vp-c-text-1); text-align:right; }
.readout__flags { display:flex; flex-wrap:wrap; gap:8px; margin-top:16px; padding:14px; background:var(--vp-c-bg); border-radius:8px; }
.readout__reset { margin-top:16px; width:100%; padding:9px 14px; border:1px solid var(--vp-c-brand-1); border-radius:6px; background:transparent; color:var(--vp-c-brand-1); font-size:14px; cursor:pointer; }
.readout__reset:hover { background:var(--vp-c-brand-soft); }
@media (max-width:960px){ .showcase{grid-template-columns:1fr;} }
@media (max-width:640px){ .showcase__grid{grid-template-columns:1fr;} .field--inline{flex-wrap:wrap;} }
</style>
