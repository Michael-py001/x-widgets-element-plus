<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { codeToHtml } from 'shiki'

/**
 * 示例源码折叠展示：与 antdv.com 的「显示代码」一致，默认收起；用 Shiki 做语法高亮。
 * 源码取组件自身 ?raw 内容，这里先去掉 import、CodeBlock 调用和 style 块等脚手架，只留可讲解的核心。
 */
const props = defineProps<{ code: string }>()

/** 从示例源码中剥离与演示无关的脚手架（导入、CodeBlock 调用、样式块）。 */
function stripDemoBoilerplate(code: string): string {
  const lines = code
    .replace(/<style scoped>[\s\S]*?<\/style>/g, '')
    .split('\n')
    .filter((line) => {
      const trimmed = line.trim()
      if (/^import CodeBlock from ['"].*CodeBlock\.vue['"]/.test(trimmed)) return false
      if (/^import demoSource from ['"].*\?raw['"]/.test(trimmed)) return false
      if (/^import ['"]element-plus\/dist\/index\.css['"]/.test(trimmed)) return false
      if (/^<CodeBlock\b[^>]*\/?>$/.test(trimmed)) return false
      return true
    })
  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim()
}

const html = ref('')
async function highlight(code: string) {
  html.value = await codeToHtml(stripDemoBoilerplate(code), {
    lang: 'vue',
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: false,
  })
}
onMounted(() => highlight(props.code))
watch(() => props.code, highlight)
</script>

<template>
  <details class="code-block">
    <summary class="code-block__toggle">显示代码</summary>
    <!-- vp-code 让 VitePress 现有的明暗色规则（--shiki-light / --shiki-dark）生效。 -->
    <div v-if="html" class="vp-code code-block__pre" v-html="html" />
    <pre v-else class="code-block__pre"><code>{{ stripDemoBoilerplate(code) }}</code></pre>
  </details>
</template>

<style scoped>
.code-block { margin-top: 10px; border: 1px solid var(--vp-c-divider); border-radius: 8px; overflow: hidden; }
.code-block__toggle { cursor: pointer; list-style: none; padding: 8px 14px; font-size: 12px; color: var(--vp-c-brand-1); background: var(--vp-c-bg); user-select: none; }
.code-block__toggle::-webkit-details-marker { display: none; }
.code-block__toggle::before { content: '▸ '; }
.code-block[open] .code-block__toggle::before { content: '▾ '; }
.code-block__pre { margin: 0; padding: 14px; max-height: 420px; overflow: auto; background: var(--vp-c-bg); border-top: 1px solid var(--vp-c-divider); }
.code-block__pre :deep(code),
.code-block__pre :deep(pre) { font-family: var(--vp-font-family-mono); font-size: 11.5px; line-height: 1.55; color: var(--vp-c-text-1); white-space: pre; }
.code-block__pre :deep(.shiki) { background: transparent !important; }
</style>
