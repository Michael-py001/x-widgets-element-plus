<template>
  <el-cascader
    v-model="innerPath"
    class="area-cascader"
    :options="options"
    :props="cascaderProps"
    :placeholder="placeholder"
    :clearable="clearable"
    :filterable="filterable"
    :disabled="disabled"
    @change="onChange"
  />
</template>

<script setup lang="ts" name="AreaCascader">
/**
 * 国内行政区划级联。
 * - maxLevel 控制展示列数（2=省市，不出现区县列）
 * - minSelectLevel 控制最低可选层级（1=可选省，2=至少市）
 * - injectCitySelfLevel 用于选市时落到市本级的场景
 * - treeData 可由调用方传入；未提供时使用包内置行政区数据
 */
import { computed, ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { buildAreaOptions, formatAreaValue, normalizeAreaPath, parseAreaValue } from './areaTree';
import type { AreaMaxLevel, AreaMinSelectLevel, AreaNode } from './types';

const props = withDefaults(
  defineProps<{
    maxLevel?: AreaMaxLevel;
    minSelectLevel?: AreaMinSelectLevel;
    injectCitySelfLevel?: boolean;
    priorityProvinces?: string[];
    treeData?: AreaNode[];
    checkStrictly?: boolean;
    valueType?: 'path' | 'joined';
    separator?: string;
    placeholder?: string;
    clearable?: boolean;
    filterable?: boolean;
    disabled?: boolean;
    invalidMessage?: string;
  }>(),
  {
    maxLevel: 3,
    minSelectLevel: 1,
    injectCitySelfLevel: false,
    priorityProvinces: () => [],
    checkStrictly: true,
    valueType: 'path',
    separator: '-',
    placeholder: '请选择地区',
    clearable: true,
    filterable: true,
    disabled: false,
    invalidMessage: ''
  }
);

const emit = defineEmits<{
  change: [path: string[]];
}>();

const model = defineModel<string | string[] | null>({ default: null });

const options = computed(() => {
  return buildAreaOptions(props.treeData, {
    maxLevel: props.maxLevel,
    injectCitySelfLevel: props.injectCitySelfLevel,
    priorityProvinces: props.priorityProvinces
  });
});

const cascaderProps = computed(() => ({
  checkStrictly: props.checkStrictly,
  emitPath: true,
  expandTrigger: 'click' as const
}));

const innerPath = ref<string[]>([]);

watch(
  () => model.value,
  (value) => {
    const parsed = parseAreaValue(value, props.separator);
    if (parsed.join('\0') !== innerPath.value.join('\0')) {
      innerPath.value = parsed;
    }
  },
  { immediate: true }
);

function commit(path: string[]): void {
  innerPath.value = path;
  if (props.valueType === 'joined') {
    model.value = formatAreaValue(path, props.separator);
  } else {
    model.value = path;
  }
  emit('change', path);
}

/**
 * 清空或选到低于最低层级时回退为空；选市且注入市本级时补齐第三级。
 */
function onChange(path: string[] | null): void {
  const raw = Array.isArray(path) ? path.filter(Boolean) : [];
  const next = normalizeAreaPath(raw, {
    minSelectLevel: props.minSelectLevel,
    maxLevel: props.maxLevel,
    injectCitySelfLevel: props.injectCitySelfLevel
  });
  if (raw.length > 0 && next.length === 0 && props.invalidMessage) {
    ElMessage.warning(props.invalidMessage);
  }
  commit(next);
}
</script>

<style lang="scss" scoped>
.area-cascader {
  width: 100%;
}
</style>
