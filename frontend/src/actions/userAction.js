import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_REQUEST,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_SUCCESS,
  CLEAR_ERRORS
} from "../constants/userConstant";

import axios from "axios";
import baseUrl from "../baseUrl";
import cookie from "js-cookie";


// LOGIN
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await axios.post(
      `${baseUrl}/api/v1/login`,
      { email, password },
      { withCredentials: true }
    );

    cookie.set("token", data.token, { expires: 2 });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user
    });

  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response?.data?.error || error.message
    });
  }
};


// REGISTER / SIGNUP
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const { data } = await axios.post(
      `${baseUrl}/api/v1/signup`,
      userData,
      { withCredentials: true }
    );

    cookie.set("token", data.token, { expires: 2 });

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.user
    });

  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response?.data?.error || error.message
    });
  }
};


// LOAD USER
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(
      `${baseUrl}/api/v1/me`,
      { withCredentials: true }
    );

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user
    });

  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: null
    });
  }
};


// LOGOUT
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`${baseUrl}/api/v1/logout`, { withCredentials: true });

    cookie.remove("token");

    dispatch({ type: LOGOUT_SUCCESS });

  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response?.data?.error || error.message
    });
  }
};


// UPDATE PROFILE
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const { data } = await axios.put(
      `${baseUrl}/api/v1/me/update`,
      userData,
      { withCredentials: true }
    );

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.updatedUser
    });

  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response?.data?.error || error.message
    });
  }
};


// CLEAR ERRORS
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
