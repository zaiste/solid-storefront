import { CheckoutFragment } from "../fragment/CheckoutFragment";

export const CheckoutByToken = /* GraphQL */`
query CheckoutByToken($checkoutToken: UUID!) {
  checkout(token: $checkoutToken) {
    ...CheckoutFragment
  }
}
${CheckoutFragment}
`;