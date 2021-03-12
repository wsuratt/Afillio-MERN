import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import BecomeVendor from './user/BecomeVendor'
import VendorInfo from './user/VendorInfo'
import SingleUser from './admin/SingleUser'
import AdminDashboard from './admin/AdminDashboard'
import PrivateRoute from './auth/PrivateRoute'
import PrivateAdminRoute from './admin/PrivateAdminRoute'
import Menu from './core/Menu'
import BottomMenu from './core/BottomMenu'
import NewShop from './shop/NewShop'
import Shops from './shop/Shops'
import MyShops from './shop/MyShops'
import Shop from './shop/Shop'
import EditShop from './shop/EditShop'
import NewProduct from './product/NewProduct'
import EditProduct from './product/EditProduct'
import Product from './product/Product'
import BuyProduct from './product/BuyProduct'
import ListItems from './list/ListItems'
import Cart from './cart/Cart'
import StripeConnect from './user/StripeConnect'
import ShopOrders from './order/ShopOrders'
import Order from './order/Order'
import DesktopMenu from './core/DesktopMenu'
import MobileMenu from './core/MobileMenu'
import {BrowserView, MobileView} from "react-device-detect";

const MainRouter = () => {
  return (<div>
      <BrowserView>
        <DesktopMenu/>
      </BrowserView>
      <MobileView>
        <MobileMenu/>
      </MobileView>
      <Switch>
        <Route exact path="/" component={Home}/>
        <PrivateAdminRoute path="/users" component={Users}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
        <Route path="/user/:userId" component={Profile}/>
        <PrivateRoute path="/vendor/register/general" component={BecomeVendor}/>
        <PrivateRoute path="/vendor/register/:userId" component={VendorInfo}/>
        <PrivateAdminRoute path="/admin/dashboard/user/:userId" component={SingleUser}/>
        <PrivateAdminRoute path="/admin/dashboard/users" component={AdminDashboard}/>

        <PrivateRoute path="/list" component={ListItems}/>
        <Route path="/cart" component={Cart}/>
        <PrivateRoute path="/product/:productId" component={Product}/>
        <Route path="/buy/:productId/:userId" component={BuyProduct}/>
        <Route path="/shops/all" component={Shops}/>
        <Route path="/shops/:shopId" component={Shop}/>

        <Route path="/order/:orderId" component={Order}/>
        <PrivateRoute path="/vendor/orders/:shop/:shopId" component={ShopOrders}/>

        <PrivateRoute path="/vendor/shops" component={MyShops}/>
        <PrivateRoute path="/vendor/shop/new" component={NewShop}/>
        <PrivateRoute path="/vendor/shop/edit/:shopId" component={EditShop}/>
        <PrivateRoute path="/vendor/:shopId/products/new" component={NewProduct}/>
        <PrivateRoute path="/vendor/:shopId/:productId/edit" component={EditProduct}/>

        <Route path="/vendor/stripe/connect" component={StripeConnect}/>
      </Switch>
      <BottomMenu/>
    </div>)
}

export default MainRouter
