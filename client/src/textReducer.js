import produce from 'immer';
import store from './store';

export const initialState = {
  text: [],
}

const textReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch(action.type) {
      default:
        return state;
    }
  })

export default textReducer;