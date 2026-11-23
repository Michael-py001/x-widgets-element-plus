<script setup lang="ts">
import { computed, ref } from 'vue'
import { Autocomplete, Input, RadioGroup, Tag } from 'x-widgets-element-plus'
import 'element-plus/dist/index.css'

const keyword = ref('')
const enabled = ref(true)
const options = [
  { label: 'Alpha', value: 'alpha' },
  { label: 'Beta', value: 'beta' },
  { label: 'Gamma', value: 'gamma' }
]
const summary = computed(() => `${keyword.value || 'No selection'} · ${enabled.value ? 'Enabled' : 'Disabled'}`)
</script>

<template>
  <div class="x-demo">
    <div class="x-demo__row">
      <Input v-model="keyword" placeholder="Search records" clearable />
      <Autocomplete v-model="keyword" :options="options" placeholder="Choose a name" />
      <RadioGroup
        v-model="enabled"
        :options="[
          { label: 'Enabled', value: true },
          { label: 'Disabled', value: false }
        ]"
      />
    </div>
    <div class="x-demo__result">
      <Tag :type="enabled ? 'success' : 'info'">{{ enabled ? 'Enabled' : 'Disabled' }}</Tag>
      <span>{{ summary }}</span>
    </div>
  </div>
</template>

<style scoped>
.x-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
}

.x-demo__row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.x-demo__row > :deep(.el-input),
.x-demo__row > :deep(.el-autocomplete) {
  min-width: 180px;
}

.x-demo__result {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 16px;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

@media (max-width: 640px) {
  .x-demo__row > * {
    width: 100%;
  }
}
</style>
