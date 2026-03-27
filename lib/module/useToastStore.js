import { useEffect, useState } from 'react';
import { store } from './store';
/**
 * Internal hook — subscribes a component to the toast store.
 * Re-renders whenever the store emits (toast added, removed, or visibility changed).
 */
export function useToastStore() {
  const [toasts, setToasts] = useState(() => store.getToasts());
  useEffect(() => {
    const unsubscribe = store.subscribe(all => {
      setToasts(all);
    });
    return unsubscribe;
  }, []);
  return toasts;
}
//# sourceMappingURL=useToastStore.js.map