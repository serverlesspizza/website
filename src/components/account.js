import React, {Component} from 'react';
import {connect} from "react-redux";
import Order from "./order";

class Account extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: ''
		};
	}

	sortOnDate(a, b) {
		let dateA = new Date(a.orderDate);
		let dateB = new Date(b.orderDate);

		if (dateA < dateB) {
			return 1;
		}

		if (dateA > dateB) {
			return -1;
		}

		return 0;
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
		const sortedOrders = [].concat(this.props.orders).sort(this.sortOnDate);
		const sections = this.chunk(sortedOrders, 3);

		return (
			<div className="container">
				<h1>My Account</h1>

				{Object.keys(this.props.account).length === 0 && (
					<div className="alert alert-dismissible alert-info">
						<button type="button" className="close" data-dismiss="alert">&times;</button>
						Oh dear! We can't load your account details at this time. Please check again later.
					</div>
				)}

				{Object.keys(this.props.account).length !== 0 && (
					<div className="alert alert-dismissible alert-warning">
						<button type="button" className="close" data-dismiss="alert">&times;</button>
						Please note that the edit functionality is disabled such that personal information cannot be stored using this site.
					</div>
				)}

				<div className="container-fluidsds">
					<h2>Order History</h2>

					{Object.keys(this.props.orders).length === 0 && (
						<p>You haven't yet placed an order!</p>
					)}

					{Object.keys(this.props.orders).length !== 0 && sections.map((group, index) =>
						<div className="card-columns" key={index}>
							{group.map(order => <Order key={order.orderId} order={order}/>)}
						</div>
					)}
				</div>

				{this.props.account.address && (
					<div className="container-fluid">
								<h2>Address</h2>

								<div className="form-group">
									<label htmlFor="numberOrName">House name/number</label>
									<input type="text" className="form-control" id="numberOrName" disabled={true}
										   value={this.props.account.address.numberOrName}
										   placeholder="House name/number"></input>
								</div>
								<div className="form-group">
									<label htmlFor="street">Street</label>
									<input type="text" className="form-control" id="street" disabled={true}
										   value={this.props.account.address.street}
										   placeholder="Street"></input>
								</div>
								<div className="form-group">
									<label htmlFor="county">County</label>
									<input type="text" className="form-control" id="county" disabled={true}
										   value={this.props.account.address.county}
										   placeholder="County"></input>
								</div>
								<div className="form-group">
									<label htmlFor="postcode">Postcode</label>
									<input type="text" className="form-control" id="postcode" disabled={true}
										   value={this.props.account.address.postCode}
										   placeholder="Postcode"></input>
								</div>
								<button type="button" className="btn btn-primary" disabled={true}>Edit</button>
					</div>
				)}

				{this.props.account.payment && (
					<div className="container-fluid">
								<h2>Payment</h2>

								<div className="form-group">
									<label htmlFor="postcode">Name</label>
									<input type="text" className="form-control" id="name"
										   value={this.props.account.payment.name}
										   onChange={this.onInputChange} disabled={true}
										   aria-describedby="emailHelp" placeholder="Card name"></input>
								</div>
								<div className="form-group">
									<label htmlFor="postcode">Number</label>
									<input type="text" className="form-control" id="number"
										   value={this.props.account.payment.number}
										   onChange={this.onInputChange} disabled={true}
										   aria-describedby="emailHelp" placeholder="Card number"></input>
								</div>

						<button type="button" className="btn btn-primary" disabled={true}>Edit</button>
					</div>
				)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		account: state.account,
		orders: state.orderHistory
	};
}

export default connect(mapStateToProps)(Account);
