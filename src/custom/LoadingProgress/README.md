# LoadingProgress implementation notes

The public API reference lives in [`docs/components/loading-progress.md`](../../../docs/components/loading-progress.md) and its Simplified Chinese counterpart.

`LoadingProgress` renders a controlled progress overlay. `LoadingProgressService` provides imperative `show`, `progress`, `autoProgress`, and `closeAll` methods. The consuming application owns the asynchronous work, network requests, and progress values; this package does not define an upload endpoint or application-specific workflow.
