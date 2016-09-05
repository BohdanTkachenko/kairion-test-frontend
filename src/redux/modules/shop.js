const LIST = 'shop/LIST';
const LIST_SUCCESS = 'shop/LIST_SUCCESS';
const LIST_FAILURE = 'shop/LIST_FAILURE';

const initialState = {
  list: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LIST_SUCCESS:
      return {
        ...state,
        list: action.result,
      };
    default:
      return state;
  }
}

export const list = () => ({
  types: [LIST, LIST_SUCCESS, LIST_FAILURE],
  promise: fetch => fetch('/api/shops')
    .then(res => res.json()),
});
