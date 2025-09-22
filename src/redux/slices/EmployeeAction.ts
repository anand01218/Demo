import { baseApi } from "./baseApi";

export const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createEmployee: builder.mutation({
      query: (employeeData) => ({
        url: "/employee/create",
        method: "POST",
        body: employeeData,
      }),
      invalidatesTags: ["Employee"],
    }),
    getEmployeeList: builder.query({
      query: (QP) => ({
        url: `/employee/list/`,
        params: QP,
      }),
      providesTags: ["Employee"],
    }),
    getEmployeeProfile: builder.query({
      query: (id) => `/employee/profile/${id}`,
      providesTags: (result, error, id) => [{ type: "Employee", id }],
    }),
    updateEmployee: builder.mutation({
      query: ({ id, ...employeeData }) => ({
        url: `/employee/update/${id}`,
        method: "PATCH",
        body: employeeData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Employee", id }],
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/employee/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employee"],
    }),
    getEmployeesByDepartment: builder.query({
      query: (id) => `/employee/department/${id}`,
      providesTags: (result, error, id) => [
        { type: "Employee", id: `department-${id}` },
      ],
    }),
  }),
});

export const {
  useCreateEmployeeMutation,
  useGetEmployeeListQuery,
  useGetEmployeeProfileQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetEmployeesByDepartmentQuery,
} = employeeApi;
