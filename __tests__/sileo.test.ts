import { cocoa } from '../src/cocoa';
import { store } from '../src/store';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getToasts() {
  return store.getToasts();
}

afterEach(() => {
  // Clean up between tests
  cocoa.clear();
});

// ─── Basic methods ────────────────────────────────────────────────────────────

describe('cocoa.success', () => {
  it('adds a success toast and returns an id', () => {
    const id = cocoa.success({ title: 'Done' });
    expect(typeof id).toBe('string');
    const toasts = getToasts();
    expect(toasts).toHaveLength(1);
    expect(toasts[0]?.type).toBe('success');
    expect(toasts[0]?.title).toBe('Done');
  });
});

describe('cocoa.error', () => {
  it('adds an error toast', () => {
    cocoa.error({ title: 'Oops', description: 'Something went wrong' });
    const [t] = getToasts();
    expect(t?.type).toBe('error');
    expect(t?.description).toBe('Something went wrong');
  });
});

describe('cocoa.warning', () => {
  it('adds a warning toast', () => {
    cocoa.warning({ title: 'Watch out' });
    expect(getToasts()[0]?.type).toBe('warning');
  });
});

describe('cocoa.info', () => {
  it('adds an info toast', () => {
    cocoa.info({ title: 'FYI' });
    expect(getToasts()[0]?.type).toBe('info');
  });
});

describe('cocoa.action', () => {
  it('adds a default toast with a button', () => {
    cocoa.action({
      title: 'Message sent',
      button: { title: 'Undo', onPress: jest.fn() },
    });
    const [t] = getToasts();
    expect(t?.type).toBe('default');
    expect(t?.button?.title).toBe('Undo');
  });
});

// ─── dismiss ──────────────────────────────────────────────────────────────────

describe('cocoa.dismiss', () => {
  it('marks a toast as invisible', () => {
    const id = cocoa.success({ title: 'Hi' });
    cocoa.dismiss(id);
    const [t] = getToasts();
    expect(t?.visible).toBe(false);
  });
});

// ─── clear ────────────────────────────────────────────────────────────────────

describe('cocoa.clear', () => {
  it('dismisses all toasts', () => {
    cocoa.success({ title: 'A' });
    cocoa.error({ title: 'B' });
    cocoa.clear();
    const visible = getToasts().filter((t) => t.visible);
    expect(visible).toHaveLength(0);
  });

  it('clears only toasts at a specific position', () => {
    cocoa.success({ title: 'Top', position: 'top-right' });
    cocoa.success({ title: 'Bottom', position: 'bottom-center' });
    cocoa.clear('top-right');
    const visible = getToasts().filter((t) => t.visible);
    expect(visible).toHaveLength(1);
    expect(visible[0]?.position).toBe('bottom-center');
  });
});

// ─── Default duration ─────────────────────────────────────────────────────────

describe('default duration', () => {
  it('defaults to 6000ms', () => {
    cocoa.success({ title: 'Hi' });
    expect(getToasts()[0]?.duration).toBe(6000);
  });

  it('respects null (sticky)', () => {
    cocoa.success({ title: 'Sticky', duration: null });
    expect(getToasts()[0]?.duration).toBeNull();
  });
});

// ─── Promise ──────────────────────────────────────────────────────────────────

describe('cocoa.promise', () => {
  it('shows loading then success toast', async () => {
    const promise = Promise.resolve({ name: 'file.jpg' });

    const result = await cocoa.promise(promise, {
      loading: { title: 'Uploading...' },
      success: (r) => ({ title: `Done: ${r.name}` }),
      error: { title: 'Failed' },
    });

    expect(result).toEqual({ name: 'file.jpg' });

    // After resolution the toast transitions to success
    const t = getToasts()[0];
    expect(t?.type).toBe('success');
    expect(t?.title).toBe('Done: file.jpg');
  });

  it('shows loading then error toast on rejection', async () => {
    const promise = Promise.reject(new Error('Network timeout'));

    try {
      await cocoa.promise(promise, {
        loading: { title: 'Loading...' },
        success: { title: 'Done' },
        error: (e) => ({ title: 'Error', description: (e as Error).message }),
      });
    } catch {
      // expected
    }

    const t = getToasts()[0];
    expect(t?.type).toBe('error');
    expect(t?.description).toBe('Network timeout');
  });

  it('re-throws the error so callers can handle it', async () => {
    const promise = Promise.reject(new Error('oops'));
    await expect(
      cocoa.promise(promise, {
        loading: { title: 'Loading' },
        success: { title: 'Done' },
        error: { title: 'Error' },
      })
    ).rejects.toThrow('oops');
  });
});
