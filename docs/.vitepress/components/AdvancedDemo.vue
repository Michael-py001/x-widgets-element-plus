<script setup lang="ts">
import { h, reactive, ref } from 'vue'
import { FormPage, Tag } from 'x-widgets-element-plus'
import type { ColumnForFormItemType, FormModelBlock, FormItemSlotRenderContext } from 'x-widgets-element-plus'
import 'element-plus/dist/index.css'

/**
 * 进阶用法：FormPage 的 formModel 多区块 + colspan 多列 + 左右分栏(fieldsetStyle.gridTemplate)
 * + 字段级插槽（formSlot 渲染函数 + beforeSlot 渲染函数）。
 * 来自原项目真实页面：项目名称/业主 colspan=12 两列、备注 colspan=24 整行，
 * 上传字段用 formSlot 渲染函数写成可点击的只读输入框。
 */
const formData = reactive({
  projectName: '',
  ownerUnit: '',
  projectType: '',
  designStage: '',
  remark: '',
  attachment: '',
})

function attachmentSlot({ formData: model, label }: FormItemSlotRenderContext) {
  return h('div', {
    class: 'pick-field',
    tabindex: '0',
    onClick: () => { model.attachment = '立项批复.pdf' },
  }, model.attachment || `点击选择${label}`)
}

const formModel: FormModelBlock[] = [
  {
    title: '项目基本信息',
    column: [
      { label: '项目名称', name: 'projectName', type: 'input', required: true, colspan: 12,
        props: { placeholder: '请输入项目名称', clearable: true } },
      { label: '业主单位', name: 'ownerUnit', type: 'input', required: true, colspan: 12,
        props: { placeholder: '请输入业主单位' } },
      { label: '项目类型', name: 'projectType', type: 'select', colspan: 12,
        options: [
          { label: '燃机', value: 'gas' },
          { label: '输电', value: 'grid' },
          { label: '海风', value: 'offshore' },
        ] },
      { label: '设计阶段', name: 'designStage', type: 'select', colspan: 12,
        options: [
          { label: '可研', value: 'feasibility' },
          { label: '初设', value: 'concept' },
          { label: '施工图', value: 'detail' },
        ] },
    ],
  },
  {
    title: '附件与说明',
    fieldsetStyle: { gridTemplate: 'minmax(0, 1fr) 200px' } as any,
    column: [
      { label: '工程附件', name: 'attachment', colspan: 24,
        formSlot: attachmentSlot,
        beforeSlot: ({ label }) => h('span', { class: 'slot-before' }, `${label}：`),
      } as ColumnForFormItemType,
      { label: '备注', name: 'remark', type: 'textarea', colspan: 24,
        props: { rows: 3, placeholder: '可选填写补充说明' } },
    ],
  },
]

const submitted = ref(false)
const snapshot = ref('')
function onSubmit(): void {
  submitted.value = true
  snapshot.value = JSON.stringify(formData, null, 2)
}
</script>

<template>
  <div class="advanced" data-ui>
    <div class="advanced__head">
      <span class="tag">进阶用法</span>
      <p>来自真实页面简化的表单：<code>formModel</code> 多区块、<code>colspan</code> 多列与左右分栏，以及字段级 <code>formSlot</code> / <code>beforeSlot</code> 渲染函数插槽。</p>
    </div>

    <FormPage
      :form-model="formModel"
      :form-data="formData"
      label-width="100px"
    />

    <div class="advanced__actions">
      <button class="act primary" type="button" @click="onSubmit">提交表单</button>
      <Tag v-if="submitted" text="已提交（读取 formData）" type="success" />
    </div>
    <pre v-if="snapshot" class="snapshot">{{ snapshot }}</pre>
  </div>
</template>

<style scoped>
.advanced { border:1px solid var(--vp-c-divider); border-radius:10px; padding:18px; background:var(--vp-c-bg-soft); display:flex; flex-direction:column; gap:16px; }
.advanced__head { display:flex; align-items:flex-start; gap:12px; }
.tag { flex:none; font-size:12px; font-weight:600; color:var(--vp-c-brand-1); background:var(--vp-c-bg); border-radius:6px; padding:4px 8px; }
.advanced__head p { margin:0; font-size:13px; color:var(--vp-c-text-2); line-height:1.5; }
.advanced__head code { font-size:12px; color:var(--vp-c-text-1); }
.advanced__actions { display:flex; align-items:center; gap:12px; }
.act { padding:8px 16px; border:1px solid var(--vp-c-brand-1); border-radius:6px; background:transparent; color:var(--vp-c-brand-1); font-size:13px; cursor:pointer; }
.act.primary { background:var(--vp-c-brand-1); color:#fff; }
.snapshot { margin:0; padding:12px; background:var(--vp-c-bg); border-radius:8px; font-size:12px; color:var(--vp-c-text-1); overflow:auto; max-height:180px; }
:deep(.pick-field) { display:flex; align-items:center; min-height:32px; padding:4px 12px; border:1px dashed var(--vp-c-brand-1); border-radius:6px; color:var(--vp-c-brand-1); cursor:pointer; font-size:13px; }
:deep(.slot-before) { font-size:13px; color:var(--vp-c-text-2); white-space:nowrap; }
</style>
