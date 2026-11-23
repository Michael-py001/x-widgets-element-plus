import { ref } from 'vue';
export default function useScrollToFields({ formModel, FormPageContainerRef }) {
  const errorFieldsListPool = ref([]);

  /*
    获取表单项在哪个列
    @param {string} name 表单项名称
    @return {object} 返回对象，包含index和target
 */
  function getFormItemNameInWitchColumn(name) {
    let index = 0;
    for (let i = 0; i < formModel.length; i++) {
      const column = formModel[i].column || [];
      const target = column.find((item) => item.name === name);
      if (target) {
        return {
          index,
          target
        };
      }
      index++;
    }
    return {
      index,
      target: null
    };
  }

  /**
   * 设置错误列表
   * @param {string[]} names 表单项名称列表
   */
  function setErrorFieldsList(names) {
    errorFieldsListPool.value = new Array(formModel.length).fill(null).map(() => []);
    for (let i = 0; i < names.length; i++) {
      const { index, target } = getFormItemNameInWitchColumn(names[i]);
      if (target) {
        errorFieldsListPool.value[index].push(target.name);
      }
    }
  }

  /**
   * 滚动到表单项
   * @param {string} name 表单项名称
   * @param {Object} options 滚动选项
   */
  function scrollToField(name, options) {
    const fieldsetWrap = FormPageContainerRef.value.querySelector('.form-container');
    const formItemNode = fieldsetWrap.querySelector(`#form_item_wrap_${name}`);
    if (formItemNode) {
      formItemNode.scrollIntoView(
        options || {
          behavior: 'smooth'
        }
      );
    }
  }
  /**
   * 滚动到每一列的第一个错误表单项
   * @param {Object} options 滚动选项
   */
  function checkErrorFieldsList(options) {
    for (let i = 0; i < errorFieldsListPool.value.length; i++) {
      const column = errorFieldsListPool.value[i];
      if (column.length > 0) {
        scrollToField(column[0], options);
      }
    }
  }

  /**
   * 滚动到表单项列表
   * @param {string[]} names 表单项名称列表
   * @param {Object} options 滚动选项
   */
  function scrollToFields(names, options) {
    setErrorFieldsList(names);
    checkErrorFieldsList(options);
  }

  return {
    scrollToFields
  };
}
