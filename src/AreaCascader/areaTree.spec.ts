import { describe, expect, it } from 'vitest';
import type { AreaNode } from './types';
import { CITY_SELF_LEVEL, buildAreaOptions, formatAreaValue, normalizeAreaPath, parseAreaValue } from './areaTree';

const sampleTree: AreaNode[] = [
  {
    value: '广东省',
    label: '广东省',
    children: [
      {
        value: '惠州市',
        label: '惠州市',
        children: [
          { value: '惠城区', label: '惠城区' },
          { value: '惠阳区', label: '惠阳区' }
        ]
      }
    ]
  },
  {
    value: '贵州省',
    label: '贵州省',
    children: [{ value: '贵阳市', label: '贵阳市', children: [{ value: '南明区', label: '南明区' }] }]
  }
];

describe('AreaCascader areaTree', () => {
  it('maxLevel=2 时裁掉区县，不出现第三列数据', () => {
    const options = buildAreaOptions(sampleTree, { maxLevel: 2 });
    expect(options[0].children?.[0].children).toBeUndefined();
    expect(options[0].children?.[0].value).toBe('惠州市');
  });

  it('优先省份排到列表前面', () => {
    const options = buildAreaOptions(sampleTree, { maxLevel: 2, priorityProvinces: ['贵州省'] });
    expect(options.map((item) => item.value)).toEqual(['贵州省', '广东省']);
  });

  it('注入市本级后区县列表以市本级打头', () => {
    const options = buildAreaOptions(sampleTree, { maxLevel: 3, injectCitySelfLevel: true });
    expect(options[0].children?.[0].children?.[0].value).toBe(CITY_SELF_LEVEL);
    expect(options[0].children?.[0].children?.map((item) => item.value)).toContain('惠城区');
  });

  it('省市两级选择：仅选省或选到市都可保留', () => {
    expect(normalizeAreaPath(['广东省'], { minSelectLevel: 1, maxLevel: 2 })).toEqual(['广东省']);
    expect(normalizeAreaPath(['广东省', '惠州市'], { minSelectLevel: 1, maxLevel: 2 })).toEqual(['广东省', '惠州市']);
  });

  it('要求选择到市级：仅选省无效，选市自动补市本级', () => {
    expect(normalizeAreaPath(['广东省'], { minSelectLevel: 2, maxLevel: 3, injectCitySelfLevel: true })).toEqual([]);
    expect(
      normalizeAreaPath(['广东省', '惠州市'], { minSelectLevel: 2, maxLevel: 3, injectCitySelfLevel: true })
    ).toEqual(['广东省', '惠州市', CITY_SELF_LEVEL]);
    expect(
      normalizeAreaPath(['广东省', '惠州市', '惠城区'], { minSelectLevel: 2, maxLevel: 3, injectCitySelfLevel: true })
    ).toEqual(['广东省', '惠州市', '惠城区']);
  });

  it('joined 字符串与路径可互转，兼容空格分隔', () => {
    expect(parseAreaValue('广东省-惠州市')).toEqual(['广东省', '惠州市']);
    expect(parseAreaValue('广东省 - 广州市')).toEqual(['广东省', '广州市']);
    expect(formatAreaValue(['广东省', '惠州市'])).toBe('广东省-惠州市');
    expect(parseAreaValue([])).toEqual([]);
    expect(formatAreaValue([])).toBe('');
  });
});
