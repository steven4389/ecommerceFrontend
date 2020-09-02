import Axios from "axios";
import Cookie from "js-cookie";
import { CHANGE_CUSTOM_REQUEST, CHANGE_CUSTOM_SUCCESS, CHANGE_CUSTOM_FAIL, GET_CUSTOM_REQUEST, GET_CUSTOM_SUCCESS, GET_CUSTOM_FAIL } from "../constants/customConstants";

const changeCustom = (custom) => async (dispatch, getState) => {
    
    try {
      dispatch({ type: CHANGE_CUSTOM_REQUEST, payload: custom });
      const { userSignin: { userInfo } } = getState();
      const { data } = await Axios.put("/api/custom/" + custom.id, custom, {
        headers:
          { Authorization: 'Bearer ' + userInfo.token }
      });
      dispatch({ type: CHANGE_CUSTOM_SUCCESS, payload: data })
      console.log("data",data);
    } catch (error) {
      dispatch({ type: CHANGE_CUSTOM_FAIL, payload: error.message });
    }
  }

  const getCustom = () => async (dispatch, getState) => {

    try {
      dispatch({ type: GET_CUSTOM_REQUEST });
      const { userSignin: { userInfo } } = getState();
      const { data } = await Axios.get("/api/custom");
      dispatch({ type: GET_CUSTOM_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: GET_CUSTOM_FAIL, payload: error.message });
    }
  }

export { changeCustom, getCustom}