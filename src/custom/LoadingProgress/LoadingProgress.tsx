import { defineComponent, ref, onMounted, onUnmounted, computed } from 'vue';
import { loadingProgressProps } from './types/props';
import './styles/LoadingProgress.less';

export default defineComponent({
  name: 'LoadingProgress',
  props: loadingProgressProps(),
  emits: ['close', 'update:visible'],
  setup(props, { emit }) {
    const animationId = ref<number>();

    // 计算进度条宽度
    const progressWidth = computed(() => {
      return Math.min(Math.max(props.progress, 0), 100);
    });

    // 处理关闭
    const handleClose = () => {
      emit('update:visible', false);
      emit('close');
    };

    // 处理遮罩点击
    const handleMaskClick = (e: MouseEvent) => {
      if (e.target === e.currentTarget && props.maskClosable) {
        handleClose();
      }
    };

    // 监听ESC键
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && props.maskClosable) {
        handleClose();
      }
    };

    onMounted(() => {
      document.addEventListener('keydown', handleKeydown);
    });

    onUnmounted(() => {
      document.removeEventListener('keydown', handleKeydown);
      if (animationId.value) {
        cancelAnimationFrame(animationId.value);
      }
    });

    return () => {
      if (!props.visible) return null;

      return (
        <div class="loading-progress-overlay" onClick={handleMaskClick}>
          <div class="loading-progress-modal">
            {/* 标题 */}
            <div class="loading-progress-title">{props.title}</div>

            {/* 进度条容器 */}
            <div class="loading-progress-container">
              {/* 进度条背景 */}
              <div class="loading-progress-track">
                {/* 进度条填充 */}
                <div class="loading-progress-fill" style={{ width: `${progressWidth.value}%` }}>
                  {/* 动效光点 */}
                  <div class="loading-progress-shimmer">
                    {Array.from({ length: 35 }, (_, index) => (
                      <div
                        key={index}
                        class="loading-progress-dot"
                        style={{
                          animationDelay: `${index * 0.1}s`,
                          left: `${index * 3}%`
                        }}
                      />
                    ))}
                  </div>
                </div>
                {/* 进度条边框 */}
                <div class="loading-progress-border" />
              </div>

              {/* 进度文字 */}
              <div class="loading-progress-text">{props.progressText}</div>
            </div>
          </div>
        </div>
      );
    };
  }
});
