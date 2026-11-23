import { cloneDeep } from 'lodash-es';
/**
 * @author WuShiLi
 * @description: 填充/编辑表单
 * @param formData 表单数据
 * @param record 填充的数据
 */
export function editForm<T>(formData: T, record: Partial<T>) {
  if (!formData) throw new Error('formData is required');
  if (!record) throw new Error('record is required');
  Object.keys(formData).forEach((key) => {
    if (record.hasOwnProperty(key)) {
      formData[key] = record[key];
    }
  });
}

export function useForm<T>(formData: T): {
  formData: T;
  editForm: (record: Partial<T>) => void;
  resetForm: () => void;
} {
  const innerFormData: T = formData;
  const defaultFormData = cloneDeep(formData);
  function resetForm() {
    editForm(innerFormData, defaultFormData);
  }
  function _editForm(record: Partial<T>) {
    editForm(innerFormData, record);
  }
  return {
    formData: innerFormData,
    editForm: _editForm,
    resetForm
  };
}

export function combind<T extends Record<string, any>>(oldData: T, newData: Partial<T>): void {
  if (!newData) return;
  for (const key in oldData) {
    if (Object.hasOwnProperty.call(newData, key)) {
      const element = newData[key];
      oldData[key] = element;
    }
  }
}

export function omit<T extends Record<string, any>>(data: T, keys: string[]): Partial<T> {
  const result: Partial<T> = {};
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key) && !keys.includes(key)) {
      result[key] = data[key];
    }
  }
  return result;
}

export function pick<T extends Record<string, any>>(data: T, keys: string[]): Partial<T> {
  const result: Partial<T> = {};
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key) && keys.includes(key)) {
      result[key] = data[key];
    }
  }
  return result;
}
