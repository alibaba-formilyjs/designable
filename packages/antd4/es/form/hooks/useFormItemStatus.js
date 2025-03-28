import { useContext } from 'react';
import { FormItemInputContext } from '../context';
import warning from '../../_util/warning';
var useFormItemStatus = function useFormItemStatus() {
  var _useContext = useContext(FormItemInputContext),
    status = _useContext.status;
  process.env.NODE_ENV !== "production" ? warning(status !== undefined, 'Form.Item', "Form.Item.useStatus should be used under Form.Item component. For more information: ".concat(window.location.protocol, "//").concat(window.location.host, "/components/form-cn/#Form.Item.useStatus")) : void 0;
  return {
    status: status
  };
};
export default useFormItemStatus;