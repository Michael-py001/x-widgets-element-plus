import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import { ElCascader } from 'element-plus';
import { describe, expect, it, vi } from 'vitest';
import AreaCascader from './AreaCascader.vue';
import type { AreaNode } from './types';

class ResizeObserverStub {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

vi.stubGlobal('ResizeObserver', ResizeObserverStub);

const treeData: AreaNode[] = [
  {
    value: '广东省',
    label: '广东省',
    children: [{ value: '惠州市', label: '惠州市' }]
  }
];

describe('AreaCascader', () => {
  it('renders caller data and normalizes a joined model value', async () => {
    const modelValue = ref<string | string[] | null>(null);
    const wrapper = mount(AreaCascader, {
      global: { components: { ElCascader } },
      props: {
        modelValue: modelValue.value,
        'onUpdate:modelValue': (value: string | string[] | null) => {
          modelValue.value = value;
        },
        treeData,
        minSelectLevel: 2,
        valueType: 'joined'
      }
    });
    const cascader = wrapper.findComponent({ name: 'ElCascader' });

    expect(cascader.exists()).toBe(true);
    expect(cascader.props('options')).toEqual(treeData);

    await cascader.vm.$emit('change', ['广东省', '惠州市']);

    expect(modelValue.value).toBe('广东省-惠州市');
    expect(wrapper.emitted('change')).toEqual([[['广东省', '惠州市']]]);
  });
});
