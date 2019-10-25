const dev = {
	productService: {
		name: "product-service",
		endpoint: "https://api.dev.serverlesspizza.com/products",
		region: "eu-west-1"
	},
	orderService: {
		name: "order-service",
		endpoint: "https://api.dev.serverlesspizza.com/order",
		region: "eu-west-1"
	},
	accountService: {
		name: "account-service",
		endpoint: "https://api.dev.serverlesspizza.com/account",
		region: "eu-west-1"
	}
}

const prod = {
	productService: {
		name: "product-service",
		endpoint: "https://api.serverlesspizza.com/products",
		region: "eu-west-1"
	},
	orderService: {
		name: "order-service",
		endpoint: "https://api.serverlesspizza.com/order",
		region: "eu-west-1"
	},
	accountService: {
		name: "account-service",
		endpoint: "https://api.serverlesspizza.com/account",
		region: "eu-west-1"
	}
}

const config = process.env.REACT_APP_ENVIRONMENT === 'prod' ? prod : dev;

export default {
	cognito: {
		mandatorySignIn: false,
		region: "eu-west-1",
		userPoolId: process.env.REACT_APP_USER_POOL_ID,
		userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
		identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID
	},
	...config
}

// Shell exports

// export REACT_APP_USER_POOL_ID="eu-west-1_3XfXjQXtf"
// export REACT_APP_USER_POOL_WEB_CLIENT_ID="2otc1gojmd6gnaj2sgdnj2etbi"
// export REACT_APP_IDENTITY_POOL_ID="eu-west-1:2595a5ca-080b-4652-9f5d-a543fa6decfd"
