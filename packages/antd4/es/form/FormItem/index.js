import _typeof from "@babel/runtime/helpers/esm/typeof";
import _extends from "@babel/runtime/helpers/esm/extends";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { Field, FieldContext, ListContext } from 'rc-field-form';
import useState from "rc-util/es/hooks/useState";
import { supportRef } from "rc-util/es/ref";
import * as React from 'react';
import { useContext } from 'react';
import useFormItemStatus from '../hooks/useFormItemStatus';
import { ConfigContext } from '../../config-provider';
import { cloneElement, isValidElement } from '../../_util/reactNode';
import { tuple } from '../../_util/type';
import warning from '../../_util/warning';
import { FormContext, NoStyleItemContext } from '../context';
import useFrameState from '../hooks/useFrameState';
import useItemRef from '../hooks/useItemRef';
import { getFieldId, toArray } from '../util';
import ItemHolder from './ItemHolder';
var NAME_SPLIT = '__SPLIT__';
var ValidateStatuses = tuple('success', 'warning', 'error', 'validating', '');
var MemoInput = /*#__PURE__*/React.memo(function (_ref) {
  var children = _ref.children;
  return children;
}, function (prev, next) {
  return prev.value === next.value && prev.update === next.update && prev.childProps.length === next.childProps.length && prev.childProps.every(function (value, index) {
    return value === next.childProps[index];
  });
});
function hasValidName(name) {
  if (name === null) {
    process.env.NODE_ENV !== "production" ? warning(false, 'Form.Item', '`null` is passed as `name` property') : void 0;
  }
  return !(name === undefined || name === null);
}
function genEmptyMeta() {
  return {
    errors: [],
    warnings: [],
    touched: false,
    validating: false,
    validated: false,
    name: []
  };
}
function InternalFormItem(props) {
  var name = props.name,
    noStyle = props.noStyle,
    dependencies = props.dependencies,
    customizePrefixCls = props.prefixCls,
    shouldUpdate = props.shouldUpdate,
    rules = props.rules,
    children = props.children,
    required = props.required,
    label = props.label,
    messageVariables = props.messageVariables,
    _props$trigger = props.trigger,
    trigger = _props$trigger === void 0 ? 'onChange' : _props$trigger,
    validateTrigger = props.validateTrigger,
    hidden = props.hidden;
  var _useContext = useContext(ConfigContext),
    getPrefixCls = _useContext.getPrefixCls;
  var _useContext2 = useContext(FormContext),
    formName = _useContext2.name;
  var isRenderProps = typeof children === 'function';
  var notifyParentMetaChange = useContext(NoStyleItemContext);
  var _useContext3 = useContext(FieldContext),
    contextValidateTrigger = _useContext3.validateTrigger;
  var mergedValidateTrigger = validateTrigger !== undefined ? validateTrigger : contextValidateTrigger;
  var hasName = hasValidName(name);
  var prefixCls = getPrefixCls('form', customizePrefixCls);
  // ========================= MISC =========================
  // Get `noStyle` required info
  var listContext = React.useContext(ListContext);
  var fieldKeyPathRef = React.useRef();
  // ======================== Errors ========================
  // >>>>> Collect sub field errors
  var _useFrameState = useFrameState({}),
    _useFrameState2 = _slicedToArray(_useFrameState, 2),
    subFieldErrors = _useFrameState2[0],
    setSubFieldErrors = _useFrameState2[1];
  // >>>>> Current field errors
  var _useState = useState(function () {
      return genEmptyMeta();
    }),
    _useState2 = _slicedToArray(_useState, 2),
    meta = _useState2[0],
    setMeta = _useState2[1];
  var onMetaChange = function onMetaChange(nextMeta) {
    // This keyInfo is not correct when field is removed
    // Since origin keyManager no longer keep the origin key anymore
    // Which means we need cache origin one and reuse when removed
    var keyInfo = listContext === null || listContext === void 0 ? void 0 : listContext.getKey(nextMeta.name);
    // Destroy will reset all the meta
    setMeta(nextMeta.destroy ? genEmptyMeta() : nextMeta, true);
    // Bump to parent since noStyle
    if (noStyle && notifyParentMetaChange) {
      var namePath = nextMeta.name;
      if (!nextMeta.destroy) {
        if (keyInfo !== undefined) {
          var _keyInfo = _slicedToArray(keyInfo, 2),
            fieldKey = _keyInfo[0],
            restPath = _keyInfo[1];
          namePath = [fieldKey].concat(_toConsumableArray(restPath));
          fieldKeyPathRef.current = namePath;
        }
      } else {
        // Use origin cache data
        namePath = fieldKeyPathRef.current || namePath;
      }
      notifyParentMetaChange(nextMeta, namePath);
    }
  };
  // >>>>> Collect noStyle Field error to the top FormItem
  var onSubItemMetaChange = function onSubItemMetaChange(subMeta, uniqueKeys) {
    // Only `noStyle` sub item will trigger
    setSubFieldErrors(function (prevSubFieldErrors) {
      var clone = _extends({}, prevSubFieldErrors);
      // name: ['user', 1] + key: [4] = ['user', 4]
      var mergedNamePath = [].concat(_toConsumableArray(subMeta.name.slice(0, -1)), _toConsumableArray(uniqueKeys));
      var mergedNameKey = mergedNamePath.join(NAME_SPLIT);
      if (subMeta.destroy) {
        // Remove
        delete clone[mergedNameKey];
      } else {
        // Update
        clone[mergedNameKey] = subMeta;
      }
      return clone;
    });
  };
  // >>>>> Get merged errors
  var _React$useMemo = React.useMemo(function () {
      var errorList = _toConsumableArray(meta.errors);
      var warningList = _toConsumableArray(meta.warnings);
      Object.values(subFieldErrors).forEach(function (subFieldError) {
        errorList.push.apply(errorList, _toConsumableArray(subFieldError.errors || []));
        warningList.push.apply(warningList, _toConsumableArray(subFieldError.warnings || []));
      });
      return [errorList, warningList];
    }, [subFieldErrors, meta.errors, meta.warnings]),
    _React$useMemo2 = _slicedToArray(_React$useMemo, 2),
    mergedErrors = _React$useMemo2[0],
    mergedWarnings = _React$useMemo2[1];
  // ===================== Children Ref =====================
  var getItemRef = useItemRef();
  // ======================== Render ========================
  function renderLayout(baseChildren, fieldId, isRequired) {
    if (noStyle && !hidden) {
      return baseChildren;
    }
    return /*#__PURE__*/React.createElement(ItemHolder, _extends({
      key: "row"
    }, props, {
      prefixCls: prefixCls,
      fieldId: fieldId,
      isRequired: isRequired,
      errors: mergedErrors,
      warnings: mergedWarnings,
      meta: meta,
      onSubItemMetaChange: onSubItemMetaChange
    }), baseChildren);
  }
  if (!hasName && !isRenderProps && !dependencies) {
    return renderLayout(children);
  }
  var variables = {};
  if (typeof label === 'string') {
    variables.label = label;
  } else if (name) {
    variables.label = String(name);
  }
  if (messageVariables) {
    variables = _extends(_extends({}, variables), messageVariables);
  }
  // >>>>> With Field
  return /*#__PURE__*/React.createElement(Field, _extends({}, props, {
    messageVariables: variables,
    trigger: trigger,
    validateTrigger: mergedValidateTrigger,
    onMetaChange: onMetaChange
  }), function (control, renderMeta, context) {
    var mergedName = toArray(name).length && renderMeta ? renderMeta.name : [];
    var fieldId = getFieldId(mergedName, formName);
    var isRequired = required !== undefined ? required : !!(rules && rules.some(function (rule) {
      if (rule && _typeof(rule) === 'object' && rule.required && !rule.warningOnly) {
        return true;
      }
      if (typeof rule === 'function') {
        var ruleEntity = rule(context);
        return ruleEntity && ruleEntity.required && !ruleEntity.warningOnly;
      }
      return false;
    }));
    // ======================= Children =======================
    var mergedControl = _extends({}, control);
    var childNode = null;
    process.env.NODE_ENV !== "production" ? warning(!(shouldUpdate && dependencies), 'Form.Item', "`shouldUpdate` and `dependencies` shouldn't be used together. See https://u.ant.design/form-deps.") : void 0;
    if (Array.isArray(children) && hasName) {
      process.env.NODE_ENV !== "production" ? warning(false, 'Form.Item', 'A `Form.Item` with a `name` prop must have a single child element. For information on how to render more complex form items, see https://u.ant.design/complex-form-item.') : void 0;
      childNode = children;
    } else if (isRenderProps && (!(shouldUpdate || dependencies) || hasName)) {
      process.env.NODE_ENV !== "production" ? warning(!!(shouldUpdate || dependencies), 'Form.Item', 'A `Form.Item` with a render function must have either `shouldUpdate` or `dependencies`.') : void 0;
      process.env.NODE_ENV !== "production" ? warning(!hasName, 'Form.Item', 'A `Form.Item` with a render function cannot be a field, and thus cannot have a `name` prop.') : void 0;
    } else if (dependencies && !isRenderProps && !hasName) {
      process.env.NODE_ENV !== "production" ? warning(false, 'Form.Item', 'Must set `name` or use a render function when `dependencies` is set.') : void 0;
    } else if (isValidElement(children)) {
      process.env.NODE_ENV !== "production" ? warning(children.props.defaultValue === undefined, 'Form.Item', '`defaultValue` will not work on controlled Field. You should use `initialValues` of Form instead.') : void 0;
      var childProps = _extends(_extends({}, children.props), mergedControl);
      if (!childProps.id) {
        childProps.id = fieldId;
      }
      if (props.help || mergedErrors.length > 0 || mergedWarnings.length > 0 || props.extra) {
        var describedbyArr = [];
        if (props.help || mergedErrors.length > 0) {
          describedbyArr.push("".concat(fieldId, "_help"));
        }
        if (props.extra) {
          describedbyArr.push("".concat(fieldId, "_extra"));
        }
        childProps['aria-describedby'] = describedbyArr.join(' ');
      }
      if (mergedErrors.length > 0) {
        childProps['aria-invalid'] = 'true';
      }
      if (isRequired) {
        childProps['aria-required'] = 'true';
      }
      if (supportRef(children)) {
        childProps.ref = getItemRef(mergedName, children);
      }
      // We should keep user origin event handler
      var triggers = new Set([].concat(_toConsumableArray(toArray(trigger)), _toConsumableArray(toArray(mergedValidateTrigger))));
      triggers.forEach(function (eventName) {
        childProps[eventName] = function () {
          var _a2, _c2;
          var _a, _b, _c;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          (_a = mergedControl[eventName]) === null || _a === void 0 ? void 0 : (_a2 = _a).call.apply(_a2, [mergedControl].concat(args));
          (_c = (_b = children.props)[eventName]) === null || _c === void 0 ? void 0 : (_c2 = _c).call.apply(_c2, [_b].concat(args));
        };
      });
      // List of props that need to be watched for changes -> if changes are detected in MemoInput -> rerender
      var watchingChildProps = [childProps['aria-required'], childProps['aria-invalid'], childProps['aria-describedby']];
      childNode = /*#__PURE__*/React.createElement(MemoInput, {
        value: mergedControl[props.valuePropName || 'value'],
        update: children,
        childProps: watchingChildProps
      }, cloneElement(children, childProps));
    } else if (isRenderProps && (shouldUpdate || dependencies) && !hasName) {
      childNode = children(context);
    } else {
      process.env.NODE_ENV !== "production" ? warning(!mergedName.length, 'Form.Item', '`name` is only used for validate React element. If you are using Form.Item as layout display, please remove `name` instead.') : void 0;
      childNode = children;
    }
    return renderLayout(childNode, fieldId, isRequired);
  });
}
var FormItem = InternalFormItem;
FormItem.useStatus = useFormItemStatus;
export default FormItem;