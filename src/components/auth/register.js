import React, {Component} from 'react';
import {Auth} from "aws-amplify";
import FormErrors from "../FormErrors";
import Validate from "../util/FormValidation";

class Register extends Component {

	state = {
		email: "",
		password: "",
		confirmpassword: "",
		errors: {
			cognito: null,
			blankField: false,
			passwordmatch: false
		}
	};

	clearErrorState = () => {
		this.setState({
			errors: {
				cognito: null,
				blankfield: false,
				passwordmatch: false
			}
		});
	}

	register = async event => {
		event.preventDefault();

		// Form validation
		this.clearErrorState();
		const error = Validate(event, this.state);
			console.log(error);
		if (error) {
			this.setState({
				errors: { ...this.state.errors, ...error }
			});
		}

		try {
			const { password, email } = this.state;
			await Auth.signUp({
				username: email,
				password: password,
				attributes: {
					email: email
				}
			});
			this.props.history.push("/welcome");
		} catch (error) {
			let err = null;
			!error.message ? err = { "message": error } : err = error;
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
				<h1>Register</h1>

				<FormErrors formerrors={this.state.errors} />

				<form onSubmit={this.register}>
					<div className="form-group">
						<p className="control has-icons-left has-icons-right">
							<input type="text" className="form-control" id="email"
								   value={this.state.email}
								   onChange={this.onInputChange}
								   autoComplete="username"
								   aria-describedby="usernameHelp" placeholder="e-mail"/>
						</p>
					</div>
					<div className="form-group">
						<p className="control has-icons-left">
							<input type="password" className="form-control" id="password"
								   value={this.state.password}
								   onChange={this.onInputChange}
								   autoComplete="new-password"
								   placeholder="Password"/>
						</p>
					</div>
					<div className="form-group">
						<p className="control has-icons-left">
							<input type="password" className="form-control" id="confirmpassword"
								   value={this.state.confirmpassword}
								   onChange={this.onInputChange}
								   autoComplete="new-password"
								   placeholder="Confirm password"/>
						</p>
					</div>
					<div className="field">
						<p className="control">
							<button type="submit" className="btn btn-primary">Register</button>
						</p>
					</div>
				</form>
			</div>
		);
	}
}

export default Register;
