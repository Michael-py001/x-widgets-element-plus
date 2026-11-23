import { unref, isRef, ref } from 'vue';
import type { FormRules } from 'element-plus';
import type { FormItemFieldName } from '../custom/FormItem';

export function useFormTools() {
  const cityPickerNames = ['city-picker', 'area-picker'];

  const cityPickerData = ref({});

  /**
   * 获取规则对象使用的稳定键名。
   *
   * FormRules 在运行时按普通对象访问，路径数组统一转成点路径字符串。
   */
  function getRuleKey(name: FormItemFieldName): string {
    if (Array.isArray(name)) {
      return name.join('.');
    }
    return name;
  }

  function setDefaultValue(i) {
    const { type, el, rules } = i || {};
    if (type === 'range-input' || el === 'range-input') {
      if (rules && rules.length > 0) {
        const requiredTarget = rules.find((i) => i.required !== undefined);
        if (requiredTarget) {
          if (requiredTarget.validator === undefined) {
            requiredTarget.validator = (_, value) => {
              if (Array.isArray(value) && value.every((item) => item !== null && item !== '')) {
                return Promise.resolve();
              }
              return Promise.reject(requiredTarget.message);
            };
          }
        }
      }
    }
    if ((isRef(i.display) && unref(i.display) === undefined) || i.display === undefined) {
      i.display = true;
    }
  }

  function checkDisplay(item) {
    const display = unref(item.display);

    if (typeof display === 'function') {
      return display();
    } else {
      return display ?? true;
    }
  }

  function isShow(item) {
    const show = unref(item.show);
    if (typeof show === 'function') {
      return show();
    } else if (show === false) {
      return false;
    } else {
      return true;
    }
  }

  function createSearchFormRules(props): FormRules {
    const column = props.column;
    column
      .filter((i) => !!i)
      .forEach((item) => {
        setDefaultValue(item);
        if (item && item.columnGroup && item.columnGroup.length > 0) {
          column.push(...item.columnGroup);
        }
      });
    try {
      const obj: FormRules = {};
      Object.keys(column).forEach((key) => {
        const value = column[key];
        if (value && cityPickerNames.includes(value.el)) {
          cityPickerData.value = value.columnGroup;
        }
        const rules = value?.rules ?? [];
        if (value && value.name) {
          obj[getRuleKey(value.name)] = rules;
        }
      });
      return obj;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }
  // 根据组件类型生成默认的必填验证消息
  function generateRequiredMessage(componentType: string, label: string): string {
    // 输入类组件
    const inputTypes = ['input', 'textarea', 'input-number', 'text'];
    // 选择类组件
    const selectTypes = [
      'select',
      'date-picker',
      'time-picker',
      'time-range-picker',
      'checkbox-group',
      'radio-group',
      'city-picker'
    ];

    if (inputTypes.includes(componentType)) {
      return `请输入${label}`;
    } else if (selectTypes.includes(componentType)) {
      return `请选择${label}`;
    } else {
      // 默认情况，根据组件类型智能判断
      return `请输入${label}`;
    }
  }

  // 生成校验规则
  function createFormPageRules(props): FormRules {
    try {
      const column = [];
      props.formModel
        .filter((i) => !!i)
        .forEach((item, index) => {
          setDefaultValue(item);
          const target = item.column || [];
          if (target.length > 0) {
            target.forEach((i) => {
              setDefaultValue(i);
              if (i && i.columnGroup && i.columnGroup.length > 0) {
                column.push(...i.columnGroup);
              }
            });
          }
          column.push(...target);
        });
      // 处理columnGroup
      const obj: FormRules = {};
      Object.keys(column).forEach((key) => {
        const value = column[key];
        if (value && cityPickerNames.includes(value.el)) {
          cityPickerData.value = value.columnGroup;
        }
        let rules = value?.rules ?? [];

        // 自动生成必填规则
        if (value && value.required && value.name && value.label) {
          const componentType = value.el || value.type || 'input';
          const autoRequiredRule = {
            required: true,
            message: generateRequiredMessage(componentType, value.label),
            trigger: 'blur'
          };

          // 如果已有rules，则追加；否则创建新的rules数组
          if (Array.isArray(rules) && rules.length > 0) {
            // 检查是否已存在required规则，避免重复
            const hasRequiredRule = rules.some((rule) => rule.required === true);
            if (!hasRequiredRule) {
              rules = [autoRequiredRule, ...rules];
            }
          } else {
            rules = [autoRequiredRule];
          }
        }

        if (value && value.name) {
          obj[getRuleKey(value.name)] = rules;
        }
      });
      return obj;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  /***
   * @description 获取选中的省市区
   * @param {string} name CityPicker的name，不传默认取第一个
   * @param {Array} cityPicker CityPicker数组
   * @returns {string} 选中的省市区
   */
  function getSelectedAddressName(name = '', cityPicker = null) {
    if (!cityPicker) return new Error('cityPicker is required');
    try {
      let target = null,
        result = {};
      if (name) {
        target = cityPicker.find((i) => {
          return i?.cityPicker?.cityPickerName === name;
        });
      }
      if (target) {
        result = target.cityPicker.selectedAddressName;
      } else {
        result = cityPicker?.[0]?.cityPicker?.selectedAddressName;
      }
      const { province, city, area, street } = (result as any) || {};
      if (!province || !city || !area || !street) {
        console.warn('[city-picker]:省市区街道信息不完整', result);
      }
      return result;
    } catch (error) {
      console.log(error);

      throw new Error(JSON.stringify(error));
    }
  }

  return {
    createSearchFormRules,
    createFormPageRules,
    checkDisplay,
    isShow,
    setDefaultValue,
    cityPickerData,
    cityPickerNames,
    getSelectedAddressName
  };
}
