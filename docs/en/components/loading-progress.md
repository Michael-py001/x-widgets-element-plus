# LoadingProgress

`LoadingProgress` renders a determinate progress overlay. `LoadingProgressService` creates and manages overlays imperatively. Import both from the package root:

```ts
import { LoadingProgress, LoadingProgressService } from 'x-widgets-element-plus'
```

## Component

```vue
<LoadingProgress
  v-model:visible="visible"
  title="Importing records"
  :progress="progress"
  progress-text="Uploading…"
  @close="onClose"
/>
```

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `title` | `string` | `正在处理中...` | Heading text. |
| `progressText` | `string` | `正在处理中，请稍后...` | Text below the bar. |
| `progress` | `number` | `0` | Percent; rendering is clamped to 0–100. |
| `visible` | `boolean` | `false` | Controls rendering; supports `v-model:visible`. |
| `maskClosable` | `boolean` | `false` | Allows closing by clicking the mask or pressing Escape. |

It emits `update:visible(false)` and `close` when closed. The component is browser-only because it registers a document-level keyboard listener after mounting.

## Service

`show(options)` returns an instance immediately. Update it as the real task reports progress and close it in `finally`:

```ts
const progress = LoadingProgressService.show({ title: 'Importing records' })

try {
  await importRecords((percent) => progress.update({ progress: percent }))
  progress.update({ progress: 100, progressText: 'Import complete' })
} finally {
  progress.close()
}
```

`LoadingProgressOptions` supports `title`, `progressText`, `progress`, `onClose`, and `duration` (automatic close in milliseconds). `LoadingProgressInstance` provides `update(partialOptions)`, `close()`, and `destroy()`; `closeAll()` removes every service-created overlay.

| Method | Behavior |
| --- | --- |
| `show(options)` | Create an overlay and return its instance. |
| `progress(title, options)` | Convenience alias for creating an overlay; its promise resolves immediately with the instance, not when the task finishes. |
| `autoProgress(title, options)` | Advance a timer-based animation over `duration` (default 3000 ms) using `steps` (default 100). This is simulated progress, not a measurement of task completion. |
| `closeAll()` | Close every overlay created by the service. |

The service appends Vue roots to `document.body`; call it only in a browser interaction or lifecycle. Closing the overlay does not cancel the work being tracked. For real work, update progress from the task and close the instance when the task completes or fails.
