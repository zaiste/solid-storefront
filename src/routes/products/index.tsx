import { Link, useRouteData, RouteDataFunc } from "solid-app-router";
import { Component, For, Show, createResource } from "solid-js";
import { ProductElement } from "~/components/ProductElement";
import { client } from "~/lib/api";

const styles = {
  grid: 'grid gap-4 grid-cols-4',
  product: {
    card: 'bg-white border',
    summary: 'px-4 py-2 border-gray-100 bg-gray-50 border-t',
    title: 'block text-lg text-gray-900 truncate',
  }
}

const Query = /* GraphQL */`
query FetchTwelveProducts {
  products(first: 12, channel: "default-channel") {
    edges {
      node {
        id
        name
        thumbnail {
          url
        }
        category {
          name
        }
      }
    }
  }
}
`

const fetchAPI = async () => {
  const { data: { products: { edges: collection }}} = await client.query(Query, {}).toPromise()
  return collection;
}

export const routeData: RouteDataFunc = (props) => {
  const [products] = createResource(() => `products`, fetchAPI);
  return products;
};

const ProductPage: Component = () => {
  const collection = useRouteData<any>();

  return (
    <ul role="list" className={styles.grid}>
      {collection()?.length > 0 &&
        collection().map(
          ({ node }) => (
            <ProductElement {...node} />
          ),
        )}
    </ul>
  );
};

export default ProductPage;
