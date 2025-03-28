"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ta_IN = _interopRequireDefault(require("rc-pagination/lib/locale/ta_IN"));
var _ta_IN2 = _interopRequireDefault(require("../calendar/locale/ta_IN"));
var _ta_IN3 = _interopRequireDefault(require("../date-picker/locale/ta_IN"));
var _ta_IN4 = _interopRequireDefault(require("../time-picker/locale/ta_IN"));
var localeValues = {
  locale: 'ta',
  Pagination: _ta_IN["default"],
  DatePicker: _ta_IN3["default"],
  TimePicker: _ta_IN4["default"],
  Calendar: _ta_IN2["default"],
  // locales for all comoponents
  global: {
    placeholder: 'தேதியைத் தேர்ந்தெடுக்கவும்'
  },
  Table: {
    filterTitle: 'பட்டியலை மூடு',
    filterConfirm: 'சரி',
    filterReset: 'மீட்டமை',
    emptyText: 'தகவல் இல்லை',
    selectAll: 'அனைத்தையும் தேர்வுசெய்',
    selectInvert: 'தலைகீழாக மாற்று',
    sortTitle: 'தலைப்பை வரிசைப்படுத்தவும்'
  },
  Modal: {
    okText: 'சரி',
    cancelText: 'ரத்து செய்யவும்',
    justOkText: 'பரவாயில்லை, சரி'
  },
  Popconfirm: {
    okText: 'சரி',
    cancelText: 'ரத்து செய்யவும்'
  },
  Transfer: {
    titles: ['', ''],
    notFoundContent: 'உள்ளடக்கம் கிடைக்கவில்லை',
    searchPlaceholder: 'இங்கு தேடவும்',
    itemUnit: 'தகவல்',
    itemsUnit: 'தகவல்கள்'
  },
  Upload: {
    uploading: 'பதிவேற்றுகிறது...',
    removeFile: 'கோப்பை அகற்று',
    uploadError: 'பதிவேற்றுவதில் பிழை',
    previewFile: 'கோப்பை முன்னோட்டமிடுங்கள்',
    downloadFile: 'பதிவிறக்க கோப்பு'
  },
  Empty: {
    description: 'தகவல் இல்லை'
  },
  Icon: {
    icon: 'உருவம்'
  },
  Text: {
    edit: 'திருத்து',
    copy: 'நகல் எடு',
    copied: 'நகல் எடுக்கப்பட்டது',
    expand: 'விரிவாக்கவும்'
  },
  PageHeader: {
    back: 'பின் செல்லவும்'
  }
};
var _default = exports["default"] = localeValues;