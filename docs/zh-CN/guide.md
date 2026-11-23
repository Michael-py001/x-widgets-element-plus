# 安装与配置

## 环境要求

| 依赖 | 支持版本 | 说明 |
| --- | --- | --- |
| Node.js | 18+ | 用于消费方应用的工具链；请使用仍在维护的 LTS 版本。 |
| Vue | 3.5+ | peer 依赖（同级依赖）。 |
| Element Plus | 2.11+ | peer 依赖；需单独加载其样式表。 |
| `@element-plus/icons-vue` | 2.3+ | schema 表单控件使用的 peer 依赖。 |

```sh
npm install x-widgets-element-plus vue element-plus @element-plus/icons-vue
```

## 全局注册

```ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'x-widgets-element-plus/style.css'
import XWidgets from 'x-widgets-element-plus'
import App from './App.vue'

createApp(App).use(ElementPlus).use(XWidgets).mount('#app')
```

请在同一个应用入口中先加载框架 CSS，或与本包 CSS 一并加载。本包不会替你安装 Element Plus，也不会自动套用你的应用主题。

## 按需注册

只导入[公开导出清单](/zh-CN/components/)中存在的名称。请使用包根目录导入；内部源码路径不属于公开 API。

```ts
import { createApp } from 'vue'
import { AreaCascader, SearchForm, Table } from 'x-widgets-element-plus'
import 'x-widgets-element-plus/style.css'
import App from './App.vue'

createApp(App)
  .component('AreaCascader', AreaCascader)
  .component('SearchForm', SearchForm)
  .component('XTable', Table)
  .mount('#app')
```

## Peer 依赖与浏览器特性

- Vue 与 Element Plus 均为 peer 依赖；其版本与插件配置由宿主应用负责。
- `AreaCascader` 内置中国行政区划数据，也可通过 `treeData` 接收自定义树。
- 表格虚拟滚动、DOM 尺寸计算与文件控件依赖浏览器渲染。使用 SSR 时，请将这些交互限制在客户端渲染的页面中。
- 本包不依赖任何特定应用的 API 别名或请求服务。请在宿主应用加载业务数据，再通过 props 传入。

## 包脚本

```sh
npm run docs:dev       # 本地文档服务器
npm run docs:build     # 生产环境文档构建
npm run docs:preview   # 预览生成的站点
npm run typecheck
npm test
npm run build          # ESM、CJS、CSS、类型声明
npm pack --dry-run
```
