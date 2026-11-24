import { describe, expect, it, vi } from 'vitest';
import { h, reactive } from 'vue';
import { mount } from '@vue/test-utils';
import FormPage from './FormPage';
import type { FormModelBlock } from './types/props';
import type { ColumnForFormItemType } from '../FormItem';

/** jsdom 没有 ResizeObserver，Element Plus 的 SelectV2 会用到，先打桩。 */
class ResizeObserverStub {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}
vi.stubGlobal('ResizeObserver', ResizeObserverStub);

const STATUS_OPTIONS = [
  { label: '启用', value: 'A' },
  { label: '停用', value: 'B' }
];

/**
 * 按真实 schema 挂载 FormPage，返回下拉控件供断言。
 *
 * 断言 `XSelect` 而不是最终 DOM 文案：选项只有在浮层打开后才进 DOM，
 * 而选项数据源是否正确在这一层就已决定。
 */
function mountStatusSelect(column: Partial<ColumnForFormItemType> & { name: string }) {
  const formData = reactive<Record<string, any>>({ status: 'A' });
  const formModel: FormModelBlock[] = [
    { column: [{ label: '状态', type: 'select', ...column } as ColumnForFormItemType] }
  ];
  const wrapper = mount(FormPage, { props: { formModel, formData } });

  return {
    formData,
    wrapper,
    xSelect: wrapper.findComponent({ name: 'XSelect' }),
    elSelect: wrapper.findComponent({ name: 'ElSelectV2' })
  };
}

/**
 * 选项数据源位置回归。
 *
 * 背景：`props` 是整体展开给控件的属性袋，把 options 写进 `props.options` 曾经静默失效 ——
 * FormItem 渲染控件时 `options` 排在 `props` 展开之后，被自身默认值 `[]` 覆盖。
 * 现在 FormPage 负责归一，两种位置都支持，且顶层优先。
 */
describe('FormPage options 归一', () => {
  it('支持把选项写在 props.options 里', () => {
    const { xSelect, elSelect } = mountStatusSelect({ name: 'status', props: { options: STATUS_OPTIONS } });

    expect(xSelect.props('options')).toHaveLength(2);
    // 归一后的数据源必须真正抵达 Element Plus，否则下拉仍然是空的。
    expect(elSelect.props('options')).toHaveLength(2);
  });

  it('顶层 options 与 props.options 同时存在时以顶层为准', () => {
    const { xSelect } = mountStatusSelect({
      name: 'status',
      options: [{ label: '仅顶层', value: 'TOP' }],
      props: { options: STATUS_OPTIONS }
    });

    expect(xSelect.props('options')).toEqual([{ label: '仅顶层', value: 'TOP' }]);
  });

  it('顶层显式空数组不会被 props.options 反向覆盖', () => {
    const { xSelect } = mountStatusSelect({ name: 'status', options: [], props: { options: STATUS_OPTIONS } });

    expect(xSelect.props('options')).toEqual([]);
  });

  it('函数式选项会按当前表单数据求值', () => {
    const { xSelect } = mountStatusSelect({
      name: 'status',
      props: {
        options: (fd: Record<string, any>) => (fd.status === 'A' ? STATUS_OPTIONS : [{ label: '其他', value: 'OTHER' }])
      }
    });

    expect(xSelect.props('options')).toHaveLength(2);
  });

  it('两种位置都未提供时下拉拿到空数组而不是 undefined', () => {
    const { xSelect } = mountStatusSelect({ name: 'status' });

    expect(xSelect.props('options')).toEqual([]);
  });

  it('renders a field slot render callback returning a VNode', () => {
    const formData = reactive({ title: '' });
    let receivedContext: Record<string, any> | null = null;
    const formModel: FormModelBlock[] = [
      {
        column: [
          {
            label: 'Title',
            name: 'title',
            slot: (ctx: Record<string, any>) => {
              receivedContext = ctx;
              return h('strong', { class: 'slot-vnode' }, `Custom:${ctx.item.label}`);
            }
          } as ColumnForFormItemType
        ]
      }
    ];
    const wrapper = mount(FormPage, { props: { formModel, formData } });

    expect(wrapper.find('strong.slot-vnode').text()).toBe('Custom:Title');
    expect(receivedContext).toMatchObject({ formData, item: { name: 'title' } });
  });
});
