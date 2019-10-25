import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

class Home extends Component {

	constructor(props) {
		super(props)

		this.goToProducts = this.goToProducts.bind(this)
	}

	goToProducts() {
		this.props.history.push('/products');
	}

	render() {
		return (
			<>
				<div id="home-banner">
					<h1>Welcome to Serverless Pizza</h1>

					<p>
						This is Serverless Pizza. It is a playground for <a href="https://www.iancollington.com/" target="_blank" rel="noopener noreferrer">Ian Collington</a>,
						a Java developer consultant/contractor based in Northamptonshire, to learn about serverless in <strong>AWS</strong>.
					</p>
					<p>
						<i className="fas fa-arrow-down home-banner-scroll-down"/>
					</p>
				</div>

				<div className="container" id="home-intro">
					<p>
						The website is built using <strong>React</strong> hosted in <strong>S3</strong> and served via <strong>CloudFront</strong>.
					</p>
					<p>
						The website is backed by a REST API using <strong>API Gateway</strong> which uses a combination of <strong>Lambda</strong> services/functions
						written in <strong>NodeJS</strong> and <strong>Spring Boot</strong> with data stored in <strong>DynamoDB</strong>.
					</p>
					<p>
						The code is hosted in <a href="https://github.com/serverlesspizza" target="_blank" rel="noopener noreferrer">GitHub</a> with <strong>CodePipeline</strong> providing continuous deployment straight to a development
						environment upon committing to GitHub. The pipeline has a manual approval step to promote the code to production.
					</p>
					<p>
						<strong>CloudFormation</strong> is used as the basis for creating the <strong>CodePipeline</strong> and deploying the infrastructure.
					</p>
					<p>
						<strong>Cognito</strong> is used to handle the authentication and authorisation with <strong>AWS Amplify</strong> used
						in the React application to handle client side auth functions.
					</p>
					<p>
						<button type="button" className="btn btn-primary" onClick={this.goToProducts}>Order some pizza!</button>
					</p>
				</div>
			</>
		);
	}
}

export default withRouter(Home);
