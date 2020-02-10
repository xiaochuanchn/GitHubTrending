
import Types from '../../action/types';
const defaultState = {};
export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.TRENDING_REFRESH_SUCCESS: //下拉刷新成功
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          projectModels: action.projectModels,
          items: action.items,
          isloading: false,
          info: action.info,
          hideLoadingMore: false,
          pageIndex: action.pageIndex,
        },
      };
    case Types.TRENDING_REFRESH_FAIL:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isloading: false,
        },
      };
    case Types.TRENDING_REFRESH:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isloading: true,
          info: action.info,
          hideLoadingMore: true,
        },
      };
    case Types.TRENDING_LOAD_MORE_SUCCESS:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          hideLoadingMore: false,
          projectModels: action.projectModels,
          pageIndex: action.pageIndex,
        },
      };
    case Types.TRENDING_LOAD_MORE_FAIL:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          hideLoadingMore: true,
          pageIndex: action.pageIndex,
        },
      };
    default:
      return state;
  }
}
