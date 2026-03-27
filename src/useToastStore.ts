import { useEffect, useState } from 'react';
import { store } from './store';
import type { ToastItem } from './types';

/**
 * Internal hook — subscribes a component to the toast store.
 * Re-renders whenever the store emits (toast added, removed, or visibility changed).
 */
export function useToastStore(): ToastItem[] {
  const [toasts, setToasts] = useState<ToastItem[]>(() => store.getToasts());

  useEffect(() => {
    const unsubscribe = store.subscribe((all) => {
      setToasts(all);
    });
    return unsubscribe;
  }, []);

  return toasts;
}
