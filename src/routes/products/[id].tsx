import { Component, Show } from "solid-js";
import { useRouteData } from "solid-app-router";
import { createResource } from "solid-js";
import { RouteDataFunc } from "solid-app-router";
import { client } from "~/lib/api";
import { AddProductVariantToCart } from "~/graphql/mutation/AddProductVariantToCart";

interface IUser {
  error: string;
  id: string;
  created: string;
  karma: number;
  about: string;
}

const styles = {
  columns: 'grid grid-cols-2 gap-x-10 items-start',
  image: {
    aspect: 'aspect-square bg-white rounded',
    content: 'object-center object-cover'
  },
  details: {
    title: 'text-4xl font-bold tracking-tight text-gray-800',
    category: 'text-lg mt-2 font-medium text-gray-500',
    description: 'prose lg:prose-s'
  }
}


const Query = /* GraphQL */`
query ProductByID($id: ID!) {
  product(id: $id, channel: "default-channel") {
    id
    name
    description
    media {
      url
    }
    category {
      name
    }
  }
}
`

const fetchAPI = async (id: string) => {
  const { data: { product } } = await client.query(Query, { id }).toPromise()
  return product;
}

export const routeData: RouteDataFunc = (props) => {
  const [product] = createResource(() => `${props.params.id}`, fetchAPI);
  return product;
};

const ProductPage: Component = () => {
  const product = useRouteData<any>();

  // const selectedVariantID = queryVariant || variants![0]!.id!;
  // const selectedVariant = variants!.find((variant) => variant?.id === selectedVariantID);

  const doAddToCart = async () => {
    const { data } = await client.mutation(AddProductVariantToCart, {
      // checkoutToken: token, 
      // variantId: selectedVariantID 
    }).toPromise()

    // router.push("/cart");
  };

  return (
    <Show when={product()}>
    <div className={styles.columns}>
      <div className={styles.image.aspect}>
        <img
          src={product()?.media![0]?.url}
          className={styles.image.content}
        />
      </div>

      <div className="space-y-8">
        <div>
          <h1 className={styles.details.title}>
            {product()?.name}
          </h1>
          <p className={styles.details.category}>
            {product()?.category?.name}
          </p>
        </div>

        <article className={styles.details.description}>
          {product()?.description}
        </article>

        <button
          onClick={() => {}}
          type="submit"
          className="primary-button"
        >
          Add to cart
        </button>
      </div>
    </div>
    </Show>
  );
};

export default ProductPage;
