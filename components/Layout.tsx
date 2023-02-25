import Meta from './Meta';
import { ReactElement } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

type ChildrenType = {
  children?: ReactElement | undefined;
};

const Layout = ({ children }: ChildrenType) => {
  return (
    <>
      <Meta />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};
export default Layout;
