import { h, reactive } from 'vue';
import { flushPromises, mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SearchForm from './SearchForm';

describe('SearchForm', () => {
  it('renders a schema field and emits search values', async () => {
    const formData = reactive({ keyword: '' });
    const wrapper = mount(SearchForm, {
      props: {
        column: [
          {
            label: 'Keyword',
            name: 'keyword',
            el: 'input',
            props: { placeholder: 'Search keyword' }
          }
        ],
        formData,
        enabledExpand: false
      }
    });

    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
    expect(wrapper.find('.x-search-form-btn-search').text()).toBe('查询');

    await input.setValue('Alpha');
    await wrapper.find('.x-search-form-btn-search').trigger('click');
    await flushPromises();

    expect(wrapper.emitted('search')).toEqual([[{ keyword: 'Alpha' }]]);
  });

  it('renders a field slot render callback returning a VNode', () => {
    const formData = reactive({ keyword: '' });
    let receivedContext: Record<string, any> | null = null;
    const wrapper = mount(SearchForm, {
      props: {
        column: [
          {
            label: 'Custom',
            name: 'keyword',
            slot: (ctx: Record<string, any>) => {
              receivedContext = ctx;
              return h('strong', { class: 'slot-vnode' }, `Custom:${ctx.item.label}`);
            }
          }
        ],
        formData,
        enabledExpand: false
      }
    });

    expect(wrapper.find('strong.slot-vnode').text()).toBe('Custom:Custom');
    expect(receivedContext).toMatchObject({ formData, item: { name: 'keyword' } });
  });
});
