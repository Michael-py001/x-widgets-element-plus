import SearchForm from './SearchForm';
import type { App } from 'vue';
import { ref, reactive } from 'vue';
import { SearchFormProps } from './types/props';

SearchForm.install = (app: App) => {
  app.component(SearchForm.name as string, SearchForm);
};

interface searchHelperType {
  tableRef: any;
  x?: number | string;
}

interface searchHelperReturnType {
  tableRef: any;
  scrollValue: { x: number; y: number };
  handleExpand: () => void;
}

SearchForm.searchHelper = (
  config: searchHelperType = {
    tableRef: null,
    x: 'max-content'
  }
): searchHelperReturnType => {
  const tableRef = config.tableRef || ref('');
  const scrollValue = reactive({
    /* x: config.x  */
  } as any);

  if (config.x) {
    scrollValue.x = config.x;
  }
  const handleExpand = () => {
    if (tableRef.value && typeof tableRef.value['getTableScroll'] === 'function') {
      scrollValue.y = tableRef.value['getTableScroll']();
    }
  };

  return {
    tableRef,
    scrollValue,
    handleExpand
  };
};

// export default SearchForm as typeof SearchForm & {
//   searchHelper: (config: searchHelperType) => searchHelperReturnType;
// };
export default SearchForm;

export type { SearchFormProps };
