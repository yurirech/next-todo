import { IS_CHECKED } from '../constants/todo-item';

const initialState = {
  isChecked: null,
}

export const isChecked = (state = initialState, action: any = {}) => {
  switch(action.type) {
    case IS_CHECKED: {
     return {
      ...state,
      isChecked: action.payload
     }
    }
    default:
      return state;
  }
};