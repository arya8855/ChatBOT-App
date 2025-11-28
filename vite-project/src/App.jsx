import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthWrapper from "./pages/PrivateRoute";

// Lazy Pages
const LANDING_PAGE = lazy(() => import("./pages/landing/landing"));
const PRIVACY_POLICY_PAGE = lazy(() => import("./pages/landing/privacy-policy"));
const TERMS_CONDITION_PAGE = lazy(() => import("./pages/landing/terms-conditions"));
const SIGN_IN_PAGE = lazy(() => import("./pages/auth/sign-in"));
const SIGN_UP_PAGE = lazy(() => import("./pages/auth/sign-up"));

const DASHBOARD_LAYOUT = lazy(() => import("./pages/dashboard/layout"));
const DASHBOARD_PAGE = lazy(() => import("./pages/dashboard/dashboard"));
const CHAT_PAGE = lazy(() => import("./pages/dashboard/chat"));
const ANALYTICS_PAGE = lazy(() => import("./pages/dashboard/analytics"));
const CHATBOT_SETTING_PAGE = lazy(() => import("./pages/dashboard/chatBotSettings"));
const TEAMS_PAGE = lazy(() => import("./pages/dashboard/team"));
const SETTINGS_PAGE = lazy(() => import("./pages/dashboard/settings"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LANDING_PAGE />} />
          <Route path="/privacy-policy" element={<PRIVACY_POLICY_PAGE />} />
          <Route path="/terms-and-conditions" element={<TERMS_CONDITION_PAGE />} />

          <Route
            path="/auth/sign-in"
            element={<AuthWrapper mode="Auth" element={<SIGN_IN_PAGE />} />}
          />

          <Route
            path="/auth/sign-up"
            element={<AuthWrapper mode="Auth" element={<SIGN_UP_PAGE />} />}
          />

          {/* Private Dashboard Routes */}
          <Route
            path="/app"
            element={<AuthWrapper mode="Private" element={<DASHBOARD_LAYOUT />} />}
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DASHBOARD_PAGE />} />
            <Route path="chat" element={<CHAT_PAGE />} />
            <Route path="chat/:id" element={<CHAT_PAGE isDirect />} />
            <Route path="analytics" element={<ANALYTICS_PAGE />} />
            <Route path="chat-bot-settings" element={<CHATBOT_SETTING_PAGE />} />
            <Route path="teams" element={<TEAMS_PAGE />} />
            <Route path="teams/:id" element={<SETTINGS_PAGE isChild />} />
            <Route path="settings" element={<SETTINGS_PAGE />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

      </Suspense>
    </BrowserRouter>
  );
}

export default App;
