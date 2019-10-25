import {API, Auth} from "aws-amplify";
import config from "../../config";
import {GET_PRODUCTS, GET_ACCOUNT, GET_ORDER_HISTORY } from '../types';

export async function getProducts() {
	let request = [];

	await API.get(config.productService.name, "", {authorizationType: "AWS_IAM", response: false})
		.then(res => {
			request = res;
		})
		.catch(error => {
			console.log(error);
		});

	return {
		type: GET_PRODUCTS,
		payload: request
	}
}

export async function getAccount() {
	let request = {};

	try {
		const {username} = await Auth.currentAuthenticatedUser();

		await API.get(config.accountService.name, "/" + username, {authorizationType: "AWS_IAM", response: false})
			.then(res => {
				request = res;
			})
			.catch(error => {
				console.log(error);
			})

		return {
			type: GET_ACCOUNT,
			payload: request
		}
	} catch(err) {
		return {
			type: GET_ACCOUNT,
			payload: ''
		}
	}
}

export async function getOrderHistory() {
	let request = {};

	try {
		const {username} = await Auth.currentAuthenticatedUser();

		await API.get(config.orderService.name, "/", {
			queryStringParameters: {
				accountId: username
			},
			authorizationType: "AWS_IAM",
			response: false
		})
			.then(res => {
				request = res;
			})
			.catch(error => {
				console.log(error);
			})

		return {
			type: GET_ORDER_HISTORY,
			payload: request
		}
	} catch(err) {
		return {
			type: GET_ORDER_HISTORY,
			payload: ''
		}
	}
}
