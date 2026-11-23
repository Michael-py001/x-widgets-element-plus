import { mount } from '@vue/test-utils';
import { h, nextTick } from 'vue';
import Select from './BasicSelect';

const longLabel = '技术协议来源文件名称-燃气轮机联合循环机组性能保证及辅机配置说明书.xlsx';

describe('BasicSelect', () => {
  it('does not create a tooltip by default', async () => {
    const wrapper = mount(Select, {
      props: {
        options: [{ label: longLabel, value: 'file-1' }],
        modelValue: 'file-1'
      }
    });

    await nextTick();

    expect(wrapper.find('.x-select-label-tooltip-trigger').exists()).toBe(false);
  });

  it('shows the complete selected label when explicitly enabled', async () => {
    const wrapper = mount(Select, {
      props: {
        options: [{ label: longLabel, value: 'file-1' }],
        modelValue: 'file-1',
        showLabelTooltip: true
      }
    });

    await nextTick();

    const tooltipTrigger = wrapper.find('.x-select-label-tooltip-trigger');
    expect(tooltipTrigger.exists()).toBe(true);
    expect(tooltipTrigger.text()).toBe(longLabel);
    expect(wrapper.findAllComponents({ name: 'ElTooltip' }).some((item) => item.props('content') === longLabel)).toBe(
      true
    );
  });

  it('wraps long labels in the dropdown without replacing custom option content', async () => {
    const customOptionText = '自定义来源文件展示';
    const wrapper = mount(Select, {
      props: {
        options: [{ label: longLabel, value: 'file-1' }],
        modelValue: 'file-1',
        showLabelTooltip: true
      },
      slots: {
        default: () => h('strong', customOptionText)
      }
    });

    await wrapper.find('.el-select__wrapper').trigger('click');
    await nextTick();

    const dropdowns = document.body.querySelectorAll('.el-select-dropdown');
    const dropdown = dropdowns[dropdowns.length - 1];
    expect(dropdown?.textContent).toContain(customOptionText);
    expect(dropdown?.querySelector('.x-select-label-tooltip-trigger')).not.toBeNull();
  });

  it('treats an empty string as no selection when no option uses it', async () => {
    const wrapper = mount(Select, {
      props: {
        options: [
          { label: '甲', value: 'a' },
          { label: '乙', value: 'b' }
        ],
        modelValue: '',
        placeholder: '请选择类型'
      }
    });

    await nextTick();

    expect(wrapper.text()).toBe('请选择类型');
  });

  it('keeps an empty string selectable when an option uses it as its value', async () => {
    const wrapper = mount(Select, {
      props: {
        options: [
          { label: '全部', value: '' },
          { label: '甲', value: 'a' }
        ],
        modelValue: '',
        placeholder: '请选择类型'
      }
    });

    await nextTick();

    expect(wrapper.text()).toBe('全部');
  });

  it('treats an empty string as no selection for grouped options without an empty value', async () => {
    const wrapper = mount(Select, {
      props: {
        options: [
          {
            label: '主辅生产工程',
            options: [
              { label: '热力系统', value: '热力系统' },
              { label: '电气系统', value: '电气系统' }
            ]
          }
        ],
        modelValue: '',
        placeholder: '请选择系统'
      }
    });

    await nextTick();

    expect(wrapper.text()).toBe('请选择系统');
  });
});
