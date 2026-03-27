import type { CocoaOptions, CocoaPosition, CocoaPromiseOptions } from './types';
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
export declare const cocoa: {
    /** Show a green success toast. Returns the toast id. */
    success(options: CocoaOptions): string;
    /** Show a red error toast. Returns the toast id. */
    error(options: CocoaOptions): string;
    /** Show an amber warning toast. Returns the toast id. */
    warning(options: CocoaOptions): string;
    /** Show a blue info toast. Returns the toast id. */
    info(options: CocoaOptions): string;
    /** Show a toast with an action button. Returns the toast id. */
    action(options: CocoaOptions): string;
    /** Show a generic toast (defaults to success style). Returns the toast id. */
    show(options: CocoaOptions): string;
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
    promise<T>(promise: Promise<T>, opts: CocoaPromiseOptions<T>): Promise<T>;
    /** Dismiss a specific toast by id. */
    dismiss(id: string): void;
    /** Clear all toasts, or only those at a specific position. */
    clear(position?: CocoaPosition): void;
};
//# sourceMappingURL=cocoa.d.ts.map