/**
 * 省市区级联节点；结构对齐 el-cascader 的 CascaderOption。
 */
export interface AreaNode {
  value: string;
  label: string;
  children?: AreaNode[];
  [key: string]: unknown;
}

/** 展示到第几级：1 省 / 2 省市 / 3 省市区 */
export type AreaMaxLevel = 1 | 2 | 3;

/** 至少选到第几级才算有效；小于该级的点选会被清空 */
export type AreaMinSelectLevel = 1 | 2 | 3;

export interface BuildAreaOptionsConfig {
  maxLevel?: AreaMaxLevel;
  /** 为每个市注入「市本级」，仅在 maxLevel=3 时生效 */
  injectCitySelfLevel?: boolean;
  /** 优先排到列表前面的省份名称 */
  priorityProvinces?: string[];
}

export interface NormalizeAreaPathConfig {
  minSelectLevel?: AreaMinSelectLevel;
  maxLevel?: AreaMaxLevel;
  injectCitySelfLevel?: boolean;
}
