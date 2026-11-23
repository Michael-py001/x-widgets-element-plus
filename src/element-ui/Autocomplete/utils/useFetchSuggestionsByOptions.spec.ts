import { computed, ref } from 'vue';
import { describe, expect, it } from 'vitest';
import { getAutoCompletePropsFromOptions } from './useFetchSuggestionsByOptions';

describe('getAutoCompletePropsFromOptions', () => {
  it('按 labelKey 过滤候选，并保留 valueKey 作为选中值字段', () => {
    const props = getAutoCompletePropsFromOptions({
      options: [
        { projectName: '项目 Alpha', displayName: '项目 Alpha（F级）' },
        { projectName: '项目 Beta', displayName: '项目 Beta（E级）' }
      ],
      valueKey: 'projectName',
      labelKey: 'displayName'
    });
    const callback = vi.fn();

    props.fetchSuggestions?.('F级', callback);

    expect(callback).toHaveBeenCalledWith([{ projectName: '项目 Alpha', displayName: '项目 Alpha（F级）' }]);
  });

  it('兼容只读数组和响应式候选源', () => {
    const readonlyOptions = [{ label: 'F级', value: 'F' }] as const;
    const options = ref(readonlyOptions);
    const props = getAutoCompletePropsFromOptions({
      options: computed(() => options.value)
    });
    const callback = vi.fn();

    props.fetchSuggestions?.('', callback);

    expect(callback).toHaveBeenCalledWith([{ label: 'F级', value: 'F' }]);
    expect(options.value).toEqual(readonlyOptions);
  });

  it('显式提供 fetchSuggestions 时不再创建本地候选回调', () => {
    expect(
      getAutoCompletePropsFromOptions({
        options: [{ label: 'F级', value: 'F' }],
        userProvidedFetch: true
      })
    ).toEqual({});
  });
});
