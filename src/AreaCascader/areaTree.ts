/**
 * 国内行政区划数据与级联路径规范化。
 * 展示层数、可选层级由调用方配置，不绑定某一业务场景。
 *
 * 默认使用包内置数据，也可由调用方注入自定义树。
 */
import { ref } from 'vue';
import chinaAreaTree from './china-area-tree.json';
import type { AreaNode, BuildAreaOptionsConfig, NormalizeAreaPathConfig } from './types';

/** 与真实行政区并列的业务节点：选中市即落到市本级 */
export const CITY_SELF_LEVEL = '市本级';

/**
 * 可供调用方复用的优先省份示例；组件默认不强制排序。
 */
export const PRIORITY_PROVINCES: string[] = [];

/** 包内置行政区数据 */
const bundledAreaData = chinaAreaTree as AreaNode[];

/** 调用方注入的行政区数据；为空则使用内置数据 */
let injectedAreaData: AreaNode[] | null = null;

/** 数据版本：注入新数据后递增，驱动 AreaCascader 重算 options */
export const chinaAreaVersion = ref(0);

/** 当前生效的全国省市区数据 */
export function getChinaAreaData(): AreaNode[] {
  return injectedAreaData?.length ? injectedAreaData : bundledAreaData;
}

/** 兼容旧导出名 */
export const chinaAreaData = bundledAreaData;

/** 注入自定义行政区数据 */
export function setChinaAreaData(nodes: AreaNode[] | null | undefined): void {
  if (!nodes?.length) {
    return;
  }
  injectedAreaData = nodes;
  chinaAreaVersion.value += 1;
}

/**
 * 按最大展示层级裁剪子节点，避免多出一列。
 */
export function clipAreaTree(nodes: AreaNode[], maxLevel: number, currentLevel = 1): AreaNode[] {
  return nodes.map((node) => {
    if (currentLevel >= maxLevel || !node.children?.length) {
      return { value: node.value, label: node.label };
    }
    return {
      value: node.value,
      label: node.label,
      children: clipAreaTree(node.children, maxLevel, currentLevel + 1)
    };
  });
}

/**
 * 为每个市注入「市本级」子节点（置于区列表最前）；无区划的市也补齐。
 */
export function injectCitySelfLevel(nodes: AreaNode[]): AreaNode[] {
  return nodes.map((province) => ({
    ...province,
    children: (province.children || []).map((city) => {
      const districts = city.children || [];
      const hasSelf = districts.some((item) => item.value === CITY_SELF_LEVEL);
      const nextChildren = hasSelf ? districts : [{ value: CITY_SELF_LEVEL, label: CITY_SELF_LEVEL }, ...districts];
      return { ...city, children: nextChildren };
    })
  }));
}

/**
 * 把指定省份排到列表前面，其余保持相对顺序。
 */
export function sortPriorityProvinces(nodes: AreaNode[], priorityProvinces: string[] = []): AreaNode[] {
  if (!priorityProvinces.length) return nodes;
  const priority: AreaNode[] = [];
  const rest: AreaNode[] = [];
  nodes.forEach((node) => {
    if (priorityProvinces.includes(node.value)) priority.push(node);
    else rest.push(node);
  });
  priority.sort((a, b) => priorityProvinces.indexOf(a.value) - priorityProvinces.indexOf(b.value));
  return [...priority, ...rest];
}

/**
 * 生成级联选项：先可选注入市本级，再裁层级，最后按优先省份排序。
 */
export function buildAreaOptions(source?: AreaNode[], config: BuildAreaOptionsConfig = {}): AreaNode[] {
  const maxLevel = config.maxLevel ?? 3;
  let tree = source?.length ? source : getChinaAreaData();
  if (config.injectCitySelfLevel && maxLevel >= 3) {
    tree = injectCitySelfLevel(tree);
  }
  tree = clipAreaTree(tree, maxLevel);
  return sortPriorityProvinces(tree, config.priorityProvinces);
}

/**
 * 规范化选中路径。
 * - 短于 minSelectLevel：视为无效，返回空
 * - 选到市且开启 injectCitySelfLevel：自动补「市本级」
 * - 超过 maxLevel：截断
 */
export function normalizeAreaPath(path: string[] | null | undefined, config: NormalizeAreaPathConfig = {}): string[] {
  const minSelectLevel = config.minSelectLevel ?? 1;
  const maxLevel = config.maxLevel ?? 3;
  const next = Array.isArray(path) ? path.filter(Boolean) : [];
  if (next.length === 0) return [];
  if (next.length < minSelectLevel) {
    if (config.injectCitySelfLevel && maxLevel >= 3 && next.length === 2 && minSelectLevel <= 3) {
      return [next[0], next[1], CITY_SELF_LEVEL];
    }
    return [];
  }
  if (config.injectCitySelfLevel && maxLevel >= 3 && next.length === 2) {
    return [next[0], next[1], CITY_SELF_LEVEL];
  }
  return next.slice(0, maxLevel);
}

/** 把字符串或路径数组解析成级联 path */
export function parseAreaValue(value: string | string[] | null | undefined, separator = '-'): string[] {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (!value || typeof value !== 'string') return [];
  const splitter = new RegExp(`\\s*${escapeRegExp(separator)}\\s*|\\s*[/／]\\s*`);
  return value
    .split(splitter)
    .map((item) => item.trim())
    .filter(Boolean);
}

/** 把路径格式化成提交用字符串；空路径返回空串 */
export function formatAreaValue(path: string[], separator = '-'): string {
  return path.filter(Boolean).join(separator);
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
