import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const customBaseQuery = fetchBaseQuery({
  baseUrl: "https://68ca91e5430c4476c34a06a2.mockapi.io/recruitment",
  prepareHeaders: async (headers) => {
    const TOKEN = null;
    if (TOKEN) {
      headers.set("Authorization", `Bearer ${TOKEN}`);
    }
    return headers;
  },
});

// export const customBaseQuery = async (args, api, extraOptions) => {
//   const result = await baseQuery(args, api, extraOptions);
//   if (result?.meta && result?.data) {
//     result.data.status = result.meta.response?.status;
//   }
//   return result;
// };
