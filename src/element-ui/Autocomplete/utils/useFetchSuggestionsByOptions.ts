import type { AutocompleteFetchSuggestions } from 'element-plus';
import { normalizeWidgetOptions } from '../../../utils';
import type { WidgetOptionSource } from '../../../utils';

/** 根据本地 options 构造 Autocomplete 候选回调。 */
export interface BuildAutoPropsOptions {
  options?: WidgetOptionSource;
  valueKey?: string;
  labelKey?: string;
  userProvidedFetch?: boolean;
}

/**
 * 将本地候选转换为 Element Plus 可消费的结构。
 *
 * `valueKey` 始终保留为选中后回写模型的字段；`labelKey` 仅用于关键词匹配，
 * 从而允许候选面板展示扩展信息而表单只保存业务主值。
 */
export function getAutoCompletePropsFromOptions({
  options = [],
  valueKey = 'value',
  labelKey = 'label',
  userProvidedFetch = false
}: BuildAutoPropsOptions): Partial<{ fetchSuggestions: AutocompleteFetchSuggestions }> {
  if (userProvidedFetch) return {};

  const normalizedOptions = normalizeWidgetOptions(options);

  return {
    fetchSuggestions: (queryString: string, cb) => {
      const q = String(queryString ?? '')
        .trim()
        .toLowerCase();
      const list = normalizedOptions
        .map((item) => {
          const value = item[valueKey] ?? item.value ?? item[labelKey] ?? item.label ?? '';
          const label = item[labelKey] ?? item.label ?? value;
          return { ...item, [valueKey]: value, [labelKey]: String(label ?? '') };
        })
        .filter((item) => {
          const label = item[labelKey].toLowerCase();
          return q ? label.includes(q) : true;
        });
      cb(list);
    }
  };
}
