import * as React from 'react';
import { ConfigConsumer } from '.';
import Empty from '../empty';
var defaultRenderEmpty = function defaultRenderEmpty(componentName) {
  return /*#__PURE__*/React.createElement(ConfigConsumer, null, function (_ref) {
    var getPrefixCls = _ref.getPrefixCls;
    var prefix = getPrefixCls('empty');
    switch (componentName) {
      case 'Table':
      case 'List':
        return /*#__PURE__*/React.createElement(Empty, {
          image: Empty.PRESENTED_IMAGE_SIMPLE
        });
      case 'Select':
      case 'TreeSelect':
      case 'Cascader':
      case 'Transfer':
      case 'Mentions':
        return /*#__PURE__*/React.createElement(Empty, {
          image: Empty.PRESENTED_IMAGE_SIMPLE,
          className: "".concat(prefix, "-small")
        });
      /* istanbul ignore next */
      default:
        // Should never hit if we take all the component into consider.
        return /*#__PURE__*/React.createElement(Empty, null);
    }
  });
};
export default defaultRenderEmpty;