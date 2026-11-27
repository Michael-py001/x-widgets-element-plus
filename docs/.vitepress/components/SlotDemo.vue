<script setup lang="tsx">
/**
 * 插槽综合示例：一份 FormPage schema 同时展示字段插槽与区块插槽的多种写法。
 * 字段控件（formSlot）与整块内容（slot）都接受「字符串插槽名」或「render 函数」，
 * 容器还提供 header / footer / modelTitle 三个插槽。
 */
import { h, reactive } from 'vue'
import { FormPage, Tag } from 'x-widgets-element-plus'
import type {
  ColumnForFormItemType,
  FormModelBlock,
  FormItemSlotRenderContext,
  FormBlockSlotRenderContext,
} from 'x-widgets-element-plus'
import CodeBlock from './CodeBlock.vue'
import demoSource from './SlotDemo.vue?raw'
import 'element-plus/dist/index.css'

const formData = reactive({
  templateField: '', renderField: '', tsxField: '', blockRender: '', blockNamed: '',
})

/** 字段插槽 ①：render 函数（h）拿到 formData / label / disabled 上下文。 */
function hRenderSlot({ formData: model, label }: FormItemSlotRenderContext) {
  return h('input', {
    value: model.renderField,
    placeholder: `h() 渲染函数 · ${label}`,
    onInput: (e: Event) => { model.renderField = (e.target as HTMLInputElement).value },
    class: 'slot-input',
  })
}
/** 字段插槽 ②：TSX render 函数，写法与 h() 等价。 */
const tsxRenderSlot = ({ formData: model, label }: FormItemSlotRenderContext) => (
  <input
    class="slot-input"
    value={model.tsxField}
    placeholder={`TSX 渲染函数 · ${label}`}
    onInput={(e: Event) => { model.tsxField = (e.target as HTMLInputElement).value }}
  />
)
/** 区块插槽 ①：render 函数，整块替换，拿到 item / formData。 */
const blockRender = ({ formData: model }: FormBlockSlotRenderContext) => (
  <div class="slot-panel">
    <strong>区块 slot 渲染函数（TSX）</strong>
    <p>读取 formData.templateField：{model.templateField || '（尚未填写）'}</p>
  </div>
)

const formModel: FormModelBlock[] = [
  { title: '字段插槽 formSlot', column: [
    // ① 字符串插槽名：由模板里的 #templateSlot 提供内容。
    { label: '字符串插槽', name: 'templateField', colspan: 12, formSlot: 'templateSlot' } as ColumnForFormItemType,
    // ② h() render 函数。
    { label: 'h() 函数', name: 'renderField', colspan: 12, formSlot: hRenderSlot } as ColumnForFormItemType,
    // ③ TSX render 函数。
    { label: 'TSX 函数', name: 'tsxField', colspan: 12, formSlot: tsxRenderSlot } as ColumnForFormItemType,
  ] },
  { title: '区块插槽 slot', column: [
    // ① 区块级 render 函数。
    { slot: blockRender } as ColumnForFormItemType,
    // ② 区块级字符串插槽名：由模板里的 #blockNamed 提供内容。
    { slot: 'blockNamed' } as ColumnForFormItemType,
  ] },
]
</script>

<template>
  <div class="slot-demo" data-ui>
    <div class="slot-demo__head">
      <span class="tag">插槽综合示例</span>
      <p>同一个 <code>formSlot</code> 可用<b>字符串插槽名</b>、<code>h()</code> 渲染函数或 <code>TSX</code> 渲染函数实现；区块 <code>slot</code> 也有函数与字符串两种写法。容器另提供 <code>header</code>/<code>footer</code>/<code>modelTitle</code> 插槽。</p>
    </div>

    <FormPage :form-model="formModel" :form-data="formData" layout="horizontal" label-width="96px">
      <template #header>
        <div class="slot-hint">header 插槽 · 三种 formSlot 写法同时渲染</div>
      </template>
      <template #modelTitle="{ title }">
        <div class="slot-model-title">◆ {{ title }}</div>
      </template>
      <template #templateSlot="{ formData: model }">
        <input v-model="model.templateField" class="slot-input" placeholder="字符串 formSlot 插槽（v-model 绑定）" />
      </template>
      <template #blockNamed="{ formData: model }">
        <div class="slot-panel">
          <strong>区块 slot 字符串插槽名</strong>
          <p>读取 formData.renderField：{{ model.renderField || '（尚未填写）' }}</p>
        </div>
      </template>
      <template #footer>
        <div class="slot-foot">footer 插槽 · 所有字段值写入同一个 formData</div>
      </template>
    </FormPage>

    <div class="slot-legend">
      <Tag text="formSlot 字符串插槽名" type="primary" />
      <Tag text="formSlot h() 函数" type="success" />
      <Tag text="formSlot TSX 函数" type="info" />
      <Tag text="block slot 函数 / 字符串" type="warning" />
      <Tag text="header / footer / modelTitle" type="danger" />
    </div>

    <CodeBlock :code="demoSource" />
  </div>
</template>

<style scoped>
.slot-demo { border:1px solid var(--vp-c-divider); border-radius:10px; padding:18px; background:var(--vp-c-bg-soft); display:flex; flex-direction:column; gap:14px; }
.slot-demo__head { display:flex; align-items:flex-start; gap:12px; }
.tag { flex:none; font-size:12px; font-weight:600; color:var(--vp-c-brand-1); background:var(--vp-c-bg); border-radius:6px; padding:4px 8px; }
.slot-demo__head p { margin:0; font-size:13px; color:var(--vp-c-text-2); line-height:1.5; }
.slot-demo__head b, .slot-demo__head code { color:var(--vp-c-text-1); }
.slot-legend { display:flex; flex-wrap:wrap; gap:8px; }
:deep(.slot-input) { width:100%; box-sizing:border-box; padding:6px 10px; font:inherit; font-size:13px; color:var(--vp-c-text-1); background:var(--vp-c-bg); border:1px solid var(--vp-c-brand-1); border-radius:6px; }
:deep(.slot-hint) { padding:8px 12px; margin-bottom:10px; border-radius:6px; background:var(--vp-c-brand-soft); font-size:12px; color:var(--vp-c-text-2); }
:deep(.slot-model-title) { font-weight:600; font-size:14px; color:var(--vp-c-text-1); margin-bottom:10px; }
:deep(.slot-foot) { padding:8px 12px; font-size:12px; color:var(--vp-c-text-3); }
:deep(.slot-panel) { padding:12px; background:var(--vp-c-bg); border-radius:8px; font-size:13px; color:var(--vp-c-text-2); }
:deep(.slot-panel strong) { color:var(--vp-c-text-1); }
:deep(.slot-panel p) { margin:4px 0 0; font-size:12px; }
</style>
