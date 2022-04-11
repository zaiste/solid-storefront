import { createSignal, createContext, useContext } from "solid-js";

const CheckoutContext = createContext();

export function CheckoutProvider(props) {
  const [token, setToken] = createSignal(props.token || ""),
    store = [
      token,
      {}
    ];

  return (
    <CheckoutContext.Provider value={store}>
      {props.children}
    </CheckoutContext.Provider>
  );
}

export function useToken() { return useContext(CheckoutContext); }