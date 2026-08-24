# ChatGPT UI Clone

A responsive ChatGPT-inspired web interface built from scratch using **HTML5, SCSS, and Vanilla JavaScript**. The project focuses on recreating the ChatGPT-style layout, responsive behavior, sidebar interactions, chat interface, suggestions, and basic mock chat functionality without using any frontend framework or UI library.

## Project Structure

```text
chatgpt/
│
├── index.html
│
├── assets/
│   ├── icons/
│   └── images/
│
├── js/
│   └── script.js
│
├── scss/
│   ├── abstracts/
│   │   ├── _variables.scss
│   │   └── _mixins.scss
│   │
│   ├── base/
│   │   ├── _reset.scss
│   │   ├── _typography.scss
│   │   └── _global.scss
│   │
│   ├── components/
│   │   ├── _button.scss
│   │   ├── _product-card.scss
│   │   └── _cart-item.scss
│   │
│   ├── layout/
│   │   ├── _header.scss
│   │   └── _footer.scss
│   │
│   ├── pages/
│   │   ├── _home.scss
│   │   ├── _product.scss
│   │   ├── _cart.scss
│   │   └── _login.scss
│   │
│   ├── _chat.scss
│   └── style.scss
│
├── css/
│   └── style.css
│
└── README.md
```

## SCSS Architecture

The project uses a modular SCSS architecture to keep styling organized and maintainable.

### `abstracts/`

Contains reusable SCSS resources that do not directly generate CSS.

* `_variables.scss` — Design tokens such as colors, fonts, and breakpoints.
* `_mixins.scss` — Reusable layout and flexbox mixins.

### `base/`

Contains global styling rules.

* `_reset.scss` — Removes browser default styles.
* `_typography.scss` — Defines typography and font-related styles.
* `_global.scss` — Global elements and common styles.

### `components/`

Contains reusable UI components such as buttons and cards.

### `layout/`

Contains styles related to major page sections and structural layouts.

### `pages/`

Contains page-specific styles.

### `chat.scss`

Contains the main styles for the ChatGPT clone, including:

* Sidebar
* Chat content
* Chat header
* Messages
* Suggestions
* Search/composer
* Responsive layout
* Mobile navigation
* Sidebar collapse behavior

### `style.scss`

Acts as the main SCSS entry point and imports the required partials.

This architecture keeps individual files focused on a specific responsibility instead of placing the entire stylesheet in one file.


Using variables makes it easier to maintain consistent colors, typography, and responsive behavior throughout the application.

## Breakpoints

The interface is designed to adapt across desktop, tablet, and mobile screen sizes.

### Mobile

```text
max-width: 576px
```

Mobile-specific behavior includes:

* Collapsible sidebar
* Mobile menu button
* Responsive chat composer
* Reduced spacing
* Responsive suggestion layout
* Optimized content width

### Tablet

```text
577px - 1024px
```

Tablet layouts adjust the sidebar, chat content, suggestions, and composer to make better use of the available screen width.

### Desktop

```text
above 1024px
```

The desktop layout provides:

* Persistent sidebar
* Full chat workspace
* Expanded content area
* Desktop suggestion positioning
* Sidebar collapse support

## JavaScript Structure

The application uses **Vanilla JavaScript** for all interactive behavior.

The JavaScript is responsible for:

* Sidebar collapsing and expanding
* Mobile sidebar menu
* Sidebar overlay behavior
* Chat message submission
* Mock response generation
* Suggestion interactions
* Input handling
* Chat history management
* Active conversation state
* Dynamic message rendering

No JavaScript framework or external UI library is required.

## Key Implementation Decisions

### 1. Vanilla JavaScript

The project intentionally uses Vanilla JavaScript instead of React, Vue, or another framework because the assignment focuses on understanding core frontend concepts.

### 2. SCSS Instead of Plain CSS

SCSS provides:

* Variables
* Mixins
* Nested selectors
* Modular partials
* Better maintainability

The final SCSS is compiled into CSS for browser usage.

### 3. Flexbox-Based Layout

Flexbox is used extensively for the main application structure.

The overall layout follows the concept:

```text
ChatGPT
├── Sidebar
└── Main Content
    ├── Header
    ├── Chat Area
    └── Composer
```

This makes the layout easier to control across different screen sizes.

### 4. Independent Scrolling Areas

The sidebar and chat content are treated as separate layout regions so that the chat area can scroll without unnecessarily moving the sidebar.

The main content uses constrained height and overflow handling to support a full-screen application layout.

### 5. Responsive Sidebar

The sidebar supports multiple states:

```text
Desktop
    ↓
Expanded Sidebar
    ↓
Collapsed Sidebar

Mobile
    ↓
Hidden Sidebar
    ↓
Opened Sidebar
```

A mobile overlay is used to improve usability when the sidebar is opened on smaller screens.

### 6. Mock Chat Responses

The project does not communicate with an AI backend.

Instead, JavaScript uses predefined/mock responses to simulate a chat experience. This keeps the project completely static and allows it to run without API keys or server-side infrastructure.

### 7. Semantic HTML

The interface uses standard HTML5 elements and meaningful class names to keep the markup readable and maintainable.

## Known Limitations

* There is no real AI or LLM integration.
* Chat responses are static/mock responses.
* Conversations are not persisted to a backend.
* User authentication is not implemented.
* There is no database.
* Chat history is limited to client-side behavior.
* The project does not implement real-time communication.
* Some ChatGPT functionality is visual or simulated rather than fully functional.
* Accessibility can be improved further, especially keyboard navigation and ARIA support.
* Browser-specific differences in scrolling behavior may require additional testing.

## What I Would Improve With Additional Time

### 1. Real AI Integration

Integrate an actual backend API with an LLM provider so that users can have dynamic conversations instead of receiving mock responses.

### 2. Persistent Conversations

Add backend storage so users can:

* Create conversations
* Rename conversations
* Delete conversations
* Search conversations
* Restore previous conversations

### 3. Authentication

Implement authentication and user accounts so conversations can be associated with individual users.

### 4. Better Responsive Behavior

Further test the interface across a wider range of:

* Mobile devices
* Tablets
* Laptops
* Large desktop monitors

### 5. More Complete Chat Features

Additional features could include:

* Message editing
* Regeneration of responses
* Copy response button
* Code block formatting
* Markdown rendering
* File uploads
* Voice input
* Conversation search

## Technologies Used

* HTML5
* SCSS
* Vanilla JavaScript
* CSS3
* Responsive Web Design

## Getting Started

Clone the repository and open `index.html` in a browser.

```bash
git clone https://github.com/Ankitraj4899/chatgpt.git
cd chatgpt
```