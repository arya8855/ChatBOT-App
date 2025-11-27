import { createApi } from "@reduxjs/toolkit/query/react";
import { ROUTES } from "../../lib/route";
import { baseQueryWithInterceptor } from "../../services/rtkService";

const leadAPI = createApi({
  baseQuery: baseQueryWithInterceptor,
  reducerPath: "lead",
  tagTypes: [
    "LeadList",
    "LeadDetails",
    "UserConversation",
    "ChatList",
    "ChatDetails",
    "AssigneeList",
    "LeadAnalytics",
  ],
  endpoints: (builder) => ({
    // Get Lead List
    getLeadList: builder.query({
      query: ({ page = 1, limit = 10, status }) => ({
        url: `${ROUTES.ChatRoute}`,
        params: { page, limit, status },
      }),
      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.status !== previousArg?.status ||
          currentArg?.page !== previousArg?.page ||
          currentArg?.limit !== previousArg?.limit
        );
      },
      providesTags: ["LeadList"],
    }),

    // Get Conversation For End User
    getUserConversation: builder.query({
      query: (leadID) => `${ROUTES.LeadRoute}/${leadID}`,
      providesTags: ["UserConversation"],
    }),

    // USER: Start new conversation
    postNewConversation: builder.mutation({
      query: (body) => ({
        url: ROUTES.LeadRoute,
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserConversation"],
    }),

    // USER: Submit form
    postUserForm: builder.mutation({
      query: (body) => ({
        url: ROUTES.LeadFormRoute,
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserConversation"],
    }),

    // USER: Send message
    putUserMessage: builder.mutation({
      query: ({ leadID, message }) => ({
        url: `${ROUTES.LeadRoute}/${leadID}`,
        method: "PUT",
        body: { leadID, message },
      }),
      invalidatesTags: ["UserConversation"],
    }),

    // --------------------------------------------------------
    // ADMIN / TEAM — DASHBOARD
    // --------------------------------------------------------

    // CHAT LIST
    getChatList: builder.query({
      query: () => ROUTES.TicketRoute, // /chat/ticket
      transformResponse: (response) => response,
      providesTags: ["ChatList"],
    }),

    // CHAT DETAILS (ALL MESSAGES)
    getChatDetail: builder.query({
      query: (ticketID) => `${ROUTES.TicketRoute}/${ticketID}`,
      providesTags: ["ChatDetails"],
    }),

    // GET ASSIGNEE LIST
    getAssigneeList: builder.query({
      query: (ticketID) => `${ROUTES.TicketAssigneeRoute}/${ticketID}`,
      providesTags: ["AssigneeList"],
    }),

    // UPDATE TICKET STATUS
    putChatStatus: builder.mutation({
      query: (data) => ({
        url: ROUTES.TicketStatusRoute, // /chat/ticket/status
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ChatList"],
    }),

    // UPDATE ASSIGNEE
    putAssignee: builder.mutation({
      query: ({ ticketID, assigneeID }) => ({
        url: `${ROUTES.TicketAssigneeRoute}/${ticketID}`,
        method: "PUT",
        body: { assigneeID },
      }),
      invalidatesTags: ["ChatList", "AssigneeList"],
    }),

    // SEND MESSAGE (ADMIN / TEAM)
    putMessage: builder.mutation({
      query: ({ ticketID, message }) => ({
        url: `${ROUTES.TicketRoute}/${ticketID}`,
        method: "PUT",
        body: { message },
      }),
      invalidatesTags: ["ChatDetails"],
    }),

    // ANALYTICS
    getLeadAnalytics: builder.query({
      query: () => ROUTES.AnalyticsRoute,
      providesTags: ["LeadAnalytics"],
    }),

  }),
});

export const {
  useGetLeadListQuery,
  useGetUserConversationQuery,
  usePostNewConversationMutation,
  usePostUserFormMutation,
  usePutUserMessageMutation,

  // Chat Page Endpoints
  useGetChatListQuery,
  useGetChatDetailQuery,
  useGetAssigneeListQuery,
  usePutChatStatusMutation,
  usePutAssigneeMutation,
  usePutMessageMutation,

  // Analytics
  useGetLeadAnalyticsQuery,
} = leadAPI;

export default leadAPI;
