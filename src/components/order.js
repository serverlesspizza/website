import React, { Component } from 'react';
import {connect} from "react-redux";
import {getOrderHistory} from "../store/actions";

class Order extends Component {

	constructor(props) {
		super(props);
		this.displayProduct = this.displayProduct.bind(this)
	}

	async componentDidMount() {
		this.props.dispatch(getOrderHistory());
	}

	displayProduct = (product) => {
		let productsInBasket = this.props.products.filter((value, index) => {
			return value.productId === product;
		});

		if (productsInBasket.length === 0) {
			return null;
		}

		let productDetail = productsInBasket[0];

		return (
			<ul key={productDetail.productId} className="">
				<li>{productDetail.description}</li>
			</ul>
		)
	}

	getOrderStatus(order) {
		let status = order.status;

		if (status === 'ORDER_PLACED') {
			return "Order placed";
		} else if (status === 'DELIVERED') {
			return "Delivered";
		}

		return "Unknown";
	}

	render() {
		let order = this.props.order;
		let orderStatus = this.getOrderStatus(order);
		let dateFormatOptions = {
			dateStyle: "medium",
			timeStyle: "short"
		}

		if (Object.keys(order).length === 0) {
			return null;
		}

		return (
			<div className="card border-primary mb-3" key={order.orderId}>
				<h4 className="card-header">{new Date(order.orderDate).toLocaleString('en-GB', dateFormatOptions)}</h4>
				<div className="card-body">
					<p><strong>Products:</strong></p>
					{order.products.map(product => this.displayProduct(product))}
					<p><strong>Cost:</strong> {order.cost}</p>
				</div>
				<div className="card-footer">
					<p><strong>Status:</strong> {orderStatus}</p>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		products: state.products
	};
}

export default connect(mapStateToProps)(Order);
