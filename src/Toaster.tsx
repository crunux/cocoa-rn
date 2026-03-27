import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import type { ViewStyle } from 'react-native';
import { store } from './store';
import { Toast } from './Toast';
import { useToastStore } from './useToastStore';
import type { CocoaPosition, ToastItem } from './types';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ToasterProps {
  /**
   * Default position for all toasts. Individual toasts can override this.
   * @default 'top-right'
   */
  position?: CocoaPosition;
  /**
   * Maximum number of toasts visible at the same time.
   * Oldest toasts are removed first when the limit is exceeded.
   * @default 3
   */
  maxToasts?: number;
  /**
   * Style overrides for the Toaster's absolute wrapper View.
   */
  containerStyle?: ViewStyle;
}

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
export function Toaster({
  position = 'top-right',
  maxToasts = 3,
  containerStyle,
}: ToasterProps) {
  const allToasts = useToastStore();

  // Assign default position and filter to only this Toaster's position
  const toastsForPosition: ToastItem[] = allToasts
    .map((t) => ({ ...t, position: t.position ?? position }))
    .filter((t) => t.position === position)
    .slice(-maxToasts); // keep only the most recent N

  const handleDismiss = useCallback((id: string) => {
    store.dismiss(id);
  }, []);

  const positionStyle = resolvePositionStyle(position);
  const isBottom = position.startsWith('bottom');

  return (
    <View
      style={[styles.wrapper, positionStyle, containerStyle]}
      pointerEvents="box-none"
    >
      <View
        style={[
          styles.stack,
          isBottom ? styles.stackBottom : styles.stackTop,
        ]}
        pointerEvents="box-none"
      >
        {toastsForPosition.map((toast) => (
          <View key={toast.id} style={styles.toastRow}>
            <Toast toast={toast} onDismiss={handleDismiss} />
          </View>
        ))}
      </View>
    </View>
  );
}

// ─── Position resolver ────────────────────────────────────────────────────────

function resolvePositionStyle(position: CocoaPosition): ViewStyle {
  const isTop = position.startsWith('top');
  const isLeft = position.endsWith('left');
  const isRight = position.endsWith('right');
  const isCenter = position.endsWith('center');

  return {
    top: isTop ? 0 : undefined,
    bottom: !isTop ? 0 : undefined,
    left: isLeft || isCenter ? 0 : undefined,
    right: isRight || isCenter ? 0 : undefined,
    alignItems: isLeft ? 'flex-start' : isRight ? 'flex-end' : 'center',
  };
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    zIndex: 9999,
    elevation: 9999,
    width: '100%',
    pointerEvents: 'box-none',
  },
  stack: {
    width: '100%',
    paddingHorizontal: 16,
    pointerEvents: 'box-none',
  },
  stackTop: {
    flexDirection: 'column',
    paddingTop: 56, // leave room for status bar; use SafeAreaView for production
    paddingBottom: 0,
  },
  stackBottom: {
    flexDirection: 'column-reverse',
    paddingTop: 0,
    paddingBottom: 32,
  },
  toastRow: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 4,
  },
});
