const ITEMS_PER_PAGE = 10;

const LIST = 'product/LIST';
const LIST_SUCCESS = 'product/LIST_SUCCESS';
const LIST_FAILURE = 'product/LIST_FAILURE';

const GET = 'product/GET';
const GET_SUCCESS = 'product/GET_SUCCESS';
const GET_FAILURE = 'product/GET_FAILURE';

const NEXT_PAGE = 'product/NEXT_PAGE';
const PREV_PAGE = 'product/PREV_PAGE';

const initialState = {
  list: [],
  currentPage: 0,
  currentPageList: [],
  pagesCount: 0,
  product: null,
  shopName: null,
};

const getPageList = (list, page) => {
  const offset = (page - 1) * ITEMS_PER_PAGE;
  return list.slice(offset, offset + ITEMS_PER_PAGE);
};

export default function reducer(state = initialState, action = {}) {
  if (action.type === LIST_SUCCESS) {
    const { shopName, list } = action.result;

    return {
      ...state,
      shopName,
      list,
      currentPage: 1,
      currentPageList: getPageList(list, 1),
      pagesCount: Math.ceil(list.length / ITEMS_PER_PAGE),
    };
  } else if (action.type === GET_SUCCESS) {
    return {
      ...state,
      product: action.result,
    };
  } else if (action.type === PREV_PAGE) {
    let currentPage = state.currentPage - 1;
    if (currentPage < 1) {
      currentPage = 1;
    }

    return {
      ...state,
      currentPage,
      currentPageList: getPageList(state.list, currentPage),
    };
  } else if (action.type === NEXT_PAGE) {
    let currentPage = state.currentPage + 1;
    if (currentPage > state.pagesCount) {
      currentPage = state.pagesCount;
    }

    return {
      ...state,
      currentPage,
      currentPageList: getPageList(state.list, currentPage),
    };
  }

  return state;
}

export const list = (shopName) => ({
  types: [LIST, LIST_SUCCESS, LIST_FAILURE],
  promise: fetch => fetch(`/api/?shop=${shopName}`)
    .then(res => res.json())
    .then(items => ({ shopName, list: items })),
});

export const get = (shopName, productId) => ({
  types: [GET, GET_SUCCESS, GET_FAILURE],
  promise: fetch => fetch(`/api/?shop=${shopName}&product_id=${productId}`)
    .then(res => res.json())
    .then(data => data[productId]),
});

export const prevPage = () => ({ type: PREV_PAGE });
export const nextPage = () => ({ type: NEXT_PAGE });
