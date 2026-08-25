const messageInput = document.querySelector(".search__input");
const sendButton = document.querySelector(".search__voice");
const chatArea = document.querySelector(".chatgpt__content--middle");
const messagesContainer = document.querySelector(".chatgpt__messages");
const suggestions = document.querySelector(".chatgpt__suggestions");

const mockResponses = [
    {
        keywords: ["javascript", "js"],
        response: `
            <p>
                JavaScript is a programming language used to make
                websites interactive and dynamic.
            </p>

            <p>
                It can handle user interactions, manipulate the DOM,
                work with APIs, and manage application state.
            </p>
        `
    },

    {
        keywords: ["javascript", "function"],
        response: `
            <p>
                Here is a simple JavaScript function:
            </p>

            <div class="chat-code">
                <div class="chat-code__header">
                    <span class="chat-code__language">
                        javascript
                    </span>

                    <button
                        type="button"
                        class="chat-code__copy"
                    >
                        Copy
                    </button>
                </div>

                <pre class="chat-code__body"><code>function greet(name) {
    return \`Hello, \${name}!\`;
}

console.log(greet("Ankit"));</code></pre>
            </div>
        `
    },

    {
        keywords: ["palindrome"],
        response: `
            <p>
                Here is a JavaScript function to check whether
                a string is a palindrome:
            </p>

            <div class="chat-code">
                <div class="chat-code__header">
                    <span class="chat-code__language">
                        javascript
                    </span>

                    <button
                        type="button"
                        class="chat-code__copy"
                    >
                        Copy
                    </button>
                </div>

                <pre class="chat-code__body"><code>function isPalindrome(str) {
    const reversed = str
        .split("")
        .reverse()
        .join("");

    return str === reversed;
}

console.log(isPalindrome("madam"));</code></pre>
            </div>
        `
    },

    {
        keywords: ["html"],
        response: `
            <p>
                HTML stands for HyperText Markup Language.
                It provides the structure of a web page.
            </p>

            <p>
                Here is a basic HTML structure:
            </p>

            <div class="chat-code">
                <div class="chat-code__header">
                    <span class="chat-code__language">
                        html
                    </span>

                    <button
                        type="button"
                        class="chat-code__copy"
                    >
                        Copy
                    </button>
                </div>

                <pre class="chat-code__body"><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;My Website&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;h1&gt;Hello World&lt;/h1&gt;

&lt;/body&gt;
&lt;/html&gt;</code></pre>
            </div>
        `
    },

    {
        keywords: ["css", "scss"],
        response: `
            <p>
                CSS is used to style and layout web pages.
            </p>

            <p>
                Here is an example:
            </p>

            <div class="chat-code">
                <div class="chat-code__header">
                    <span class="chat-code__language">
                        css
                    </span>

                    <button
                        type="button"
                        class="chat-code__copy"
                    >
                        Copy
                    </button>
                </div>

                <pre class="chat-code__body"><code>.container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.container h1 {
    font-size: 32px;
    font-weight: 600;
}</code></pre>
            </div>
        `
    },

    {
        keywords: ["flexbox", "flex"],
        response: `
            <p>
                Flexbox is a CSS layout system designed for arranging
                elements in rows or columns.
            </p>

            <div class="chat-code">
                <div class="chat-code__header">
                    <span class="chat-code__language">
                        css
                    </span>

                    <button
                        type="button"
                        class="chat-code__copy"
                    >
                        Copy
                    </button>
                </div>

                <pre class="chat-code__body"><code>.container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
}</code></pre>
            </div>
        `
    },

    {
        keywords: ["grid"],
        response: `
            <p>
                CSS Grid is a two-dimensional layout system that
                allows you to create layouts using rows and columns.
            </p>

            <div class="chat-code">
                <div class="chat-code__header">
                    <span class="chat-code__language">
                        css
                    </span>

                    <button
                        type="button"
                        class="chat-code__copy"
                    >
                        Copy
                    </button>
                </div>

                <pre class="chat-code__body"><code>.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}</code></pre>
            </div>
        `
    },

    {
        keywords: ["python"],
        response: `
            <p>
                Here is a simple Python function:
            </p>

            <div class="chat-code">
                <div class="chat-code__header">
                    <span class="chat-code__language">
                        python
                    </span>

                    <button
                        type="button"
                        class="chat-code__copy"
                    >
                        Copy
                    </button>
                </div>

                <pre class="chat-code__body"><code>def greet(name):
    return f"Hello, {name}!"

print(greet("Ankit"))</code></pre>
            </div>
        `
    },

    {
        keywords: ["hello", "hi", "hey"],
        response: `
            <p>
                Hello! glad to see you, How can I help you today?
            </p>
        `
    }
];

const defaultResponse = `
    <p>
        What is this behaviour? yaar...
    </p>

    <p>
        Ye to aapne mujhe abhi tk sikhaya hi nhi...
    </p>

    <p>
        This is not fair, jo aapne mujhe sikhaya h whi puche...
    </p>
`;

function getMockResponse(message) {
    const text = message.toLowerCase();

    if (
        text.includes("palindrome")
    ) {
        return mockResponses.find(item =>
            item.keywords.includes("palindrome")
        ).response;
    }

    if (
        text.includes("javascript") &&
        (
            text.includes("function") ||
            text.includes("code") ||
            text.includes("write")
        )
    ) {
        return mockResponses.find(item =>
            item.keywords.includes("javascript") &&
            item.keywords.includes("function")
        ).response;
    }

    const matchedResponse = mockResponses.find(item => {
        return item.keywords.some(keyword => {
            return text.includes(keyword);
        });
    });

    return matchedResponse
        ? matchedResponse.response
        : defaultResponse;
}

function createUserMessage(message) {
    const messageElement = document.createElement("div");

    messageElement.className =
        "chat-message chat-message--user";

    messageElement.innerHTML = `
        <div class="message-content">
            <p>${escapeHTML(message)}</p>
        </div>
    `;

    return messageElement;
}

function createAssistantMessage(response) {
    const messageElement = document.createElement("div");

    messageElement.className =
        "chat-message chat-message--assistant";

    messageElement.innerHTML = `
        <div class="message-avatar">
            <img
                src="assets/chat-icon.svg"
                alt=""
                class="icon"
            >
        </div>

        <div class="message-content">

            ${response}

            <div class="message-actions">

                <button
                    type="button"
                    class="message-action copy-message"
                >
                    <img
                        src="assets/copy.svg"
                        alt=""
                        class="icon"
                    >
                </button>

                <button
                    type="button"
                    class="message-action like-message"
                >
                    <img
                        src="assets/like.svg"
                        alt=""
                        class="icon"
                    >
                </button>

                <button
                    type="button"
                    class="message-action dislike-message"
                >
                    <img
                        src="assets/dislike.svg"
                        alt=""
                        class="icon"
                    >
                </button>

                <button
                    type="button"
                    class="message-action regenerate-message"
                >
                    <img
                        src="assets/regenerate.svg"
                        alt=""
                        class="icon"
                    >
                </button>

            </div>

        </div>
    `;

    return messageElement;
}

function createLoadingMessage() {
    const loadingElement = document.createElement("div");

    loadingElement.className =
        "chat-message chat-message--assistant loading-message";

    loadingElement.innerHTML = `
        <div class="message-avatar">
            <img
                src="assets/chat-icon.svg"
                alt=""
                class="icon"
            >
        </div>

        <div class="message-content">
            <div class="thinking">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;

    return loadingElement;
}

function scrollToBottom() {
    chatArea.scrollTo({
        top: chatArea.scrollHeight,
        behavior: "smooth"
    });
}

function escapeHTML(text) {
    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}

function saveUserMessage(message) {
    if (!activeConversationId) {
        return;
    }

    const conversations = getConversations();

    const conversation = conversations.find(
        item => item.id === activeConversationId
    );

    if (!conversation) {
        return;
    }

    conversation.messages.push({
        id: Date.now(),
        role: "user",
        content: message,
        timestamp: new Date().toISOString()
    });

    conversation.updatedAt =
        new Date().toISOString();

    saveConversations(conversations);
}

function saveAssistantMessage(response) {
    if (!activeConversationId) {
        return;
    }

    const conversations = getConversations();

    const conversation = conversations.find(
        item => item.id === activeConversationId
    );

    if (!conversation) {
        return;
    }

    conversation.messages.push({
        id: Date.now(),
        role: "assistant",
        content: response,
        timestamp: new Date().toISOString(),
        actions: {
            liked: false,
            disliked: false
        }
    });

    conversation.updatedAt =
        new Date().toISOString();

    saveConversations(conversations);
}

async function sendMessage() {
    const message = messageInput.value.trim();

    if (!message) {
        return;
    }

    suggestions.style.display = "none";

    if (!activeConversationId) {
        const conversations = getConversations();

        const now =
            new Date().toISOString();

        const newConversation = {
            id: Date.now(),
            title:
                message.length > 40
                    ? `${message.substring(0, 40)}...`
                    : message,
            createdAt: now,
            updatedAt: now,
            messages: []
        };

        conversations.push(newConversation);

        saveConversations(conversations);

        activeConversationId =
            newConversation.id;

        renderChatHistory();
    }

    const userMessage =
        createUserMessage(message);

    messagesContainer.appendChild(
        userMessage
    );

    saveUserMessage(message);

    messageInput.value = "";

    messageInput.style.height = "auto";

    scrollToBottom();

    sendButton.disabled = true;

    const loadingMessage =
        createLoadingMessage();

    messagesContainer.appendChild(
        loadingMessage
    );

    scrollToBottom();

    await new Promise(resolve => {
        setTimeout(resolve, 1200);
    });

    loadingMessage.remove();

    const response =
        getMockResponse(message);

    const assistantMessage =
        createAssistantMessage(response);

    messagesContainer.appendChild(
        assistantMessage
    );

    saveAssistantMessage(response);

    sendButton.disabled = false;

    scrollToBottom();

    renderChatHistory();
}

document.addEventListener("click", async event => {
    const copyButton =
        event.target.closest(".chat-code__copy");

    if (!copyButton) {
        return;
    }

    const codeBlock =
        copyButton.closest(".chat-code");

    const code =
        codeBlock.querySelector("code").textContent;

    try {
        await navigator.clipboard.writeText(code);

        copyButton.textContent = "Copied!";

        setTimeout(() => {
            copyButton.textContent = "Copy";
        }, 1500);

    } catch (error) {
        console.error("Copy failed:", error);
    }
});

sendButton.addEventListener(
    "click",
    sendMessage
);

messageInput.addEventListener(
    "keydown",
    event => {
        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {
            event.preventDefault();

            sendMessage();
        }
    }
);