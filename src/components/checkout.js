import React, {Component} from 'react';
import { connect } from 'react-redux';
import Dinero from 'dinero.js'
import {API} from "aws-amplify";
import config from "../config";

class Checkout extends Component {

	constructor(props) {
		super(props)

		this.placeOrder = this.placeOrder.bind(this)
	}

	getBasket() {
		let existingBasket = localStorage.getItem("BASKET");
		let basket = {};
		existingBasket === null ? basket = {products: []} : basket = JSON.parse(existingBasket);

		return basket;
	}

	saveBasket(basket) {
		localStorage.setItem("BASKET", JSON.stringify(basket));
	}

	removeProductFromBasket(productId) {
		let basket = this.getBasket();
		basket.products = basket.products.filter((item, i) => item !== productId );
		this.saveBasket(basket);
		this.forceUpdate();
	}

	calcBasketValue(basket) {
		let total = Dinero({amount: 0, currency: "GBP"})
			.setLocale('en-GB');

		basket.forEach(item => {
			let productPrice = item.price * 100;
			total = total.add(Dinero({amount: productPrice,  currency: "GBP"}));
		})

		return total.toFormat();
	}

	async placeOrder() {
		let basket = JSON.parse(localStorage.getItem("BASKET"));
		let accountId = this.props.account.accountId;
		let productsInBasket = this.props.products.filter((value, index) => {
			return basket.products.indexOf(value.productId) > -1
		});
		let totalBasketValue = this.calcBasketValue(productsInBasket);

		let order = {
			accountId: accountId,
			products: [...basket.products],
			cost: totalBasketValue,
			status: "ORDER_PLACED"
		}

		await API.post(config.orderService.name, "", {body: order, authorizationType: "AWS_IAM", response: false})
			.then(res => {
				console.log(res);
			})
			.catch(error => {
				console.log(error);
			});

		localStorage.removeItem("BASKET");

		this.props.history.push('/thankyou');
	}

	render() {
		let basket = this.getBasket();
		let productsInBasket = this.props.products.filter((value, index) => {
			return basket.products.indexOf(value.productId) > -1
		});

		let totalBasketValue = this.calcBasketValue(productsInBasket);
		return (
			<div className="container">
				<h1>Checkout</h1>

				<fieldset>
					<legend>Delivery Address</legend>
					{this.props.account.address && (
						<>
							<p>{this.props.account.address.numberOrName} {this.props.account.address.street},
							{this.props.account.address.county}. {this.props.account.address.postCode}</p>
						</>
					)}
				</fieldset>

				<fieldset>
					<legend>Payment Method</legend>
					{this.props.account.payment && (
						<>
							<p>{this.props.account.payment.name}</p>
						</>
					)}
				</fieldset>

				<fieldset>
					<legend>Order Summary</legend>
					{productsInBasket.length !== 0 && productsInBasket.map(item =>
						<div className="row basket-item" key={item.productId}>
							<div className="col-lg-3">
								<img width="200px" src={item.imagePath} alt=""/>
							</div>
							<div className="col-lg-5">
								<p>{item.description}</p>
							</div>
							<div className="col-lg-2">
								<p>£{item.price}</p>
							</div>
							<div className="col-lg-2">
								<button type="button" className="btn btn-primary" onClick={() => this.removeProductFromBasket(item.productId)}>Remove</button>
							</div>
						</div>
					)}

					<div className="row basket-item">
						<div className="col-lg-3">
						</div>
						<div className="col-lg-5">
							<p>Total:</p>
						</div>
						<div className="col-lg-2">
							<p>{totalBasketValue}</p>
						</div>
						<div className="col-lg-2">
							<button type="button" className="btn btn-primary" onClick={this.placeOrder}>Place order</button>
						</div>
					</div>
				</fieldset>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		products: state.products,
		account: state.account
	};
}

export default connect(mapStateToProps)(Checkout);
