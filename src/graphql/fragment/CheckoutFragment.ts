export const CheckoutFragment = /* GraphQL */`
fragment CheckoutFragment on Checkout {
  id
  email
  lines {
    id
    totalPrice {
      gross {
        amount
        currency
      }
    }
    variant {
      product {
        id
        name
        slug
        thumbnail {
          url
        }
      }
      pricing {
        price {
          gross {
            amount
            currency
          }
        }
      }
      name
    }
    quantity
  }
  totalPrice {
    gross {
      amount
      currency
    }
  }
}
`