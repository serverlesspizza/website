import { GET_PRODUCTS } from '../types';

export default function(state=[], action) {
	switch(action.type) {
	case GET_PRODUCTS:
		return action.payload;
		default:
			return state
	}
}
