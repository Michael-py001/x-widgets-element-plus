import type { MentionOptionProps, MentionProps as ElementMentionProps } from 'element-plus';
import type { BasicFormProps } from './basicFormProps';

/**
 * 说明：Element Plus Mention 的 `props` 是候选字段别名配置（MentionOptionProps），
 * 与表单桥接的同名私有字段含义不同；这里显式保留原生语义。
 */
export interface XMentionsProps extends Omit<ElementMentionProps, 'name'>, Omit<BasicFormProps, 'props'> {
  props?: MentionOptionProps;
}
