import React, {useEffect} from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import './index.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector, useDispatch } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';
import {CustomScreen} from './screens/CustomScreen';
import { getCustom } from './actions/customActions';

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };
  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustom());

    return () => {
        //
    };
}, []);


  const {custom, loading, error} = useSelector((state) => state.getCustom);
  const {colorTheme, storeName, logotipo, width, height} = !!custom.length > 0 && custom[0];
  console.log("logotipo", logotipo);
  const style = {
    background: colorTheme
  };

  const logoStyle = {
    width:width,
    height:height,
    paddingBottom:".5rem"
  };

  return (
    <BrowserRouter>
   
        <div className="grid-container">
        <header className="header" style={style}>
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            {!!loading===false && (<Link to="/"><img style={logoStyle}  src={logotipo} alt='' /></Link>)}
          </div>
          <div className="header-links">
            <a href="cart.html">Cart</a>
            {userInfo ? (
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
                <Link to="/signin">Sign In</Link>
              )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown" style={style}>
                <a href="#">Admin</a>
                <ul className="dropdown-content" style={style}>
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/custom">Custom</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul className="categories">
            <li>
              <Link to="/category/Pants" onClick={closeMenu}>Pants</Link>
            </li>

            <li>
              <Link to="/category/Shirts" onClick={closeMenu}>Shirts</Link>
            </li>
          </ul>
        </aside>
        <main className="main" onClick={closeMenu}>
          <div className="content" onClick={closeMenu}>
            <Route path="/orders" component={OrdersScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/custom" component={CustomScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>
        <footer className="footer" style={style}>All right reserved.</footer>
      </div>
     
    </BrowserRouter>
  );
}

export default App;
