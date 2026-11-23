# LoadingProgress

`LoadingProgress` 渲染可确定进度的遮罩层；`LoadingProgressService` 以命令式方式创建和管理遮罩。两个 API 都从包根目录导入：

```ts
import { LoadingProgress, LoadingProgressService } from 'x-widgets-element-plus'
```

## 组件用法

```vue
<LoadingProgress
  v-model:visible="visible"
  title="正在导入记录"
  :progress="progress"
  progress-text="正在上传…"
  @close="onClose"
/>
```

| Prop | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` | `string` | `正在处理中...` | 标题文字。 |
| `progressText` | `string` | `正在处理中，请稍后...` | 进度条下方的文字。 |
| `progress` | `number` | `0` | 百分比；渲染宽度限制在 0–100。 |
| `visible` | `boolean` | `false` | 控制组件渲染，支持 `v-model:visible`。 |
| `maskClosable` | `boolean` | `false` | 是否允许点击遮罩或按 Escape 关闭。 |

关闭时派发 `update:visible(false)` 与 `close`。组件在挂载后会注册 document 级键盘监听，因此仅用于浏览器环境。

## 服务用法

`show(options)` 会立即返回实例。请根据实际任务进度更新状态，并在 `finally` 中关闭：

```ts
const progress = LoadingProgressService.show({ title: '正在导入记录' })

try {
  await importRecords((percent) => progress.update({ progress: percent }))
  progress.update({ progress: 100, progressText: '导入完成' })
} finally {
  progress.close()
}
```

`LoadingProgressOptions` 支持 `title`、`progressText`、`progress`、`onClose` 和 `duration`（自动关闭毫秒数）。`LoadingProgressInstance` 提供 `update(partialOptions)`、`close()` 与 `destroy()`；`closeAll()` 会移除服务创建的全部遮罩。

| 方法 | 行为 |
| --- | --- |
| `show(options)` | 创建遮罩并立即返回实例。 |
| `progress(title, options)` | 创建遮罩的便捷方法；Promise 立即以实例 resolve，不代表任务已完成。 |
| `autoProgress(title, options)` | 按计时器推进动画，`duration` 默认 3000 毫秒，`steps` 默认 100。这是模拟进度，不代表实际任务完成度。 |
| `closeAll()` | 关闭服务创建的所有遮罩。 |

服务会向 `document.body` 添加 Vue 根节点，因此应在浏览器交互或生命周期中调用。关闭遮罩不会取消正在跟踪的任务。真实任务请根据其进度更新组件，并在成功或失败后关闭实例。
