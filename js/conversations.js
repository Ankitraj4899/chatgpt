const conversations = [
    {
        id: 1,
        title: "Learn JavaScript",
        createdAt: "2026-08-21T09:30:00",
        updatedAt: "2026-08-21T10:15:00",
        messages: [
            {
                id: 101,
                role: "user",
                content: "Explain JavaScript closures",
                timestamp: "2026-08-21T10:00:00"
            },
            {
                id: 102,
                role: "assistant",
                content: "A closure is a function that remembers variables from its outer scope even after the outer function has finished executing.",
                timestamp: "2026-08-21T10:00:02",
                actions: {
                    liked: false,
                    disliked: false
                }
            }
        ]
    },

    {
        id: 2,
        title: "CSS Grid Explanation",
        createdAt: "2026-08-20T14:20:00",
        updatedAt: "2026-08-20T15:10:00",
        messages: [
            {
                id: 201,
                role: "user",
                content: "How does grid-template-columns work?",
                timestamp: "2026-08-20T15:00:00"
            },
            {
                id: 202,
                role: "assistant",
                content: "grid-template-columns defines the columns of a CSS Grid container.",
                timestamp: "2026-08-20T15:00:02",
                actions: {
                    liked: true,
                    disliked: false
                }
            }
        ]
    },

    {
        id: 3,
        title: "Palindrome Function",
        createdAt: "2026-08-18T11:00:00",
        updatedAt: "2026-08-18T11:30:00",
        messages: [
            {
                id: 301,
                role: "user",
                content: "Write a palindrome function in JavaScript",
                timestamp: "2026-08-18T11:20:00"
            },
            {
                id: 302,
                role: "assistant",
                content: "You can check whether a string is a palindrome by comparing it with its reversed version.",
                timestamp: "2026-08-18T11:20:02",
                actions: {
                    liked: false,
                    disliked: false
                }
            }
        ]
    }
];x``