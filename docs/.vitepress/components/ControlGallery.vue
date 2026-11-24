<script setup lang="ts">
/**
 * 控件画廊：一份 column schema 渲染多种表单控件。
 *
 * 不是逐个组件 import 后各绑 v-model，而是把 18 种控件写进同一份 schema，
 * 交给 FormPage 桥接渲染；所有值写进同一个 formData，下方实时展示模型。
 * 覆盖控件类型均来自 x-widgets-element-plus 已支持的 Schema 值。
 */
import { computed, reactive } from 'vue'
import { FormPage, Tag } from 'x-widgets-element-plus'
import type { ColumnForFormItemType, FormModelBlock } from 'x-widgets-element-plus'
import 'element-plus/dist/index.css'

const formData = reactive<Record<string, any>>({
  text: '', textarea: '', number: 1, select: '', radio: 'gas', checkbox: true,
  checkboxGroup: ['estimate'], switchOn: true, date: '', color: '#409eff',
  rate: 3, slider: 40, segmented: 'month', tags: ['造价'], timeSelect: '',
  password: '', search: '', textReadonly: '由 textValue 展示，不写回模型',
})

const numberOptions = {
  min: 1, max: 100, step: 1,
}

const model: FormModelBlock[] = [
  { title: '文本录入', column: [
    { label: '单行文本', name: 'text', type: 'input', colspan: 12,
      props: { placeholder: '请输入', clearable: true } },
    { label: '密码', name: 'password', type: 'input-password', colspan: 12,
      props: { placeholder: '请输入密码' } },
    { label: '搜索', name: 'search', type: 'input-search', colspan: 12,
      props: { placeholder: '输入后回车' } },
    { label: '数字', name: 'number', type: 'input-number', colspan: 12, props: numberOptions },
    { label: '多行文本', name: 'textarea', type: 'textarea', colspan: 24,
      props: { placeholder: '请输入备注', rows: 2 } },
  ] },
  { title: '选择与开关', column: [
    { label: '下拉选择', name: 'select', type: 'select', colspan: 12,
      options: [
        { label: '燃机', value: 'gas' }, { label: '输电', value: 'grid' }, { label: '海风', value: 'offshore' },
      ], props: { clearable: true, placeholder: '请选择' } },
    { label: '单选', name: 'radio', type: 'radio-group', colspan: 12,
      options: [
        { label: '燃机', value: 'gas' }, { label: '输电', value: 'grid' }, { label: '海风', value: 'offshore' },
      ] },
    { label: '多选框', name: 'checkbox', type: 'checkbox', colspan: 12 },
    { label: '复选框组', name: 'checkboxGroup', type: 'checkbox-group', colspan: 12,
      options: [
        { label: '概算表', value: 'estimate' }, { label: '提资单', value: 'input' }, { label: '合同', value: 'contract' },
      ] },
    { label: '开关', name: 'switchOn', type: 'switch', colspan: 12 },
    { label: '分段控制', name: 'segmented', type: 'segmented', colspan: 24,
      options: [
        { label: '按日', value: 'day' }, { label: '按月', value: 'month' }, { label: '按年', value: 'year' },
      ] },
  ] },
  { title: '时间与数值', column: [
    { label: '日期', name: 'date', type: 'date-picker', colspan: 12,
      props: { type: 'date', placeholder: '请选择日期' } },
    { label: '固定时间', name: 'timeSelect', type: 'time-select', colspan: 12,
      props: { placeholder: '请选择时间' } },
    { label: '评分', name: 'rate', type: 'rate', colspan: 12 },
    { label: '滑块', name: 'slider', type: 'slider', colspan: 12 },
    { label: '颜色', name: 'color', type: 'color-picker', colspan: 12 },
    { label: '标签输入', name: 'tags', type: 'input-tag', colspan: 12 },
  ] },
  { title: '只读展示', column: [
    { label: '纯文本', name: 'textReadonly', type: 'text', colspan: 24,
      textValue: (value: any) => value || '（空）' },
  ] },
]

const entries = computed(() => Object.entries(formData).map(([key, value]) => ({
  key, value: Array.isArray(value) ? JSON.stringify(value) : String(value ?? ''),
})))
</script>

<template>
  <div class="gallery" data-ui>
    <div class="gallery__head">
      <span class="tag">控件画廊</span>
      <p>一份 <code>column</code> schema 渲染 <b>18 种控件</b>，全部由 <code>FormPage</code> 桥接到同一个 <code>formData</code>。试着修改任意字段，下方模型实时同步。</p>
    </div>

    <FormPage :form-model="model" :form-data="formData" layout="horizontal" label-width="92px" />

    <div class="model-view">
      <div class="model-view__title">formData（实时）</div>
      <div class="model-view__grid">
        <div v-for="entry in entries" :key="entry.key" class="model-view__item">
          <code>{{ entry.key }}</code><span>{{ entry.value || '—' }}</span>
        </div>
      </div>
      <div class="model-view__legend">
        <Tag text="input / textarea" type="primary" />
        <Tag text="select / radio / checkbox" type="success" />
        <Tag text="date / time / rate / slider" type="info" />
        <Tag text="segmented / input-tag" type="warning" />
        <Tag text="text 只读" type="danger" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.gallery { border:1px solid var(--vp-c-divider); border-radius:10px; padding:18px; background:var(--vp-c-bg-soft); display:flex; flex-direction:column; gap:14px; }
.gallery__head { display:flex; align-items:flex-start; gap:12px; }
.tag { flex:none; font-size:12px; font-weight:600; color:var(--vp-c-brand-1); background:var(--vp-c-bg); border-radius:6px; padding:4px 8px; }
.gallery__head p { margin:0; font-size:13px; color:var(--vp-c-text-2); line-height:1.5; }
.gallery__head b, .gallery__head code { color:var(--vp-c-text-1); }
.model-view { background:var(--vp-c-bg); border-radius:8px; padding:12px; }
.model-view__title { font-size:12px; font-weight:600; color:var(--vp-c-text-1); margin-bottom:8px; }
.model-view__grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(180px, 1fr)); gap:6px 12px; }
.model-view__item { display:flex; gap:8px; font-size:12px; min-width:0; }
.model-view__item code { flex:none; color:var(--vp-c-brand-1); }
.model-view__item span { color:var(--vp-c-text-2); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.model-view__legend { display:flex; flex-wrap:wrap; gap:6px; margin-top:12px; }
</style>
