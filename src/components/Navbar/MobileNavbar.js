import React, { Fragment, useState } from 'react';
import './Navbar.css';
import logo from "../../assets/icons/logo-shoply.png";
import { Link } from 'react-router-dom';
import searchIcon from "../../assets/icons/search-icon.svg";
import likeIcon from "../../assets/icons/like.svg";
import cartIcon from "../../assets/icons/cart.svg";
import userIcon from "../../assets/icons/user.svg";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

export default function MobileNavbar() {
    const [showNavbar, setShowNavbar] = useState(false);
    return (
        <Fragment>
                        <div className='lg:hidden block '>
            <nav className=''>
                <div className={showNavbar? "hidden" : "block" }>
                <div className='flex justify-between'>
                <button className=' ' onClick={() => setShowNavbar(!showNavbar)}>
                <RxHamburgerMenu className='w-6 h-6 text-darkText' />
                </button>
                <div className='logoNavbar'>
                    <img src={logo} alt='logo' height="45px" width="91px"/>
                </div>
                <div></div>
                </div>
                </div>

                <div className={showNavbar? "block" : "hidden" }>
                <div className='fixed inset-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80'></div>
                <div className='w-11/12 mobileDisplay bg-white z-30 h-full absolute left-0 top-0 py-6 px-8 shadow-lg'>

                <div className=''>

                <div className='flex justify-between'>
                <div></div>
                    <div className='relative'>
                        <img className='searchIcon absolute' src={searchIcon} alt='search'/>
                        <input className='searchbar bg-secondary' type="search" name="searchNav" placeholder='Search'/>
                    </div>
                    <button className=' ' onClick={() => setShowNavbar(!showNavbar)}>
                    <IoClose className='w-6 h-6 text-darkText'/>
                    </button>
                </div>

                <div className="nav-items text-center">
                <ul className=''>
                    <li><Link to="/">Shop</Link></li>
                    <li><Link to="/men">Men</Link></li>
                    <li><Link to="/women">Women</Link></li>
                </ul>
                </div>
                </div>
                
                <div className=''>
                    <div className='flex justify-center icons'>
                        <div className='bg-secondary likeIcon'>
                            <img src={likeIcon} alt='like'/>
                        </div>
                        <div className='bg-secondary userIcon'>
                            <img src={userIcon} alt='user'/>
                        </div>
                        <div className='bg-secondary cartIcon'>
                            <img src={cartIcon} alt='cart'/>
                        </div>
                    </div>
                </div>
                </div>
                </div>
            </nav>
            </div>
        </Fragment>
    ) 
}