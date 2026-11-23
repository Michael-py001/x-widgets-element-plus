<script setup lang="ts">
/**
 * @description: 标签页组件
 * @example:
 *  <Tabs :tabs="[{ key: 'tab1', label: '标签1' }, { key: 'tab2', label: '标签2', slot: 'custom2' }]">
  <template #tab1>第一个标签内容</template>
  <template #custom2>第二个标签内容</template>
</Tabs>
 **/
interface TabItem {
  key: string | number;
  label: string;
  slot?: string;
}

const props = defineProps<{
  tabs?: TabItem[];
  type?: 'border-card' | 'card' | '';
  lazy?: boolean;
}>();
const activeTab = defineModel<string>();

const getTabSlotName = (tab: TabItem) => String(tab.slot ?? tab.key ?? tab.label);
</script>
<template>
  <el-tabs v-model="activeTab" style="--el-border-color-light: #e8eff8" :type="props.type">
    <el-tab-pane v-for="tab in props.tabs" :key="tab.key" :label="tab.label" :name="tab.key" :lazy="props.lazy">
      <template #label>
        <div class="flex items-center px-4">
          <i class="i-tdesign:layers text-4"></i>
          <span class="ml-2 font-400">{{ tab.label }}</span>
        </div>
      </template>
      <slot :name="getTabSlotName(tab)" />
    </el-tab-pane>
  </el-tabs>
</template>
