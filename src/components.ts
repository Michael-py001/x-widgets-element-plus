export { default as Input } from './element-ui/Input';
export { default as InputNumber } from './element-ui/InputNumber';
export { default as RadioGroup } from './element-ui/RadioGroup';
export { default as Checkbox } from './element-ui/Checkbox';
export { default as CheckboxGroup } from './element-ui/CheckboxGroup';
export { default as Switch } from './element-ui/Switch';
export { default as Text } from './element-ui/Text';
export type { TextValueFormatter } from './element-ui/Text/types/props';
export { default as Textarea } from './element-ui/Textarea';
export { default as Autocomplete } from './element-ui/Autocomplete';
export { default as DatePicker } from './element-ui/DatePicker';
export { default as TimePicker } from './element-ui/TimePicker';
export { default as Select, SelectOption } from './element-ui/Select';
export { default as TreeSelect } from './element-ui/TreeSelect';
export { default as InputPassword } from './element-ui/InputPassword';
export { default as InputSearch } from './element-ui/InputSearch';
export { default as CityPicker } from './element-ui/CityPicker';
export { default as AreaPicker } from './element-ui/AreaPicker';
export { default as RangeInput } from './element-ui/RangeInput';
export { default as Cascader } from './element-ui/Cascader';
export { default as Rate } from './element-ui/Rate';
export { default as Slider } from './element-ui/Slider';
export { default as ColorPicker } from './element-ui/ColorPicker';
export { default as Mentions } from './element-ui/Mentions';
export { default as Transfer } from './element-ui/Transfer';
export { default as Upload } from './element-ui/Upload';

export { default as CustomForm } from './custom/Form';
export type {
  ColumnForFormItemType,
  FormItemAffixSlotRender,
  FormBlockSlotRender,
  FormItemCoreProps,
  FormItemFieldName,
  FormItemProps,
  FormItemSlotRender,
  FormItemSlotRenderContext,
  FormSlotRenderContext
} from './custom/FormItem';
export { default as CustomFormItem } from './custom/FormItem';

export { default as FormPage } from './custom/FormPage';
export type { FormModelBlock, FormPageProps } from './custom/FormPage/types/props';

export { default as SearchForm } from './custom/SearchForm';
export type { SearchFormProps } from './custom/SearchForm/types/props';

export { default as ConfirmPopup } from './custom/ConfirmPopup';
export { default as FormModal } from './custom/FormModal';

export { default as TableVirtualized } from './element-ui/Table/BasicTableVirtualized';
export { default as Table } from './element-ui/Table/BasicTableLegacy';
export type { ExtendedPaginationProps, TableColumn, TableExposeInstance } from './element-ui/Table';

export { default as Tag } from './custom/Tag/Index';

export * from './custom/ComfirmModal';

export * from './custom/LoadingProgress';

export * from './custom/ToolTip';

/** 国内省市区级联（实现位于 src/AreaCascader，此处再导出便于与其它 Widget 一并引用） */
export {
  AreaCascader,
  CITY_SELF_LEVEL,
  PRIORITY_PROVINCES,
  buildAreaOptions,
  chinaAreaData,
  chinaAreaVersion,
  clipAreaTree,
  formatAreaValue,
  getChinaAreaData,
  injectCitySelfLevel,
  normalizeAreaPath,
  parseAreaValue,
  setChinaAreaData,
  sortPriorityProvinces
} from './AreaCascader';
export type {
  AreaMaxLevel,
  AreaMinSelectLevel,
  AreaNode,
  BuildAreaOptionsConfig,
  NormalizeAreaPathConfig
} from './AreaCascader';
