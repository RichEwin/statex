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

Create a store

```
// store/counter.ts
import { createStore, createUseStore } from '@rewin/statex';

const counterStore = createStore(
  { count: 0 },
  ({ getState, setState }) => ({
    increment: () => {
      const { count } = getState();
      setState({ count: count + 1 });
    },
    reset: () => setState({ count: 0 }),
  })
);

export const useCounter = createUseStore(counterStore);
export const { increment, reset } = counterStore;
```

Access the store

```
'use client';

import { useCounter, increment, reset } from '@/store/counter';

export default function Counter() {
  const count = useCounter((s) => s.count);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

## 🛡️ Gotchas

This is not persistent—state resets on refresh unless you wire in localStorage or similar.

Designed for client-side usage.

Selectors help reduce unnecessary re-renders—use them!

🧱 Built With

`react/cache`

## 🪪 License

MIT — Use freely
