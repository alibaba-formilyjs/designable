"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _isNativeReflectConstruct2 = _interopRequireDefault(require("@babel/runtime/helpers/isNativeReflectConstruct"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _DownOutlined = _interopRequireDefault(require("@ant-design/icons/DownOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var _omit = _interopRequireDefault(require("rc-util/lib/omit"));
var React = _interopRequireWildcard(require("react"));
var _checkbox = _interopRequireDefault(require("../checkbox"));
var _dropdown = _interopRequireDefault(require("../dropdown"));
var _reactNode = require("../_util/reactNode");
var _ListBody = _interopRequireWildcard(require("./ListBody"));
var _search = _interopRequireDefault(require("./search"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, (0, _isNativeReflectConstruct2["default"])() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
var defaultRender = function defaultRender() {
  return null;
};
function isRenderResultPlainObject(result) {
  return !!(result && !(0, _reactNode.isValidElement)(result) && Object.prototype.toString.call(result) === '[object Object]');
}
function getEnabledItemKeys(items) {
  return items.filter(function (data) {
    return !data.disabled;
  }).map(function (data) {
    return data.key;
  });
}
var TransferList = exports["default"] = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2["default"])(TransferList, _React$PureComponent);
  function TransferList(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, TransferList);
    _this = _callSuper(this, TransferList, [props]);
    _this.defaultListBodyRef = /*#__PURE__*/React.createRef();
    // =============================== Filter ===============================
    _this.handleFilter = function (e) {
      var handleFilter = _this.props.handleFilter;
      var filterValue = e.target.value;
      _this.setState({
        filterValue: filterValue
      });
      handleFilter(e);
    };
    _this.handleClear = function () {
      var handleClear = _this.props.handleClear;
      _this.setState({
        filterValue: ''
      });
      handleClear();
    };
    _this.matchFilter = function (text, item) {
      var filterValue = _this.state.filterValue;
      var filterOption = _this.props.filterOption;
      if (filterOption) {
        return filterOption(filterValue, item);
      }
      return text.includes(filterValue);
    };
    // =============================== Render ===============================
    _this.renderListBody = function (renderList, props) {
      var bodyContent = renderList ? renderList(props) : null;
      var customize = !!bodyContent;
      if (!customize) {
        bodyContent = /*#__PURE__*/React.createElement(_ListBody["default"], (0, _extends2["default"])({
          ref: _this.defaultListBodyRef
        }, props));
      }
      return {
        customize: customize,
        bodyContent: bodyContent
      };
    };
    _this.renderItem = function (item) {
      var _this$props$render = _this.props.render,
        render = _this$props$render === void 0 ? defaultRender : _this$props$render;
      var renderResult = render(item);
      var isRenderResultPlain = isRenderResultPlainObject(renderResult);
      return {
        renderedText: isRenderResultPlain ? renderResult.value : renderResult,
        renderedEl: isRenderResultPlain ? renderResult.label : renderResult,
        item: item
      };
    };
    _this.getSelectAllLabel = function (selectedCount, totalCount) {
      var _this$props = _this.props,
        itemsUnit = _this$props.itemsUnit,
        itemUnit = _this$props.itemUnit,
        selectAllLabel = _this$props.selectAllLabel;
      if (selectAllLabel) {
        return typeof selectAllLabel === 'function' ? selectAllLabel({
          selectedCount: selectedCount,
          totalCount: totalCount
        }) : selectAllLabel;
      }
      var unit = totalCount > 1 ? itemsUnit : itemUnit;
      return /*#__PURE__*/React.createElement(React.Fragment, null, (selectedCount > 0 ? "".concat(selectedCount, "/") : '') + totalCount, " ", unit);
    };
    _this.state = {
      filterValue: ''
    };
    return _this;
  }
  (0, _createClass2["default"])(TransferList, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.triggerScrollTimer);
    }
  }, {
    key: "getCheckStatus",
    value: function getCheckStatus(filteredItems) {
      var checkedKeys = this.props.checkedKeys;
      if (checkedKeys.length === 0) {
        return 'none';
      }
      if (filteredItems.every(function (item) {
        return checkedKeys.includes(item.key) || !!item.disabled;
      })) {
        return 'all';
      }
      return 'part';
    }
    // ================================ Item ================================
  }, {
    key: "getFilteredItems",
    value: function getFilteredItems(dataSource, filterValue) {
      var _this2 = this;
      var filteredItems = [];
      var filteredRenderItems = [];
      dataSource.forEach(function (item) {
        var renderedItem = _this2.renderItem(item);
        var renderedText = renderedItem.renderedText;
        // Filter skip
        if (filterValue && !_this2.matchFilter(renderedText, item)) {
          return null;
        }
        filteredItems.push(item);
        filteredRenderItems.push(renderedItem);
      });
      return {
        filteredItems: filteredItems,
        filteredRenderItems: filteredRenderItems
      };
    }
  }, {
    key: "getListBody",
    value: function getListBody(prefixCls, searchPlaceholder, filterValue, filteredItems, notFoundContent, filteredRenderItems, checkedKeys, renderList, showSearch, disabled) {
      var _this3 = this;
      var search = showSearch ? ( /*#__PURE__*/React.createElement("div", {
        className: "".concat(prefixCls, "-body-search-wrapper")
      }, /*#__PURE__*/React.createElement(_search["default"], {
        prefixCls: "".concat(prefixCls, "-search"),
        onChange: this.handleFilter,
        handleClear: this.handleClear,
        placeholder: searchPlaceholder,
        value: filterValue,
        disabled: disabled
      }))) : null;
      var _this$renderListBody = this.renderListBody(renderList, (0, _extends2["default"])((0, _extends2["default"])({}, (0, _omit["default"])(this.props, _ListBody.OmitProps)), {
          filteredItems: filteredItems,
          filteredRenderItems: filteredRenderItems,
          selectedKeys: checkedKeys
        })),
        bodyContent = _this$renderListBody.bodyContent,
        customize = _this$renderListBody.customize;
      var getNotFoundContent = function getNotFoundContent() {
        var contentIndex = _this3.props.direction === 'left' ? 0 : 1;
        return Array.isArray(notFoundContent) ? notFoundContent[contentIndex] : notFoundContent;
      };
      var bodyNode;
      // We should wrap customize list body in a classNamed div to use flex layout.
      if (customize) {
        bodyNode = /*#__PURE__*/React.createElement("div", {
          className: "".concat(prefixCls, "-body-customize-wrapper")
        }, bodyContent);
      } else {
        bodyNode = filteredItems.length ? bodyContent : ( /*#__PURE__*/React.createElement("div", {
          className: "".concat(prefixCls, "-body-not-found")
        }, getNotFoundContent()));
      }
      return /*#__PURE__*/React.createElement("div", {
        className: (0, _classnames["default"])(showSearch ? "".concat(prefixCls, "-body ").concat(prefixCls, "-body-with-search") : "".concat(prefixCls, "-body"))
      }, search, bodyNode);
    }
  }, {
    key: "getCheckBox",
    value: function getCheckBox(_ref) {
      var filteredItems = _ref.filteredItems,
        onItemSelectAll = _ref.onItemSelectAll,
        disabled = _ref.disabled,
        prefixCls = _ref.prefixCls;
      var checkStatus = this.getCheckStatus(filteredItems);
      var checkedAll = checkStatus === 'all';
      var checkAllCheckbox = /*#__PURE__*/React.createElement(_checkbox["default"], {
        disabled: disabled,
        checked: checkedAll,
        indeterminate: checkStatus === 'part',
        className: "".concat(prefixCls, "-checkbox"),
        onChange: function onChange() {
          // Only select enabled items
          onItemSelectAll(filteredItems.filter(function (item) {
            return !item.disabled;
          }).map(function (_ref2) {
            var key = _ref2.key;
            return key;
          }), !checkedAll);
        }
      });
      return checkAllCheckbox;
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;
      var filterValue = this.state.filterValue;
      var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        _this$props2$dataSour = _this$props2.dataSource,
        dataSource = _this$props2$dataSour === void 0 ? [] : _this$props2$dataSour,
        _this$props2$titleTex = _this$props2.titleText,
        titleText = _this$props2$titleTex === void 0 ? '' : _this$props2$titleTex,
        checkedKeys = _this$props2.checkedKeys,
        disabled = _this$props2.disabled,
        footer = _this$props2.footer,
        _this$props2$showSear = _this$props2.showSearch,
        showSearch = _this$props2$showSear === void 0 ? false : _this$props2$showSear,
        style = _this$props2.style,
        searchPlaceholder = _this$props2.searchPlaceholder,
        notFoundContent = _this$props2.notFoundContent,
        selectAll = _this$props2.selectAll,
        selectCurrent = _this$props2.selectCurrent,
        selectInvert = _this$props2.selectInvert,
        removeAll = _this$props2.removeAll,
        removeCurrent = _this$props2.removeCurrent,
        renderList = _this$props2.renderList,
        onItemSelectAll = _this$props2.onItemSelectAll,
        onItemRemove = _this$props2.onItemRemove,
        _this$props2$showSele = _this$props2.showSelectAll,
        showSelectAll = _this$props2$showSele === void 0 ? true : _this$props2$showSele,
        showRemove = _this$props2.showRemove,
        pagination = _this$props2.pagination,
        direction = _this$props2.direction;
      // Custom Layout
      var footerDom = footer && (footer.length < 2 ? footer(this.props) : footer(this.props, {
        direction: direction
      }));
      var listCls = (0, _classnames["default"])(prefixCls, (0, _defineProperty2["default"])((0, _defineProperty2["default"])({}, "".concat(prefixCls, "-with-pagination"), !!pagination), "".concat(prefixCls, "-with-footer"), !!footerDom));
      // ====================== Get filtered, checked item list ======================
      var _this$getFilteredItem = this.getFilteredItems(dataSource, filterValue),
        filteredItems = _this$getFilteredItem.filteredItems,
        filteredRenderItems = _this$getFilteredItem.filteredRenderItems;
      // ================================= List Body =================================
      var listBody = this.getListBody(prefixCls, searchPlaceholder, filterValue, filteredItems, notFoundContent, filteredRenderItems, checkedKeys, renderList, showSearch, disabled);
      // ================================ List Footer ================================
      var listFooter = footerDom ? /*#__PURE__*/React.createElement("div", {
        className: "".concat(prefixCls, "-footer")
      }, footerDom) : null;
      var checkAllCheckbox = !showRemove && !pagination && this.getCheckBox({
        filteredItems: filteredItems,
        onItemSelectAll: onItemSelectAll,
        disabled: disabled,
        prefixCls: prefixCls
      });
      var items;
      if (showRemove) {
        items = [/* Remove Current Page */
        pagination ? {
          key: 'removeCurrent',
          onClick: function onClick() {
            var _a;
            var pageKeys = getEnabledItemKeys((((_a = _this4.defaultListBodyRef.current) === null || _a === void 0 ? void 0 : _a.getItems()) || []).map(function (entity) {
              return entity.item;
            }));
            onItemRemove === null || onItemRemove === void 0 ? void 0 : onItemRemove(pageKeys);
          },
          label: removeCurrent
        } : null, /* Remove All */
        {
          key: 'removeAll',
          onClick: function onClick() {
            onItemRemove === null || onItemRemove === void 0 ? void 0 : onItemRemove(getEnabledItemKeys(filteredItems));
          },
          label: removeAll
        }].filter(function (item) {
          return item;
        });
      } else {
        items = [{
          key: 'selectAll',
          onClick: function onClick() {
            var keys = getEnabledItemKeys(filteredItems);
            onItemSelectAll(keys, keys.length !== checkedKeys.length);
          },
          label: selectAll
        }, pagination ? {
          key: 'selectCurrent',
          onClick: function onClick() {
            var _a;
            var pageItems = ((_a = _this4.defaultListBodyRef.current) === null || _a === void 0 ? void 0 : _a.getItems()) || [];
            onItemSelectAll(getEnabledItemKeys(pageItems.map(function (entity) {
              return entity.item;
            })), true);
          },
          label: selectCurrent
        } : null, {
          key: 'selectInvert',
          onClick: function onClick() {
            var _a;
            var availablePageItemKeys = getEnabledItemKeys((((_a = _this4.defaultListBodyRef.current) === null || _a === void 0 ? void 0 : _a.getItems()) || []).map(function (entity) {
              return entity.item;
            }));
            var checkedKeySet = new Set(checkedKeys);
            var newCheckedKeysSet = new Set(checkedKeySet);
            availablePageItemKeys.forEach(function (key) {
              if (checkedKeySet.has(key)) {
                newCheckedKeysSet["delete"](key);
              } else {
                newCheckedKeysSet.add(key);
              }
            });
            onItemSelectAll === null || onItemSelectAll === void 0 ? void 0 : onItemSelectAll(Array.from(newCheckedKeysSet), 'replace');
          },
          label: selectInvert
        }];
      }
      var dropdown = /*#__PURE__*/React.createElement(_dropdown["default"], {
        className: "".concat(prefixCls, "-header-dropdown"),
        menu: {
          items: items
        },
        disabled: disabled
      }, /*#__PURE__*/React.createElement(_DownOutlined["default"], null));
      // ================================== Render ===================================
      return /*#__PURE__*/React.createElement("div", {
        className: listCls,
        style: style
      }, /*#__PURE__*/React.createElement("div", {
        className: "".concat(prefixCls, "-header")
      }, showSelectAll ? ( /*#__PURE__*/React.createElement(React.Fragment, null, checkAllCheckbox, dropdown)) : null, /*#__PURE__*/React.createElement("span", {
        className: "".concat(prefixCls, "-header-selected")
      }, this.getSelectAllLabel(checkedKeys.length, filteredItems.length)), /*#__PURE__*/React.createElement("span", {
        className: "".concat(prefixCls, "-header-title")
      }, titleText)), listBody, listFooter);
    }
  }]);
  return TransferList;
}(React.PureComponent);