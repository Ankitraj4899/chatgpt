const messageInput = document.querySelector(".search__input");
const sendButton = document.querySelector(".search__voice");
const chatArea = document.querySelector(".chatgpt__content--middle");
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
                Hello! How can I help you today?
            </p>
        `
    }

];


const defaultResponse = `
    <p>
        That's an interesting question.
    </p>

    <p>
        I'm a mock AI response for this frontend project,
        so I don't connect to a real AI API.
    </p>

    <p>
        You can add more predefined responses to the
        JavaScript response collection.
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
                alt="" class="icon"
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
                        alt="" class="icon"
                    >
                </button>


                <button
                    type="button"
                    class="message-action like-message"
                >
                    <img
                        src="assets/like.svg"
                        alt="" class="icon"
                    >
                </button>


                <button
                    type="button"
                    class="message-action dislike-message"
                >
                    <img
                        src="assets/dislike.svg"
                        alt="" class="icon"
                    >
                </button>


                <button
                    type="button"
                    class="message-action regenerate-message"
                >
                    <img
                        src="assets/regenerate.svg"
                        alt="" class="icon"
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
                alt="" class="icon"
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


async function sendMessage() {

    const message = messageInput.value.trim();

    if (!message) {
        return;
    }


    suggestions.style.display = "none";


    const userMessage =
        createUserMessage(message);

    chatArea.appendChild(userMessage);


    messageInput.value = "";

    messageInput.style.height = "auto";


    scrollToBottom();


    sendButton.disabled = true;


    const loadingMessage =
        createLoadingMessage();

    chatArea.appendChild(loadingMessage);

    scrollToBottom();


    await new Promise(resolve => {

        setTimeout(resolve, 1200);

    });


    loadingMessage.remove();


    const response =
        getMockResponse(message);


    const assistantMessage =
        createAssistantMessage(response);

    chatArea.appendChild(assistantMessage);


    sendButton.disabled = false;

    scrollToBottom();
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