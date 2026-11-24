import { getValue, setFormdata } from '../../../utils';
import type { WidgetFormFieldValue } from '../../../utils/handleFormData';
import type { XUploadProps } from '../types/props';

type UploadFileList = XUploadProps['fileList'];

/**
 * Upload 的受控值是 fileList（而非 value/modelValue），
 * 因此这里单独绑定 fileList / update:fileList 到表单模型。
 */
export default function usePropsByCustomForm(props: XUploadProps) {
  const { formData, name } = props;
  if (!formData || name === undefined || name === null || name === '') return {};

  return {
    fileList: getValue(formData, name) as UploadFileList,
    'onUpdate:fileList': (value: UploadFileList) =>
      setFormdata(formData, name, value as WidgetFormFieldValue)
  };
}
