import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import classNames from 'classnames';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import SkeletonAvatar from './Avatar';
import SkeletonButton from './Button';
import SkeletonNode from './Node';
import Element from './Element';
import SkeletonImage from './Image';
import SkeletonInput from './Input';
import Paragraph from './Paragraph';
import Title from './Title';
function getComponentProps(prop) {
  if (prop && _typeof(prop) === 'object') {
    return prop;
  }
  return {};
}
function getAvatarBasicProps(hasTitle, hasParagraph) {
  if (hasTitle && !hasParagraph) {
    // Square avatar
    return {
      size: 'large',
      shape: 'square'
    };
  }
  return {
    size: 'large',
    shape: 'circle'
  };
}
function getTitleBasicProps(hasAvatar, hasParagraph) {
  if (!hasAvatar && hasParagraph) {
    return {
      width: '38%'
    };
  }
  if (hasAvatar && hasParagraph) {
    return {
      width: '50%'
    };
  }
  return {};
}
function getParagraphBasicProps(hasAvatar, hasTitle) {
  var basicProps = {};
  // Width
  if (!hasAvatar || !hasTitle) {
    basicProps.width = '61%';
  }
  // Rows
  if (!hasAvatar && hasTitle) {
    basicProps.rows = 3;
  } else {
    basicProps.rows = 2;
  }
  return basicProps;
}
var Skeleton = function Skeleton(props) {
  var customizePrefixCls = props.prefixCls,
    loading = props.loading,
    className = props.className,
    style = props.style,
    children = props.children,
    _props$avatar = props.avatar,
    avatar = _props$avatar === void 0 ? false : _props$avatar,
    _props$title = props.title,
    title = _props$title === void 0 ? true : _props$title,
    _props$paragraph = props.paragraph,
    paragraph = _props$paragraph === void 0 ? true : _props$paragraph,
    active = props.active,
    round = props.round;
  var _React$useContext = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction;
  var prefixCls = getPrefixCls('skeleton', customizePrefixCls);
  if (loading || !('loading' in props)) {
    var hasAvatar = !!avatar;
    var hasTitle = !!title;
    var hasParagraph = !!paragraph;
    // Avatar
    var avatarNode;
    if (hasAvatar) {
      var avatarProps = _extends(_extends({
        prefixCls: "".concat(prefixCls, "-avatar")
      }, getAvatarBasicProps(hasTitle, hasParagraph)), getComponentProps(avatar));
      // We direct use SkeletonElement as avatar in skeleton internal.
      avatarNode = /*#__PURE__*/React.createElement("div", {
        className: "".concat(prefixCls, "-header")
      }, /*#__PURE__*/React.createElement(Element, _extends({}, avatarProps)));
    }
    var contentNode;
    if (hasTitle || hasParagraph) {
      // Title
      var $title;
      if (hasTitle) {
        var titleProps = _extends(_extends({
          prefixCls: "".concat(prefixCls, "-title")
        }, getTitleBasicProps(hasAvatar, hasParagraph)), getComponentProps(title));
        $title = /*#__PURE__*/React.createElement(Title, _extends({}, titleProps));
      }
      // Paragraph
      var paragraphNode;
      if (hasParagraph) {
        var paragraphProps = _extends(_extends({
          prefixCls: "".concat(prefixCls, "-paragraph")
        }, getParagraphBasicProps(hasAvatar, hasTitle)), getComponentProps(paragraph));
        paragraphNode = /*#__PURE__*/React.createElement(Paragraph, _extends({}, paragraphProps));
      }
      contentNode = /*#__PURE__*/React.createElement("div", {
        className: "".concat(prefixCls, "-content")
      }, $title, paragraphNode);
    }
    var cls = classNames(prefixCls, _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-with-avatar"), hasAvatar), "".concat(prefixCls, "-active"), active), "".concat(prefixCls, "-rtl"), direction === 'rtl'), "".concat(prefixCls, "-round"), round), className);
    return /*#__PURE__*/React.createElement("div", {
      className: cls,
      style: style
    }, avatarNode, contentNode);
  }
  return typeof children !== 'undefined' ? children : null;
};
Skeleton.Button = SkeletonButton;
Skeleton.Avatar = SkeletonAvatar;
Skeleton.Input = SkeletonInput;
Skeleton.Image = SkeletonImage;
Skeleton.Node = SkeletonNode;
export default Skeleton;