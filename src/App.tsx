
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/index';
import Women from './pages/Women/Women';
import Men from './pages/Men/Men';
import Footer from './pages/Footer/Footer';
import WomenTops from './pages/Women/WomenTops';
import WomenTShirts from './pages/Women/WomenTShirt';
import WomenShoes from './pages/Women/WomenShoes';
import WomenCoats from './pages/Women/WomenCoats';
import WomenDresses from './pages/Women/WomenDresses';
import WomenHoodies from './pages/Women/WomenHoodies';
import MenTops from './pages/Men/MenTops';
import MenTShirts from './pages/Men/MenTShirt';
import MenCoats from './pages/Men/MenCoats';
import MenShoes from './pages/Men/MenShoes';
import MenJeans from './pages/Men/MenJeans';
import MenHoodies from './pages/Men/MenHoodies';
import ProductDetails from './pages/ProductDetailsPage/SingleProductDetails';
import Account from './pages/Account/Account';
import ConfirmedOrder from './components/confirmedOrder/ConfirmedOrder';
import CartEmpty from './components/CartEmpty/CartEmpty';
import NotFound from './components/NotFound/NotFound';
import Login from './pages/Login-SignUp/Login';
import Signup from './pages/Login-SignUp/SignUp';
import ResetPassword from './pages/Login-SignUp/ResetPassword';
import CheckEmail from './pages/Login-SignUp/CheckEmail';
import Verification from './pages/Login-SignUp/Verification';
import NewPassword from './pages/Login-SignUp/NewPassword';
import Cart from './pages/Cart/Cart';
import Wishlist from './pages/Account/Wishlist';
import Orders from './pages/Account/Orders';
import MyInfo from './pages/Account/MyInfo';
import OrderDetails from './pages/Account/OrderDetails';
import CheckOut from './pages/CheckOut/CheckOut';
import { auth } from './firebase/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { clearUser, setUser } from './redux/users/userSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store';

export default function App() {

  const [email,setEmail] = useState<string | null>(null);
  const [name,setName] = useState<string | null>(null);
  const [uid,setUid] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  
  
  useEffect(() => {
    function userState () {
        onAuthStateChanged(auth, (user: User | null) => {
            if (user) {
            const uid = user.uid;
            setUid(uid);
            setEmail(user.email);
            setName(user.displayName);
            dispatch(setUser({ uid, email: user.email, name: user.displayName }));
            // ...
            } else {
            setUid(null);
            setEmail(null);
            setName(null);
            dispatch(clearUser());
            }
        });
    }
    userState();
  }, [dispatch,uid,email,name]);

  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
          <Route path="/"  element={<Home />}/>
          <Route path="/login"  element={<Login />}/>
          <Route path="/check-out"  element={<CheckOut />}/>
          <Route path="account" element={<Account/>}>
            <Route index  element={<Orders />} />
            <Route path='orders'  element={<Orders />} />
            <Route path='my-info' element={<MyInfo/>}/>
            <Route path='wishlist'  element={<Wishlist/>} />
            <Route path=':id'  element={<OrderDetails />} />
          </Route>
          <Route path="/sign-up"  element={<Signup />}/>
          <Route path="/reset-password"  element={<ResetPassword />}/>
          <Route path="/check-email"  element={<CheckEmail />}/>
          <Route path="/verification-code"  element={<Verification />}/>
          <Route path="/new-password"  element={<NewPassword />}/>
          <Route path="/confirmed-order"  element={<ConfirmedOrder />}/>
          <Route path="/cart-empty"  element={<CartEmpty />}/>
          <Route path="/cart"  element={<Cart />}/>
          <Route path=':id' element={<ProductDetails />} />
          <Route path="women" element={<Women/>}>
            <Route index  element={<WomenTops/>} />
            <Route path=':id' element={<ProductDetails />} />
            <Route path='tops'  element={<WomenTops/>} />
            <Route path='tops/:id' element={<ProductDetails />} />
            <Route path='t-shirts' element={<WomenTShirts/>} />
            <Route path='t-shirts/:id' element={<ProductDetails />} />
            <Route path='shoes' element={<WomenShoes/>} />
            <Route path='shoes/:id' element={<ProductDetails />} />
            <Route path='coats' element={<WomenCoats/>}/>
            <Route path='coats/:id' element={<ProductDetails />} />
            <Route path='dresses' element={<WomenDresses/>}/>
            <Route path='dresses/:id' element={<ProductDetails />} />
            <Route path='hoodies' element={<WomenHoodies/>}/>
            <Route path='hoodies/:id' element={<ProductDetails />} />
          </Route>
          
          <Route path="men" element={<Men/>}>
            <Route index  element={<MenTops/>} />
            <Route path=':id' element={<ProductDetails />} />
            <Route path='tops'  element={<MenTops/>} />
            <Route path='tops/:id' element={<ProductDetails />} />
            <Route path='t-shirts' element={<MenTShirts/>} />
            <Route path='t-shirts/:id' element={<ProductDetails />} />
            <Route path='shoes' element={<MenShoes/>} />
            <Route path='shoes/:id' element={<ProductDetails />} />
            <Route path='coats' element={<MenCoats/>}/>
            <Route path='coats/:id' element={<ProductDetails />} />
            <Route path='jeans' element={<MenJeans/>}/>
            <Route path='jeans/:id' element={<ProductDetails />} />
            <Route path='hoodies' element={<MenHoodies/>}/>
            <Route path='hoodies/:id' element={<ProductDetails />} />
          </Route>

          <Route path="*" element={<NotFound/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}