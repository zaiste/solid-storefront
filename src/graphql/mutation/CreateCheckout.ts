export const CreateCheckout = /* GraphQL */`
mutation CreateCheckout {
  checkoutCreate(
    input: {
      channel: "default-channel"
      email: "customer@example.com"
      lines: []
    }
  ) {
    checkout {
      token
    }
    errors {
      field
      code
    }
  }
}
`