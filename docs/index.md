---
layout: home
hero:
  name: x-widgets-element-plus
  text: ''
  tagline: 基于 Element Plus 2 的类型化 Schema 控件，覆盖表单、表格与行政区划选择。
  image:
    src: /logo.svg
    alt: logo
  actions:
    - theme: brand
      text: 快速开始
      link: /guide
    - theme: alt
      text: 浏览组件
      link: /components/
    - theme: alt
      text: AI 集成
      link: /ai
features:
  - title: 原生框架契约
    details: 基于 Element Plus 2 构建，提供类型化 schema 组件、包根目录导出，以及明确的 peer 依赖与 CSS 配置。
  - title: 数据留在你的应用里
    details: 由你提供表单模型、表格行数据与行政区划树；请求与业务行为全部留在消费方应用中。
  - title: 面向 Agent 的参考资料
    details: 可搜索的 VitePress 文档、llms.txt、兼容性说明，以及该包专用的编码 Agent skill。
---

为已经使用 Element Plus 2 的 Vue 3 应用而设计。加载 Element Plus 与本包的 CSS，然后用类型化的表单字段和明确的表格契约组合[已导出的组件](/components/)。

本包不绑定任何特定应用的 API。它是独立于 `x-widgets-antdv` 的 UI 包；两者的框架、样式体系与组件特有行为均不可互换。
