import { combineReducers } from 'redux';
import products from './products_reducer';
import account from './account_reducer';
import orderHistory from './order_history_reducer';

const rootReducer = combineReducers({
	products, account, orderHistory
})

export default rootReducer;
