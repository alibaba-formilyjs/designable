"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _bg_BG = _interopRequireDefault(require("rc-pagination/lib/locale/bg_BG"));
var _bg_BG2 = _interopRequireDefault(require("../calendar/locale/bg_BG"));
var _bg_BG3 = _interopRequireDefault(require("../date-picker/locale/bg_BG"));
var _bg_BG4 = _interopRequireDefault(require("../time-picker/locale/bg_BG"));
var localeValues = {
  locale: 'bg',
  Pagination: _bg_BG["default"],
  DatePicker: _bg_BG3["default"],
  TimePicker: _bg_BG4["default"],
  Calendar: _bg_BG2["default"],
  Table: {
    filterTitle: 'Филтриране',
    filterConfirm: 'Добре',
    filterReset: 'Нулриане',
    selectAll: 'Избор на текуща страница',
    selectInvert: 'Обръщане'
  },
  Modal: {
    okText: 'Добре',
    cancelText: 'Отказ',
    justOkText: 'Добре'
  },
  Popconfirm: {
    okText: 'Добре',
    cancelText: 'Отказ'
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Търсене',
    itemUnit: 'избор',
    itemsUnit: 'избори'
  },
  Upload: {
    uploading: 'Качване...',
    removeFile: 'Премахване',
    uploadError: 'Грешка при качването',
    previewFile: 'Преглед',
    downloadFile: 'Свали файл'
  },
  Empty: {
    description: 'Няма данни'
  }
};
var _default = exports["default"] = localeValues;