import { createApp } from 'vue';
import { describe, expect, it } from 'vitest';
import XWidgets, {
  AreaCascader,
  AreaPicker,
  Cascader,
  Checkbox,
  CityPicker,
  ColorPicker,
  InputOtp,
  InputTag,
  CustomTooltip,
  DatePicker,
  InputPassword,
  InputSearch,
  LoadingProgress,
  Mentions,
  RangeInput,
  Rate,
  Segmented,
  Select,
  Slider,
  Switch,
  TimePicker,
  TimeSelect,
  Transfer,
  Upload,
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
    expect(app.component('XInputPassword')).toBe(InputPassword);
    expect(app.component('XInputSearch')).toBe(InputSearch);
    expect(app.component('XCityPicker')).toBe(CityPicker);
    expect(app.component('XAreaPicker')).toBe(AreaPicker);
    expect(app.component('XRangeInput')).toBe(RangeInput);
    expect(app.component('XCascader')).toBe(Cascader);
    expect(app.component('XRate')).toBe(Rate);
    expect(app.component('XSlider')).toBe(Slider);
    expect(app.component('XColorPicker')).toBe(ColorPicker);
    expect(app.component('XMentions')).toBe(Mentions);
    expect(app.component('XTransfer')).toBe(Transfer);
    expect(app.component('XUpload')).toBe(Upload);
    expect(app.component('XSegmented')).toBe(Segmented);
    expect(app.component('XInputOtp')).toBe(InputOtp);
    expect(app.component('XInputTag')).toBe(InputTag);
    expect(app.component('XTimeSelect')).toBe(TimeSelect);
  });
});
