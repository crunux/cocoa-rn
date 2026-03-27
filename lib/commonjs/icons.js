"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckIcon = CheckIcon;
exports.ErrorIcon = ErrorIcon;
exports.InfoIcon = InfoIcon;
exports.LoadingIcon = LoadingIcon;
exports.WarningIcon = WarningIcon;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// ─── Check (success) ──────────────────────────────────────────────────────────

function CheckIcon({
  color
}) {
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.circle, {
      backgroundColor: color || '#22C55E'
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.symbol
  }, "\u2713"));
}

// ─── Cross (error) ────────────────────────────────────────────────────────────

function ErrorIcon({
  color
}) {
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.circle, {
      backgroundColor: color || '#EF4444'
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.symbol
  }, "\u2715"));
}

// ─── Exclamation (warning) ────────────────────────────────────────────────────

function WarningIcon({
  color
}) {
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.circle, {
      backgroundColor: color || '#F59E0B'
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.symbol
  }, "!"));
}

// ─── Letter i (info) ─────────────────────────────────────────────────────────

function InfoIcon({
  color
}) {
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.circle, {
      backgroundColor: color || '#3B82F6'
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.symbol
  }, "i"));
}

// ─── Spinner (loading) ────────────────────────────────────────────────────────

function LoadingIcon({
  color
}) {
  const rotation = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  (0, _react.useEffect)(() => {
    const animation = _reactNative.Animated.loop(_reactNative.Animated.timing(rotation, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true
    }));
    animation.start();
    return () => animation.stop();
  }, [rotation]);
  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: [styles.spinner, {
      transform: [{
        rotate
      }],
      backgroundColor: color || '#3B82F6'
    }]
  });
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = _reactNative.StyleSheet.create({
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center'
  },
  symbol: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    includeFontPadding: false,
    textAlignVertical: 'center'
  },
  spinner: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2.5,
    borderColor: '#D1D5DB',
    borderTopColor: '#374151'
  }
});
//# sourceMappingURL=icons.js.map