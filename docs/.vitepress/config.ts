import { env } from 'node:process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vitepress'

const zhSearchTranslations = {
  button: {
    buttonText: '搜索文档',
    buttonAriaLabel: '搜索文档',
  },
  modal: {
    displayDetails: '显示更多结果',
    resetButtonTitle: '清除查询条件',
    backButtonTitle: '返回',
    noResultsText: '没有找到相关结果',
    footer: {
      selectText: '选择',
      selectKeyAriaLabel: '选择键',
      navigateText: '切换',
      navigateUpKeyAriaLabel: '向上',
      navigateDownKeyAriaLabel: '向下',
      closeText: '关闭',
      closeKeyAriaLabel: '关闭键',
    },
  },
}

export default defineConfig({
  title: 'X Widgets · Element Plus',
  description: '基于 Element Plus 2 的 Vue 3 表单组件库，提供类型化 Schema 表单与业务组件。',
  lang: 'zh-CN',
  cleanUrls: true,
  base: env.VITEPRESS_BASE || '/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico', sizes: 'any' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    ['meta', { name: 'theme-color', content: '#409eff' }],
  ],
  vite: {
    plugins: [vueJsx()],
    resolve: {
      alias: {
        'x-widgets-element-plus': resolve(dirname(fileURLToPath(import.meta.url)), '../../src'),
      },
    },
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'X Widgets · Element Plus 组件文档',
      description: '基于 Element Plus 2 的 Vue 3 表单组件库，提供类型化 Schema 表单与业务组件。',
      themeConfig: {
        logo: '/logo.svg',
        nav: [
          { text: '指南', link: '/guide' },
          { text: '组件', link: '/components' },
          { text: 'AI 使用', link: '/ai' },
        ],
        search: { provider: 'local', options: { translations: zhSearchTranslations } },
        sidebar: {
          '/guide': [{ text: '从这里开始', items: [{ text: '安装与配置', link: '/guide' }] }],
          '/components': [{ text: '参考', items: [
            { text: '导出的组件', link: '/components' },
            { text: '基础控件', link: '/components/controls' },
            { text: 'Schema 表单', link: '/components/forms' },
            { text: '表格', link: '/components/table' },
            { text: '弹窗、标签与提示', link: '/components/feedback' },
            { text: 'AreaCascader 行政区划级联', link: '/components/area-cascader' },
            { text: 'LoadingProgress 进度', link: '/components/loading-progress' },
            { text: '工具与类型导出', link: '/components/exports' },
            { text: '跨库兼容性', link: '/components/compatibility' },
          ] }],
          '/ai': [{ text: 'AI 集成', items: [{ text: 'Agent 使用指南', link: '/ai' }] }],
        },
        outline: { level: [2, 3], label: '本页目录' },
        docFooter: { prev: '上一页', next: '下一页' },
        lastUpdated: { text: '最后更新于' },
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色主题',
        darkModeSwitchTitle: '切换到深色主题',
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '返回顶部',
        langMenuLabel: '切换语言',
        skipToContentLabel: '跳转到正文',
        notFound: {
          title: '页面未找到',
          quote: '如果你没有改变方向，继续寻找，最终会到达你想去的地方。',
          linkLabel: '返回首页',
          linkText: '返回首页',
        },
      },
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'X Widgets · Element Plus',
      description: 'Vue 3 form component library built on Element Plus 2 with typed schema-driven forms.',
      themeConfig: {
        logo: '/logo.svg',
        nav: [
          { text: 'Guide', link: '/en/guide' },
          { text: 'Components', link: '/en/components' },
          { text: 'AI usage', link: '/en/ai' },
        ],
        search: { provider: 'local' },
        sidebar: {
          '/en/guide': [{ text: 'Start here', items: [{ text: 'Installation & setup', link: '/en/guide' }] }],
          '/en/components': [{ text: 'Reference', items: [
            { text: 'Exported components', link: '/en/components' },
            { text: 'Controls', link: '/en/components/controls' },
            { text: 'Schema forms', link: '/en/components/forms' },
            { text: 'Table', link: '/en/components/table' },
            { text: 'Dialogs, tags & tooltips', link: '/en/components/feedback' },
            { text: 'AreaCascader', link: '/en/components/area-cascader' },
            { text: 'LoadingProgress', link: '/en/components/loading-progress' },
            { text: 'Utility & type exports', link: '/en/components/exports' },
            { text: 'Cross-library compatibility', link: '/en/components/compatibility' },
          ] }],
          '/en/ai': [{ text: 'AI integration', items: [{ text: 'Agent guide', link: '/en/ai' }] }],
        },
        outline: { level: [2, 3] },
      },
    },
  },
})
