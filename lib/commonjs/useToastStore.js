"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useToastStore = useToastStore;
var _react = require("react");
var _store = require("./store");
/**
 * Internal hook — subscribes a component to the toast store.
 * Re-renders whenever the store emits (toast added, removed, or visibility changed).
 */
function useToastStore() {
  const [toasts, setToasts] = (0, _react.useState)(() => _store.store.getToasts());
  (0, _react.useEffect)(() => {
    const unsubscribe = _store.store.subscribe(all => {
      setToasts(all);
    });
    return unsubscribe;
  }, []);
  return toasts;
}
//# sourceMappingURL=useToastStore.js.map