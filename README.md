# 📦 stateX

A minimalist, type-safe utility for building external state containers in React using `useSyncExternalStore`. Perfect for creating global stores without context, Redux, or extra dependencies.

---

## ✨ Features

- ⚡ **Zero-dependency** – Built on top of native React features.
- 🔁 External Store – Uses React's built-in useSyncExternalStore.
- 🧠 Type-safe – Fully typed state and actions with inference.
- 🛠️ Custom Actions – Define your own mutations with direct access to state.
- 🎯 Fine-grained Selectors – Subscribe to just the data you need.

## 💡 Why?

React doesn't come with a built-in way to manage global state outside of Context or heavy libraries like Redux. statex gives you an intuitive, lightweight tool to create composable, reactive stores—ideal for app-wide settings, UI state, or anything that lives outside of a component tree.

---

## 📦 Installation

```bash
npm install @rewin/statex
```

## 🧪 Example Usage

Initialize the counter state, define actions, create the store, and export hooks/utilities.

```
import { createStore, createUseStore } from '@rewin/statex';

type CreateCounterActions = {
  getState: () => typeof initialState;
  setState: (state: typeof initialState) => void;
};

const initialState = { count: 0 };

const createCounterActions = ({ getState, setState }: CreateCounterActions) => ({
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

const counterStore = createStore(initialState, createCounterActions);

export const useCounter = createUseStore(counterStore);
export const { increment, reset } = counterStore;
```

Import and use counter actions in a client-side component.

```
"use client"

import { increment, reset } from "../store/counter";

export function ClientComponentA() {
    return (
      <div>
        <button onClick={increment}>+</button>
        <button onClick={reset}>Reset</button>
      </div>
    );
}
```

Import and consume the counter state in a client-side component.

```
"use client"

import { useCounter } from "@/store/counter"

export function ClientComponentB() {
    const {count} = useCounter((state) => state)

    return (<div>{count}</div>)
}
```

## 🛡️ Gotchas

This is not persistent—state resets on refresh unless you wire in localStorage or similar.

Designed for client-side usage.

🧱 Built With

`react/cache`

## 🪪 License

MIT — Use freely
