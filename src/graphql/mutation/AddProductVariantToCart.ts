export const AddProductVariantToCart = /* GraphQL */`
mutation AddProductVariantToCart($checkoutToken: UUID!, $variantId: ID!) {
  checkoutLinesAdd(
    token: $checkoutToken
    lines: [{ quantity: 1, variantId: $variantId }]
  ) {
    checkout {
      id
      lines {
        id
        quantity
        variant {
          name
          product {
            name
          }
        }
      }
    }
    errors {
      message
    }
  }
}
`;