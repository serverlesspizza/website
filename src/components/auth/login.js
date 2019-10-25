import React, {Component} from 'react';
import {Auth} from "aws-amplify";
import FormErrors from "../FormErrors";
import Validate from "../util/FormValidation";
import {connect} from "react-redux";
import {getAccount, getOrderHistory} from "../../store/actions";

class Login extends Component {

	state = {
		username: "",
		password: "",
		errors: {
			cognito: null,
			blankField: false
		}
	};

	clearErrorState = () => {
		this.setState({
			errors: {
				cognito: null,
				blankfield: false
			}
		});
	};

	loginUser = async event => {
		event.preventDefault();

		// Form validation
		this.clearErrorState();
		const error = Validate(event, this.state);
		if (error) {
			this.setState({
				errors: {...this.state.errors, ...error}
			});
		}

		try {
			const user = await Auth.signIn(this.state.username, this.state.password);
			this.props.auth.setAuthStatus(true);
			this.props.auth.setUser(user);
			this.props.history.push("/");
			this.props.dispatch(getAccount());
			this.props.dispatch(getOrderHistory());
		} catch (error) {
			let err = null;
			!error.message ? err = {"message": error} : err = error;
			this.setState({
				errors: {
					...this.state.errors,
					cognito: err
				}
			});
		}
	}

	onInputChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
		document.getElementById(event.target.id).classList.remove("is-danger");
	};

	render() {
		return (
			<div className="container">
				<h1>Login</h1>

				<FormErrors formerrors={this.state.errors}/>

				<form onSubmit={this.loginUser}>
					<div className="field">
						<p className="control">
							<input type="text" className="form-control" id="username"
								   value={this.state.username}
								   onChange={this.onInputChange}
								   autoComplete="current-password"
								   aria-describedby="usernameHelp" placeholder="e-mail"/>
						</p>
					</div>
					<div className="field">
						<p className="control has-icons-left">
							<input type="password" className="form-control" id="password"
								   value={this.state.password}
								   onChange={this.onInputChange}
								   autoComplete="current-password"
								   placeholder="Password"/>
						</p>
					</div>
					<div className="field">
						<p className="control">
							<button type="submit" className="btn btn-primary">Login</button>
						</p>
					</div>
				</form>
			</div>
		);
	}
}

export default connect()(Login);
