<script setup lang="ts">
/** 示例源码折叠展示：与 antdv.com 的「显示代码」一致，默认收起。 */
defineProps<{ code: string }>()
</script>

<template>
  <details class="code-block">
    <summary class="code-block__toggle">显示代码</summary>
    <pre class="code-block__pre"><code>{{ code }}</code></pre>
  </details>
</template>

<style scoped>
.code-block { margin-top: 10px; border: 1px solid var(--vp-c-divider); border-radius: 8px; overflow: hidden; }
.code-block__toggle { cursor: pointer; list-style: none; padding: 8px 14px; font-size: 12px; color: var(--vp-c-brand-1); background: var(--vp-c-bg); user-select: none; }
.code-block__toggle::-webkit-details-marker { display: none; }
.code-block__toggle::before { content: '▸ '; }
.code-block[open] .code-block__toggle::before { content: '▾ '; }
.code-block__pre { margin: 0; padding: 14px; max-height: 420px; overflow: auto; background: var(--vp-c-bg); border-top: 1px solid var(--vp-c-divider); }
.code-block__pre code { font-family: var(--vp-font-family-mono); font-size: 12px; line-height: 1.6; color: var(--vp-c-text-1); white-space: pre; }
</style>
