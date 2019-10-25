import React, {Component} from 'react';
import { connect } from 'react-redux';

class Products extends Component {

	getBasket() {
		let existingBasket = localStorage.getItem("BASKET");
		let basket = {};
		existingBasket === null ? basket = {products:[]} : basket = JSON.parse(existingBasket);

		return basket;
	}

	saveBasket(basket) {
		localStorage.setItem("BASKET", JSON.stringify(basket));
	}

	addProductToBasket(productId) {
		let basket = this.getBasket();

		if (basket.products.indexOf(productId) === -1) {
			basket.products = [...basket.products, productId];
			this.saveBasket(basket);
		}
		this.forceUpdate();
	}

	removeProductFromBasket(productId) {
		let basket = this.getBasket();
		basket.products = basket.products.filter((item, i) => item !== productId );
		this.saveBasket(basket);
		this.forceUpdate();
	}

	isProductInBasket(productId) {
		let basket = this.getBasket();
		return basket.products.indexOf(productId) !== -1
	}

	displayAddButtonForProduct(productId) {
		return !this.isProductInBasket(productId);
	}

	displayRemoveButtonForProduct(productId) {
		return this.isProductInBasket(productId);
	}

	chunk(array, size) {
		return array.reduce((chunks, item, i) => {
			if (i % size === 0) {
				chunks.push([item]);
			} else {
				chunks[chunks.length - 1].push(item);
			}
			return chunks;
		}, []);
	}

	render() {
		const sections = this.chunk(this.props.products, 3);

		return (
			<div className="container">
				<h1>Products</h1>

				{this.props.products.length === 0 && (
					<div className="alert alert-dismissible alert-info">
						<button type="button" className="close" data-dismiss="alert">&times;</button>
						Oh dear! We can't load the products at this time. Please check again later.
					</div>
				)}

				{sections.map((group, index) =>
					<div className="card-columns" key={index}>
						{group.map(product =>
							<div className="card border-primary mb-4" key={product.productId}>
								<h4 className="card-header">{product.description}</h4>
								<img style={{height: "200px", width: "100%", display: "block"}}
									 src={product.imagePath} alt=""></img>
								<div className="card-body">
									<p>{product.description}</p>
									<p>£{product.price}</p>
								</div>
								<div className="card-footer">
									{this.displayAddButtonForProduct(product.productId) && (
										<button type="button" className="btn btn-primary" onClick={() => this.addProductToBasket(product.productId)}>Add</button>
									)}
									{this.displayRemoveButtonForProduct(product.productId) && (
										<button type="button" className="btn btn-primary" onClick={() => this.removeProductFromBasket(product.productId)}>Remove</button>
									)}
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		products: state.products
	};
}

export default connect(mapStateToProps)(Products);
