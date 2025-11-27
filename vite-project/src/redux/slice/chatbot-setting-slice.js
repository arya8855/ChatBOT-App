import { createApi } from "@reduxjs/toolkit/query/react";
import { ROUTES } from "../../lib/route";
import { baseQueryWithInterceptor } from "../../services/rtkService";

const chatbotSettingAPI = createApi({
  baseQuery: baseQueryWithInterceptor,
  reducerPath: "chatbot",
  tagTypes: ["ChatBotSetting"],
  endpoints: (builder) => ({
    // Get Chatbot Settings
    getChatBotDetails: builder.query({
      query: () => ROUTES.ChatBotSettingRoute,
      providesTags: ["ChatBotSetting"],
    }),

    // Update Chatbot Settings
    updateChatBot: builder.mutation({
      query: (data) => ({
        url: ROUTES.ChatBotSettingRoute,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["ChatBotSetting"],
    }),
  }),
});

export const { useGetChatBotDetailsQuery, useUpdateChatBotMutation } =
  chatbotSettingAPI;

export default chatbotSettingAPI;