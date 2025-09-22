import { baseApi } from "./baseApi";

export const roleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Role CRUD operations
    createRole: builder.mutation({
      query: (data) => ({
        url: "/roles",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Role"],
    }),

    getRoles: builder.query({
      query: () => "/roles",
      providesTags: ["Role"],
    }),

    getRoleById: builder.query({
      query: (id) => `/roles/${id}`,
      providesTags: (result, error, id) => [{ type: "Role", id }],
    }),

    updateRole: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/roles/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Role", id },
        "Role",
      ],
    }),

    deleteRole: builder.mutation({
      query: (id) => ({
        url: `/roles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Role"],
    }),

    // Role permissions operations
    assignPermissionsToRole: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/roles/${id}/permissions`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Role", id },
        "Permission",
      ],
    }),

    getAllPermissions: builder.query({
      query: () => "/roles/permissions/all",
      providesTags: ["Permission"],
    }),

    createPermission: builder.mutation({
      query: (data) => ({
        url: "/roles/permissions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Permission"],
    }),

    updatePermission: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/roles/permissions/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Permission", id },
        "Permission",
      ],
    }),

    seedPermissions: builder.mutation({
      query: () => ({
        url: "/roles/permissions/seed",
        method: "POST",
      }),
      invalidatesTags: ["Permission"],
    }),

    assignUserToRole: builder.mutation({
      query: (data) => ({
        url: "/roles/assign-user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Role", "User"],
    }),
  }),
});

export const {
  useCreateRoleMutation,
  useGetRolesQuery,
  useGetRoleByIdQuery,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useAssignPermissionsToRoleMutation,
  useGetAllPermissionsQuery,
  useCreatePermissionMutation,
  useUpdatePermissionMutation,
  useSeedPermissionsMutation,
  useAssignUserToRoleMutation,
} = roleApi;
