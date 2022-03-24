import React from 'react';
import logo from '../../images/Logo.svg'
import('./Header.css')

const Header = () => {
    return (
        <div className='header'>
            
            <nav className='nav_container'>
                <img src={logo} alt="" />
                <div className='anchor'>
                    <a>Order</a>
                    <a> Order review</a>
                    <a>Manage Inventory</a>
                   
                </div>
            </nav>
        </div>
    );
};

export default Header;