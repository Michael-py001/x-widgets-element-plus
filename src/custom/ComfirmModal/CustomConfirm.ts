import { render, h, ref, type Ref } from 'vue';
import CustomConfirmModal from './BaseConfirmModal';

// ==================== 类型定义 ====================

/**
 * 确认框配置选项
 */
export interface CustomConfirmOptions {
  /** 标题 */
  title?: string;
  /** 消息内容 */
  message?: string;
  /** 按钮类型 */
  type?: 'primary' | 'danger';
  /** 确认按钮文本 */
  confirmText?: string;
  /** 取消按钮文本 */
  cancelText?: string;
  /** 确认回调（可选，如不提供则使用 .then 方式） */
  onConfirm?: () => Promise<void> | void;
  showCancelBtn?: boolean;
  showConfirmBtn?: boolean;
}

/**
 * 取消状态标识
 */
export interface ConfirmCancelStatus {
  status: 'cancel';
}

/**
 * Modal 控制器接口
 */
interface ModalController {
  updateLoading: (loading: boolean) => void;
  cleanup: () => void;
  resetConfirmed: () => void;
}

// ==================== 工具函数 ====================

/**
 * 判断值是否为 Promise
 */
function isPromiseLike(value: any): value is PromiseLike<any> {
  return value && typeof value.then === 'function';
}

/**
 * 创建 DOM 容器并挂载到 body
 */
function createContainer(): HTMLDivElement {
  const container = document.createElement('div');
  document.body.appendChild(container);
  return container;
}

/**
 * 销毁容器
 */
function destroyContainer(container: HTMLElement): void {
  if (container.parentNode) {
    render(null, container);
    document.body.removeChild(container);
  }
}

// ==================== 增强的 Promise 类 ====================

/**
 * 增强的 Promise 类，支持自动检测 .then() 中的异步操作并显示 loading
 */
class EnhancedConfirmPromise extends Promise<boolean> {
  private controller?: ModalController;
  private thenCallback?: (value: boolean) => any;

  constructor(executor: (resolve: (value: boolean) => void, reject: (reason?: any) => void) => void) {
    super(executor);
  }

  /**
   * 注入 Modal 控制器
   */
  setController(controller: ModalController): void {
    this.controller = controller;
  }

  /**
   * 获取保存的 then 回调（用于重试）
   */
  getThenCallback() {
    return this.thenCallback;
  }

  /**
   * 重写 then 方法，自动处理异步操作
   */
  then<TResult1 = boolean, TResult2 = never>(
    onfulfilled?: ((value: boolean) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
  ): Promise<TResult1 | TResult2> {
    const { controller } = this;
    if (!controller || !onfulfilled) {
      return super.then(onfulfilled, onrejected);
    }

    // 保存回调函数，用于重试
    this.thenCallback = onfulfilled;

    const wrappedCallback = (value: boolean) => {
      try {
        const result = onfulfilled(value);

        // 如果返回 Promise，自动处理 loading 状态
        if (isPromiseLike(result)) {
          controller.updateLoading(true);

          return Promise.resolve(result)
            .then((res) => {
              controller.updateLoading(false);
              controller.cleanup();
              return res;
            })
            .catch((error) => {
              // 异步操作失败时，关闭 loading 并重置确认状态，允许重试
              controller.updateLoading(false);
              controller.resetConfirmed();
              throw error;
            });
        }

        // 同步操作，直接关闭
        controller.cleanup();
        return result;
      } catch (error) {
        controller.cleanup();
        throw error;
      }
    };

    return super.then(wrappedCallback, onrejected);
  }
}

// ==================== 主函数 ====================

/**
 * 创建 Modal 实例
 */
function createModalInstance(
  options: CustomConfirmOptions,
  container: HTMLElement,
  isLoading: Ref<boolean>,
  onResolve: () => void,
  onReject: (reason: ConfirmCancelStatus) => void,
  getThenCallback?: () => ((value: boolean) => any) | undefined,
  updateLoadingFn?: (loading: boolean) => void
) {
  let isConfirmed = false;
  let hasResolved = false; // 标记 Promise 是否已经 resolve

  /**
   * 处理确认操作
   */
  const handleConfirm = async () => {
    if (isLoading.value) return;

    try {
      // 如果提供了 onConfirm 回调，使用回调方式
      if (options.onConfirm) {
        if (updateLoadingFn) {
          updateLoadingFn(true); // 使用 updateLoading 触发重新渲染
        } else {
          isLoading.value = true;
        }
        const result = options.onConfirm();
        if (isPromiseLike(result)) {
          await result;
        }
        destroyContainer(container);
        isConfirmed = true;
        onResolve();
      } else {
        // 使用 .then 方式
        const thenCallback = getThenCallback?.();

        // 第一次点击，resolve Promise 触发 .then
        if (!hasResolved) {
          isConfirmed = true;
          hasResolved = true;
          // 当调用方仅挂载 catch（如 await confirm().catch(...)）时，不会注册成功回调，
          // 这里需要兜底关闭弹窗，避免 resolve 后无 cleanup 导致弹窗残留。
          if (!thenCallback) {
            destroyContainer(container);
          }
          onResolve();
        } else if (thenCallback) {
          // 重试：直接执行 .then 回调
          if (updateLoadingFn) {
            updateLoadingFn(true); // 使用 updateLoading 触发重新渲染
          }
          const result = thenCallback(true);

          if (isPromiseLike(result)) {
            await result;
            if (updateLoadingFn) {
              updateLoadingFn(false);
            }
            destroyContainer(container);
          } else {
            destroyContainer(container);
          }
        }
      }
    } catch (error) {
      if (updateLoadingFn) {
        updateLoadingFn(false);
      } else {
        isLoading.value = false;
      }
      console.error('确认操作失败:', error);
    }
  };

  /**
   * 处理取消操作
   */
  const handleCancel = () => {
    if (isLoading.value) return;
    destroyContainer(container);
    onReject({ status: 'cancel' });
  };

  /**
   * 处理弹窗关闭（点击遮罩等）
   */
  const handleClose = (visible: boolean) => {
    if (!visible && !isLoading.value && !isConfirmed) {
      destroyContainer(container);
      onReject({ status: 'cancel' });
    }
  };

  /**
   * 重置确认状态（用于异步操作失败后允许重试）
   */
  const resetConfirmed = () => {
    isConfirmed = false;
  };

  return {
    handleConfirm,
    handleCancel,
    handleClose,
    resetConfirmed,
    get isConfirmed() {
      return isConfirmed;
    }
  };
}

/**
 * 创建确认对话框
 * @param options 配置选项
 * @returns Promise<boolean> 用户确认返回 true，取消则 reject { status: 'cancel' }
 *
 * @example
 * // 方式1: 使用 onConfirm 回调
 * customConfirm({
 *   message: '确定删除吗？',
 *   onConfirm: async () => {
 *     await deleteAPI();
 *   }
 * });
 *
 * @example
 * // 方式2: 使用 .then（自动检测 async，显示 loading）
 * customConfirm({ message: '确定删除吗？' })
 *   .then(async () => {
 *     await deleteAPI(); // 自动显示 loading
 *   })
 *   .catch((error) => {
 *     if (error?.status === 'cancel') return; // 用户取消
 *   });
 */
export function customConfirm(options: CustomConfirmOptions): Promise<boolean> {
  const container = createContainer();
  const isLoading = ref(false);

  let controller: ModalController;

  const promise = new EnhancedConfirmPromise((resolve, reject) => {
    // 使用对象存储实例引用（闭包延迟调用）
    const instanceRef: {
      handleConfirm?: () => Promise<void>;
      handleCancel?: () => void;
      handleClose?: (v: boolean) => void;
      resetConfirmed?: () => void;
    } = {};

    // 1. 先定义 renderModal 函数
    const renderModal = () => {
      const vnode = h(
        CustomConfirmModal,
        {
          show: true,
          title: options.title,
          type: options.type || 'primary',
          confirmText: options.confirmText,
          cancelText: options.cancelText,
          okBtnLoading: isLoading.value,
          showCancelBtn: options.showCancelBtn,
          showConfirmBtn: options.showConfirmBtn,
          onConfirm: () => instanceRef.handleConfirm?.(),
          onCancel: () => instanceRef.handleCancel?.(),
          'onUpdate:show': (v) => instanceRef.handleClose?.(v)
        },
        {
          default: () => options.message
        }
      );

      render(vnode, container);
    };

    // 2. 定义 updateLoading 函数
    const updateLoadingFn = (loading: boolean) => {
      isLoading.value = loading;
      renderModal();
    };

    // 3. 创建 Modal 实例（直接传递，无需对象包装）
    const { handleConfirm, handleCancel, handleClose, resetConfirmed } = createModalInstance(
      options,
      container,
      isLoading,
      () => resolve(true),
      reject,
      () => promise.getThenCallback(),
      updateLoadingFn
    );

    // 4. 赋值到对象引用
    instanceRef.handleConfirm = handleConfirm;
    instanceRef.handleCancel = handleCancel;
    instanceRef.handleClose = handleClose;
    instanceRef.resetConfirmed = resetConfirmed;

    // 5. 创建控制器
    controller = {
      updateLoading: updateLoadingFn,
      cleanup: () => destroyContainer(container),
      resetConfirmed
    };

    // 6. 首次渲染
    renderModal();
  });

  promise.setController(controller!);
  return promise;
}

export default customConfirm;
