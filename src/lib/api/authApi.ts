import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../features/auth/authSlice";
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as { auth: { token: string | null } };
    const { token } = state.auth;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

async function baseQueryWithReauth(args: any, api: any, extraOptions: any) {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 403) {
    console.log("sending refresh token ");
    const refreshResult = await baseQuery(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/refresh`,
      api,
      extraOptions
    );
    console.log(refreshResult);
    if (refreshResult?.data) {
      const { user } = api.getState().auth;
      // store new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      //retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut);
    }
  }
  return result;
}
export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (obj) => {
        return {
          url: `/users/register`,
          method: "POST",
          body: obj,
        };
      },
    }),
    loginUser: builder.mutation({
      query: (credentials) => {
        return {
          url: `/users/login`,
          method: "POST",
          body: { credentials },
        };
      },
    }),
  }),
});
export const { useAddUserMutation, useLoginUserMutation } = authAPI;
