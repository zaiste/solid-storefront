import { Link } from "solid-app-router";

const styles = {
  background: 'bg-white shadow-sm',
  container: 'max-w-7xl mx-auto',
  menu: 'flex justify-between h-16',
  menuSection: 'flex space-x-8 h-full',
  menuLink: 'font-bold text-gray-700 hover:text-blue-400 z-10 flex items-center text-sm'
}

export const Navbar = () => {
  return (
    <div class={styles.background}>
      <div class={styles.container}>
        <div class={styles.menu}>
          <div class={styles.menuSection}>
            <Link href="/">
              <a class={styles.menuLink} aria-expanded="false">
                All Products 
              </a>
            </Link>
          </div>

          <div class={styles.menuSection}>
          </div>
        </div>
      </div>
    </div>
  );
};