<script setup lang="ts">
/**
 * 真实案例简化：项目管理页（列表查询 + FormModal 录入 + 行内筛选）。
 *
 * 三段 schema 全部来自原项目 composable 的简化：
 * - useBasicProjectSearchForm：colspan=12 两列查询表单；
 * - useBasicProjectFormModal：详情/编辑共用一套 formModel，用 disabled 切换只读；
 * - useGeneralCostEditForm：inline 布局，colspan 不生效，操作按钮走 btnAfter 插槽。
 */
import { computed, h, reactive, ref } from 'vue'
import { ElInput } from 'element-plus'
import {
  SearchForm,
  FormModal,
  FormPage,
  Table,
  Tag,
} from 'x-widgets-element-plus'
import type {
  ColumnForFormItemType,
  FormModelBlock,
  FormItemSlotRenderContext,
  TableColumn,
} from 'x-widgets-element-plus'
import CodeBlock from './CodeBlock.vue'
import demoSource from './RealCaseDemo.vue?raw'
import 'element-plus/dist/index.css'

interface ProjectRow {
  id: number
  projectName: string
  ownerUnit: string
  location: string
  projectType: string
  designStage: string
  capacity: string
  isGeneralContract: string
  remark: string
}

const projectTypeOptions = [
  { label: '燃机', value: 'gas' },
  { label: '输电', value: 'grid' },
  { label: '海风', value: 'offshore' },
]
const designStageOptions = [
  { label: '可研', value: 'feasibility' },
  { label: '初设', value: 'concept' },
  { label: '施工图', value: 'detail' },
]
const yesNoOptions = [
  { label: '是', value: 'yes' },
  { label: '否', value: 'no' },
]

const labelOf = (options: Array<{ label: string; value: string }>, value: string) =>
  options.find((o) => o.value === value)?.label || '—'

/* ---------- ① 列表查询（来自 useBasicProjectSearchForm） ---------- */
const query = reactive({
  projectName: '', ownerUnit: '', location: '',
  projectType: null as string | null, designStage: null as string | null,
})

const searchColumns: ColumnForFormItemType[] = [
  { el: 'input', label: '项目名称', name: 'projectName', colspan: 12,
    props: { placeholder: '请输入项目名称', clearable: true } },
  { el: 'input', label: '业主单位', name: 'ownerUnit', colspan: 12,
    props: { placeholder: '请输入业主单位', clearable: true } },
  { el: 'input', label: '项目所在地', name: 'location', colspan: 12,
    props: { placeholder: '请输入所在地', clearable: true } },
  { el: 'select', label: '项目类型', name: 'projectType', colspan: 12,
    options: projectTypeOptions,
    props: { clearable: true, placeholder: '全部类型' } },
  { el: 'select', label: '设计阶段', name: 'designStage', colspan: 12,
    options: designStageOptions,
    props: { clearable: true, placeholder: '全部阶段' } },
]

const rows = ref<ProjectRow[]>([
  { id: 1, projectName: '燃机造价分析', ownerUnit: '华东院', location: '江苏', projectType: 'gas', designStage: 'feasibility', capacity: '2×500MW', isGeneralContract: 'yes', remark: '' },
  { id: 2, projectName: '特高压线路评估', ownerUnit: '国网设计院', location: '湖北', projectType: 'grid', designStage: 'concept', capacity: '—', isGeneralContract: 'no', remark: '' },
  { id: 3, projectName: '近海风电场测算', ownerUnit: '中广核', location: '广东', projectType: 'offshore', designStage: 'detail', capacity: '300MW', isGeneralContract: 'yes', remark: '' },
])

const applied = reactive({ ...query })
const runCount = ref(0)

function applyQuery() {
  Object.assign(applied, query)
  runCount.value += 1
}
function resetQuery() {
  Object.assign(applied, { projectName: '', ownerUnit: '', location: '', projectType: null, designStage: null })
  runCount.value += 1
}

const filteredRows = computed(() => rows.value.filter((row) => (
  (!applied.projectName || row.projectName.includes(applied.projectName)) &&
  (!applied.ownerUnit || row.ownerUnit.includes(applied.ownerUnit)) &&
  (!applied.location || row.location.includes(applied.location)) &&
  (!applied.projectType || row.projectType === applied.projectType) &&
  (!applied.designStage || row.designStage === applied.designStage)
)))

const resultColumns: TableColumn[] = [
  { prop: 'projectName', label: '项目名称', minWidth: 150 },
  { prop: 'ownerUnit', label: '业主单位', minWidth: 110 },
  { prop: 'location', label: '所在地', minWidth: 80 },
  { label: '类型', minWidth: 80, cellRenderer: ({ rowData }) => labelOf(projectTypeOptions, rowData.projectType) },
  { label: '阶段', minWidth: 80, cellRenderer: ({ rowData }) => labelOf(designStageOptions, rowData.designStage) },
  { label: '操作', minWidth: 120, cellRenderer: ({ rowData }) => h('div', { class: 'ops' }, [
    h('button', { type: 'button', onClick: () => openRow(rowData, 'detail') }, '详情'),
    h('button', { type: 'button', onClick: () => openRow(rowData, 'edit') }, '编辑'),
  ]) },
]

/* ---------- ② 新增 / 编辑弹窗（来自 useBasicProjectFormModal） ---------- */
type ModalMode = 'create' | 'edit' | 'detail'
const modalVisible = ref(false)
const modalMode = ref<ModalMode>('detail')
const savedMessage = ref('')
const modalTitle = computed(() => (
  modalMode.value === 'create' ? '新增项目' : modalMode.value === 'edit' ? '编辑项目' : '项目详情'
))
/** detail 模式复用同一套 schema，只把整张表单置为只读。 */
const modalDisabled = computed(() => modalMode.value === 'detail')

const emptyForm = () => ({
  projectName: '', ownerUnit: '', location: '', capacity: '',
  projectType: null as string | null, designStage: null as string | null,
  isGeneralContract: null as string | null, remark: '',
})
const formModel = reactive(emptyForm())

const modalSchema: FormModelBlock[] = [
  { title: '基本信息', column: [
    { label: '项目名称', type: 'input', name: 'projectName', required: true, colspan: 12,
      props: { placeholder: '请输入项目名称', clearable: true } },
    { label: '业主单位', type: 'input', name: 'ownerUnit', required: true, colspan: 12,
      props: { placeholder: '请输入业主单位', clearable: true } },
    { label: '项目所在地', type: 'input', name: 'location', required: true, colspan: 12,
      props: { placeholder: '请输入项目所在地', clearable: true } },
    { label: '装机容量', type: 'input', name: 'capacity', required: true, colspan: 12,
      props: { placeholder: '示例：2×500MW', clearable: true } },
    { label: '项目类型', type: 'select', name: 'projectType', required: true, colspan: 12,
      options: projectTypeOptions, props: { clearable: true, placeholder: '请选择项目类型' } },
    { label: '设计阶段', type: 'select', name: 'designStage', required: true, colspan: 12,
      options: designStageOptions, props: { clearable: true, placeholder: '请选择设计阶段' } },
    { label: '是否总包', type: 'select', name: 'isGeneralContract', required: true, colspan: 12,
      options: yesNoOptions, props: { clearable: true, placeholder: '请选择是否总包' } },
    { label: '备注', type: 'textarea', name: 'remark', colspan: 24,
      props: { placeholder: '可选填写补充说明', rows: 3 } },
  ] },
]

function openCreate() {
  modalMode.value = 'create'
  Object.assign(formModel, emptyForm())
  modalVisible.value = true
}
function openRow(row: ProjectRow, mode: ModalMode) {
  modalMode.value = mode
  Object.assign(formModel, {
    projectName: row.projectName, ownerUnit: row.ownerUnit, location: row.location,
    capacity: row.capacity, projectType: row.projectType, designStage: row.designStage,
    isGeneralContract: row.isGeneralContract, remark: row.remark,
  })
  modalVisible.value = true
}
function onConfirm() {
  const payload = { ...formModel }
  if (modalMode.value === 'create') {
    rows.value.unshift({ id: Date.now(), ...payload })
  } else if (modalMode.value === 'edit') {
    const target = rows.value.find((r) => r.projectName === payload.projectName)
    if (target) Object.assign(target, payload)
  }
  modalVisible.value = false
  savedMessage.value = `${modalTitle.value}已提交：${payload.projectName}`
}

/* ---------- ③ 行内筛选条（来自 useGeneralCostEditForm） ---------- */
const inlineFilter = reactive({ systemFilter: '', matchStatusFilter: '', basisFilter: '' })
/** inline 布局下 colspan 不生效，所以这里不写 colspan——与原项目注释一致。 */
const inlineColumns: ColumnForFormItemType[] = [
  { type: 'select', label: '系统', name: 'systemFilter',
    options: [
      { label: '锅炉', value: 'boiler' }, { label: '汽机', value: 'turbine' }, { label: '电气', value: 'electric' },
    ],
    props: { placeholder: '请选择系统', clearable: true, style: { width: '160px' } } },
  { type: 'select', label: '匹配状态', name: 'matchStatusFilter',
    options: [
      { label: '已匹配', value: 'done' }, { label: '待核对', value: 'check' },
    ],
    props: { placeholder: '请选择匹配状态', clearable: true, style: { width: '160px' } } },
  { type: 'input', label: '项目依据', name: 'basisFilter',
    props: { placeholder: '请输入编制依据关键字', clearable: true, style: { width: '180px' } } },
]
/** 替代原页面的 ElInput 上传触发器：formSlot 渲染函数拿到 formData/disabled 上下文。 */
function uploadSlot({ formData: model, disabled }: FormItemSlotRenderContext) {
  return h(ElInput, {
    modelValue: model.uploadedFileName || '',
    placeholder: '点击选择本工程 Excel（formSlot 渲染函数）',
    readonly: true,
    disabled,
    onClick: () => { if (!disabled) model.uploadedFileName = '本工程清单.xlsx' },
  })
}
const inlineWithUpload: ColumnForFormItemType[] = [
  ...inlineColumns,
  { label: '本工程 Excel', name: 'uploadedFileName', formSlot: uploadSlot },
]
const inlineForm = reactive({ uploadedFileName: '', ...inlineFilter })

/** 用 FormPage 直接演示 inline 布局 + formSlot（原页面用 SearchForm 关掉查询按钮）。 */
const inlineDemoModel: FormModelBlock[] = [{ column: inlineWithUpload }]
</script>

<template>
  <div class="real-case" data-ui>
    <div class="real-case__head">
      <div>
        <span class="tag">真实案例简化</span>
        <p>下面三段交互分别简化自原项目三个页面的真实 composable；<b>字段只写一次 schema</b>，由 <code>SearchForm</code> / <code>FormPage</code> / <code>FormModal</code> 桥接渲染。</p>
      </div>
    </div>

    <!-- ① 列表查询 -->
    <section class="case-block">
      <h4>① 项目管理 · 列表查询 <small>useBasicProjectSearchForm</small></h4>
      <p class="case-hint">colspan=12 两列；填写后点「查询」，下方表格实时按同一份 formData 过滤。</p>
      <SearchForm :column="searchColumns" :form-data="query" layout="horizontal"
        label-width="90px" :enabled-expand="false"
        @search="applyQuery" @reset="resetQuery" />
      <div class="result-bar">
        <span>{{ filteredRows.length }} 条 · 第 {{ runCount }} 次查询</span>
        <Tag text="schema 驱动" type="success" />
      </div>
      <Table :columns="resultColumns" :data="filteredRows" :pagination="false" />
    </section>

    <!-- ② 弹窗表单 -->
    <section class="case-block">
      <h4>② 新增 / 编辑弹窗 <small>useBasicProjectFormModal</small></h4>
      <p class="case-hint">详情、编辑、新增共用同一套 formModel；detail 模式只切换 disabled，不另写只读组件。</p>
      <div class="ops"><button type="button" class="primary" @click="openCreate">+ 新增项目</button></div>
      <p v-if="savedMessage" class="saved">{{ savedMessage }}</p>
      <FormModal v-model:show="modalVisible" :modal-title="modalTitle"
        :form-model="modalSchema" :form-data="formModel" :disabled="modalDisabled"
        layout="horizontal" label-width="96px" modal-width="680px"
        @confirm="onConfirm" />
    </section>

    <!-- ③ 行内筛选条 -->
    <section class="case-block">
      <h4>③ 测算工作台 · 行内入参 <small>useGeneralCostEditForm</small></h4>
      <p class="case-hint">inline 布局下 colspan 不生效，因此 schema 不写 colspan；「本工程 Excel」用 formSlot 渲染函数做成点击上传框。</p>
      <FormPage :key="'inline'" :form-model="inlineDemoModel" :form-data="inlineForm"
        layout="inline" label-width="92px" />
      <p class="x-note">当前入参：{{ JSON.stringify(inlineForm) }}</p>
    </section>

    <CodeBlock :code="demoSource" />
  </div>
</template>

<style scoped>
.real-case { border: 1px solid var(--vp-c-divider); border-radius: 10px; padding: 18px; background: var(--vp-c-bg-soft); display: flex; flex-direction: column; gap: 16px; }
.real-case__head { display: flex; align-items: flex-start; gap: 12px; }
.tag { flex: none; font-size: 12px; font-weight: 600; color: var(--vp-c-brand-1); background: var(--vp-c-bg); border-radius: 6px; padding: 4px 8px; }
.real-case__head p { margin: 0; font-size: 13px; color: var(--vp-c-text-2); line-height: 1.5; }
.real-case__head b, .real-case__head code { color: var(--vp-c-text-1); }
.case-block { background: var(--vp-c-bg); border-radius: 8px; padding: 14px; }
.case-block h4 { margin: 0 0 4px; font-size: 14px; color: var(--vp-c-text-1); }
.case-block h4 small { font-weight: 400; font-size: 11px; color: var(--vp-c-text-3); margin-left: 6px; }
.case-hint { margin: 0 0 10px; font-size: 12px; color: var(--vp-c-text-2); line-height: 1.5; }
.result-bar { display: flex; align-items: center; justify-content: space-between; margin: 10px 0 8px; font-size: 12px; color: var(--vp-c-text-2); }
:deep(.XTable) { width: 100%; }
:deep(.ops) { display: flex; gap: 6px; }
:deep(.ops button) { font: inherit; font-size: 12px; padding: 4px 9px; border: 1px solid var(--vp-c-brand-1); border-radius: 5px; background: transparent; color: var(--vp-c-brand-1); cursor: pointer; }
.saved { font-size: 12px; color: var(--vp-c-brand-1); margin: 8px 0 0; }
.x-note { font-size: 12px; color: var(--vp-c-text-2); margin: 10px 0 0; }
:deep(.x-pick) { cursor: pointer; }
</style>
