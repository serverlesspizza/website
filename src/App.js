import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Welcome from "./components/welcome";
import Thankyou from "./components/thankyou";
import Basket from "./components/basket";
import Checkout from "./components/checkout";
import Account from "./components/account";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./components/home";
import Products from "./components/products";
import {Auth} from "aws-amplify";
import { connect } from 'react-redux';
import {getProducts, getAccount, getOrderHistory} from "./store/actions";

class App extends Component {

	state = {
		isAuthenticated: false,
		isAuthenticating: true,
		user: null
	}

	setAuthStatus = authenticated => {
		this.setState({isAuthenticated: authenticated});
	}

	setUser = user => {
		this.setState({user: user});
	}

	async componentDidMount() {
		try {
			await Auth.currentSession();
			this.setAuthStatus(true);

			const user = await Auth.currentAuthenticatedUser();
			this.setUser(user);

			this.props.dispatch(getAccount());
			this.props.dispatch(getOrderHistory());
		} catch (error) {
			console.log(error);
		}

		this.props.dispatch(getProducts());

		this.setState({isAuthenticating: false});
	}

	render() {
		const authProps = {
			isAuthenticated: this.state.isAuthenticated,
			user: this.state.user,
			setAuthStatus: this.setAuthStatus,
			setUser: this.setUser
		}

		return (
			!this.state.isAuthenticating &&
			<div>
				<Router>
					<Header auth={authProps}/>
					<Switch>
						<Route exact path="/" render={(props) => <Home {...props} auth={authProps}/>}/>
						<Route exact path="/products" render={(props) => <Products {...props} auth={authProps}/>}/>
						<Route exact path="/about" render={(props) => <Home {...props} auth={authProps}/>}/>
						<Route exact path="/login" render={(props) => <Login {...props} auth={authProps}/>}/>
						<Route exact path="/account" render={(props) => <Account {...props} auth={authProps}/>}/>
						<Route exact path="/register" render={(props) => <Register {...props} auth={authProps}/>}/>
						<Route exact path="/welcome" render={(props) => <Welcome {...props} auth={authProps}/>}/>
						<Route exact path="/thankyou" render={(props) => <Thankyou {...props} auth={authProps}/>}/>
						<Route exact path="/basket" render={(props) => <Basket {...props} auth={authProps}/>}/>
						<Route exact path="/checkout" render={(props) => <Checkout {...props} auth={authProps}/>}/>
						<Route exact path="/logout" render={(props) => <Home {...props} auth={authProps}/>}/>
					</Switch>
					<Footer auth={authProps}/>
				</Router>
			</div>
		);
	}
}

// function mapStateToProps(state) {
// 	return {
// 		products: state.products,
// 		account: state.account
// 	};
// }

export default connect()(App);
