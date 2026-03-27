"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toast = Toast;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _icons = require("./icons");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// ─── Helpers ──────────────────────────────────────────────────────────────────

function DefaultIcon({
  type,
  color
}) {
  switch (type) {
    case 'success':
      return /*#__PURE__*/_react.default.createElement(_icons.CheckIcon, {
        color: color
      });
    case 'error':
      return /*#__PURE__*/_react.default.createElement(_icons.ErrorIcon, {
        color: color
      });
    case 'warning':
      return /*#__PURE__*/_react.default.createElement(_icons.WarningIcon, {
        color: color
      });
    case 'info':
      return /*#__PURE__*/_react.default.createElement(_icons.InfoIcon, {
        color: color
      });
    case 'loading':
      return /*#__PURE__*/_react.default.createElement(_icons.LoadingIcon, {
        color: color
      });
    default:
      return /*#__PURE__*/_react.default.createElement(_icons.CheckIcon, {
        color: color
      });
  }
}

// ─── Spring entry / exit hook ─────────────────────────────────────────────────

function useSpringTransition(visible) {
  const opacity = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const translateY = (0, _react.useRef)(new _reactNative.Animated.Value(-16)).current;
  const scale = (0, _react.useRef)(new _reactNative.Animated.Value(0.92)).current;
  (0, _react.useEffect)(() => {
    if (visible) {
      // Spring entry — slightly overshoots then settles (mimics gooey morphing)
      _reactNative.Animated.parallel([_reactNative.Animated.spring(opacity, {
        toValue: 1,
        damping: 20,
        stiffness: 300,
        mass: 1,
        useNativeDriver: true
      }), _reactNative.Animated.spring(translateY, {
        toValue: 0,
        damping: 20,
        stiffness: 300,
        mass: 1,
        useNativeDriver: true
      }), _reactNative.Animated.spring(scale, {
        toValue: 1,
        damping: 20,
        stiffness: 300,
        mass: 1,
        useNativeDriver: true
      })]).start();
    } else {
      // Smooth exit
      _reactNative.Animated.parallel([_reactNative.Animated.timing(opacity, {
        toValue: 0,
        duration: 280,
        useNativeDriver: true
      }), _reactNative.Animated.timing(translateY, {
        toValue: -10,
        duration: 280,
        useNativeDriver: true
      }), _reactNative.Animated.timing(scale, {
        toValue: 0.94,
        duration: 280,
        useNativeDriver: true
      })]).start();
    }
  }, [visible, opacity, translateY, scale]);
  return {
    opacity,
    translateY,
    scale
  };
}

// ─── Toast component ──────────────────────────────────────────────────────────

function Toast({
  toast,
  onDismiss
}) {
  const {
    opacity,
    translateY,
    scale
  } = useSpringTransition(toast.visible);
  const timerRef = (0, _react.useRef)(null);

  // Auto-dismiss timer
  (0, _react.useEffect)(() => {
    if (toast.visible && toast.duration !== null && toast.duration !== undefined && toast.duration > 0) {
      timerRef.current = setTimeout(() => {
        onDismiss(toast.id);
      }, toast.duration);
    }
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, [toast.duration, toast.id, toast.visible, onDismiss]);
  const roundness = toast.roundness ?? 16;
  const fill = toast.fill ?? '#FFFFFF';
  const borderColorMap = {
    success: '#22C55E33',
    error: '#EF444433',
    warning: '#F59E0B33',
    info: '#3B82F633',
    loading: '#6B728033',
    default: '#6B728033'
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: [styles.container, {
      opacity,
      backgroundColor: fill,
      borderRadius: roundness,
      borderColor: borderColorMap[toast.type],
      transform: [{
        translateY
      }, {
        scale
      }]
    }, toast.styles?.container],
    accessibilityRole: "alert",
    accessibilityLiveRegion: "polite"
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.badge, toast.styles?.badge]
  }, toast.icon ?? /*#__PURE__*/_react.default.createElement(DefaultIcon, {
    type: toast.type,
    color: toast.colorIcon
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.content
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.title, toast.styles?.title],
    numberOfLines: 2,
    ellipsizeMode: "tail"
  }, toast.title), toast.description ? /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.description, toast.styles?.description],
    numberOfLines: 3,
    ellipsizeMode: "tail"
  }, toast.description) : null), toast.button ? /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: [styles.actionButton, toast.styles?.button],
    onPress: () => {
      toast.button?.onPress();
      onDismiss(toast.id);
    },
    activeOpacity: 0.7,
    accessibilityRole: "button",
    accessibilityLabel: toast.button.title
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.actionButtonText, toast.styles?.buttonText]
  }, toast.button.title)) : null);
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = _reactNative.StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    maxWidth: 420,
    width: '100%',
    ..._reactNative.Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 4
        },
        shadowOpacity: 0.08,
        shadowRadius: 14
      },
      android: {
        elevation: 4
      }
    })
  },
  badge: {
    marginRight: 10,
    flexShrink: 0
  },
  content: {
    flex: 1,
    marginRight: 6
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    letterSpacing: -0.1,
    lineHeight: 20
  },
  description: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
    lineHeight: 18
  },
  actionButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 8,
    flexShrink: 0
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151'
  }
});
//# sourceMappingURL=Toast.js.map