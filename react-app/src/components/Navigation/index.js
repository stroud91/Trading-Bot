import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul>
			<li>
				<NavLink exact to="/">Home</NavLink>
			</li>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
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
                    <NavLink to="/fees" activeClassName="active">Fees</NavLink>
                </li>
                <li>
                    <NavLink to="/history" activeClassName="active">History</NavLink>
                </li>
                <li>
                    <NavLink to="/market" activeClassName="active">Market</NavLink>
                </li>
		</ul>
	);
}

export default Navigation;
