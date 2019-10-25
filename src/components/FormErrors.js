import React from "react";

function FormErrors(props) {
	if (
		props.formerrors &&
		(props.formerrors.blankfield || props.formerrors.passwordmatch)
	) {
		return (
			<div className="alert alert-dismissible alert-danger">
				<button type="button" className="close" data-dismiss="alert">&times;</button>
					{props.formerrors.passwordmatch
						? "Password value does not match confirm password value"
						: ""}

					{props.formerrors.blankfield ? "All fields are required" : ""}
			</div>
		);
	} else if (props.apierrors) {
		return (
			<div className="alert alert-dismissible alert-danger">
				<button type="button" className="close" data-dismiss="alert">&times;</button>
				{props.apierrors}
			</div>
		);
	} else if (props.formerrors && props.formerrors.cognito) {
		return (
			<div className="alert alert-dismissible alert-danger">
				<button type="button" className="close" data-dismiss="alert">&times;</button>
					{props.formerrors.cognito.message}
			</div>
		);
	} else {
		return <div />;
	}
}

export default FormErrors;
