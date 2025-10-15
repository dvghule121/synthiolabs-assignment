export const chats = [
  {
    id: "1",
    name: "Dr. Emily Chen",
    role: "Medical Oncologist",
    avatar: "/doc.png",
    isGroup: false,
    participants: [
      {
        id: "p1",
        name: "Dr. Emily Chen",
        role: "Medical Oncologist",
        avatar: "/doc.png",
      },
    ],
    lastMessage:
      "What roles do regulatory affairs specialists play in drug approval?",
    lastActive: "2m ago",
    messages: [
      {
        id: "m1",
        sender: "Dr. Emily Chen",
        senderId: "p1",
        senderAvatar: "/doc.png",
        text: "For patients who are NPO (nothing by mouth) prior to a procedure or may have GI prep that could impact absorption, there isn't a specific adjustment required for Zepzelca, since it's administered as an intravenous infusion. Standard dosing can typically proceed as scheduled, but if the procedure timing overlaps with an infusion day, it's generally recommended to coordinate with the GI and infusion teams to avoid conflicts.\n\nIf the patient is experiencing any significant changes in renal or hepatic function related to the procedure or prep, additional monitoring or dose adjustments may be warranted, in line with the prescribing information.",
        timestamp: "2025-10-15T13:30:00Z",
      },
      {
        id: "m2",
        sender: "Me",
        senderId: "me",
        senderAvatar: "/doc.png",
        text: "What roles do regulatory affairs specialists play in drug approval?",
        timestamp: "2025-10-15T13:31:10Z",
      },
      {
        id: "m3",
        sender: "Dr. Emily Chen",
        senderId: "p1",
        senderAvatar: "/doc.png",
        text: "For patients who are NPO (nothing by mouth) prior to a procedure or may have GI prep that could impact absorption, there isn't a specific adjustment required for Zepzelca, since it's administered as an intravenous infusion. Standard dosing can typically proceed as scheduled, but if the procedure timing overlaps with an infusion day, it's generally recommended to coordinate with the GI and infusion teams to avoid conflicts.\n\nIf the patient is experiencing any significant changes in renal or hepatic function related to the procedure or prep, additional monitoring or dose adjustments may be warranted, in line with the prescribing information.",
        timestamp: "2025-10-15T13:30:00Z",
      },
    ],
  },
  {
    id: "2",
    name: "Sarah Patel",
    role: "Clinical Research",
    avatar: "/doc.png",
    isGroup: false,
    participants: [
      {
        id: "p2",
        name: "Sarah Patel",
        role: "Clinical Research",
        avatar: "/doc.png",
      },
    ],
    lastMessage: "How do clinical research associates...",
    lastActive: "10m ago",
    messages: [
      {
        id: "m3",
        sender: "Sarah Patel",
        senderId: "p2",
        senderAvatar: "/doc.png",
        text: "How do clinical research associates contribute...",
        timestamp: "2025-10-15T12:55:00Z",
      },
      {
        id: "m4",
        sender: "Me",
        senderId: "me",
        senderAvatar: "/doc.png",
        text: "Could you clarify CRC vs CRA responsibilities?",
        timestamp: "2025-10-15T12:55:30Z",
      },
    ],
  },
  {
    id: "3",
    name: "Medical Team Discussion",
    role: "Group Chat",
    avatar: null,
    isGroup: true,
    participants: [
      {
        id: "p1",
        name: "Dr. Emily Chen",
        role: "Medical Oncologist",
        avatar: "/doc.png",
      },
      {
        id: "p2",
        name: "Sarah Patel",
        role: "Clinical Research",
        avatar: "/doc.png",
      },
      {
        id: "p3",
        name: "Dr. Rajiv Kumar",
        role: "Radiologist",
        avatar: "/doc.png",
      },
    ],
    lastMessage: "Dr. Emily Chen: Let's discuss the new protocol",
    lastActive: "5m ago",
    messages: [
      {
        id: "g1",
        sender: "Dr. Emily Chen",
        senderId: "p1",
        senderAvatar: "/doc.png",
        text: "Let's discuss the new protocol for the upcoming trial. I'd like everyone's input on the patient selection criteria.",
        timestamp: "2025-10-15T14:20:00Z",
      },
      {
        id: "g2",
        sender: "Sarah Patel",
        senderId: "p2",
        senderAvatar: "/doc.png",
        text: "I think we should include patients with ECOG performance status 0-1. What do you think?",
        timestamp: "2025-10-15T14:22:00Z",
      },
      {
        id: "g3",
        sender: "Dr. Rajiv Kumar",
        senderId: "p3",
        senderAvatar: "/doc.png",
        text: "Agreed. We should also consider the imaging requirements for baseline assessment.",
        timestamp: "2025-10-15T14:25:00Z",
      },
    ],
  },
];

// Available contacts for creating new groups
export const availableContacts = [
  {
    id: "p1",
    name: "Dr. Emily Chen",
    role: "Medical Oncologist",
    avatar: "/doc.png",
  },
  {
    id: "p2",
    name: "Sarah Patel",
    role: "Clinical Research",
    avatar: "/doc.png",
  },
  {
    id: "p3",
    name: "Dr. Rajiv Kumar",
    role: "Radiologist",
    avatar: "/doc.png",
  },
  {
    id: "p4",
    name: "Dr. Anika Verma",
    role: "Pathologist",
    avatar: "/doc.png",
  },
  {
    id: "p5",
    name: "Mr. Thomas Lee",
    role: "Data Manager",
    avatar: "/doc.png",
  },
  {
    id: "p6",
    name: "Ms. Emily Chen",
    role: "Nurse Coordinator",
    avatar: "/doc.png",
  },
];
