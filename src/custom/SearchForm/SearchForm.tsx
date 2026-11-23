/**
 * @description: 搜索表单组件
 * @author WuShiLi
 */

import { defineComponent, ref, watch, onMounted, computed, nextTick, unref } from 'vue';
import { ElButton as Button } from 'element-plus';
import { ArrowUpBold, ArrowDownBold } from '@element-plus/icons-vue';
import type { SearchFormProps } from './types/props';
import { searchFormProps } from './types/props';
import './styles/SearchForm.less';
import FormPage from '../FormPage/FormPage';

/**
 * @description 搜索表单组件
 * @author WuShiLi
 */
export default defineComponent({
  name: 'XSearchForm',
  props: {
    ...searchFormProps()
  },
  emits: ['search', 'reset', 'update:formData', 'expand'],
  setup(props: SearchFormProps, { attrs, slots, expose, emit }) {
    const formPageRef = ref();
    const wrapperRef = ref();
    // 1. column转formModel，支持ref/reactive
    const formModel = computed(() => [
      {
        title: '',
        display: true,
        column: unref(props.column)
      }
    ]);

    // 2. 事件处理
    const handleSearch = async () => {
      const valid = await formPageRef.value?.validate();
      if (valid) emit('search', props.formData);
    };
    /**
     * 重置表单并抛出 reset 事件。
     *
     * `resetFields()` 对表单模型的写入是同步的，但监听这些字段的 watcher
     * 要等下一个 microtask 才冲刷。若同步 emit，页面处理器可能读到重置过程中的旧值。
     * 这里等一个 tick 让字段状态落定，再让页面发起查询。
     */
    const handleReset = async () => {
      formPageRef.value?.resetFields();
      await nextTick();
      emit('reset', props.formData);
    };

    /**
     * 输入框回车触发查询（与点击「查询」一致）。
     * 跳过 textarea，避免多行输入误触发。
     */
    const handleFormKeydown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter') return;
      const target = event.target as HTMLElement | null;
      if (!target || target.tagName === 'TEXTAREA') return;
      if (target.closest('button, .el-button, textarea')) return;
      event.preventDefault();
      void handleSearch();
    };

    // 3. 展开收起逻辑（保留原有）
    const hasMore = ref(false);
    const showMore = ref(false); // 是否展开
    let debounce = false;
    let timer = null;
    function handleShowMore() {
      showMore.value = !showMore.value;
      nextTick(() => {
        emit('expand', showMore.value);
      });
    }
    const rowRef = ref<any>();
    let innerHeight = 0;
    let resizeHandle = () => {};
    onMounted(() => {
      const wrapper = wrapperRef.value;
      const antForm = wrapper.querySelector('.el-form');
      const formHeight = antForm.offsetHeight;
      resizeHandle = () => {
        if (debounce) return;
        debounce = true;
        if (timer) {
          clearTimeout(timer);
        }

        timer = setTimeout(() => {
          if (wrapper) {
            let formItem = antForm.firstChild;
            if (formItem && formItem.nodeType !== 1) {
              formItem = formItem.nextSibling;
            }
            const formOverHeight = formItem.offsetHeight;

            if (formOverHeight / formHeight >= 2) {
              hasMore.value = true;
            } else {
              hasMore.value = false;
            }
          }
          debounce = false;
        }, 300);
      };
      props.enabledExpand && resizeHandle(); //开启展开收起功能
      window.addEventListener('resize', resizeHandle);
      innerHeight = rowRef.value?.$el?.offsetHeight;
    });

    watch(
      () => props.formData,
      () => {
        if (rowRef.value?.$el?.offsetHeight !== innerHeight) {
          resizeHandle();
        }
      },
      {
        deep: true
      }
    );

    // 4. 透传expose
    expose({
      validate: (...args) => formPageRef.value?.validate?.(...args),
      resetFields: (...args) => formPageRef.value?.resetFields?.(...args),
      clearValidate: (...args) => formPageRef.value?.clearValidate?.(...args),
      getSelectedAddressName: (...args) => formPageRef.value?.getSelectedAddressName?.(...args)
    });

    const isInline = computed<boolean>(() => props.layout === 'inline');
    const searchFormButtons = () => {
      return (
        <>
          <div class="x-search-form-btns" style={{ justifyContent: props.buttonsSlotLayout }}>
            {props.showButtons && (
              <>
                {/* 设置按钮和插槽的布局，可以是跟随或者space-between分离 */}
                <div class="x-search-form-btns-wrapper">
                  {props.searchText && (
                    <Button
                      type="primary"
                      disabled={props.disabled || props.loading}
                      loading={props.loading}
                      onClick={handleSearch}
                      class="x-search-form-btn-search"
                    >
                      {props.searchText}
                    </Button>
                  )}
                  {props.resetText && (
                    <Button
                      type="default"
                      disabled={props.disabled || props.loading}
                      loading={props.loading}
                      onClick={handleReset}
                      class="x-search-form-btn-reset"
                    >
                      {props.resetText}
                    </Button>
                  )}
                </div>
              </>
            )}
            {slots?.btnAfter ? <div class="x-search-form-btns-after">{slots?.btnAfter?.()}</div> : null}
          </div>
        </>
      );
    };
    return () => (
      <div
        class={`x-search-form ${props.enabledExpand && hasMore.value ? 'showMore' : ''}`}
        ref={wrapperRef}
        onKeydown={handleFormKeydown}
      >
        {props.enabledExpand && hasMore.value ? (
          <span class="x-search-form-more-icon" onClick={handleShowMore}>
            {showMore.value ? <ArrowUpBold /> : <ArrowDownBold />}
          </span>
        ) : null}
        <FormPage
          ref={formPageRef}
          formModel={formModel.value}
          formData={props.formData}
          labelWidth={props.labelWidth}
          labelAlign={props.labelAlign}
          layout={props.layout}
          gutter={props.gutter}
          disabled={props.disabled}
          autocomplete={props.autocomplete}
          verticalGap={props.verticalGap}
          colspan={props.colspan}
          {...attrs}
        >
          {{
            // 页面通过 schema 的 formSlot / slot 声明的命名插槽要能一路传到 FormItem，
            // 否则字段只能写 render 函数，拿不到页面里的样式化模板。
            ...slots,
            // 内部插槽放在展开之后：页面即使起了同名插槽，也不能把查询按钮区顶掉。
            searchFormButtonsSlot: () => {
              return isInline.value ? searchFormButtons() : null;
            }
          }}
        </FormPage>
        {isInline.value ? null : searchFormButtons()}
        {slots?.default ? <div class="x-search-form-default">{slots?.default?.()}</div> : null}
      </div>
    );
  }
});
