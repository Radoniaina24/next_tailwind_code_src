import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAPI = createApi({
  reducerPath: "authAPI",
  tagTypes: ["parametre"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => {
        return {
          url: `/users`,
          method: "GET",
        };
      },
      providesTags: ["parametre"],
    }),
    getUserById: builder.query({
      query: (id) => {
        return {
          url: `/users/${id}`,
          method: "GET",
        };
      },
      providesTags: ["parametre"],
    }),
    addUser: builder.mutation({
      query: (obj) => {
        return {
          url: `/users/register`,
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["parametre"],
    }),
    updateUser: builder.mutation({
      query: ({ updateUser, id }) => {
        return {
          url: `/users/update/${id}`,
          method: "PUT",
          body: updateUser,
        };
      },
      invalidatesTags: ["parametre"],
    }),
    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `/users/delete/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["parametre"],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetAllUserQuery,
} = userAPI;
