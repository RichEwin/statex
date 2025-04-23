import { describe, it, expect, beforeEach } from 'vitest';
import { createStore } from '../src/utils';

const initialState = { count: 0 };

const createCounterActions = ({ getState, setState }: {
  getState: () => typeof initialState;
  setState: (state: typeof initialState) => void;
}) => ({
  increment: () => {
    const { count } = getState();
    setState({ count: count + 1 });
  },
  decrement: () => {
    const { count } = getState();
    setState({ count: count - 1 });
  },
  reset: () => setState({ count: 0 }),
});

describe('counterStore', () => {
  let counterStore: ReturnType<typeof createStore<typeof initialState, ReturnType<typeof createCounterActions>>>;

  beforeEach(() => {
    counterStore = createStore(initialState, createCounterActions);
  });

  it('should initialize with count 0', () => {
    expect(counterStore.getState().count).toBe(0);
  });

  it('should increment the count', () => {
    counterStore.increment();
    expect(counterStore.getState().count).toBe(1);
  });

  it('should decrement the count', () => {
    counterStore.increment();
    counterStore.decrement();
    expect(counterStore.getState().count).toBe(0);
  });

  it('should reset the count to 0', () => {
    counterStore.increment();
    counterStore.increment();
    counterStore.reset();
    expect(counterStore.getState().count).toBe(0);
  });

  it('should notify subscribers on state change', () => {
    let called = false;
    const unsubscribe = counterStore.subscribe(() => {
      called = true;
    });

    counterStore.increment();

    expect(called).toBe(true);
    unsubscribe();
  });
});