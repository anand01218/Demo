import { customBaseQuery } from "./customBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const recruitmentApi = createApi({
  reducerPath: "recruitmentApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Recruitment"],
  endpoints: (builder) => ({
    createRecruitmentStage: builder.mutation({
      query: (recruitmentData) => ({
        url: "/get-recruitment-stage",
        method: "POST",
        body: recruitmentData,
      }),
      invalidatesTags: ["Recruitment"],
    }),
    getRecruitmentStage: builder.query({
      query: () => ({
        url: `/get-recruitment-stage`,
        // params: QP,
      }),
      providesTags: ["Recruitment"],
    }),
    updateRecruitmentStage: builder.mutation({
      query: ({ data, id }) => ({
        url: `/get-recruitment-stage/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Recruitment"],
    }),
    deleteRecruitmentStage: builder.mutation({
      query: (id) => ({
        url: `/get-recruitment-stage/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Recruitment"],
    }),
  }),
  // getRecruitmentList: builder.query({
  //   query: () => ({
  //     url: `/get-recruitment-stage`,
  //     // params: QP,
  //   }),
  //   providesTags: ["Recruitment"],
  // }),
});

export const {
  useCreateRecruitmentStageMutation,
  useGetRecruitmentStageQuery,
  useUpdateRecruitmentStageMutation,
  useDeleteRecruitmentStageMutation,
} = recruitmentApi;
