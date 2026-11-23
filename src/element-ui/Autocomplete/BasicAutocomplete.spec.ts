import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import BasicAutocomplete from './BasicAutocomplete';

describe('BasicAutocomplete', () => {
  it('直接使用时保留外部 v-model 监听器', async () => {
    const updateModelValue = vi.fn();
    const wrapper = mount(BasicAutocomplete, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': updateModelValue
      }
    });

    await wrapper.findComponent({ name: 'ElAutocomplete' }).vm.$emit('update:modelValue', '手工项目');

    expect(updateModelValue).toHaveBeenCalledWith('手工项目');
  });
});
