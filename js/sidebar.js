let activeConversationId = null
const sidebar = document.querySelector(".chatgpt__sidebar");
const overlay = document.querySelector(".chatgpt__sidebar-overlay");
const collapseBtn = document.querySelector(".collapse--btn");
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mobileMenuIcon = mobileMenuBtn.querySelector("img");
const chatHistory = document.querySelector(".chat-history");
const searchButton = document.querySelector(".search--icon");
const searchBox = document.querySelector(".chatgpt__sidebar--search");
const searchInput = document.querySelector(".sidebar-search-input");
const searchBack = document.querySelector(".sidebar-search-back");
const searchClear = document.querySelector(".sidebar-search-clear");


collapseBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
});
searchButton.addEventListener("click", () => {
    if (sidebar.classList.contains("collapsed")) {
        sidebar.classList.remove("collapsed");
    }

    searchBox.classList.add("active");

    searchInput.focus();
});
searchBack.addEventListener("click", () => {
    searchBox.classList.remove("active");

    searchInput.value = "";

    renderChatHistory();
});

searchClear.addEventListener("click", () => {
    searchInput.value = "";

    searchInput.focus();

    renderChatHistory();
});
searchInput.addEventListener("input", () => {
    const searchTerm =
        searchInput.value.trim().toLowerCase();

    if (!searchTerm) {
        renderChatHistory();
        return;
    }

    const conversations =
        getConversations();

    const filteredConversations =
        conversations.filter((conversation) => {
            return conversation.title
                .toLowerCase()
                .includes(searchTerm);
        });

    renderChatHistory(filteredConversations);
});
mobileMenuBtn.addEventListener("click", () => {
    const isOpen = sidebar.classList.contains("open");

    if (isOpen) {
        sidebar.classList.remove("open");
        overlay.classList.remove("active");

        mobileMenuIcon.src = "assets/menu.svg";
    } else {
        sidebar.classList.add("open");
        overlay.classList.add("active");

        mobileMenuIcon.src = "assets/close.svg";
    }
});
overlay.addEventListener("click", () => {
    sidebar.classList.remove("open");

    overlay.classList.remove("active");

    mobileMenuIcon.src = "assets/menu.svg";
});
function formatDate(date) {
    const today = new Date();
    const targetDate = new Date(date);

    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    const difference = (today - targetDate) / (1000 * 60 * 60 * 24);

    if (difference === 0) {
        return "Today";
    }

    if (difference === 1) {
        return "Yesterday";
    }

    if (difference <= 7) {
        return "Previous 7 days";
    }

    return "Older";
}
function createChatItem(conversation) {
    const item = document.createElement("div");

    item.className = "chat-item";

    item.dataset.id = conversation.id;

    item.innerHTML = `
        <span>${escapeHTML(conversation.title)}</span>

        <div class="chat-item__actions">

            <button
                class="chat-item__pin icon"
                type="button"
            >
                <img
                    src="assets/pin.svg"
                    alt="pin"
                >
            </button>

            <button
                class="chat-item__more icon"
                type="button"
            >
                <img
                    src="assets/more.svg"
                    alt="More"
                >
            </button>

        </div>
    `;

    item.addEventListener("click", (event) => {
        if (
            event.target.closest(
                ".chat-item__actions"
            )
        ) {
            return;
        }

        openConversation(
            conversation.id
        );
    });

    return item;
}
function renderChatHistory(conversations = getConversations()) {
    if (!chatHistory) {
        return;
    }

    chatHistory.innerHTML = "";

    const groups = {
        Today: [],
        Yesterday: [],
        "Previous 7 days": [],
        Older: []
    };

    conversations
        .sort(
            (a, b) =>
                new Date(b.updatedAt) -
                new Date(a.updatedAt)
        )
        .forEach((conversation) => {
            const group =
                formatDate(
                    conversation.updatedAt
                );

            if (groups[group]) {
                groups[group].push(
                    conversation
                );
            }
        });

    let hasResults = false;

    Object.entries(groups).forEach(
        ([groupName, groupConversations]) => {

            if (!groupConversations.length) {
                return;
            }

            hasResults = true;

            const groupTitle = document.createElement("p");

            groupTitle.className = "chat-title";

            groupTitle.textContent = groupName;

            chatHistory.appendChild(
                groupTitle
            );

            groupConversations.forEach(
                (conversation) => {

                    const item = createChatItem(conversation);

                    chatHistory.appendChild(item);
                }
            );
        }
    );

    if (!hasResults && searchInput && searchInput.value.trim()) {
        const noResults = document.createElement("p");

        noResults.className = "chat-title";

        noResults.textContent = "No conversations found";

        chatHistory.appendChild(
            noResults
        );
    }
}
function openConversation(id) {
    const conversations = getConversations();

    const conversation = conversations.find(
        item => item.id === id
    );

    if (!conversation) {
        return;
    }

    activeConversationId = id;

    const messagesContainer = document.querySelector(
        ".chatgpt__messages"
    );

    const heading = document.querySelector(
        ".chatgpt__content--middle h1"
    );

    const suggestions = document.querySelector(
        ".chatgpt__suggestions"
    );

    if (!messagesContainer) {
        return;
    }

    messagesContainer.innerHTML = "";

    conversation.messages.forEach(
        (message) => {

            const messageElement =
                document.createElement(
                    "div"
                );

            if (
                message.role === "user"
            ) {

                messageElement.className =
                    "chat-message chat-message--user";

                messageElement.innerHTML = `
                    <div class="message-content">
                        <p>
                            ${escapeHTML(
                    message.content
                )}
                        </p>
                    </div>
                `;

            } else if (
                message.role === "assistant"
            ) {

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

                        ${message.content}

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
            }

            messagesContainer.appendChild(
                messageElement
            );
        }
    );

    if (heading) {
        heading.style.display = "none";
    }

    if (suggestions) {
        suggestions.style.display = "none";
    }

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
function escapeHTML(text) {
    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}
renderChatHistory();