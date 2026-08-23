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
        keywords: ["html"],

        response: `
            <p>
                HTML stands for HyperText Markup Language.
                It provides the structure of a web page.
            </p>

            <p>
                Common HTML elements include headings, paragraphs,
                buttons, forms, images, and links.
            </p>
        `
    },

    {
        keywords: ["css", "scss"],

        response: `
            <p>
                CSS is used to style and layout web pages.
            </p>

            <p>
                SCSS extends CSS with features such as variables,
                nesting, mixins, and reusable functions.
            </p>
        `
    },

    {
        keywords: ["flexbox", "flex"],

        response: `
            <p>
                Flexbox is a CSS layout system designed for arranging
                elements in rows or columns.
            </p>

            <p>
                It is especially useful for aligning elements and
                distributing available space inside a container.
            </p>
        `
    },

    {
        keywords: ["grid"],

        response: `
            <p>
                CSS Grid is a two-dimensional layout system that allows
                you to create layouts using rows and columns.
            </p>

            <p>
                It is useful for creating complex page layouts while
                keeping the HTML structure clean.
            </p>
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