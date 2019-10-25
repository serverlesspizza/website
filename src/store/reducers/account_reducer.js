import { GET_ACCOUNT } from '../types';

export default function(state={}, action) {
	switch(action.type) {
	case GET_ACCOUNT:
		return action.payload;
		default:
			return state
	}
}
