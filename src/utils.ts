import { useSyncExternalStore } from 'react';

/**
 * Creates a store with state and custom actions.
 *
 * @template State - The type of the store's state.
 * @template Actions - A record of action functions that interact with the state.
 * @param {State} initialState - The initial state of the store.
 * @param {(store:
 * {  getState: () => State;
 *    setState: (state: State) => void
 * }) => Actions} createActions - A function that returns action creators, receiving `getState` and `setState` methods.
 * @returns {{ getState:
 * () => State;
 * setState: (state: State) => void;
 * subscribe: (listener: () => void) => () => void }
 * & Actions} - The store object with state handlers and the custom actions.
 */
export function createStore<
  State,
  Actions extends Record<string, CallableFunction>,
>(
  initialState: State,
  createActions: (store: {
    getState: () => State;
    setState: (state: State) => void;
  }) => Actions,
) {
  let state = initialState;
  const listeners = new Set<() => void>();

  const store = {
    getState: () => state,
    setState: (nextState: State) => {
      state = nextState;
      for (const listener of listeners) {
        listener();
      }
    },
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getServerSnapshot: () => state,
  };

  const actions = createActions(store);

  return { ...store, ...actions };
}

/**
 * Creates a hook for the store to be used in React components.
 *
 * @template State - The type of the store's state.
 * @param {{
 * getState: () => State;
 * subscribe: (listener: () => void) => () => void }} store - The store object with `getState` and `subscribe` methods.
 * @returns {<T>(selector?: (state: State) => T) => T} - A hook that returns the selected state.
 */
export function createUseStore<State>(store: {
  getState: () => State;
  subscribe: (listener: VoidFunction) => VoidFunction;
  getServerSnapshot: () => State;
}) {
  return function useBoundStore<T>(selector: (state: State) => T): T {
    return useSyncExternalStore(
      store.subscribe,
      () => selector(store.getState()),
      () => selector(store.getServerSnapshot()),
    );
  };
}
