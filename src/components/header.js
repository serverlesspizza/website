import React, {Component} from 'react';
import { NavLink } from "react-router-dom";
import { Auth } from "aws-amplify";
import {connect} from "react-redux";
import {getAccount, getOrderHistory} from "../store/actions";

class Header extends Component {

	constructor(props) {
		super(props);
		this.toggleNavbar = this.toggleNavbar.bind(this);
		this.state = {
			collapsed: true,
		};
	}

	handleLogout = async event => {
		event.preventDefault();
		try {
			await Auth.signOut();
			this.props.auth.setAuthStatus(false);
			this.props.auth.setUser(null);
			this.props.history.push("/"); // This fails - maybe because the auth bit removes all props?????
			this.props.dispatch(getAccount());
			this.props.dispatch(getOrderHistory());
		} catch(error) {
			console.log(error);
		}
	}

	toggleNavbar() {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	}

	render() {
		const navbarCollapsed = this.state.collapsed;
		const menuClass = navbarCollapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
		const toggleButtonClass = navbarCollapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';

		return (
			<nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
				<a className="navbar-brand" href="/">Serverless Pizza</a>
				<button className={`${toggleButtonClass}`} type="button" data-toggle="collapse"
						onClick={this.toggleNavbar}
						data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
						aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className={`${menuClass}`} id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
						<li className="nav-item"><NavLink className="nav-link" to="/products">Products</NavLink></li>
					</ul>
					<ul className="navbar-nav ml-auto">
						{!this.props.auth.isAuthenticated && (
							<>
								<li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
								<li className="nav-item"><NavLink className="nav-link" to="/register">Register</NavLink></li>
							</>
						)}

						<li className="nav-item"><NavLink className="nav-link" to="/basket"><i className="fas fa-shopping-basket"/></NavLink></li>

						{this.props.auth.isAuthenticated && (
							<>
								<li className="nav-item"><NavLink className="nav-link" to="/account"><i className="fas fa-user"/></NavLink></li>
								<li className="nav-item"><a className="nav-link" href="/" onClick={this.handleLogout}>Logout</a></li>
							</>
						)}
					</ul>
				</div>
			</nav>
		)
	}
}

export default connect()(Header);
