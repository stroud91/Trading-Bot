import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from '../../assets/logo.png';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <header>
            <div className="navbar">
                <div className="brand">
                    <NavLink exact to="/">
                        <img src={logo} alt="Logo" className="logo" />
                    </NavLink>
                </div>
                <nav>
                    <ul>
                        <li>
                            <NavLink exact to="/" activeClassName="active">Home</NavLink>
                        </li>
                        {isLoaded && sessionUser && (
                            <>
                                <li>
                                    <NavLink to="/overview" activeClassName="active">Overview</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/positions" activeClassName="active">Positions</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/orders" activeClassName="active">Orders</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/history" activeClassName="active">History</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/market-data" activeClassName="active">Market</NavLink>
                                </li>
                            </>
                        )}
                        <li>
                            <NavLink to="/about" activeClassName="active">About Us</NavLink>
                        </li>
                        <li>
                            <NavLink to="/services" activeClassName="active">Services</NavLink>
                        </li>
                        <li>
                            <NavLink to="/cases" activeClassName="active">Cases</NavLink>
                        </li>
                        <li>
                            <NavLink to="/blog" activeClassName="active">Blog</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" activeClassName="active">Contact Us</NavLink>
                        </li>
                    </ul>
                </nav>
                {isLoaded && (
                    <div className="profile-button">
                        <ProfileButton user={sessionUser} />
                    </div>
                )}
            </div>
        </header>
    );
}

export default Navigation;
