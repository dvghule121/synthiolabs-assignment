import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import ChatPage from "../features/chat/ChatPage";
import DashboardPage from "../features/dashboard/DashboardPage";
import InsightsPage from "../features/insights/InsightsPage";
import TranscriptPage from "../features/transcript/TranscriptPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="insights" element={<InsightsPage />} />
          <Route path="transcript" element={<TranscriptPage />} />
          <Route path="chat" element={<ChatPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
