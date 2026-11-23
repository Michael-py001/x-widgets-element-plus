import { reactive } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import FormItem from './FormItem';

describe('FormItem textarea support', () => {
  it('renders textarea fields and syncs value back to formData', async () => {
    const formData = reactive({
      remark: ''
    });

    const wrapper = mount(FormItem, {
      props: {
        label: '备注',
        name: 'remark',
        type: 'textarea',
        formData,
        props: {
          rows: 4
        }
      }
    });

    const textareaElement = wrapper.find('textarea');

    expect(textareaElement.exists()).toBe(true);
    expect(textareaElement.attributes('placeholder')).toBe('请输入备注');
    expect(textareaElement.attributes('rows')).toBe('4');

    await textareaElement.setValue('表单备注内容');

    expect(formData.remark).toBe('表单备注内容');
  });

  it('renders input-number fields and syncs value back to formData', async () => {
    const formData = reactive({
      priority: 1
    });

    const wrapper = mount(FormItem, {
      props: {
        label: '优先级',
        name: 'priority',
        type: 'input-number',
        formData,
        props: {
          min: 1,
          max: 99
        }
      }
    });

    const inputElement = wrapper.find('input');

    expect(inputElement.exists()).toBe(true);

    await inputElement.setValue('6');
    await inputElement.trigger('change');

    expect(formData.priority).toBe(6);
  });

  it('renders radio-group fields and syncs value back to formData', async () => {
    const formData = reactive({
      enabled: true
    });

    const wrapper = mount(FormItem, {
      props: {
        label: '是否启用',
        name: 'enabled',
        type: 'radio-group',
        formData,
        options: [
          { label: '启用', value: true },
          { label: '停用', value: false }
        ]
      }
    });

    expect(wrapper.text()).toContain('启用');
    expect(wrapper.text()).toContain('停用');

    await wrapper.findComponent({ name: 'ElRadioGroup' }).vm.$emit('update:modelValue', false);

    expect(formData.enabled).toBe(false);
  });

  it('renders checkbox-group fields and syncs value back to formData', async () => {
    const formData = reactive({
      fileTypes: ['estimate']
    });

    const wrapper = mount(FormItem, {
      props: {
        label: '适用文件类型',
        name: 'fileTypes',
        type: 'checkbox-group',
        formData,
        options: [
          { label: '概算表', value: 'estimate' },
          { label: '提资单', value: 'input' }
        ]
      }
    });

    expect(wrapper.text()).toContain('概算表');
    expect(wrapper.text()).toContain('提资单');

    await wrapper.findComponent({ name: 'ElCheckboxGroup' }).vm.$emit('update:modelValue', ['estimate', 'input']);

    expect(formData.fileTypes).toEqual(['estimate', 'input']);
  });

  it('renders text fields with textValue', () => {
    const formData = reactive({
      version: 'v1.0.0'
    });

    const wrapper = mount(FormItem, {
      props: {
        label: '当前版本',
        name: 'version',
        type: 'text',
        formData,
        textValue: 'v1.0.0'
      }
    });

    expect(wrapper.text()).toContain('v1.0.0');
  });

  it('renders text fields with a function textValue formatter', async () => {
    const formData = reactive({
      unit: ''
    });

    const wrapper = mount(FormItem, {
      props: {
        label: '单位',
        name: 'unit',
        type: 'text',
        formData,
        textValue: (val: string) => val || '--'
      }
    });

    // 字段为空时走格式化函数的占位值
    expect(wrapper.text()).toContain('--');

    formData.unit = '元';
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('元');
  });

  it('routes attributes to ElFormItem and props to date-picker', () => {
    const formData = reactive({
      createTimeRange: [] as string[]
    });

    const wrapper = mount(FormItem, {
      props: {
        label: '保存时间',
        name: 'createTimeRange',
        type: 'date-picker',
        formData,
        attributes: {
          showMessage: false
        },
        props: {
          type: 'daterange',
          valueFormat: 'YYYY-MM-DD',
          clearable: true
        }
      }
    });

    const formItem = wrapper.findComponent({ name: 'ElFormItem' });
    const datePicker = wrapper.findComponent({ name: 'ElDatePicker' });

    expect(formItem.props('showMessage')).toBe(false);
    expect(datePicker.props('showMessage')).toBeUndefined();
    expect(datePicker.props('type')).toBe('daterange');
    expect(datePicker.props('valueFormat')).toBe('YYYY-MM-DD');
    expect(datePicker.props('clearable')).toBe(true);
  });

  it('renders time-range fields through TimePicker and syncs the range value', async () => {
    const formData = reactive({ timeRange: [] as string[] });

    const wrapper = mount(FormItem, {
      props: {
        label: '时间范围',
        name: 'timeRange',
        type: 'time-range-picker',
        formData
      },
      global: {
        stubs: {
          ElTimePicker: {
            name: 'ElTimePicker',
            props: ['isRange'],
            template: '<div />'
          }
        }
      }
    });
    const timePicker = wrapper.findComponent({ name: 'ElTimePicker' });

    expect(timePicker.exists()).toBe(true);
    expect(timePicker.props('isRange')).toBe(true);

    await timePicker.vm.$emit('update:modelValue', ['09:00:00', '17:00:00']);
    expect(formData.timeRange).toEqual(['09:00:00', '17:00:00']);
  });

  it('renders range-picker as a daterange and syncs the range', async () => {
    const formData = reactive({ span: [] as string[] });
    const wrapper = mount(FormItem, {
      props: {
        label: '日期范围',
        name: 'span',
        type: 'range-picker',
        formData,
        props: { valueFormat: 'YYYY-MM-DD' }
      },
      global: {
        stubs: {
          ElDatePicker: { name: 'ElDatePicker', props: ['type'], template: '<div />' }
        }
      }
    });
    const control = wrapper.findComponent({ name: 'ElDatePicker' });

    expect(control.props('type')).toBe('daterange');
    await control.vm.$emit('update:modelValue', ['2025-01-01', '2025-01-31']);
    expect(formData.span).toEqual(['2025-01-01', '2025-01-31']);
  });

  it('renders switch fields and syncs boolean values', async () => {
    const formData = reactive({ enabled: false });
    const wrapper = mount(FormItem, {
      props: { label: '启用', name: 'enabled', type: 'switch', formData }
    });
    const control = wrapper.findComponent({ name: 'ElSwitch' });

    expect(control.exists()).toBe(true);
    await control.vm.$emit('update:modelValue', true);
    expect(formData.enabled).toBe(true);
  });

  it('renders single checkbox fields and syncs checked state', async () => {
    const formData = reactive({ agreed: false });
    const wrapper = mount(FormItem, {
      props: { label: '同意', name: 'agreed', type: 'checkbox', formData }
    });
    const control = wrapper.findComponent({ name: 'ElCheckbox' });

    expect(control.exists()).toBe(true);
    await control.vm.$emit('update:modelValue', true);
    expect(formData.agreed).toBe(true);
  });

  it('renders tree-select fields and syncs the selected node', async () => {
    const formData = reactive({ dept: '' });
    const wrapper = mount(FormItem, {
      props: {
        label: '部门',
        name: 'dept',
        type: 'tree-select',
        formData,
        options: [
          { value: 'rnd', label: '研发', children: [{ value: 'fe', label: '前端' }] }
        ]
      }
    });
    const control = wrapper.findComponent({ name: 'ElTreeSelect' });

    expect(control.exists()).toBe(true);
    expect(control.props('data')).toHaveLength(1);
    await control.vm.$emit('update:modelValue', 'fe');
    expect(formData.dept).toBe('fe');
  });

  it('renders autocomplete fields, writes valueKey to formData, and keeps related-field events', async () => {
    const formData = reactive({
      name: '',
      category: 'primary'
    });

    const wrapper = mount(FormItem, {
      props: {
        label: 'Name',
        name: 'name',
        type: 'autocomplete',
        formData,
        valueKey: 'name',
        labelKey: 'label',
        options: [{ name: 'Alpha', label: 'Alpha', category: 'secondary' }],
        event: {
          onInput: () => {
            formData.category = '';
          },
          onSelect: (item: { category: string }) => {
            formData.category = item.category;
          }
        }
      }
    });
    const autocomplete = wrapper.findComponent({ name: 'ElAutocomplete' });

    expect(autocomplete.exists()).toBe(true);
    expect(autocomplete.props('valueKey')).toBe('name');

    await autocomplete.vm.$emit('update:modelValue', 'Manual');
    await autocomplete.vm.$emit('input', 'Manual');

    expect(formData).toEqual({ name: 'Manual', category: '' });

    await autocomplete.vm.$emit('select', { name: 'Alpha', label: 'Alpha', category: 'secondary' });

    expect(formData.category).toBe('secondary');
  });
});
