import { baseApi } from "./baseApi";

export const attendanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodayAttendance: builder.query({
      query: (id) => `/attendance/today/${id}`,
      providesTags: (result, error, id) => [
        { type: "Attendance", id: `today-${id}` },
      ],
    }),
    getEmployeeAttendance: builder.query({
      query: (id) => `/attendance/employee/${id}`,
      providesTags: (result, error, id) => [
        { type: "Attendance", id: `employee-${id}` },
      ],
    }),
    getAllAttendance: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            searchParams.append(key, String(value));
          }
        });
        const queryString = searchParams.toString();
        return `/attendance/all${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Attendance"],
    }),
    getMonthlyAttendance: builder.query({
      query: ({ year, month }) =>
        `/employee/attendance/monthly?year=${year}&month=${month}`,
      providesTags: (result, error, { year, month }) => [
        { type: "Attendance", id: `monthly-${year}-${month}` },
      ],
    }),
    updateAttendance: builder.mutation({
      query: ({ id, ...attendanceData }) => ({
        url: `/attendance/${id}`,
        method: "PATCH",
        body: attendanceData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Attendance", id }],
    }),
    deleteAttendance: builder.mutation({
      query: (id) => ({
        url: `/attendance/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Attendance"],
    }),
    checkIn: builder.mutation({
      query: (data) => ({
        url: `/attendance/check-in`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Attendance"],
    }),
  }),
});

export const {
  useGetTodayAttendanceQuery,
  useGetEmployeeAttendanceQuery,
  useGetAllAttendanceQuery,
  useGetMonthlyAttendanceQuery,
  useUpdateAttendanceMutation,
  useDeleteAttendanceMutation,
  useCheckInMutation,
} = attendanceApi;
