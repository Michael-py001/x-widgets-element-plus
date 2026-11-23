# Contributing

## Local checks

Use Node.js 24 or newer for development and run these commands from the package root before opening a change. The published package runtime remains compatible with Node.js 18 or newer.

```sh
npm ci
npm run typecheck
npm test
npm run build
npm run docs:build
npm pack --dry-run
```

Keep public imports package-root based, update the English and Simplified Chinese docs together, and ground new props and events in the exported TypeScript types. Do not add host-application aliases or API clients to the package.
