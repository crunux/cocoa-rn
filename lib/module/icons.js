import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, Text } from 'react-native';

// ─── Check (success) ──────────────────────────────────────────────────────────

export function CheckIcon({
  color
}) {
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.circle, {
      backgroundColor: color || '#22C55E'
    }]
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.symbol
  }, "\u2713"));
}

// ─── Cross (error) ────────────────────────────────────────────────────────────

export function ErrorIcon({
  color
}) {
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.circle, {
      backgroundColor: color || '#EF4444'
    }]
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.symbol
  }, "\u2715"));
}

// ─── Exclamation (warning) ────────────────────────────────────────────────────

export function WarningIcon({
  color
}) {
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.circle, {
      backgroundColor: color || '#F59E0B'
    }]
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.symbol
  }, "!"));
}

// ─── Letter i (info) ─────────────────────────────────────────────────────────

export function InfoIcon({
  color
}) {
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.circle, {
      backgroundColor: color || '#3B82F6'
    }]
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.symbol
  }, "i"));
}

// ─── Spinner (loading) ────────────────────────────────────────────────────────

export function LoadingIcon({
  color
}) {
  const rotation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const animation = Animated.loop(Animated.timing(rotation, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true
    }));
    animation.start();
    return () => animation.stop();
  }, [rotation]);
  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: [styles.spinner, {
      transform: [{
        rotate
      }],
      backgroundColor: color || '#3B82F6'
    }]
  });
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center'
  },
  symbol: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    includeFontPadding: false,
    textAlignVertical: 'center'
  },
  spinner: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2.5,
    borderColor: '#D1D5DB',
    borderTopColor: '#374151'
  }
});
//# sourceMappingURL=icons.js.map