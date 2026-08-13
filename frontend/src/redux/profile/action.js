import axiosInstance from "../../utils/axiosInstance";
import {
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  changePasswordStart,
  changePasswordSuccess,
  changePasswordFailure,
} from "./reducer";

export const updateProfile = (payload) => async (dispatch) => {
  dispatch(updateProfileStart());
  try {
    const { data } = await axiosInstance.patch("/auth/profile", payload);
    dispatch(updateProfileSuccess(data.user));
    return data;
  } catch (error) {
    dispatch(
      updateProfileFailure(
        error.response?.data?.message ?? "Failed to update profile",
      ),
    );
    throw error;
  }
};

export const changePassword = (payload) => async (dispatch) => {
  dispatch(changePasswordStart());
  try {
    const { data } = await axiosInstance.patch(
      "/auth/change-password",
      payload,
    );
    dispatch(changePasswordSuccess());
    return data;
  } catch (error) {
    dispatch(
      changePasswordFailure(
        error.response?.data?.message ?? "Failed to change password",
      ),
    );
    throw error;
  }
};
