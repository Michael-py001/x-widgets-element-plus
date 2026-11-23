//
//  表单页面组件（TSX 版本）
//
import type { CSSProperties } from 'vue';
import { isVNode, nextTick } from 'vue';
import { defineComponent, ref, computed, watch, provide, inject, useSlots, useAttrs, h, watchEffect } from 'vue';
import { ElRow, ElCol, ElDivider, ElLoading } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import FormItem from '../FormItem/FormItem';
import Form from '../Form/Form';
import { useFormTools } from '../../utils/useFormTools';
import useScrollToFields from './composables/useScrollToFields';
import { formPageProps, type FormPageProps, type FormModelBlock } from './types/props';
import './style/form.less';
import type { ColumnForFormItemType, FormBlockSlotRender, FormItemFieldName } from '../FormItem';

// 静态设置标题组件（模块级别共享）
const modelTitleComponentRef = ref<any>(null);

/**
 * 判断当前 slot 配置是否为 TSX render 函数。
 *
 * @param value slot 配置值。
 * @returns 是否为 render 函数。
 */
function isFormBlockSlotRender(value: unknown): value is FormBlockSlotRender {
  return typeof value === 'function';
}

/**
 * 获取规则对象使用的稳定键名。
 *
 * 说明：
 * 1. `FormRules` 按对象索引读取；
 * 2. 路径数组统一转成点路径字符串，和 rules 生成逻辑保持一致。
 */
function getFormRuleKey(name: FormItemFieldName): string {
  if (Array.isArray(name)) {
    return name.join('.');
  }
  return name;
}

/**
 * 解析字段的选项数据源，同时兼容 `column.options` 与 `column.props.options` 两种写法。
 *
 * 位置约定：
 * - `options` 的推荐位置是 column 顶层；
 * - `props` 是直接展开给控件的一袋 Element Plus 属性，历史上也有人在 `props.options` 里写选项，
 *   这里一并接受；两种写法同时出现时以顶层为准（显式传空数组也算「顶层已提供」）。
 *
 * 归一必须落在这一层：`item.options` 缺省时是 undefined，能无歧义区分「没写」与「显式空数组」；
 * 到了 FormItem，`options` 已被 prop 默认值 `[]` 兜底，再无法分辨来源，
 * 这正是过去 `props.options` 被静默覆盖成空下拉的原因（见 FormItem 渲染控件的 props 顺序）。
 *
 * @param item 当前字段 schema。
 * @param formData 当前表单数据，函数式 options 用它求值。
 * @returns 归一后的选项数据源，保持调用方原本传入的形态（数组 / Ref / 函数结果）。
 */
function resolveColumnOptions(item: ColumnForFormItemType, formData: FormPageProps['formData']) {
  const source = item.options ?? item.props?.options;
  return typeof source === 'function' ? source(formData) : source;
}

/**
 * 为 FormItem 构造惰性执行的插槽集合，避免在 FormPage render 中提前调用插槽。
 *
 * @param {Record<string, any>} allSlots 当前页面可用的全部插槽。
 * @param {ColumnForFormItemType} item 当前 schema 字段项。
 * @param {FormPageProps['formData']} formData 当前表单数据。
 * @returns 传给 FormItem 的命名插槽函数集合。
 */
function createFormItemSlots(
  allSlots: Record<string, any>,
  item: ColumnForFormItemType,
  formData: FormPageProps['formData']
) {
  return Object.keys(allSlots).reduce(
    (acc, name, index) => {
      acc[name] = (slotScope: any) =>
        allSlots[name]?.({
          key: index,
          formData,
          item,
          ...slotScope
        });
      return acc;
    },
    {} as Record<string, any>
  );
}

/**
 * @description 表单页面组件
 * @author WuShiLi
 */
const XFormPage = defineComponent({
  name: 'XFormPage',
  props: formPageProps(),
  emits: ['update:formData', 'confirm', 'cancel', 'update:show', 'cityPickerChange'],
  setup(props: FormPageProps, { emit, expose, slots }) {
    // 槽与 attrs
    const allSlots = useSlots();
    const attrs = useAttrs();

    // 省市区组件实例集合
    const cityPicker = ref<any[]>([]);

    // 表单容器引用
    const formContainerRef = ref<FormInstance>(null);
    const fieldsetRef = ref<HTMLElement | null>(null);
    const footerRef = ref<HTMLElement | null>(null);
    const headerRef = ref<HTMLElement | null>(null);
    const formRef = ref<HTMLElement | null>(null);
    const FormPageContainerRef = ref<HTMLElement | null>(null);
    const loadingInstance = ref<any>(null);

    // 工具方法
    const { createFormPageRules, checkDisplay, isShow, cityPickerData, cityPickerNames, getSelectedAddressName } =
      useFormTools();

    const rules: FormRules = createFormPageRules(props);
    const validateInfos: Record<string, any> = {};

    // 是否作为插槽子组件
    provide('isSlot', true);
    const isChild = ref<boolean>(false);
    const _isSlot = inject('isSlot', false) as boolean;
    if (_isSlot || props.asChild) {
      isChild.value = true;
    }

    watch(
      () => [props.disabled, props.formModel],
      ([newDisabled]) => {
        (props.formModel as Array<FormModelBlock>).forEach((block) => {
          const blockDisabled = block.disabled !== undefined ? block.disabled : newDisabled;
          (block.column || []).forEach((col: any) => {
            col.props = col.props || {};
            // 用户显式在列级或 props 上设置了 disabled，用户设置优先
            const userSetAtItemLevel = col.disabled !== undefined;
            const userSetAtPropsLevel = col.props.disabled !== undefined && col.props.__managedDisabled !== true;
            if (userSetAtItemLevel || userSetAtPropsLevel) {
              if (col.props.__managedDisabled) delete col.props.__managedDisabled;
              return;
            }

            if (blockDisabled !== undefined) {
              col.props.disabled = !!blockDisabled;
              col.props.__managedDisabled = true; // 标记为由 FormPage 接管
            } else if (col.props.__managedDisabled) {
              // 无需禁用且此前由 FormPage 接管，恢复为未设置
              delete col.props.disabled;
              delete col.props.__managedDisabled;
            }
          });
        });
      },
      { immediate: true, deep: true }
    );

    // 监听 loading 状态
    watch(
      () => props.loading,
      (newVal) => {
        nextTick(() => {
          if (newVal) {
            loadingInstance.value = ElLoading.service({
              target: FormPageContainerRef.value,
              text: '加载中...',
              background: 'rgba(255, 255, 255, 0.7)'
            });
          } else {
            loadingInstance.value?.close();
            loadingInstance.value = null;
          }
        });
      },
      { immediate: true }
    );

    // 高度计算
    const footerHeight = ref<number>(0);
    const headerHeight = computed<number>(() => headerRef.value?.offsetHeight || 0);
    const FormPageContainerHeight = computed<Record<string, any>>(() => {
      let height: string = 'auto';
      if (props.extraHeight) {
        height = `calc(100vh - ${props.extraHeight})`;
      } else if (props.asChild || isChild.value) {
        height = 'auto';
      }
      return { height };
    });

    //  layout 映射到 element-plus：labelPosition/inline
    const isInline = computed<boolean>(() => props.layout === 'inline');
    const formLabelPosition = computed<'left' | 'right' | 'top'>(() => {
      if (props.layout === 'vertical') return 'top';
      // 其余情况默认水平，结合 labelAlign 决定左右
      return (props.labelAlign as any) === 'left' ? 'left' : 'right';
    });

    // 滚动到字段
    const { scrollToFields } = useScrollToFields({
      formModel: props.formModel,
      FormPageContainerRef
    });

    // API：对齐 element-plus FormInstance
    function _validate(nameList?: Array<string>): Promise<any> {
      const form = formContainerRef.value as any;
      if (!form) return Promise.reject(new Error('Form instance not found'));

      // 全表单校验
      if (!nameList || nameList.length === 0) {
        return new Promise((resolve, reject) => {
          form
            .validate?.()
            .then(() => {
              resolve(true);
            })
            .catch((e: any) => {
              reject(e);
            });
        });
      }

      // 指定字段校验
      return new Promise((resolve, reject) => {
        const validatePromises = nameList.map((n) => form.validateField?.(n));
        Promise.all(validatePromises)
          .then(() => {
            resolve(true);
          })
          .catch((e) => {
            reject(e);
          });
      });
    }

    function _clearValidate(nameList?: Array<string>) {
      const form = formContainerRef.value as any;
      return form?.clearValidate?.(nameList as any);
    }

    function validateName(name: string) {
      void _validate([name]);
    }

    function handleClearValidate(name: string) {
      _clearValidate([name]);
    }

    async function resetValidate(name: string) {
      _clearValidate([name]);
    }

    function handleCityPickerChange(data: any) {
      emit('cityPickerChange', data);
    }

    expose({
      resetFields: (nameList?: Array<string>) => (formContainerRef.value as any)?.resetFields?.(nameList as any),
      validate: _validate,
      clearValidate: _clearValidate,
      validateField: (...args) => (formContainerRef.value as any)?.validateField?.(...args),
      // validateFields: async (nameList?: Array<string>) => {
      //   const form = formContainerRef.value as any;
      //   if (!form) return false;
      //   if (!nameList || nameList.length === 0) return _validate();
      //   try {
      //     await Promise.all(nameList.map((n) => form.validateField?.(n)));
      //     return true;
      //   } catch (e) {
      //     return false;
      //   }
      // },
      scrollToField: (name: string) => (formContainerRef.value as any)?.scrollToField?.(name),
      scrollToFields: (names: Array<string>, options?: any) => scrollToFields(names, options),
      resetValidate,
      getSelectedAddressName: (name: string) => getSelectedAddressName(name, cityPicker.value),
      footerHeight,
      headerHeight,
      FormPageContainerHeight,
      _name: 'FormPage',
      cityPicker,
      rules,
      el: FormPageContainerRef
    });

    // 渲染 model 标题（仅在静态设置或插槽存在时使用自定义组件）
    const hasModelTitleComponent = computed<boolean>(() => !!modelTitleComponentRef.value);

    // 组合 style：attrs.style 优先级最高
    function mergedContainerStyle(): CSSProperties | Record<string, any> {
      const base = FormPageContainerHeight.value || {};
      const external = (attrs.style as any) || {};
      return { ...(base as any), ...(external as any) };
    }

    return () => {
      // 如果isInline为true，则使用div，否则使用ElRow
      const CustElRow = isInline.value ? 'div' : ElRow;
      const CustElCol = isInline.value ? 'div' : ElCol;
      return (
        <div
          ref={(el: HTMLElement) => (FormPageContainerRef.value = el)}
          class="x-formpage-container"
          style={mergedContainerStyle()}
        >
          {allSlots.header ? (
            <div ref={headerRef as any} class="x-formpage-container-fixed-header">
              {allSlots.header?.({})}
            </div>
          ) : null}

          <div ref={formRef as any} class="formRef">
            <Form
              ref={formContainerRef}
              class="x-formpage-container-form"
              inline={isInline.value}
              labelPosition={formLabelPosition.value}
              labelWidth={props.labelWidth}
              disabled={false as any}
              autocomplete={props.autocomplete}
              model={props.formData}
              rules={rules}
              {...attrs}
            >
              <fieldset
                ref={fieldsetRef as any}
                disabled={props.disabled as any}
                style={props.fieldsetStyle as any}
                class={{ 'form-container': true, 'form-container-grid': (props.fieldsetStyle as any)?.gridTemplate }}
              >
                {(props.formModel || []).map((model: FormModelBlock, j: number) => {
                  if (!checkDisplay(model)) return null;
                  return (
                    <fieldset key={j} ref={fieldsetRef as any} disabled={false} style={model.fieldsetStyle as any}>
                      {model.title ? (
                        allSlots.modelTitle ? (
                          allSlots.modelTitle({ model, title: model.title })
                        ) : hasModelTitleComponent.value ? (
                          // 使用静态设置的组件
                          h(modelTitleComponentRef.value as any, { title: model.title })
                        ) : (
                          <>{isVNode(model.title) ? model.title : <div class="title">{model.title}</div>}</>
                        )
                      ) : null}

                      <div id={`fieldset_${j}`} style={model.style as any} class={`${model.class as any}`}>
                        <CustElRow
                          {...(!isInline.value && { gutter: props.gutter })}
                          style={{ width: '100%' }}
                          class={{ 'fieldset-box-inline': isInline.value }}
                        >
                          {(model.column || []).map((item: ColumnForFormItemType, index: number) => {
                            if (!checkDisplay(item)) return null;
                            const span = item.colspan || props.colspan;
                            const visible = !!(isShow(item) as any);
                            const _props = {
                              clearable: true,
                              ...item.props
                            };
                            return (
                              <CustElCol
                                key={index}
                                {...(!isInline.value && { span })}
                                style={{ display: visible ? '' : 'none' }}
                              >
                                {item.slot ? (
                                  isFormBlockSlotRender(item.slot) ? (
                                    item.slot({
                                      item,
                                      formData: props.formData
                                    })
                                  ) : (
                                    allSlots[item.slot]?.({ item, formData: props.formData })
                                  )
                                ) : item.el || item.type || item.formSlot ? (
                                  <FormItem
                                    ref={(el: any) => {
                                      if (cityPickerNames.includes(item.el)) {
                                        if (el && !cityPicker.value.includes(el)) cityPicker.value.push(el);
                                      }
                                    }}
                                    hide-required-mark={item.hideRequiredMark}
                                    addRequiredMark={item.addRequiredMark}
                                    style={{ paddingBottom: `${props.verticalGap}px`, ...(item.style || {}) }}
                                    label={item.label}
                                    name={item.name}
                                    type={item.el || item.type}
                                    props={_props}
                                    attributes={item.attributes}
                                    options={resolveColumnOptions(item, props.formData)}
                                    formData={props.formData as any}
                                    cityValidateInfo={validateInfos}
                                    cityPickerData={cityPickerData}
                                    textValue={item.textValue}
                                    event={item.event}
                                    align={item.align}
                                    afterText={item.afterText}
                                    beforeText={item.beforeText}
                                    textBold={item.textBold}
                                    unitStyle={item.unitStyle}
                                    disabled={item.disabled || item.props?.disabled}
                                    labelAlign={item.labelAlign || props.labelAlign}
                                    labelWidth={item.labelWidth}
                                    autoLabelHeight={item.autoLabelHeight}
                                    selfProps={item.selfProps}
                                    slotProps={item.slotProps}
                                    afterSlot={item.afterSlot}
                                    beforeSlot={item.beforeSlot}
                                    formSlot={item.formSlot}
                                    schemaItem={item}
                                    rules={item.name ? rules[getFormRuleKey(item.name)] : undefined}
                                    onClearValidate={handleClearValidate}
                                    onValidateName={validateName}
                                    onCityPickerChange={handleCityPickerChange}
                                    v-slots={createFormItemSlots(allSlots as Record<string, any>, item, props.formData)}
                                  />
                                ) : null}
                              </CustElCol>
                            );
                          })}
                          {allSlots.searchFormButtonsSlot?.({})}
                        </CustElRow>
                      </div>
                    </fieldset>
                  );
                })}
              </fieldset>
            </Form>
          </div>

          {allSlots.footer ? (
            <div ref={footerRef as any} class="x-formpage-container-fixed-footer">
              {allSlots.footer?.({})}
            </div>
          ) : null}
        </div>
      );
    };
  }
});

// 暴露模块内的标题组件 ref，供 index.ts 设置静态方法时访问
export const __modelTitleRef = modelTitleComponentRef;

export default XFormPage;
