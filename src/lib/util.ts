import { createEffect } from "solid-js";
import { createStore, SetStoreFunction, Store } from "solid-js/store";

export function createLocalStore<T>(initState: T): [Store<T>, SetStoreFunction<T>] {
	const [state, setState] = createStore(initState);

  if (typeof window !== 'undefined') {
    if (localStorage.token) {
      setState(JSON.parse(localStorage.token));
    }
    createEffect(() => (localStorage.setItem("token", JSON.stringify(state['token']))));
  }

	return [state, setState];
}