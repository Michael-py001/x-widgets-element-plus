import type { AutocompleteProps as ElementAutocompleteProps } from 'element-plus';
import type { BasicFormProps } from './basicFormProps';
import type { WidgetOptionSource } from '../../../utils';

interface AutocompleteProps extends Omit<ElementAutocompleteProps, 'name' | 'valueKey'> {}

export interface XAutocompleteProps extends AutocompleteProps, BasicFormProps {
  name?: ElementAutocompleteProps['name'] | string;
  /** 本地候选源；未传 fetchSuggestions 时由组件按 labelKey 过滤。 */
  options?: WidgetOptionSource;
  /** 本地候选的检索字段，不影响 Element Plus 的选中回写字段。 */
  labelKey?: string;
  /** Element Plus 原生 valueKey，决定选中候选写回输入框和表单模型的字段。 */
  valueKey?: string;
}
