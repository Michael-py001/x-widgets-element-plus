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
  description: 'Vue 3 business widgets and typed schema-driven forms built on Element Plus.',
  lang: 'en-US',
  cleanUrls: true,
  base: env.VITEPRESS_BASE || '/',
  vite: {
    plugins: [vueJsx()],
    resolve: {
      alias: {
        'x-widgets-element-plus': resolve(dirname(fileURLToPath(import.meta.url)), '../../src'),
      },
    },
  },
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide' },
      { text: 'Components', link: '/components' },
      { text: 'AI usage', link: '/ai' },
    ],
    search: { provider: 'local' },
    sidebar: {
      '/guide': [{ text: 'Start here', items: [{ text: 'Installation & setup', link: '/guide' }] }],
      '/components': [{ text: 'Reference', items: [
        { text: 'Exported components', link: '/components' },
        { text: 'Controls', link: '/components/controls' },
        { text: 'Schema forms', link: '/components/forms' },
        { text: 'Table', link: '/components/table' },
        { text: 'Dialogs, tags & tooltips', link: '/components/feedback' },
        { text: 'AreaCascader', link: '/components/area-cascader' },
        { text: 'LoadingProgress', link: '/components/loading-progress' },
        { text: 'Utility & type exports', link: '/components/exports' },
        { text: 'Cross-library compatibility', link: '/components/compatibility' },
      ] }],
      '/ai': [{ text: 'AI integration', items: [{ text: 'Agent guide', link: '/ai' }] }],
    },
    outline: { level: [2, 3] },
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      title: 'X Widgets · Element Plus',
      description: 'Vue 3 business widgets and typed schema-driven forms built on Element Plus.',
    },
    'zh-CN': {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'X Widgets · Element Plus 组件文档',
      description: '基于 Element Plus 的 Vue 3 业务组件与类型化、schema 驱动的表单。',
      themeConfig: {
        nav: [
          { text: '指南', link: '/zh-CN/guide' },
          { text: '组件', link: '/zh-CN/components' },
          { text: 'AI 使用', link: '/zh-CN/ai' },
        ],
        search: { provider: 'local', options: { translations: zhSearchTranslations } },
        sidebar: {
          '/zh-CN/guide': [{ text: '从这里开始', items: [{ text: '安装与配置', link: '/zh-CN/guide' }] }],
          '/zh-CN/components': [{ text: '参考', items: [
            { text: '导出的组件', link: '/zh-CN/components' },
            { text: '基础控件', link: '/zh-CN/components/controls' },
            { text: 'Schema 表单', link: '/zh-CN/components/forms' },
            { text: '表格', link: '/zh-CN/components/table' },
            { text: '弹窗、标签与提示', link: '/zh-CN/components/feedback' },
            { text: 'AreaCascader 行政区划级联', link: '/zh-CN/components/area-cascader' },
            { text: 'LoadingProgress 进度', link: '/zh-CN/components/loading-progress' },
            { text: '工具与类型导出', link: '/zh-CN/components/exports' },
            { text: '跨库兼容性', link: '/zh-CN/components/compatibility' },
          ] }],
          '/zh-CN/ai': [{ text: 'AI 集成', items: [{ text: 'Agent 使用指南', link: '/zh-CN/ai' }] }],
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
  },
})
