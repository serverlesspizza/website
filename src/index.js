import React from 'react';
import ReactDOM from 'react-dom';
import config from "./config";
import App from './App';
import Amplify from 'aws-amplify';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducers from './store/reducers';

Amplify.configure({
	Auth: {
		mandatorySignIn: config.cognito.mandatorySignIn,
		region: config.cognito.region,
		userPoolId: config.cognito.userPoolId,
		userPoolWebClientId: config.cognito.userPoolWebClientId,
		identityPoolId: config.cognito.identityPoolId
	},
	API: {
		endpoints: [
			{
				name: config.productService.name,
				endpoint: config.productService.endpoint,
				region: config.productService.region
			},
			{
				name: config.orderService.name,
				endpoint: config.orderService.endpoint,
				region: config.orderService.region
			},
			{
				name: config.accountService.name,
				endpoint: config.accountService.endpoint,
				region: config.accountService.region
			}
		]
	}
});

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<App />
	</Provider>,

	document.getElementById('root')
);
