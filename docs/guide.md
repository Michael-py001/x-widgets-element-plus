# Installation & setup

## Requirements

| Dependency | Supported line | Notes |
| --- | --- | --- |
| Node.js | 18+ | For the consuming app's toolchain; use an active LTS release. |
| Vue | 3.5+ | Peer dependency. |
| Element Plus | 2.11+ | Peer dependency; load its stylesheet separately. |
| `@element-plus/icons-vue` | 2.3+ | Peer dependency used by the schema form controls. |

```sh
npm install x-widgets-element-plus vue element-plus @element-plus/icons-vue
```

## Global registration

```ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'x-widgets-element-plus/style.css'
import XWidgets from 'x-widgets-element-plus'
import App from './App.vue'

createApp(App).use(ElementPlus).use(XWidgets).mount('#app')
```

Import framework CSS before or alongside package CSS from one application entry. This package does not install Element Plus or apply your application theme automatically.

## Selective registration

Import only names present in the [public export catalog](/components/). Use the package root; internal source paths are not a public API.

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

## Peer dependencies and browser features

- Vue and Element Plus are peers; the host application owns their version and plugin configuration.
- `AreaCascader` ships built-in administrative-area data and can receive a custom tree through `treeData`.
- Table virtualization, DOM sizing, and file controls require browser rendering. Keep those interactions within client-rendered pages when using SSR.
- The package does not depend on application-specific aliases or request services. Load data in the host application and pass it as props.

## Package scripts

```sh
npm run docs:dev       # local documentation server
npm run docs:build     # production documentation build
npm run docs:preview   # preview the generated site
npm run typecheck
npm test
npm run build          # ESM, CJS, CSS, declarations
npm pack --dry-run
```
