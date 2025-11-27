const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL
export const ROUTES = {
  LoginRoute: `${BACKEND_URL}/auth/login`,
  RegisterRoute: `${BACKEND_URL}/auth/register`,
  LogoutRoute: `${BACKEND_URL}/auth/logout`,
  MemberRoute: `${BACKEND_URL}/auth/user`,

  // Panel Routes
  ChatBotSettingRoute: `${BACKEND_URL}/chat/bot-settings`,
  AnalyticsRoute: `${BACKEND_URL}/chat/analytics`,
  TicketStatusRoute: `${BACKEND_URL}/chat/ticket/status`,
  TicketAssigneeRoute: `${BACKEND_URL}/chat/ticket/assignee`,
  TicketRoute: `${BACKEND_URL}/chat/ticket`,
  ChatRoute: `${BACKEND_URL}/chat`,

  // Lead Routes
  LeadRoute: `${BACKEND_URL}/lead`,
  LeadFormRoute: `${BACKEND_URL}/lead/form`,
};