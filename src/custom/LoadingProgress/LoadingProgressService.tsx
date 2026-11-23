import { createApp, App, reactive } from 'vue';
import LoadingProgress from './LoadingProgress';
import type { LoadingProgressProps } from './types/props';

interface LoadingProgressInstance {
  update: (options: Partial<LoadingProgressOptions>) => void;
  close: () => void;
  destroy: () => void;
}

interface LoadingProgressOptions {
  title?: string;
  progressText?: string;
  progress?: number;
  onClose?: () => void;
  duration?: number; // 自动关闭时间（毫秒）
}

class LoadingProgressManager {
  private instances: Map<string, { app: App; container: HTMLElement; instance: LoadingProgressInstance }> = new Map();
  private idCounter = 0;

  /**
   * 显示loading进度条
   * @param options 配置选项
   * @returns LoadingProgressInstance 实例，可用于更新和关闭
   */
  show(options: LoadingProgressOptions = {}): LoadingProgressInstance {
    const id = `loading-progress-${++this.idCounter}`;
    const container = document.createElement('div');
    document.body.appendChild(container);

    const defaultOptions: LoadingProgressOptions = {
      title: '正在处理中...',
      progressText: '',
      progress: 0,
      ...options
    };

    // 使用响应式对象，这样更新会自动触发视图更新
    const state = reactive({
      title: defaultOptions.title,
      progressText: defaultOptions.progressText,
      progress: defaultOptions.progress || 0
    });

    const app = createApp({
      render() {
        return (
          <LoadingProgress
            visible={true}
            title={state.title}
            progressText={state.progressText}
            progress={state.progress}
            onClose={() => {
              instance.close();
              defaultOptions.onClose?.();
            }}
          />
        );
      }
    });

    app.mount(container);

    const instance: LoadingProgressInstance = {
      update: (newOptions: Partial<LoadingProgressOptions>) => {
        // 直接更新响应式对象，Vue 会自动触发视图更新
        if (newOptions.title !== undefined) {
          state.title = newOptions.title;
        }
        if (newOptions.progressText !== undefined) {
          state.progressText = newOptions.progressText;
        }
        if (newOptions.progress !== undefined) {
          state.progress = Math.min(Math.max(newOptions.progress, 0), 100);
        }
      },

      close: () => {
        const instanceData = this.instances.get(id);
        if (instanceData) {
          instanceData.app.unmount();
          document.body.removeChild(instanceData.container);
          this.instances.delete(id);
        }
      },

      destroy: () => {
        instance.close();
      }
    };

    this.instances.set(id, { app, container, instance });

    // 如果设置了duration，自动关闭
    if (options.duration && options.duration > 0) {
      setTimeout(() => {
        instance.close();
      }, options.duration);
    }

    return instance;
  }

  /**
   * 关闭所有loading进度条
   */
  closeAll(): void {
    this.instances.forEach(({ app, container }) => {
      app.unmount();
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    });
    this.instances.clear();
  }

  /**
   * 创建一个可命令式控制的进度条实例。
   * @param title 标题
   * @param options 其他选项
   * @returns 可用于控制进度条的 Promise<LoadingProgressInstance>
   */
  progress(title: string, options: Omit<LoadingProgressOptions, 'title'> = {}): Promise<LoadingProgressInstance> {
    return new Promise((resolve) => {
      const instance = this.show({
        title,
        ...options,
        onClose: () => {
          options.onClose?.();
          resolve(instance);
        }
      });

      // 立即返回实例，允许调用者控制进度
      resolve(instance);
    });
  }

  /**
   * 显示带自动进度的loading
   * @param title 标题
   * @param options 配置选项
   * @returns Promise<void> 当进度完成时resolve
   */
  autoProgress(
    title: string,
    options: Omit<LoadingProgressOptions, 'title' | 'progress'> & {
      duration?: number; // 总持续时间，默认3000ms
      steps?: number; // 进度步数，默认100
    } = {}
  ): Promise<void> {
    return new Promise((resolve) => {
      const { duration = 3000, steps = 100, ...otherOptions } = options;
      const stepDuration = duration / steps;
      let currentStep = 0;

      const instance = this.show({
        title,
        progress: 0,
        ...otherOptions
      });

      const timer = setInterval(() => {
        currentStep++;
        const progress = (currentStep / steps) * 100;

        instance.update({
          progress,
          progressText: progress >= 100 ? '处理完成！' : `正在处理... ${Math.round(progress)}%`
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setTimeout(() => {
            instance.close();
            resolve();
          }, 500); // 显示完成状态500ms后关闭
        }
      }, stepDuration);
    });
  }
}

// 创建全局实例
const loadingProgressManager = new LoadingProgressManager();

// 导出便捷的命令式调用方法。
export const LoadingProgressService = {
  /**
   * 显示loading进度条
   * 用法: LoadingProgressService.show({ title: '正在处理...', progress: 50 })
   */
  show: loadingProgressManager.show.bind(loadingProgressManager),

  /**
   * 显示一个可命令式控制的进度条。
   * 用法: LoadingProgressService.progress('正在处理...')
   */
  progress: loadingProgressManager.progress.bind(loadingProgressManager),

  /**
   * 显示自动进度的loading
   * 用法: LoadingProgressService.autoProgress('正在处理数据...', { duration: 5000 })
   */
  autoProgress: loadingProgressManager.autoProgress.bind(loadingProgressManager),

  /**
   * 关闭所有进度条
   */
  closeAll: loadingProgressManager.closeAll.bind(loadingProgressManager)
};

// 默认导出，方便直接使用
export default LoadingProgressService;

// 类型导出
export type { LoadingProgressOptions, LoadingProgressInstance };
