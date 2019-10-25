import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

class Footer extends Component {

	render() {
		return (
			<footer className="bg-light">
				<section>
					<div className="container">
						<div className="row">
							<div className="col-6 col-sm-6 col-md-6 col-lg-6">
								<ul>
									<li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
									<li className="nav-item"><NavLink className="nav-link" to="/products">Products</NavLink></li>
									<li className="nav-item"><NavLink className="nav-link" to="/privacy">Privacy</NavLink></li>
								</ul>
							</div>
							<div className="col-6 col-sm-6 col-md-6 col-lg-6">
								<ul>
									{!this.props.auth.isAuthenticated && (
										<>
											<li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
											<li className="nav-item"><NavLink className="nav-link" to="/register">Register</NavLink></li>
										</>
									)}

									<li className="nav-item"><NavLink className="nav-link" to="/basket">Basket</NavLink></li>

									{this.props.auth.isAuthenticated && (
										<>
											<li className="nav-item"><NavLink className="nav-link" to="/account">My Account</NavLink></li>
											<li className="nav-item"><a className="nav-link" href="/" onClick={this.handleLogout}>Logout</a></li>
										</>
									)}
								</ul>
							</div>
						</div>
					</div>
				</section>

				<section id="bottom-bar" className="container-fluid">
					<div className="container">
						<p>&copy; 2020 Ian Collington</p>
					</div>
				</section>
			</footer>

		)
	}
}

export default Footer;
