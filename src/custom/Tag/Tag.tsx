import { defineComponent, computed } from 'vue';
import type { VNode, VNodeArrayChildren } from 'vue';
import { tagProps } from './types/props';
import type { TagProps, TagStyleConfig } from './types/props';
import './styles/Tag.less';

/**
 * 从插槽节点中提取纯文本内容，用于补齐原生 title 悬浮提示。
 * @param children 插槽返回的 VNode 子节点集合
 * @returns 可用于 title 展示的纯文本；无法提取时返回空字符串
 */
const extractTextFromChildren = (children: VNodeArrayChildren): string => {
  return children
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') {
        return String(child);
      }

      if (Array.isArray(child)) {
        return extractTextFromChildren(child);
      }

      if (child && typeof child === 'object') {
        return extractTextFromVNode(child as VNode);
      }

      return '';
    })
    .join('')
    .trim();
};

/**
 * 从单个 VNode 递归提取文本内容。
 * @param vnode 插槽渲染出的单个节点
 * @returns 当前节点及其子节点的纯文本
 */
const extractTextFromVNode = (vnode: VNode): string => {
  const children = vnode.children;

  if (typeof children === 'string') {
    return children.trim();
  }

  if (Array.isArray(children)) {
    return extractTextFromChildren(children);
  }

  return '';
};

export default defineComponent({
  name: 'CustomTag',
  props: tagProps(),
  emits: ['close', 'click'],
  setup(props: TagProps, { emit, slots }) {
    /**
     * 当前标签的悬浮提示文本。
     * 优先使用显式传入的 text；未传 text 时再从默认插槽中兜底提取纯文本。
     */
    const resolvedHoverText = computed(() => {
      if (props.text) {
        return props.text.trim();
      }

      // 插槽场景下页面常直接渲染文本节点，这里兜底提取纯文本供原生 title 使用。
      const slotContent = slots.default?.() ?? [];
      const slotText = extractTextFromChildren(slotContent);

      return slotText || undefined;
    });

    // 计算标签样式
    const tagStyle = computed(() => {
      const style: Record<string, string> = {};

      // 优先使用status映射的样式
      if (props.status && props.statusMap?.[props.status]) {
        const statusConfig = props.statusMap[props.status];

        if (statusConfig.color) style.color = statusConfig.color;
        if (statusConfig.backgroundColor) style.backgroundColor = statusConfig.backgroundColor;
        if (statusConfig.borderColor) style.borderColor = statusConfig.borderColor;
      }

      // 其次使用直接传入的颜色属性（优先级更高）
      if (props.color) style.color = props.color;
      if (props.backgroundColor) style.backgroundColor = props.backgroundColor;
      if (props.borderColor) style.borderColor = props.borderColor;

      return style;
    });

    // 计算标签类名
    const tagClass = computed(() => {
      const classes = ['custom-tag'];

      // 添加尺寸类名
      classes.push(`custom-tag--${props.size}`);

      // 添加类型类名
      classes.push(`custom-tag--type-${props.type}`);

      if (props.round) classes.push('custom-tag--round');
      if (props.disabled) classes.push('custom-tag--disabled');
      if (props.closable) classes.push('custom-tag--closable');
      if (props.className) classes.push(props.className);

      return classes.join(' ');
    });

    // 处理关闭事件
    const handleClose = (event: Event) => {
      event.stopPropagation();
      emit('close', event);
    };

    // 处理点击事件
    const handleClick = (event: Event) => {
      if (!props.disabled) {
        emit('click', event);
      }
    };

    return () => {
      if (!props.text && !slots.default) return null;
      return (
        <span class={tagClass.value} style={tagStyle.value} title={resolvedHoverText.value} onClick={handleClick}>
          {slots.default ? slots.default() : props.text}
          {props.closable && (
            <i class="custom-tag__close" onClick={handleClose}>
              ×
            </i>
          )}
        </span>
      );
    };
  }
});
