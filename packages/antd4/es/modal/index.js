import confirm, { modalGlobalConfig, withConfirm, withError, withInfo, withSuccess, withWarn } from './confirm';
import destroyFns from './destroyFns';
import OriginModal from './Modal';
import useModal from './useModal';
function modalWarn(props) {
  return confirm(withWarn(props));
}
var Modal = OriginModal;
Modal.useModal = useModal;
Modal.info = function infoFn(props) {
  return confirm(withInfo(props));
};
Modal.success = function successFn(props) {
  return confirm(withSuccess(props));
};
Modal.error = function errorFn(props) {
  return confirm(withError(props));
};
Modal.warning = modalWarn;
Modal.warn = modalWarn;
Modal.confirm = function confirmFn(props) {
  return confirm(withConfirm(props));
};
Modal.destroyAll = function destroyAllFn() {
  while (destroyFns.length) {
    var close = destroyFns.pop();
    if (close) {
      close();
    }
  }
};
Modal.config = modalGlobalConfig;
export default Modal;