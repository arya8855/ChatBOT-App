import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import Cookies from "js-cookie";
import { sessionLogout, showToast } from "../lib/utils";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_BACKEND_URL,
  credentials: "include", 
  prepareHeaders: (headers) => {
    const accessToken = Cookies.get("access_token");
    const refreshToken = Cookies.get("refresh_token");

    if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
    if (refreshToken) headers.set("x-refresh-token", refreshToken);

    return headers;
  },
  credentials: "include",
});

export const baseQueryWithInterceptor = async (args, api, extraOptions) => {
  try {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error) {
      const fetchedError = result.error;

      if (fetchedError.status === 440) {
        sessionLogout();
      }

      const errorMessage =
        (fetchedError.data && fetchedError.data.message) ||
        "An error occurred";

      showToast(errorMessage, "error");
    }

    return result;
  } catch (error) {
    const fetchError = error;

    if (fetchError?.status === 440) {
      sessionLogout();
    } else {
      const errorMessage =
        (fetchError.data && fetchError.data.message) ||
        "An error occurred";

      showToast(errorMessage, "error");
    }

    return Promise.reject(error);
  }
};