import React from 'react';
import type { ViewStyle } from 'react-native';
import type { CocoaPosition } from './types';
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
export declare function Toaster({ position, maxToasts, containerStyle, }: ToasterProps): React.JSX.Element;
//# sourceMappingURL=Toaster.d.ts.map