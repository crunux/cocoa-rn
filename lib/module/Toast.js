import React, { useEffect, useRef } from 'react';
import { Animated, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CheckIcon, ErrorIcon, InfoIcon, LoadingIcon, WarningIcon } from './icons';
// ─── Helpers ──────────────────────────────────────────────────────────────────

function DefaultIcon({
  type,
  color
}) {
  switch (type) {
    case 'success':
      return /*#__PURE__*/React.createElement(CheckIcon, {
        color: color
      });
    case 'error':
      return /*#__PURE__*/React.createElement(ErrorIcon, {
        color: color
      });
    case 'warning':
      return /*#__PURE__*/React.createElement(WarningIcon, {
        color: color
      });
    case 'info':
      return /*#__PURE__*/React.createElement(InfoIcon, {
        color: color
      });
    case 'loading':
      return /*#__PURE__*/React.createElement(LoadingIcon, {
        color: color
      });
    default:
      return /*#__PURE__*/React.createElement(CheckIcon, {
        color: color
      });
  }
}

// ─── Spring entry / exit hook ─────────────────────────────────────────────────

function useSpringTransition(visible) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-16)).current;
  const scale = useRef(new Animated.Value(0.92)).current;
  useEffect(() => {
    if (visible) {
      // Spring entry — slightly overshoots then settles (mimics gooey morphing)
      Animated.parallel([Animated.spring(opacity, {
        toValue: 1,
        damping: 20,
        stiffness: 300,
        mass: 1,
        useNativeDriver: true
      }), Animated.spring(translateY, {
        toValue: 0,
        damping: 20,
        stiffness: 300,
        mass: 1,
        useNativeDriver: true
      }), Animated.spring(scale, {
        toValue: 1,
        damping: 20,
        stiffness: 300,
        mass: 1,
        useNativeDriver: true
      })]).start();
    } else {
      // Smooth exit
      Animated.parallel([Animated.timing(opacity, {
        toValue: 0,
        duration: 280,
        useNativeDriver: true
      }), Animated.timing(translateY, {
        toValue: -10,
        duration: 280,
        useNativeDriver: true
      }), Animated.timing(scale, {
        toValue: 0.94,
        duration: 280,
        useNativeDriver: true
      })]).start();
    }
  }, [visible, opacity, translateY, scale]);
  return {
    opacity,
    translateY,
    scale
  };
}

// ─── Toast component ──────────────────────────────────────────────────────────

export function Toast({
  toast,
  onDismiss
}) {
  const {
    opacity,
    translateY,
    scale
  } = useSpringTransition(toast.visible);
  const timerRef = useRef(null);

  // Auto-dismiss timer
  useEffect(() => {
    if (toast.visible && toast.duration !== null && toast.duration !== undefined && toast.duration > 0) {
      timerRef.current = setTimeout(() => {
        onDismiss(toast.id);
      }, toast.duration);
    }
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, [toast.duration, toast.id, toast.visible, onDismiss]);
  const roundness = toast.roundness ?? 16;
  const fill = toast.fill ?? '#FFFFFF';
  const borderColorMap = {
    success: '#22C55E33',
    error: '#EF444433',
    warning: '#F59E0B33',
    info: '#3B82F633',
    loading: '#6B728033',
    default: '#6B728033'
  };
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: [styles.container, {
      opacity,
      backgroundColor: fill,
      borderRadius: roundness,
      borderColor: borderColorMap[toast.type],
      transform: [{
        translateY
      }, {
        scale
      }]
    }, toast.styles?.container],
    accessibilityRole: "alert",
    accessibilityLiveRegion: "polite"
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.badge, toast.styles?.badge]
  }, toast.icon ?? /*#__PURE__*/React.createElement(DefaultIcon, {
    type: toast.type,
    color: toast.colorIcon
  })), /*#__PURE__*/React.createElement(View, {
    style: styles.content
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.title, toast.styles?.title],
    numberOfLines: 2,
    ellipsizeMode: "tail"
  }, toast.title), toast.description ? /*#__PURE__*/React.createElement(Text, {
    style: [styles.description, toast.styles?.description],
    numberOfLines: 3,
    ellipsizeMode: "tail"
  }, toast.description) : null), toast.button ? /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: [styles.actionButton, toast.styles?.button],
    onPress: () => {
      toast.button?.onPress();
      onDismiss(toast.id);
    },
    activeOpacity: 0.7,
    accessibilityRole: "button",
    accessibilityLabel: toast.button.title
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.actionButtonText, toast.styles?.buttonText]
  }, toast.button.title)) : null);
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    maxWidth: 420,
    width: '100%',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 4
        },
        shadowOpacity: 0.08,
        shadowRadius: 14
      },
      android: {
        elevation: 4
      }
    })
  },
  badge: {
    marginRight: 10,
    flexShrink: 0
  },
  content: {
    flex: 1,
    marginRight: 6
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    letterSpacing: -0.1,
    lineHeight: 20
  },
  description: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
    lineHeight: 18
  },
  actionButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 8,
    flexShrink: 0
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151'
  }
});
//# sourceMappingURL=Toast.js.map