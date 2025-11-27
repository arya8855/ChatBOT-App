import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slice/user-slice";
import memberAPI from "./slice/member-slice";
import chatbotSettingAPI from "./slice/chatbot-setting-slice";
import leadAPI from "./slice/lead-slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [memberAPI.reducerPath]: memberAPI.reducer,
    [chatbotSettingAPI.reducerPath]: chatbotSettingAPI.reducer,
    [leadAPI.reducerPath]: leadAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      memberAPI.middleware,
      chatbotSettingAPI.middleware,
      leadAPI.middleware
    ),
});
