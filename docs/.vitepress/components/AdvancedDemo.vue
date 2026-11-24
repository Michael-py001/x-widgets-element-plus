<script setup lang="ts">
import { computed, h, reactive, ref } from 'vue'
import { FormPage, SearchForm, Tag } from 'x-widgets-element-plus'
import type {
  ColumnForFormItemType,
  FormModelBlock,
  FormItemSlotRenderContext,
  FormBlockSlotRenderContext,
} from 'x-widgets-element-plus'
import 'element-plus/dist/index.css'

/**
 * 进阶用法：同一份字段契约在不同表单布局下复用，并演示多种插槽。
 * 来自原项目真实页面：colspan 多列、fieldsetStyle 左右分栏、inline 查询条，
 * 字段插槽同时支持渲染函数（VNode）和字符串插槽名两种形式。
 */
const formData = reactive({
  projectName: '', ownerUnit: '', projectType: '', designStage: '',
  remark: '', attachment: '', contact: '',
})

type Layout = 'multi' | 'split' | 'inline'
const layout = ref<Layout>('multi')
const layoutLabels: Record<Layout, string> = {
  multi: '多列布局', split: '左右布局', inline: '行内布局',
}

// 1) 单元格插槽：formSlot 渲染函数返回 VNode
function attachmentSlot({ formData: model, label }: FormItemSlotRenderContext) {
  return h('div', {
    class: 'x-pick', tabindex: '0',
    onClick: () => { model.attachment = '立项批复.pdf' },
  }, model.attachment || `点击选择${label}`)
}
// 2) 前缀插槽：beforeSlot
const beforeUnit = ({ label }: FormItemSlotRenderContext) => h('span', { class: 'x-affix' }, `${label}：`)
// 3) 后缀插槽：afterSlot
const afterUnit = () => h('span', { class: 'x-affix' }, '必填')
// 4) 区块插槽（渲染函数）
function blockSlot() {
  return h('div', { class: 'x-block-slot' }, '区块 slot 渲染函数：这里可放任意 VNode')
}

const baseFields: ColumnForFormItemType[] = [
  { label: '项目名称', name: 'projectName', type: 'input', required: true, colspan: 12,
    props: { placeholder: '请输入项目名称', clearable: true } },
  { label: '业主单位', name: 'ownerUnit', type: 'input', colspan: 12,
    beforeSlot: beforeUnit, afterSlot: afterUnit,
    props: { placeholder: '请输入业主单位' } },
  { label: '项目类型', name: 'projectType', type: 'select', colspan: 12,
    options: [
      { label: '燃机', value: 'gas' }, { label: '输电', value: 'grid' }, { label: '海风', value: 'offshore' },
    ] },
  { label: '设计阶段', name: 'designStage', type: 'select', colspan: 12,
    options: [
      { label: '可研', value: 'feasibility' }, { label: '初设', value: 'concept' }, { label: '施工图', value: 'detail' },
    ] },
]

const multiModel: FormModelBlock[] = [
  { title: '项目信息 · 两列', column: baseFields },
  { title: '附件与说明', column: [
    { label: '工程附件', name: 'attachment', colspan: 24, formSlot: attachmentSlot } as ColumnForFormItemType,
    { slot: blockSlot } as ColumnForFormItemType,
    { label: '备注', name: 'remark', type: 'textarea', colspan: 24, props: { rows: 2 } },
  ] },
]

const splitModel: FormModelBlock[] = [
  { title: '基本信息', column: [
    { label: '项目名称', name: 'projectName', type: 'input', colspan: 24, props: { placeholder: '请输入' } },
    { label: '业主单位', name: 'ownerUnit', type: 'input', colspan: 24, props: { placeholder: '请输入' } },
    { label: '联系人', name: 'contact', type: 'input', colspan: 24, props: { placeholder: '选填' } },
  ] },
  { title: '填写说明', column: [ { slot: 'sideNote' } as ColumnForFormItemType ] },
]

const inlineColumns: ColumnForFormItemType[] = [
  { name: 'projectName', label: '项目名称', el: 'input', props: { placeholder: '项目名称', clearable: true } },
  { name: 'ownerUnit', label: '业主', el: 'input', props: { placeholder: '业主', clearable: true } },
  { name: 'projectType', label: '类型', el: 'select', options: [
    { label: '全部', value: '' }, { label: '燃机', value: 'gas' }, { label: '海风', value: 'offshore' },
  ] },
]
const inlineFilters = reactive({ projectName: '', ownerUnit: '', projectType: '' })
const searched = ref('')
const currentModel = computed(() => layout.value === 'split' ? splitModel : multiModel)
</script>

<template>
  <div class="advanced" data-ui>
    <div class="advanced__head">
      <span class="tag">进阶用法</span>
      <p>同一份字段契约在不同<b>表单布局</b>下复用，并演示多种<b>插槽</b>：单元格 <code>formSlot</code>、前后缀 <code>beforeSlot</code>/<code>afterSlot</code>、区块 <code>slot</code>。切换下方布局试试。</p>
    </div>

    <div class="switcher">
      <button v-for="(label, key) in layoutLabels" :key="key" type="button"
        :class="['sw', { active: layout === key }]" @click="layout = key">{{ label }}</button>
    </div>

    <template v-if="layout === 'inline'">
      <SearchForm :column="inlineColumns" :form-data="inlineFilters" layout="inline"
        @search="searched = JSON.stringify(inlineFilters)" />
      <p v-if="searched" class="x-note">查询条件：{{ searched }}</p>
    </template>
    <FormPage v-else :key="layout" :form-model="currentModel" :form-data="formData"
      layout="horizontal" label-width="96px"
      :fieldset-style="layout === 'split' ? { display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 150px', gap: '12px', gridTemplate: 'minmax(0, 1fr) 150px' } : {}">
      <template #sideNote>
        <div class="x-side-note">
          <strong>填写说明</strong>
          <p>左栏由 schema 渲染字段；右栏是字符串插槽 <code>sideNote</code> 的内容。</p>
          <p>对应真实页面中「表单 + 说明/表格」的左右布局。</p>
        </div>
      </template>
    </FormPage>

    <div class="slot-legend">
      <span>本页插槽：</span>
      <Tag text="formSlot 渲染函数" type="primary" />
      <Tag text="beforeSlot / afterSlot" type="info" />
      <Tag text="slot 字符串插槽" type="success" />
    </div>
  </div>
</template>

<style scoped>
.advanced { border:1px solid var(--vp-c-divider); border-radius:10px; padding:18px; background:var(--vp-c-bg-soft); display:flex; flex-direction:column; gap:14px; }
.advanced__head { display:flex; align-items:flex-start; gap:12px; }
.tag { flex:none; font-size:12px; font-weight:600; color:var(--vp-c-brand-1); background:var(--vp-c-bg); border-radius:6px; padding:4px 8px; }
.advanced__head p { margin:0; font-size:13px; color:var(--vp-c-text-2); line-height:1.5; }
.advanced__head b { color:var(--vp-c-text-1); }
.advanced__head code { font-size:12px; color:var(--vp-c-text-1); }
.switcher { display:inline-flex; gap:6px; }
.sw { font-family:inherit; font-size:13px; padding:7px 14px; border-radius:6px; border:1px solid var(--vp-c-brand-1); background:transparent; color:var(--vp-c-brand-1); cursor:pointer; }
.sw.active { background:var(--vp-c-brand-1); color:#fff; }
.slot-legend { display:flex; flex-wrap:wrap; align-items:center; gap:8px; margin-top:4px; padding:12px; background:var(--vp-c-bg); border-radius:8px; }
.slot-legend > span { font-size:12px; color:var(--vp-c-text-2); }
.x-note { font-size:12px; color:var(--vp-c-text-2); margin:0; }
:deep(.x-pick) { display:flex; align-items:center; min-height:32px; padding:4px 12px; border:1px dashed var(--vp-c-brand-1); border-radius:6px; color:var(--vp-c-brand-1); cursor:pointer; font-size:13px; }
:deep(.x-affix) { font-size:13px; color:var(--vp-c-text-2); white-space:nowrap; }
:deep(.x-side-note) { padding:12px; background:var(--vp-c-bg); border-radius:8px; font-size:12px; color:var(--vp-c-text-2); line-height:1.5; }
:deep(.x-side-note strong) { display:block; font-size:13px; color:var(--vp-c-text-1); margin-bottom:6px; }
:deep(.x-side-note p) { margin:4px 0; }
:deep(.x-block-slot) { padding:12px; background:var(--vp-c-bg); border-radius:6px; font-size:13px; color:var(--vp-c-text-2); }
</style>
