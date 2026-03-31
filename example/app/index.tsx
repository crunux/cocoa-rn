import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cocoa } from 'cocoa-rn';

// ─── Shared button ────────────────────────────────────────────────────────────

interface DemoButtonProps {
  label: string;
  accent: string;
  onPress: () => void;
}

function DemoButton({ label, accent, onPress }: DemoButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.btn, { borderColor: accent + '55' }]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={[styles.btnDot, { backgroundColor: accent }]} />
      <Text style={styles.btnLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────

function Section({ title }: { title: string }) {
  return <Text style={styles.section}>{title}</Text>;
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  // ── handlers ────────────────────────────────────────────────────────────────

  function showSuccess() {
    cocoa.success({
      title: 'File saved!',
      description: 'Changes have been stored successfully.',
    });
  }

  function showError() {
    cocoa.error({
      title: 'Upload failed',
      description: 'Check your internet connection and try again.',
    });
  }

  function showWarning() {
    cocoa.warning({
      title: 'Low storage',
      description: 'Only 500 MB remaining on your device.',
    });
  }

  function showInfo() {
    cocoa.info({
      title: 'Update available',
      description: 'Version 3.2 is ready to install.',
    });
  }

  function showAction() {
    cocoa.action({
      title: 'Message sent',
      description: 'Delivered to all recipients.',
      button: {
        title: 'Undo',
        onPress: () =>
          cocoa.info({ title: 'Undone', description: 'Message was recalled.' }),
      },
    });
  }

  function showCustom() {
    cocoa.success({
      title: isDark ? 'Dark fill' : 'Custom fill',
      description: 'Background, roundness and text colors overridden.',
      fill: isDark ? '#0A0A0A' : '#F0FDF4',
      colorIcon: isDark ? '#C9A84C' : '#14532D',
      roundness: 24,
      styles: {
        title: { color: isDark ? '#C9A84C' : '#14532D' },
        description: { color: isDark ? '#C9A84C' : '#166534' },
      },
    });
  }

  function showSticky() {
    const id = cocoa.info({
      title: 'Connecting…',
      description: 'This toast stays until explicitly dismissed.',
      duration: null,
    });
    // Auto-dismiss for demo purposes
    setTimeout(() => cocoa.dismiss(id), 5000);
  }

  function showBottomCenter() {
    cocoa.success({
      title: 'Saved to drafts',
      position: 'bottom-center',
    });
  }

  async function showPromiseSuccess() {
    const fakeUpload = new Promise<{ filename: string }>((resolve) =>
      setTimeout(() => resolve({ filename: 'photo_2024.jpg' }), 2500)
    );

    await cocoa.promise(fakeUpload, {
      loading: { title: 'Uploading photo…' },
      success: (r) => ({
        title: 'Upload complete!',
        description: `${r.filename} is ready.`,
      }),
      error: () => ({
        title: 'Upload failed',
        description: 'Please try again.',
      }),
    });
  }

  async function showPromiseError() {
    const failingRequest = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Network timeout')), 2000)
    );

    try {
      await cocoa.promise(failingRequest, {
        loading: { title: 'Fetching data…' },
        success: () => ({ title: 'Done!' }),
        error: (e) => ({
          title: 'Request failed',
          description: (e as Error).message,
        }),
      });
    } catch {
      // Handled by cocoa — error toast already shown
    }
  }

  async function showPromiseAction() {
    const fakeCreate = new Promise<{ name: string }>((resolve) =>
      setTimeout(() => resolve({ name: 'New Project' }), 1800)
    );

    await cocoa.promise(fakeCreate, {
      loading: { title: 'Creating project…' },
      success: () => ({ title: 'Done!' }),
      error: () => ({ title: 'Failed' }),
      action: (r) => ({
        title: `"${r.name}" created`,
        description: 'Ready to use.',
        button: { title: 'Open', onPress: () => cocoa.info({ title: 'Opening…' }) },
      }),
    });
  }

  // ── render ──────────────────────────────────────────────────────────────────

  return (
    <SafeAreaView
      style={[styles.safe, isDark && styles.safeDark]}
      edges={['top', 'bottom']}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.heading, isDark && styles.textLight]}>
            cocoa-rn
          </Text>
          <Text style={styles.subtitle}>
            Spring-physics toasts for React Native
          </Text>
        </View>

        {/* Basic */}
        <Section title="Basic" />
        <View style={styles.grid}>
          <DemoButton label="Success"  accent="#22C55E" onPress={showSuccess} />
          <DemoButton label="Error"    accent="#EF4444" onPress={showError} />
          <DemoButton label="Warning"  accent="#F59E0B" onPress={showWarning} />
          <DemoButton label="Info"     accent="#3B82F6" onPress={showInfo} />
        </View>

        {/* Advanced */}
        <Section title="Advanced" />
        <View style={styles.grid}>
          <DemoButton label="Action"       accent="#8B5CF6" onPress={showAction} />
          <DemoButton label="Custom fill"  accent="#10B981" onPress={showCustom} />
          <DemoButton label="Sticky"       accent="#6B7280" onPress={showSticky} />
          <DemoButton label="Bottom"       accent="#0EA5E9" onPress={showBottomCenter} />
        </View>

        {/* Promise */}
        <Section title="Promise" />
        <View style={styles.grid}>
          <DemoButton label="→ Success" accent="#22C55E" onPress={showPromiseSuccess} />
          <DemoButton label="→ Error"   accent="#EF4444" onPress={showPromiseError} />
          <DemoButton label="→ Action"  accent="#8B5CF6" onPress={showPromiseAction} />
        </View>

        {/* Manage */}
        <Section title="Manage" />
        <View style={styles.grid}>
          <DemoButton
            label="Clear all"
            accent="#F43F5E"
            onPress={() => cocoa.clear()}
          />
          <DemoButton
            label="Clear bottom"
            accent="#F59E0B"
            onPress={() => cocoa.clear('bottom-center')}
          />
        </View>

        {/* Code snippet */}
        <View style={[styles.codeCard, isDark && styles.codeCardDark]}>
          <Text style={[styles.codeTitle, isDark && styles.textLight]}>
            Quick start
          </Text>
          <Text style={[styles.code, isDark && styles.codeLight]}>
            {[
              "import { cocoa, Toaster } from '@crunux/cocoa-rn';",
              '',
              '// In your root layout:',
              '<Toaster position="top-right" />',
              '',
              '// Anywhere in your app:',
              "cocoa.success({ title: 'Done!' });",
              'cocoa.promise(upload(), {',
              "  loading: { title: 'Uploading…' },",
              '  success: (r) => ({ title: r.name }),',
              "  error:   (e) => ({ title: e.message }),",
              '});',
            ].join('\n')}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  safeDark: {
    backgroundColor: '#111827',
  },
  scroll: {
    padding: 24,
    paddingBottom: 60,
  },
  header: {
    marginBottom: 32,
  },
  heading: {
    fontSize: 34,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -1.2,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginTop: 4,
  },
  textLight: {
    color: '#F9FAFB',
  },
  section: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9CA3AF',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 12,
    marginTop: 28,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  btnDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  btnLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  codeCard: {
    marginTop: 36,
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    padding: 18,
  },
  codeCardDark: {
    backgroundColor: '#1F2937',
  },
  codeTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 10,
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 12.5,
    color: '#374151',
    lineHeight: 20,
  },
  codeLight: {
    color: '#D1D5DB',
  },
});
