import { store } from '../src/store';

afterEach(() => {
  store.clear();
});

describe('store.addToast', () => {
  it('adds a toast and notifies subscribers', () => {
    const listener = jest.fn();
    const unsub = store.subscribe(listener);

    store.addToast({ title: 'Hello' }, 'success');
    expect(listener).toHaveBeenCalledTimes(2); // initial call + add
    expect(store.getToasts()).toHaveLength(1);

    unsub();
  });

  it('replaces a toast with the same id', () => {
    store.addToast({ title: 'Original', id: 'fixed-id' }, 'success');
    store.addToast({ title: 'Updated', id: 'fixed-id' }, 'error');
    const toasts = store.getToasts();
    expect(toasts).toHaveLength(1);
    expect(toasts[0]?.title).toBe('Updated');
    expect(toasts[0]?.type).toBe('error');
  });
});

describe('store.subscribe / unsubscribe', () => {
  it('immediately calls the listener with current state', () => {
    store.addToast({ title: 'Pre-existing' }, 'info');
    const listener = jest.fn();
    const unsub = store.subscribe(listener);
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener.mock.calls[0]?.[0]).toHaveLength(1);
    unsub();
  });

  it('stops calling listener after unsubscribe', () => {
    const listener = jest.fn();
    const unsub = store.subscribe(listener);
    listener.mockClear();
    unsub();
    store.addToast({ title: 'After' }, 'success');
    expect(listener).not.toHaveBeenCalled();
  });
});
