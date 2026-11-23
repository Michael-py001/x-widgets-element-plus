import Tag from './Tag';
import type { TagProps, TagStatusType, TagStyleConfig } from './types/props';
import type { App } from 'vue';

Tag.install = (app: App) => {
  app.component(Tag.name as string, Tag);
};

export { Tag };
export type { TagProps, TagStatusType, TagStyleConfig };
export default Tag;
