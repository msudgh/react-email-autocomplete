(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', './constants'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('./constants'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.constants);
    global.index = mod.exports;
  }
})(this, function (exports, _react, _constants) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Email = function (_Component) {
    _inherits(Email, _Component);

    function Email(props) {
      _classCallCheck(this, Email);

      var _this = _possibleConstructorReturn(this, (Email.__proto__ || Object.getPrototypeOf(Email)).call(this, props));

      var updatedEmailServicesList = _constants.emailServicesDomains;
      Array.prototype.push.apply(updatedEmailServicesList, props.domains && Array.isArray(props.domains) ? props.domains : []);

      _this.state = {
        placeholder: props.placeholder,
        class: props.className,
        value: '',
        domains: updatedEmailServicesList,
        suggestion: ''
      };

      _this.handleChange = _this.handleChange.bind(_this);
      _this.getSuggest = _this.getSuggest.bind(_this);
      return _this;
    }

    _createClass(Email, [{
      key: 'handleChange',
      value: function handleChange(event) {
        var _this2 = this;

        // Catch value of the input box by every change
        var emailAddress = event.target.value;
        var suggest = this.suggest(emailAddress);

        if (typeof suggest === 'undefined' || suggest.length < 1) {
          // Set value and suggestion state by every change
          this.setState({ value: emailAddress, suggestion: suggest }, function () {
            return _this2.selectText();
          });
          event.target.value = emailAddress;
        } else {
          var updatedEmailAddr = '' + emailAddress + suggest;

          // Update value state plus suggested text
          this.setState({ value: updatedEmailAddr, suggestion: suggest }, function () {
            return _this2.selectText();
          });
          event.target.value = emailAddress + suggest;
        }

        if (this.props.onChange) {
          this.props.onChange(event);
        }
      }
    }, {
      key: 'selectText',
      value: function selectText() {
        if (typeof this.state.suggestion === 'undefined' || this.state.suggestion.length < 1) {
          return false;
        } else {
          var startPos = this.state.value.indexOf(this.state.suggestion);
          var endPos = startPos + this.state.suggestion.length;
          this.textHandler.setSelectionRange(startPos, endPos);
        }
      }
    }, {
      key: 'getSuggest',
      value: function getSuggest(event) {
        if (_constants.protectedKeyCodes.indexOf(event.keyCode) >= 0) {
          return;
        }
        if (event.keyCode === 8) {
          this.setState({ value: event.target.value.replace(this.state.suggestion, '') });
        }
      }
    }, {
      key: 'suggest',
      value: function suggest(string) {
        // Shim indexOf
        // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Polyfill
        if (!Array.prototype.indexOf) {
          this.doIndexOf();
        }

        var str_arr = string.split('@');
        if (str_arr.length > 1) {
          string = str_arr.pop();
          if (!string.length) {
            return;
          }
        } else {
          return;
        }

        var match = this.state.domains.filter(function (domain) {
          return 0 === domain.indexOf(string);
        }).shift() || '';

        return match.replace(string, '');
      }
    }, {
      key: 'doIndexOf',
      value: function doIndexOf() {
        Array.prototype.indexOf = function (searchElement, fromIndex) {
          if (this === undefined || this === null) {
            throw new TypeError('"this" is null or not defined');
          }

          var length = this.length >>> 0; // Hack to convert object.length to a UInt32
          fromIndex = +fromIndex || 0;

          if (Math.abs(fromIndex) === Infinity) {
            fromIndex = 0;
          }

          if (fromIndex < 0) {
            fromIndex += length;
            if (fromIndex < 0) {
              fromIndex = 0;
            }
          }

          for (; fromIndex < length; fromIndex++) {
            if (this[fromIndex] === searchElement) {
              return fromIndex;
            }
          }

          return -1;
        };
      }
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;

        return _react2.default.createElement(
          'div',
          { className: 'eac-wrapper' },
          _react2.default.createElement('input', { autoCapitalize: 'none', type: 'text', inputMode: 'email', id: 'eac-input', name: this.props.name, placeholder: this.state.placeholder, onBlur: this.props.onBlur, className: this.state.class, value: this.state.value, onChange: this.handleChange, onKeyUp: this.getSuggest, ref: function ref(input) {
              _this3.textHandler = input;
            } })
        );
      }
    }]);

    return Email;
  }(_react.Component);

  exports.default = Email;
});