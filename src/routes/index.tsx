import { Link } from "solid-app-router";
import { Component } from "solid-js";

const HomePage: Component = () => {
  return (
    <div>
      <div class="text-xl mb-8 font-semibold">Solid.js Storefront</div>
      <Link href="/products" class="primary-button">
        Show Products 
      </Link>
    </div>
  );
};

export default HomePage;
