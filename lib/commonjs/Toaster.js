"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toaster = Toaster;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _store = require("./store");
var _Toast = require("./Toast");
var _useToastStore = require("./useToastStore");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// ─── Types ────────────────────────────────────────────────────────────────────

// ─── Toaster ──────────────────────────────────────────────────────────────────

/**
 * `<Toaster />` — mount this once at the root of your app.
 * It renders all active toasts with spring physics animations.
 *
 * @example
 * // App.tsx
 * import { Toaster } from 'cocoa-rn';
 *
 * export default function App() {
 *   return (
 *     <View style={{ flex: 1 }}>
 *       <NavigationContainer>
 *         <RootNavigator />
 *       </NavigationContainer>
 *       <Toaster position="top-right" />
 *     </View>
 *   );
 * }
 */
function Toaster({
  position = 'top-right',
  maxToasts = 3,
  containerStyle
}) {
  const allToasts = (0, _useToastStore.useToastStore)();

  // Assign default position and filter to only this Toaster's position
  const toastsForPosition = allToasts.map(t => ({
    ...t,
    position: t.position ?? position
  })).filter(t => t.position === position).slice(-maxToasts); // keep only the most recent N

  const handleDismiss = (0, _react.useCallback)(id => {
    _store.store.dismiss(id);
  }, []);
  const positionStyle = resolvePositionStyle(position);
  const isBottom = position.startsWith('bottom');
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.wrapper, positionStyle, containerStyle],
    pointerEvents: "box-none"
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.stack, isBottom ? styles.stackBottom : styles.stackTop],
    pointerEvents: "box-none"
  }, toastsForPosition.map(toast => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    key: toast.id,
    style: styles.toastRow
  }, /*#__PURE__*/_react.default.createElement(_Toast.Toast, {
    toast: toast,
    onDismiss: handleDismiss
  })))));
}

// ─── Position resolver ────────────────────────────────────────────────────────

function resolvePositionStyle(position) {
  const isTop = position.startsWith('top');
  const isLeft = position.endsWith('left');
  const isRight = position.endsWith('right');
  const isCenter = position.endsWith('center');
  return {
    top: isTop ? 0 : undefined,
    bottom: !isTop ? 0 : undefined,
    left: isLeft || isCenter ? 0 : undefined,
    right: isRight || isCenter ? 0 : undefined,
    alignItems: isLeft ? 'flex-start' : isRight ? 'flex-end' : 'center'
  };
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = _reactNative.StyleSheet.create({
  wrapper: {
    position: 'absolute',
    zIndex: 9999,
    elevation: 9999,
    width: '100%',
    pointerEvents: 'box-none'
  },
  stack: {
    width: '100%',
    paddingHorizontal: 16,
    pointerEvents: 'box-none'
  },
  stackTop: {
    flexDirection: 'column',
    paddingTop: 56,
    // leave room for status bar; use SafeAreaView for production
    paddingBottom: 0
  },
  stackBottom: {
    flexDirection: 'column-reverse',
    paddingTop: 0,
    paddingBottom: 32
  },
  toastRow: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 4
  }
});
//# sourceMappingURL=Toaster.js.map