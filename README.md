# SynthioLabs Chat Application

A modern chat application built with React and Vite, featuring real-time messaging, file attachments, and AI-powered responses.

## Features

- **Real-time Chat Interface**: Clean, modern chat UI with message bubbles and timestamps
- **File Attachments**: Support for image and document uploads with preview functionality
- **Context Management**: React Context API for efficient state management
- **Random AI Responses**: Simulated AI responses with realistic delays
- **Responsive Design**: Mobile-first design that works across all devices
- **Loading States**: Visual feedback during message processing

## Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Context API** - State management

## Setup & Installation

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── features/
│   └── chat/
│       ├── components/          # Chat UI components
│       ├── context/            # Chat state management
│       ├── data/               # Mock data
│       └── ChatPage.jsx        # Main chat page
├── components/                 # Shared components
├── app/                       # App routing and layout
└── main.jsx                   # App entry point
```

## Key Features Implementation

### Chat Context

- Centralized state management for all chat data
- Message sending and receiving logic
- File attachment handling
- Random response generation

### File Attachments

- Support for multiple file types
- Image preview for uploaded images
- PDF and document icons for non-image files
- File size and type validation

### Random Responses

- Contextual responses based on message content
- Special responses for file attachments
- Realistic response delays (1-3 seconds)
- Loading indicators during processing

## Assumptions Made

- No backend integration required (as per assignment)
- File attachments are stored in memory (no persistence)
- Random responses simulate AI behavior
- All chat data is stored in React state
- Mobile responsiveness follows standard breakpoints

## Future Enhancements

- Backend integration for real AI responses
- File persistence and storage
- User authentication
- Message history persistence
- Real-time updates via WebSocket
- Message search and filtering
