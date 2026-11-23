import { createApp } from 'vue';
import { describe, expect, it } from 'vitest';
import XWidgets, {
  AreaCascader,
  Checkbox,
  CustomTooltip,
  DatePicker,
  LoadingProgress,
  Select,
  Switch,
  TimePicker,
  Table,
  TableVirtualized,
  TreeSelect
} from './index';

describe('XWidgets plugin', () => {
  it('registers direct component exports', () => {
    const app = createApp({ render: () => null });
    app.use(XWidgets);

    expect(app.component('Table')).toBe(Table);
    expect(app.component('TableVirtualized')).toBe(TableVirtualized);
    expect(app.component('XDatePicker')).toBe(DatePicker);
    expect(app.component('XSelect')).toBe(Select);
    expect(app.component('XTimePicker')).toBe(TimePicker);
    expect(app.component('XCheckbox')).toBe(Checkbox);
    expect(app.component('XSwitch')).toBe(Switch);
    expect(app.component('XTreeSelect')).toBe(TreeSelect);
    expect(app.component('AreaCascader')).toBe(AreaCascader);
    expect(app.component('LoadingProgress')).toBe(LoadingProgress);
    expect(app.component('CustomTooltip')).toBe(CustomTooltip);
  });
});
