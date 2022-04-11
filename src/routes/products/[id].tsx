import { Component, createSignal, Show } from "solid-js";
import { useNavigate, useRouteData } from "solid-app-router";
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
    variants {
      id
      name
      pricing {
        price {
          gross {
            amount
          }
        }
      }
    }
  }
}
`

const fetchAPI = async (id: string) => {
  const { data: { product } } = await client.query(Query, { id }).toPromise()
  return product;
}

export const routeData: RouteDataFunc = ({ params }) => {
  const [product] = createResource(() => `${params.id}`, fetchAPI);

  let selectedVariantID = "" 
  if (!product.loading) {
    const p = product();

    selectedVariantID = params.variant || product().variants![0]!.id!;
  }

  return { product, selectedVariantID }
};

const ProductPage: Component = () => {
  const navigate = useNavigate();
  const { product, selectedVariantID } = useRouteData<any>();
  const token = "04a36593-d760-4419-a7d3-b6138aaff618";

  const doAddToCart = async (variantId) => {
    console.log(token)
    console.log(selectedVariantID)
    const { data } = await client.mutation(AddProductVariantToCart, {
      checkoutToken: token, 
      variantId,
    }).toPromise()

    navigate("/cart");
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
          onClick={() => doAddToCart(product().variants[0].id)}
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
