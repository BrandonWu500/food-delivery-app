import navStyles from '@/styles/Navbar.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className={navStyles.container}>
      <div className={navStyles.item}>
        <button className="flex">
          <div className={navStyles.phone}>
            <Image src="/images/telephone.png" alt="" width={32} height={32} />
          </div>
          <div>
            <p>ORDER NOW!</p>
            <h3>112 345 6789</h3>
          </div>
        </button>
      </div>
      <div className={navStyles.item}>
        <ul>
          <li>
            <Link href="/">Homepage</Link>
          </li>
          <li>Products</li>
          <li>Menu</li>
          <li>
            <h2>Food Delivery</h2>
          </li>
          <li>Events</li>
          <li>Blog</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className={navStyles.item}>
        <Link href="/cart">
          <div className={navStyles.cart}>
            <Image src="/images/cart.png" alt="" width={32} height={32} />
            <div className={navStyles.badge}>2</div>
          </div>
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;
