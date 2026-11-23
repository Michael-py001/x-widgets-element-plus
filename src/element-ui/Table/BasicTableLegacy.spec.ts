import { mount } from '@vue/test-utils';
import Table from './BasicTableLegacy';

describe('BasicTableLegacy 溢出气泡宽度约束', () => {
  const columns = [{ title: '设备名称', dataKey: 'itemName', minWidth: 200, showOverflowTooltip: true }];
  const data = [{ itemName: '燃气轮机型号：TCF-30kh，额定转速：3000r/min' }];

  /**
   * 取表格向下透传给 ElTable 的 tooltip 配置。
   * EP 的 tooltip 默认不限宽，这里依赖表格补上的 popper 类名由全局样式限制 max-width。
   */
  const getTooltipOptions = (wrapper: ReturnType<typeof mount>) =>
    wrapper.findComponent({ name: 'ElTable' }).props('tooltipOptions');

  it('默认给溢出气泡挂上限制宽度的 popper 类名', () => {
    const wrapper = mount(Table, { props: { columns, data } });

    expect(getTooltipOptions(wrapper)).toMatchObject({ popperClass: 'x-table-overflow-tooltip' });
  });

  it('调用方传入的 tooltipOptions 优先于默认值', () => {
    const wrapper = mount(Table, {
      props: { columns, data, tooltipOptions: { popperClass: 'my-own-tooltip', placement: 'bottom' } }
    });

    expect(getTooltipOptions(wrapper)).toMatchObject({ popperClass: 'my-own-tooltip', placement: 'bottom' });
  });
});
