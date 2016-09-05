const LIST = 'shop/LIST';
const LIST_SUCCESS = 'shop/TREE_SUCCESS';
const LIST_FAILURE = 'shop/TREE_FAILURE';

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
  promise: async () => (['aaa', 'bbb', 'ccc']),
  // promise: async client => await client.get('/api/'),
});
