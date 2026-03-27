import React from 'react';
import type { ToastItem } from './types';
export interface ToastProps {
    toast: ToastItem;
    onDismiss: (id: string) => void;
}
export declare function Toast({ toast, onDismiss }: ToastProps): React.JSX.Element;
//# sourceMappingURL=Toast.d.ts.map