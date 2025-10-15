import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";

// Initial state
const initialState = {
  chats: [],
  selectedChatId: null,
  isLoading: false,
};

// Action types
const ACTIONS = {
  SET_CHATS: "SET_CHATS",
  SELECT_CHAT: "SELECT_CHAT",
  ADD_MESSAGE: "ADD_MESSAGE",
  SET_LOADING: "SET_LOADING",
  UPDATE_LAST_MESSAGE: "UPDATE_LAST_MESSAGE",
  UPDATE_MESSAGE_FEEDBACK: "UPDATE_MESSAGE_FEEDBACK",
  REGENERATE_MESSAGE: "REGENERATE_MESSAGE",
};

// Reducer
function chatReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_CHATS:
      return {
        ...state,
        chats: action.payload,
        selectedChatId: action.payload[0]?.id || null,
      };

    case ACTIONS.SELECT_CHAT:
      return {
        ...state,
        selectedChatId: action.payload,
      };

    case ACTIONS.ADD_MESSAGE:
      const { chatId, message } = action.payload;
      return {
        ...state,
        chats: state.chats.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                messages: [...chat.messages, message],
                lastMessage: message.text || "File attachment",
                lastActive: "now",
              }
            : chat
        ),
      };

    case ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case ACTIONS.UPDATE_LAST_MESSAGE:
      const { chatId: updateChatId, lastMessage, lastActive } = action.payload;
      return {
        ...state,
        chats: state.chats.map((chat) =>
          chat.id === updateChatId ? { ...chat, lastMessage, lastActive } : chat
        ),
      };

    case ACTIONS.UPDATE_MESSAGE_FEEDBACK:
      const { chatId: feedbackChatId, messageId, feedback } = action.payload;
      return {
        ...state,
        chats: state.chats.map((chat) =>
          chat.id === feedbackChatId
            ? {
                ...chat,
                messages: chat.messages.map((msg) =>
                  msg.id === messageId ? { ...msg, feedback } : msg
                ),
              }
            : chat
        ),
      };

    case ACTIONS.REGENERATE_MESSAGE:
      const { chatId: regenChatId, messageId: regenMessageId } = action.payload;
      return {
        ...state,
        chats: state.chats.map((chat) =>
          chat.id === regenChatId
            ? {
                ...chat,
                messages: chat.messages.map((msg) =>
                  msg.id === regenMessageId
                    ? { ...msg, isRegenerating: true }
                    : msg
                ),
              }
            : chat
        ),
      };

    default:
      return state;
  }
}

// Context
const ChatContext = createContext();

// Provider component
export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Actions
  const setChats = useCallback((chats) => {
    dispatch({ type: ACTIONS.SET_CHATS, payload: chats });
  }, []);

  const selectChat = useCallback((chatId) => {
    dispatch({ type: ACTIONS.SELECT_CHAT, payload: chatId });
  }, []);

  const addMessage = useCallback((chatId, message) => {
    dispatch({ type: ACTIONS.ADD_MESSAGE, payload: { chatId, message } });
  }, []);

  const setLoading = useCallback((isLoading) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: isLoading });
  }, []);

  const updateLastMessage = useCallback((chatId, lastMessage, lastActive) => {
    dispatch({
      type: ACTIONS.UPDATE_LAST_MESSAGE,
      payload: { chatId, lastMessage, lastActive },
    });
  }, []);

  const updateMessageFeedback = useCallback((chatId, messageId, feedback) => {
    dispatch({
      type: ACTIONS.UPDATE_MESSAGE_FEEDBACK,
      payload: { chatId, messageId, feedback },
    });
  }, []);

  const regenerateMessage = useCallback((chatId, messageId) => {
    dispatch({
      type: ACTIONS.REGENERATE_MESSAGE,
      payload: { chatId, messageId },
    });
  }, []);

  // Helper functions
  const getSelectedChat = useCallback(() => {
    return state.chats.find((chat) => chat.id === state.selectedChatId);
  }, [state.chats, state.selectedChatId]);

  const sendMessage = useCallback(
    async (text, attachments = []) => {
      if (!state.selectedChatId) return;

      const messageId = Math.random().toString(36).slice(2, 9);
      const timestamp = new Date().toISOString();

      // Add user message
      const userMessage = {
        id: messageId,
        sender: "Me",
        text: text || "",
        attachments: attachments.map((file) => ({
          id: Math.random().toString(36).slice(2, 9),
          name: file.name,
          type: file.type,
          size: file.size,
          preview: file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : null,
        })),
        timestamp,
      };

      addMessage(state.selectedChatId, userMessage);

      // Generate random response after a short delay
      if (text || attachments.length > 0) {
        setLoading(true);

        setTimeout(() => {
          const randomResponse = generateRandomResponse(text, attachments);
          const responseId = Math.random().toString(36).slice(2, 9);
          const responseTimestamp = new Date().toISOString();

          const botMessage = {
            id: responseId,
            sender: getSelectedChat()?.name || "Assistant",
            text: randomResponse,
            timestamp: responseTimestamp,
          };

          addMessage(state.selectedChatId, botMessage);
          setLoading(false);
        }, 2000 + Math.random() * 4000); // Random delay between 2-6 seconds for more realistic feel
      }
    },
    [state.selectedChatId, addMessage, getSelectedChat, setLoading]
  );

  // Random response generator
  const generateRandomResponse = useCallback((text, attachments) => {
    const responses = [
      "That's a great question! Let me help you with that.",
      "I understand your concern. Here's what I think...",
      "Based on the information you've shared, I can provide some insights.",
      "That's an interesting point. Let me elaborate on this topic.",
      "I see what you're getting at. Here's my perspective on this matter.",
      "Thanks for sharing that with me. Here's what I can tell you...",
      "That's a common question in this field. Let me explain...",
      "I appreciate you bringing this up. Here's my analysis...",
      "That's a complex topic. Let me break it down for you.",
      "Great question! This is something many people wonder about.",
      "I can see why you'd ask about that. Here's what I know...",
      "That's a valid concern. Let me address this for you.",
      "Interesting perspective! Here's what I think about that...",
      "I understand your situation. Here's how I would approach this...",
      "That's definitely worth discussing. Here are my thoughts...",
    ];

    const fileResponses = [
      "I can see you've shared some files. Let me review them and get back to you.",
      "Thanks for uploading those documents. I'll analyze them shortly.",
      "I've received your attachments. Let me examine them for you.",
      "I can see the files you've shared. I'll review them and provide feedback.",
      "Thanks for sharing those documents with me. I'll take a look at them.",
    ];

    if (attachments.length > 0) {
      return fileResponses[Math.floor(Math.random() * fileResponses.length)];
    }

    return responses[Math.floor(Math.random() * responses.length)];
  }, []);

  const value = {
    ...state,
    setChats,
    selectChat,
    addMessage,
    setLoading,
    updateLastMessage,
    updateMessageFeedback,
    regenerateMessage,
    getSelectedChat,
    sendMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

// Custom hook
export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
