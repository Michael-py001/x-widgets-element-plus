import type { ExtractPropTypes } from 'vue';
import { ElUpload } from 'element-plus';
import type { BasicFormProps } from './basicFormProps';

type ElementUploadProps = Partial<ExtractPropTypes<typeof ElUpload.props>>;

export interface XUploadProps extends Omit<ElementUploadProps, 'name'>, BasicFormProps {}
