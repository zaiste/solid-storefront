import { Component, Show } from "solid-js";
import { useRouteData } from "solid-app-router";
import { createResource } from "solid-js";
import { RouteDataFunc } from "solid-app-router";
import { client } from "~/lib/api";

interface IUser {
  error: string;
  id: string;
  created: string;
  karma: number;
  about: string;
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
  const [product] = createResource(() => `products/${props.params.id}`, fetchAPI);
  return product;
};

const User: Component = () => {
  const user = useRouteData<() => any>();
  console.log(user())

  return (
    <div class="user-view">
      something
      {/* <Show when={user()}>
        <Show when={!user().error} fallback={<h1>User not found.</h1>}>
          <h1>User : {user().id}</h1>
          <ul class="meta">
            <li>
              <span class="label">Created:</span> {user().created}
            </li>
            <li>
              <span class="label">Karma:</span> {user().karma}
            </li>
            <Show when={user().about}>
              <li innerHTML={user().about} class="about" />{" "}
            </Show>
          </ul>
          <p class="links">
            <a href={`https://news.ycombinator.com/submitted?id=${user().id}`}>
              submissions
            </a>{" "}
            |{" "}
            <a href={`https://news.ycombinator.com/threads?id=${user().id}`}>
              comments
            </a>
          </p>
        </Show>
      </Show> */}
    </div>
  );
};

export default User;
