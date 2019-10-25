import React, {Component} from 'react';
import { connect } from 'react-redux';
import Dinero from 'dinero.js'

class Basket extends Component {

	constructor(props) {
		super(props)

		this.goToCheckout = this.goToCheckout.bind(this)
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

	goToCheckout() {
		this.props.history.push('/checkout');
	}

	render() {
		let basket = this.getBasket();
		let productsInBasket = this.props.products.filter((value, index) => {
			return basket.products.indexOf(value.productId) > -1
		});

		let totalBasketValue = this.calcBasketValue(productsInBasket);
		return (
			<div className="container">
				<h1>Basket</h1>

				{productsInBasket.length === 0 && (
					<div className="alert alert-dismissible alert-info">
						<button type="button" className="close" data-dismiss="alert">&times;</button>
						Your basket is empty. Add some pizza already!
					</div>
				)}

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

				{productsInBasket.length !== 0 && (
					<>
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
								<button type="button" className="btn btn-primary" onClick={this.goToCheckout}>Checkout</button>
							</div>
						</div>
					</>
				)}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		products: state.products
	};
}

export default connect(mapStateToProps)(Basket);
