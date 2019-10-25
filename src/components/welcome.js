import React from 'react';
import {Link} from "react-router-dom";

const Welcome = () => {
	return (
		<div className="container">
			<h1>Welcome</h1>

			<p>
				Thank you for registering. Now please <Link to="/login">login</Link>.
			</p>
		</div>
	)
}

export default Welcome;
