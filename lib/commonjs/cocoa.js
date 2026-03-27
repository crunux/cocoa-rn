"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cocoa = void 0;
var _store = require("./store");
/**
 * cocoa — Global toast controller for React Native.
 *
 * Mirrors the web Cocoa API exactly.
 * The only breaking difference: `button.onClick` → `button.onPress`.
 *
 * @example
 * cocoa.success({ title: 'File saved!' });
 *
 * @example
 * cocoa.promise(uploadFile(data), {
 *   loading: { title: 'Uploading...' },
 *   success: (r) => ({ title: `Done! ${r.name}` }),
 *   error:   (e) => ({ title: 'Upload failed', description: e.message }),
 * });
 */
const cocoa = exports.cocoa = {
  // ─── Shortcut methods ──────────────────────────────────────────────────────

  /** Show a green success toast. Returns the toast id. */
  success(options) {
    return _store.store.addToast(options, 'success');
  },
  /** Show a red error toast. Returns the toast id. */
  error(options) {
    return _store.store.addToast(options, 'error');
  },
  /** Show an amber warning toast. Returns the toast id. */
  warning(options) {
    return _store.store.addToast(options, 'warning');
  },
  /** Show a blue info toast. Returns the toast id. */
  info(options) {
    return _store.store.addToast(options, 'info');
  },
  /** Show a toast with an action button. Returns the toast id. */
  action(options) {
    return _store.store.addToast(options, 'default');
  },
  /** Show a generic toast (defaults to success style). Returns the toast id. */
  show(options) {
    return _store.store.addToast(options, 'success');
  },
  // ─── Promise ───────────────────────────────────────────────────────────────

  /**
   * Chain loading → success / error states from a single Promise.
   * Returns the original promise so you can continue chaining.
   *
   * @example
   * const user = await cocoa.promise(createUser(data), {
   *   loading: { title: 'Creating account...' },
   *   success: (u) => ({ title: `Welcome, ${u.name}!` }),
   *   error:   (e) => ({ title: 'Signup failed', description: e.message }),
   * });
   */
  async promise(promise, opts) {
    const position = opts.position ?? opts.loading.position;

    // Show loading toast (sticky, so it doesn't auto-dismiss)
    const id = _store.store.addToast({
      ...opts.loading,
      position,
      duration: null
    }, 'loading');
    try {
      const data = await promise;
      if (opts.action) {
        const actionOpts = typeof opts.action === 'function' ? opts.action(data) : opts.action;
        _store.store.addToast({
          ...actionOpts,
          id,
          position
        }, 'default');
      } else {
        const successOpts = typeof opts.success === 'function' ? opts.success(data) : opts.success;
        _store.store.addToast({
          ...successOpts,
          id,
          position
        }, 'success');
      }
      return data;
    } catch (err) {
      const errorOpts = typeof opts.error === 'function' ? opts.error(err) : opts.error;
      _store.store.addToast({
        ...errorOpts,
        id,
        position
      }, 'error');
      throw err;
    }
  },
  // ─── Dismiss / clear ───────────────────────────────────────────────────────

  /** Dismiss a specific toast by id. */
  dismiss(id) {
    _store.store.dismiss(id);
  },
  /** Clear all toasts, or only those at a specific position. */
  clear(position) {
    _store.store.clear(position);
  }
};
//# sourceMappingURL=cocoa.js.map