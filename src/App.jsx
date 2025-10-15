import AppRouter from "./app/AppRouter";
import { ChatProvider } from "./features/chat/context/ChatContext";

export default function App() {
  return (
    <ChatProvider>
      <AppRouter />
    </ChatProvider>
  );
}
