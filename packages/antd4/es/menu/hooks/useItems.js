import _extends from "@babel/runtime/helpers/esm/extends";
import _typeof from "@babel/runtime/helpers/esm/typeof";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import { ItemGroup } from 'rc-menu';
import * as React from 'react';
import MenuDivider from '../MenuDivider';
import MenuItem from '../MenuItem';
import SubMenu from '../SubMenu';
function convertItemsToNodes(list) {
  return (list || []).map(function (opt, index) {
    if (opt && _typeof(opt) === 'object') {
      var _a = opt,
        label = _a.label,
        children = _a.children,
        key = _a.key,
        type = _a.type,
        restProps = __rest(_a, ["label", "children", "key", "type"]);
      var mergedKey = key !== null && key !== void 0 ? key : "tmp-".concat(index);
      // MenuItemGroup & SubMenuItem
      if (children || type === 'group') {
        if (type === 'group') {
          // Group
          return /*#__PURE__*/React.createElement(ItemGroup, _extends({
            key: mergedKey
          }, restProps, {
            title: label
          }), convertItemsToNodes(children));
        }
        // Sub Menu
        return /*#__PURE__*/React.createElement(SubMenu, _extends({
          key: mergedKey
        }, restProps, {
          title: label
        }), convertItemsToNodes(children));
      }
      // MenuItem & Divider
      if (type === 'divider') {
        return /*#__PURE__*/React.createElement(MenuDivider, _extends({
          key: mergedKey
        }, restProps));
      }
      return /*#__PURE__*/React.createElement(MenuItem, _extends({
        key: mergedKey
      }, restProps), label);
    }
    return null;
  }).filter(function (opt) {
    return opt;
  });
}
// FIXME: Move logic here in v5
/**
 * We simply convert `items` to ReactNode for reuse origin component logic. But we need move all the
 * logic from component into this hooks when in v5
 */
export default function useItems(items) {
  return React.useMemo(function () {
    if (!items) {
      return items;
    }
    return convertItemsToNodes(items);
  }, [items]);
}