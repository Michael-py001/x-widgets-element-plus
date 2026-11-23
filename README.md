# x-widgets-element-plus

[![CI](https://github.com/Michael-py001/x-widgets-element-plus/actions/workflows/ci.yml/badge.svg)](https://github.com/Michael-py001/x-widgets-element-plus/actions/workflows/ci.yml) [![Docs](https://img.shields.io/badge/docs-online-blue.svg)](https://michael-py001.github.io/x-widgets-element-plus/) [![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

Vue 3 form component library built on Element Plus 2. The package provides control adapters and typed schema-driven form, table, dialog, feedback, and China administrative-area widgets without depending on host-application APIs.

## Requirements

- Node.js 18 or newer
- Vue 3.5 or newer
- Element Plus 2.11 or newer
- `@element-plus/icons-vue` 2.3 or newer

## Install

```sh
npm install x-widgets-element-plus vue element-plus @element-plus/icons-vue
```

Vue, Element Plus, and `@element-plus/icons-vue` are peer dependencies and must be installed by the consuming application.

## Usage

```ts
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import XWidgets from 'x-widgets-element-plus';
import 'x-widgets-element-plus/style.css';
import App from './App.vue';

const app = createApp(App);
app.use(ElementPlus);
app.use(XWidgets);
app.mount('#app');
```

Import individual components and public types from the package root when preferred:

```ts
import { AreaCascader, CustomForm, SearchForm, Table } from 'x-widgets-element-plus';
import type { AreaNode, SearchFormProps, TableColumn } from 'x-widgets-element-plus';
```

`AreaCascader` includes built-in administrative-area data. Pass `treeData` to provide a custom tree.

## Documentation

The English and Chinese documentation is published at https://michael-py001.github.io/x-widgets-element-plus/ (source in `docs/`). Run `npm run docs:dev` to view it locally or `npm run docs:build` to build the static site. The `Deploy documentation` workflow publishes the site to GitHub Pages on pushes to `main` and via manual dispatch; Pages must use **GitHub Actions** as its build and deployment source. Repository contributors can also use `.agents/skills/x-widgets-element-plus/SKILL.md` with coding agents.

## Development

```sh
npm install
npm run typecheck
npm test
npm run build
npm pack --dry-run
```

Build artifacts are emitted to `dist/` as ESM, CommonJS, TypeScript declarations, and `style.css`.

## License

MIT. See [LICENSE](./LICENSE).
