import { Link } from "solid-app-router";

interface Props {
  products: any[];
}

const styles = {
  product: {
    image: 'flex-shrink-0 bg-white w-48 h-48 border object-center object-cover',
    container: 'ml-8 flex flex-col justify-center',
    name: 'text-xl font-bold',
  }
}

export const CartList = ({ products }: Props) => {
  return (
    <ul role="list" class="divide-y divide-gray-200">
      {products.map((line) => {
        const variant = line?.variant;
        const product = line?.variant.product;

        return (
          <li class="py-6">
            <Link href={`/products/${product?.slug}`}>
              <a class="flex">
                <div class={styles.product.image}>
                  <img
                    src={product?.thumbnail?.url || ""}
                    alt={product?.thumbnail?.alt || ""}
                  />
                </div>

                <div class={styles.product.container}>
                  <div>
                    <h3 class={styles.product.name}>
                      {product?.name}
                    </h3>
                    <h4>
                      {variant?.name}
                    </h4>
                  </div>
                </div>
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
