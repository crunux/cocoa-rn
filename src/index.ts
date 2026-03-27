// ─── Main API ─────────────────────────────────────────────────────────────────
export { cocoa } from './cocoa';

// ─── Components ───────────────────────────────────────────────────────────────
export { Toaster } from './Toaster';
export type { ToasterProps } from './Toaster';

export { Toast } from './Toast';
export type { ToastProps } from './Toast';

// ─── Types ────────────────────────────────────────────────────────────────────
export type {
  CocoaOptions,
  CocoaPosition,
  CocoaButton,
  CocoaStyles,
  CocoaPromiseOptions,
  ToastItem,
  ToastType,
} from './types';

// ─── Internals (advanced use) ─────────────────────────────────────────────────
export { store } from './store';
export { useToastStore } from './useToastStore';
