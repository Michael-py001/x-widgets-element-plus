---
name: x-widgets-element-plus
description: Build Vue 3 interfaces with the x-widgets-element-plus package when the host app uses Element Plus.
---

# x-widgets-element-plus skill

Use this skill when building or changing Vue UI in an application that uses Element Plus and `x-widgets-element-plus`.

## Select the correct library

- Choose this package only for a Vue 3 + Element Plus host.
- For an Ant Design Vue app, use `x-widgets-antdv` and its separate skill. Do not mix framework plugins or CSS in one screen to imitate API parity.

## Read the local contract

Before coding, read these package docs in the user's language. Use `docs/` for Simplified Chinese (the default) and `docs/en/` for English (for example, `docs/guide.md` → `docs/en/guide.md`). Keep component names, prop names, and code identifiers unchanged when explaining the API.

1. `docs/guide.md` for setup, peers, and CSS.
2. `docs/components/index.md` for root exports.
3. `docs/components/forms.md` for `ColumnForFormItemType`, `FormModelBlock`, and SearchForm events.
4. `docs/components/table.md` to choose standard or virtualized table.
5. `docs/components/area-cascader.md` for model format, levels, and custom data.
6. `docs/components/compatibility.md` when porting code from Ant Design Vue.

The public entry is `src/index.ts` → `src/components.ts`. Import from the package root; deep imports are not stable API. The source declarations and generated `dist/*.d.ts` define the shipped contract.

## Implementation rules

- Include `element-plus/dist/index.css` and `x-widgets-element-plus/style.css` once in the app entry.
- The app owns Vue and Element Plus peer dependency versions/configuration.
- Use `ColumnForFormItemType` for fields and `FormModelBlock[]` for grouped `FormPage`/`FormModal` sections; `SearchForm` accepts a flat `column[]`.
- Keep API access, query state, permissions, and domain validation in the consuming app. Pass prepared models and rows into widgets.
- Use `Table` for the standard Element Plus table contract; use `TableVirtualized` only when its V2 dimensions/columns contract fits. Do not transfer `TableColumn` blindly to V2.
- `AreaCascader` has built-in data and accepts `treeData`; honor `maxLevel`, `minSelectLevel`, and the selected `valueType` when consuming the model.
- Schema form `type` accepts bare names and `x-` aliases (for example `input`/`x-input`, `transfer`/`x-transfer`, `upload`/`x-upload`) that resolve to the same adapter, matching `x-widgets-antdv` naming. `transfer` binds selected keys via `modelValue`; `upload` binds the controlled `fileList`.
- `ColorPicker` is available here but has no Ant Design Vue 4 counterpart; do not assume it when porting schemas to `x-widgets-antdv`.
- Do not invent exports or props. If a required API is missing from the root catalog and declarations, state that and propose a source-backed change.

## Verification

From the package root, run `npm run typecheck`, `npm test`, `npm run build`, and `npm run docs:build` for changes affecting code, types, or public documentation. Verify CSS and peer setup in the consuming app where possible. Report actual command results; a successful bundle alone does not establish declaration correctness.
