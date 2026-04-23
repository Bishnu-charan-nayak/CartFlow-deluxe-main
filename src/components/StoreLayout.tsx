import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';

/**
 * Wrapper layout for all store (non-admin) routes.
 * Renders Navbar + CartDrawer around the child route via <Outlet />.
 */
const StoreLayout = () => (
  <>
    <Navbar />
    <CartDrawer />
    <Outlet />
  </>
);

export default StoreLayout;
