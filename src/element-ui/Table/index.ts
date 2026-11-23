import TableVirtualized from './BasicTableVirtualized';
import TableLegacy from './BasicTableLegacy';
import type { App } from 'vue';
import type { ExtendedPaginationProps } from './types/basicTableProps';
import type { TableColumn } from './types/BasicTableLegacy/props';
import type { TableExposeInstance } from './types/BasicTableLegacy/tableExpose';
export { TableVirtualized, TableLegacy };

export default Object.assign(TableLegacy, {
  install: (app: App) => {
    app.component(TableLegacy.name, TableLegacy);
    app.component(TableVirtualized.name, TableVirtualized);
  }
});

export type { ExtendedPaginationProps, TableColumn, TableExposeInstance };
