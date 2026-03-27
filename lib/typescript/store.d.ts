import type { CocoaOptions, CocoaPosition, ToastItem, ToastType } from './types';
type Listener = (toasts: ToastItem[]) => void;
/** Add or replace a toast */
declare function addToast(options: CocoaOptions, type: ToastType): string;
/** Mark a toast as invisible (triggers exit animation), then remove it */
declare function dismiss(id: string): void;
/** Dismiss all toasts, or only those at a specific position */
declare function clear(position?: CocoaPosition): void;
/** Subscribe to store changes. Returns an unsubscribe function. */
declare function subscribe(listener: Listener): () => void;
declare function getToasts(): ToastItem[];
export declare const store: {
    subscribe: typeof subscribe;
    dismiss: typeof dismiss;
    clear: typeof clear;
    addToast: typeof addToast;
    getToasts: typeof getToasts;
};
export {};
//# sourceMappingURL=store.d.ts.map