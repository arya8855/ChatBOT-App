import { createApi } from "@reduxjs/toolkit/query/react";
import { ROUTES } from "../../lib/route";
import { baseQueryWithInterceptor } from "../../services/rtkService";

const memberAPI = createApi({
  baseQuery: baseQueryWithInterceptor,
  reducerPath: "member",
  tagTypes: ["MemberDetail", "MemberList", "AssigneeList"],
  endpoints: (builder) => ({
    // Get Members List
    getMemberList: builder.query({
      query: () => ROUTES.MemberRoute,
      providesTags: ["MemberList"],
    }),

    // Get Member Details by ID
    getMemberDetail: builder.query({
      query: (data) => `${ROUTES.MemberRoute}/${data.id}`,
      providesTags: ["MemberDetail"],
    }),

    // Add New Member
    addMember: builder.mutation({
      query: (data) => ({
        url: ROUTES.MemberRoute,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),

      invalidatesTags: ["MemberList"],

      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const tempId = crypto.randomUUID();

        
        const addResult = dispatch(
          memberAPI.util.updateQueryData(
            "getMemberList",
            undefined,
            (draft) => {
              draft.unshift({
                userId: tempId,
                userName: data.name,
                userPhone: "N/A",
                userEmail: data.email,
                userRole: data.designation,
              });
              }
          )
        );

        try {
          await queryFulfilled;
          dispatch(
            memberAPI.endpoints.getMemberList.initiate(undefined, {
              forceRefetch: true,
            })
          );
        } catch {
          addResult.undo();
        }
      },
    }),

    // Update Member Details
    updateMember: builder.mutation({
      query: (data) => ({
        url: `${ROUTES.MemberRoute}/${data.userID}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),

      invalidatesTags: ["MemberDetail"],
    }),

    // Delete Member by ID
    deleteMember: builder.mutation({
      query: (data) => ({
        url: `${ROUTES.MemberRoute}/${data.id}`,
        method: "DELETE",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),

      invalidatesTags: ["MemberList"],

      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          memberAPI.util.updateQueryData(
            "getMemberList",
            undefined,
            (draft) => {
              const index = draft.findIndex((el) => el.userId === data.id);
              if (index !== -1) draft.splice(index, 1);
            }
          )
        );

        try {
          await queryFulfilled;
          dispatch(
            memberAPI.endpoints.getMemberList.initiate(undefined, {
              forceRefetch: true,
            })
          );
        } catch {
          deleteResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetMemberListQuery,
  useGetMemberDetailQuery,
  useAddMemberMutation,
  useUpdateMemberMutation,
  useDeleteMemberMutation,
} = memberAPI;

export default memberAPI;