// ─── Store ────────────────────────────────────────────────────────────────────

let toasts = [];
const listeners = new Set();
let counter = 0;
function genId() {
  return `cocoa-${Date.now()}-${++counter}`;
}
function emit() {
  const snapshot = [...toasts];
  listeners.forEach(l => l(snapshot));
}

/** Add or replace a toast */
function addToast(options, type) {
  const id = options.id ?? genId();

  // If a toast with this id already exists (e.g. promise reuse), replace it
  toasts = toasts.filter(t => t.id !== id);
  const item = {
    ...options,
    id,
    type,
    createdAt: Date.now(),
    visible: true,
    duration: options.duration === undefined ? 6000 : options.duration
  };
  toasts = [...toasts, item];
  emit();
  return id;
}

/** Mark a toast as invisible (triggers exit animation), then remove it */
function dismiss(id) {
  const exists = toasts.find(t => t.id === id);
  if (!exists) return;
  toasts = toasts.map(t => t.id === id ? {
    ...t,
    visible: false
  } : t);
  emit();

  // Remove from memory after exit animation (~350ms)
  setTimeout(() => {
    toasts = toasts.filter(t => t.id !== id);
    emit();
  }, 400);
}

/** Dismiss all toasts, or only those at a specific position */
function clear(position) {
  const targets = position ? toasts.filter(t => (t.position ?? 'top-right') === position) : [...toasts];
  targets.forEach(t => dismiss(t.id));
}

/** Subscribe to store changes. Returns an unsubscribe function. */
function subscribe(listener) {
  listeners.add(listener);
  // Immediately emit current state to new subscribers
  listener([...toasts]);
  return () => {
    listeners.delete(listener);
  };
}
function getToasts() {
  return [...toasts];
}
export const store = {
  subscribe,
  dismiss,
  clear,
  addToast,
  getToasts
};
//# sourceMappingURL=store.js.map