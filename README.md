# cocoa-rn

A React Native Library that brings the [cocoa](https://cocoa.crunux.me/) toast component to your app.

---
## Preview

<img src="./preview.gif" width="250" height="500">

> An opinionated toast component for React Native.
> Spring physics and a minimal API — beautiful by default.
>
> Inspired by [sileo](https://sileo.aaryan.design/) by [@hiaaryan](https://github.com/hiaaryan).

[![npm version](https://img.shields.io/npm/v/cocoa-rn.svg)](https://www.npmjs.com/package/cocoa-rn)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## Features

- **Same API as web cocoa** — `cocoa.success()`, `cocoa.promise()`, etc.
- **Spring physics** — entry/exit animations using React Native's built-in `Animated` API
- **Zero native modules** — works in Expo Go, bare RN, and Expo managed workflow
- **TypeScript first** — full type coverage
- **Promise support** — loading → success/error transitions in one call
- **Fully customizable** — fill, roundness, styles, custom icons, action buttons

---

## Installation

```bash
npm install @crunux/cocoa-rn
# or
yarn add @crunux/cocoa-rn
```

No additional setup. No native modules to link.

---

## Quick Start

### 1. Mount `<Toaster />` once at the root

```tsx
// App.tsx (bare RN) or _layout.tsx (Expo Router)
import { Toaster } from '@crunux/cocoa-rn';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <YourNavigator />
      {/* Outside your navigator so toasts render above everything */}
      <Toaster position="top-right" />
    </View>
  );
}
```

### 2. Fire toasts from anywhere

```tsx
import { cocoa } from '@crunux/cocoa-rn';

cocoa.success({ title: 'File saved!' });
cocoa.error({ title: 'Upload failed', description: 'Check your connection.' });
cocoa.warning({ title: 'Low storage' });
cocoa.info({ title: 'Update available' });
```

---

## API Reference

### `cocoa.*` Methods

| Method | Description | Returns |
|---|---|---|
| `cocoa.success(options)` | Green success toast | `id: string` |
| `cocoa.error(options)` | Red error toast | `id: string` |
| `cocoa.warning(options)` | Amber warning toast | `id: string` |
| `cocoa.info(options)` | Blue info toast | `id: string` |
| `cocoa.action(options)` | Toast with an action button | `id: string` |
| `cocoa.show(options)` | Generic toast (success style) | `id: string` |
| `cocoa.promise(p, opts)` | Loading → success / error | `Promise<T>` |
| `cocoa.dismiss(id)` | Dismiss a specific toast | `void` |
| `cocoa.clear(position?)` | Clear all, or by position | `void` |

---

### `CocoaOptions`

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | Toast heading (required) |
| `description` | `string` | — | Optional body text |
| `position` | `CocoaPosition` | Toaster default | Per-toast position override |
| `duration` | `number \| null` | `6000` | Auto-dismiss ms. `null` = sticky |
| `icon` | `ReactNode` | — | Custom icon replacing the default badge |
| `colorIcon` | `string` | — | Custom icon color |
| `fill` | `string` | `'#FFFFFF'` | Toast background color |
| `styles` | `CocoaStyles` | — | StyleSheet overrides for sub-elements |
| `roundness` | `number` | `16` | Border radius in pixels |
| `button` | `CocoaButton` | — | Action button config |

---

### `CocoaButton`

```ts
interface CocoaButton {
  title: string;
  onPress: () => void; // Note: onPress (not onClick) for React Native
}
```

---

### `CocoaStyles`

```ts
interface CocoaStyles {
  container?:   ViewStyle;
  title?:       TextStyle;
  description?: TextStyle;
  badge?:       ViewStyle;
  button?:      ViewStyle;
  buttonText?:  TextStyle;
}
```

---

### `CocoaPosition`

```ts
'top-left' | 'top-center' | 'top-right'
'bottom-left' | 'bottom-center' | 'bottom-right'
```

---

### `<Toaster />` Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `position` | `CocoaPosition` | `'top-right'` | Default position for all toasts |
| `maxToasts` | `number` | `3` | Max visible toasts at once |
| `containerStyle` | `ViewStyle` | — | Override the wrapper View style |

---

## Recipes

### Action button (with undo)

```tsx
cocoa.action({
  title: 'Message sent',
  description: 'Delivered to 3 recipients.',
  button: {
    title: 'Undo',
    onPress: () => recallMessage(),
  },
});
```

### Promise (loading → success / error)

```tsx
cocoa.promise(uploadFile(file), {
  loading: { title: 'Uploading…' },
  success: (result) => ({
    title: 'Upload complete!',
    description: `${result.filename} is ready.`,
  }),
  error: (err) => ({
    title: 'Upload failed',
    description: (err as Error).message,
  }),
});
```

The `promise` method returns the original promise so you can chain:

```tsx
const user = await cocoa.promise(createUser(data), {
  loading: { title: 'Creating account…' },
  success: (u) => ({ title: `Welcome, ${u.name}!` }),
  error:   (e) => ({ title: 'Signup failed', description: (e as Error).message }),
});
// user is typed as the resolved value
```

### Sticky toast (dismiss programmatically)

```tsx
const id = cocoa.info({
  title: 'Syncing…',
  duration: null, // won't auto-dismiss
});

// Later:
cocoa.dismiss(id);
```

### Custom styling

```tsx
cocoa.success({
  title: 'Dark toast',
  description: 'Fully custom appearance.',
  fill: '#111827',
  roundness: 20,
  styles: {
    title:       { color: '#F9FAFB' },
    description: { color: '#9CA3AF' },
    button:      { backgroundColor: '#374151' },
    buttonText:  { color: '#F3F4F6' },
  },
});
```

### Custom icon

```tsx
import { Image } from 'react-native';

cocoa.success({
  title: 'Payment received',
  icon: (
    <Image source={require('./assets/coin.png')} style={{ width: 28, height: 28 }} />
  ),
});
```

### Dark mode aware toasts

```tsx
import { useColorScheme } from 'react-native';

const scheme = useColorScheme();

cocoa.success({
  title: 'Saved',
  fill:  scheme === 'dark' ? '#1F2937' : '#FFFFFF',
  styles: {
    title:       { color: scheme === 'dark' ? '#F9FAFB' : '#111827' },
    description: { color: scheme === 'dark' ? '#9CA3AF' : '#6B7280' },
  },
});
```

### Multiple Toasters (multi-position)

You can mount multiple `<Toaster />` instances, each bound to a different position. Toasts are routed to whichever Toaster matches their `position`.

```tsx
<Toaster position="top-right" />
<Toaster position="bottom-center" />
```

---

## Differences from Web Cocoa

| Web Cocoa | cocoa-rn |
|---|---|
| `button.onClick` | `button.onPress` |
| SVG gooey morphing | Spring physics via `Animated` |
| CSS class overrides | RN `StyleSheet` object overrides |
| `description: ReactNode` | `description: string` |
| DOM `position: fixed` | `position: 'absolute'` View |

---

## Project Structure

```
cocoa-rn/
├── src/
│   ├── index.ts          ← public exports
│   ├── types.ts          ← CocoaOptions, CocoaPosition, etc.
│   ├── store.ts          ← reactive event store (no React)
│   ├── cocoa.ts          ← cocoa.success / error / promise / …
│   ├── useToastStore.ts  ← React hook for store subscription
│   ├── icons.tsx         ← built-in icon components
│   ├── Toast.tsx         ← animated toast component
│   └── Toaster.tsx       ← host container (mount once at root)
├── __tests__/
│   ├── cocoa.test.ts     ← controller unit tests (formerly cocoa.test.ts) - renamed for clarity
│   └── store.test.ts     ← store unit tests
├── example/
│   └── src/
│       ├── _layout.tsx   ← Expo Router root (Toaster mounted here)
│       └── index.tsx     ← full demo screen
├── package.json
├── tsconfig.json
└── tsconfig.build.json
```

---

## Development

```bash
# Install dependencies
npm install

# Type-check
npm run typecheck

# Run tests
npm test

# Build for publishing
npm run build
```

To run the example:

```bash
cd example
npm install
npx expo start
```
