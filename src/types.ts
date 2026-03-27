import type { ReactNode } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';

// ─── Position ────────────────────────────────────────────────────────────────

export type CocoaPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

// ─── Toast type ───────────────────────────────────────────────────────────────

export type ToastType =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'loading'
  | 'default';

// ─── Sub-types ────────────────────────────────────────────────────────────────

export interface CocoaButton {
  /** Button label */
  title: string;
  /** Called when the button is tapped */
  onPress: () => void;
}

export interface CocoaStyles {
  /** Style override for the toast container */
  container?: ViewStyle;
  /** Style override for the title text */
  title?: TextStyle;
  /** Style override for the description text */
  description?: TextStyle;
  /** Style override for the icon badge wrapper */
  badge?: ViewStyle;
  /** Style override for the icon */
  icon?: ViewStyle;
  /** Style override for the action button */
  button?: ViewStyle;
  /** Style override for the action button label */
  buttonText?: TextStyle;
}

// ─── Main options ─────────────────────────────────────────────────────────────

export interface CocoaOptions {
  /** Toast heading (required) */
  title: string;
  /** Optional body text */
  description?: string;
  /** Override position for this individual toast */
  position?: CocoaPosition;
  /**
   * Auto-dismiss delay in milliseconds.
   * Defaults to 6000. Pass `null` for a sticky toast.
   */
  duration?: number | null;
  colorIcon?: string;
  /** Custom icon rendered inside the badge */
  icon?: ReactNode;
  /** Background color of the toast card. Defaults to '#FFFFFF'. */
  fill?: string;
  /** Style overrides for individual sub-elements */
  styles?: CocoaStyles;
  /** Border radius in pixels. Defaults to 16. */
  roundness?: number;
  /** Optional action button */
  button?: CocoaButton;
  /** Internal: used by promise() to reuse the same toast ID across states */
  id?: string;
}

// ─── Promise options ──────────────────────────────────────────────────────────

export interface CocoaPromiseOptions<T = unknown> {
  /** Options shown while the promise is pending */
  loading: CocoaOptions;
  /** Options shown on resolve. Can be a factory that receives the resolved value. */
  success: CocoaOptions | ((data: T) => CocoaOptions);
  /** Options shown on reject. Can be a factory that receives the error. */
  error: CocoaOptions | ((err: unknown) => CocoaOptions);
  /**
   * When provided, replaces the success toast with an action state.
   * Can be a factory that receives the resolved value.
   */
  action?: CocoaOptions | ((data: T) => CocoaOptions);
  /** Default position for all three states */
  position?: CocoaPosition;
}

// ─── Internal toast item ──────────────────────────────────────────────────────

export interface ToastItem extends CocoaOptions {
  id: string;
  type: ToastType;
  createdAt: number;
  visible: boolean;
}
