/**
 * AreaCascader — 国内省市区级联组件
 *
 * 推荐导入：`import { AreaCascader, PRIORITY_PROVINCES } from 'x-widgets-element-plus'`
 *
 * 数据：默认使用包内置行政区树，也可通过 treeData 传入自定义数据。
 *
 * ## Props 速查
 * | 参数 | 说明 |
 * |------|------|
 * | maxLevel | 展示列数：2=省市，3=省市区 |
 * | minSelectLevel | 最低可选：1=可选省，2=至少市 |
 * | injectCitySelfLevel | 选市自动落到「市本级」 |
 * | priorityProvinces | 置顶省份列表，可用导出的 PRIORITY_PROVINCES |
 * | valueType | `path` 数组 / `joined` 字符串 |
 */
export { default } from './AreaCascader.vue';
export { default as AreaCascader } from './AreaCascader.vue';
export {
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
} from './areaTree';
export type {
  AreaMaxLevel,
  AreaMinSelectLevel,
  AreaNode,
  BuildAreaOptionsConfig,
  NormalizeAreaPathConfig
} from './types';
