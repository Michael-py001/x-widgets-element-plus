# AI and coding-agent guide

A focused agent skill at `.agents/skills/x-widgets-element-plus/SKILL.md` accompanies this package; it is included in the npm package and copied to `/agents/skills/x-widgets-element-plus/SKILL.md` in the VitePress output. It instructs coding agents to choose the right framework, ground code in actual exports and types, and verify changes.

## Give an agent the right context

1. State that the host app uses **Vue 3 + Element Plus 2**.
2. Ask for `x-widgets-element-plus`; do not mix in the Ant Design Vue package.
3. Point the agent to this page and `.agents/skills/x-widgets-element-plus/SKILL.md`.
4. Require package-root imports, Element Plus CSS, and package CSS.
5. Ask it to use `ColumnForFormItemType`, `FormModelBlock`, `TableColumn`, and `AreaNode` where applicable.
6. Keep API access and domain behavior in the host app; pass data to widgets through props.
7. Verify with typecheck, tests, build, and docs build.

## Context files

- [`/llms.txt`](/llms.txt): deployed compact retrieval index; its source is `docs/public/llms.txt`.
- [Export catalog](/components/): package-root names and type exports.
- [Controls](/components/controls): direct control adapters and native boundaries.
- [Schema forms](/components/forms): SearchForm, FormPage, field schema, and events.
- [Table](/components/table): standard versus virtualized table contracts.
- [AreaCascader](/components/area-cascader): selection values and level rules.
- [LoadingProgress](/components/loading-progress): component and imperative service lifecycle.
- [Compatibility](/components/compatibility): migration limits relative to Ant Design Vue.

## Prompt template

> Build this screen in my Vue 3 + Element Plus application using `x-widgets-element-plus`. Read the package component catalog and skill first. Use only package-root exports and declared props/types. Define fields with `ColumnForFormItemType`, use `FormModelBlock[]` for grouped FormPage sections, and choose `Table` or `TableVirtualized` based on the documented contract. Keep data fetching in the application, include Element Plus and package CSS, and report local checks actually run. Do not assume Ant Design Vue APIs or invent widget props.

## Ground truth

The source export list is `src/components.ts`; wrapper contracts are in the component type files and generated declarations. Use framework documentation for native Element Plus behavior. If docs and declarations disagree, prefer the declarations/source for this package version and report the discrepancy for correction.
