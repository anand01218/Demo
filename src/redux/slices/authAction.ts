import { baseApi } from "./baseApi";
import { logout } from "./authSlice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        // Clear local state immediately
        dispatch(logout());
        try {
          await queryFulfilled;
        } catch (error) {
          // Ignore server logout errors since local state is already cleared
          // Server logout failed, but local state cleared
        }
      },
    }),
    getUserProfile: builder.query({
      query: () => "/auth/profile",
      providesTags: ["Auth"],
    }),
    updateUserProfile: builder.mutation({
      query: (profileData) => ({
        url: "/auth/profile",
        method: "PUT",
        body: profileData,
      }),
      invalidatesTags: ["Auth"],
    }),
    changePassword: builder.mutation({
      query: (passwordData) => ({
        url: "/auth/change-password",
        method: "POST",
        body: passwordData,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (emailData) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: emailData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
} = authApi;
