import { Link, useRouteData, RouteDataFunc } from "solid-app-router";

const styles = {
  card: 'bg-white border',
  summary: 'px-4 py-2 border-gray-100 bg-gray-50 border-t',
  title: 'block text-lg text-gray-900 truncate',
  category: 'block text-sm font-medium text-gray-500',
  image: {
    aspect: 'aspect-square',
    content: 'object-center object-cover'
  }
}

export const ProductElement = ({ id, name, thumbnail, category, pricing }: any) => {
  const lowestPrice = pricing?.priceRange?.start?.gross.amount ?? 0;
  const highestPrice = pricing?.priceRange?.stop?.gross.amount ?? 0;

  return (
    <li class={styles.card}>
      <Link href={`/products/${id}`}>
        <div class={styles.image.aspect}>
          <img src={thumbnail?.url} alt="" class={styles.image.content} />
        </div>
        <div class={styles.summary}>
          <div class="flex justify-between items-center">
            <div>
              <p class={styles.title}>{name}</p>
              <p class={styles.category}>{category?.name}</p>
            </div>
            <div>{lowestPrice == highestPrice ? highestPrice : `${lowestPrice} - ${highestPrice}`}</div>
          </div>
        </div>
      </Link>
    </li>
  );
}