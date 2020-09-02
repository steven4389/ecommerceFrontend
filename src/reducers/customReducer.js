import { CHANGE_CUSTOM_REQUEST, CHANGE_CUSTOM_SUCCESS, CHANGE_CUSTOM_FAIL, GET_CUSTOM_REQUEST, GET_CUSTOM_SUCCESS, GET_CUSTOM_FAIL } from "../constants/customConstants";


function updateCustomReducer(state = { custom: [] }, action) {
    switch (action.type) {
      case CHANGE_CUSTOM_REQUEST:
        return { loading: true, custom: [] };
      case CHANGE_CUSTOM_SUCCESS:
        return { loading: false, custom: action.payload };
      case CHANGE_CUSTOM_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }

function getCustomReducer(state = { custom: [] }, action) {
    switch (action.type) {
      case GET_CUSTOM_REQUEST:
        return { loading: true, custom: [] };
      case GET_CUSTOM_SUCCESS:
        return { loading: false, custom: action.payload };
      case GET_CUSTOM_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }

  export {
    getCustomReducer, updateCustomReducer
  };