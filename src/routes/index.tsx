import { Link } from "solid-app-router";
import { Component } from "solid-js";

const HomePage: Component = () => {
  return (
    <div>
      <div class="text-3xl mb-4 font-semibold">Solid.js Storefront</div>
      <div>An open-source e-commerce storefront in Solid.js with TypeScript, GraphQL, URQL & Tailwind CSS. </div>

      <div class="text-lg font-bold mt-8">Primary Goal</div>
      <div>This project aims to provide an open-source template for building e-commerce storefronts using Solid.js. Built for Headless Commerce. </div>

      <div class="text-lg font-bold mt-8">Secondary Goal</div>
      <div>Provide a comprehensive example on how to use GraphQL (and TypeScript) in Solid.js</div>

      <hr class="mt-8" />

      <div class="text-lg font-bold mt-8">How to use it</div>
      <div>Go to the product list, select a product, add it to the cart and see the cart for changes</div>

      <div class="flex gap-4 mt-10">
        <Link href="/products" class="primary-button mt-8">
          Show Products 
        </Link>
        <Link href="/products" class="primary-button mt-8">
          Check Cart 
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
