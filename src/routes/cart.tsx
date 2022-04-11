import { Link, useRouteData, RouteDataFunc } from "solid-app-router";
import { Component, For, Show, createResource, createSignal } from "solid-js";

import { CartHeader } from "~/components/CartHeader";
import { CartList } from "~/components/CartList";
import { CartSummary } from "~/components/CartSummary";
import { useToken } from "~/context/Checkout";
import { CheckoutByToken } from "~/graphql/query/CheckoutByToken";
import { client } from "~/lib/api";

const styles = {
  grid: 'grid grid-cols-3 gap-8',
}

export const routeData: RouteDataFunc = (props) => {
  const [token] = createSignal("04a36593-d760-4419-a7d3-b6138aaff618") 

  const [checkout] = createResource(token, async (tok) => {
    const { data } = await client.query(CheckoutByToken, {
      checkoutToken: tok
    }).toPromise()

    return data.checkout;
  });
  return checkout;
};


const Cart: Component = () => {
  // const [token] = useLocalStorage('token');
  // const [token] = useToken() as any; 

  const checkout = useRouteData<() => any>();

  return (
    <div>
      <CartHeader />

      <div class={styles.grid}>
        <div class="col-span-2">
          <Show when={checkout()}>
            <CartList products={checkout().lines || []} />
          </Show>
        </div>
        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default Cart;