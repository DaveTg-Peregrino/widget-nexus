/**
 * Nexus Tours Widget
 * A customizable chat widget for customer support
 * VERSION 2.0 - With Professional Markdown Rendering
 */

(function() {
    const widgetStyles = `/* 1. Brand tokens (root variables) */
@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600;700;900&family=DM+Sans:wght@400;500;700&display=swap');

:root {
  /* Colour scale */
  --nx-brand-red:  #E73A4E;
  --nx-orange-500: #FD921E;
  --nx-orange-600: #FF621D;
  --nx-orange-700: #FF2C3D;
  --nx-cyan-500:   #00AFDD;
  --nx-gray-100:   #F4F4F4;
  --nx-gray-300:   #E0E0E0;
  --nx-gray-700:   #646464;
  --nx-text-900:   #575756;

  /* Gradient */
  --nx-grad-primary: linear-gradient(90deg,#E73A4E 0%,#FF621D 100%);

  /* Typography */
  --nx-font-main: 'Urbanist', system-ui, sans-serif;
  --nx-font-body: 'DM Sans',   system-ui, sans-serif;

  /* Spacing scale (rem) */
  --nx-space-1: .25rem;   /* 4px  */
  --nx-space-2: .5rem;    /* 8px  */
  --nx-space-3: 1rem;     /* 16px */
  --nx-space-4: 1.5rem;   /* 24px */
}

/* 2. Widget container */
.nx-chat {
  position: fixed;
  bottom: var(--nx-space-4);
  right: var(--nx-space-4);
  width: 22rem;
  height: 60vh;
  min-width: 20rem;
  min-height: 25vh;
  max-width: 90vw;
  max-height: 90vh;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 12px 32px rgba(0,0,0,.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: var(--nx-font-body);
  color: var(--nx-text-900);
  z-index: 9999;
}

/* 3. Header */
.nx-chat__header {
  padding: var(--nx-space-3) var(--nx-space-4);
  background: var(--nx-grad-primary);
  color: #fff;
  font: 700 1.125rem/1 var(--nx-font-main);
  display: flex;
  align-items: center;
  gap: var(--nx-space-2);
}
.nx-chat__header svg {
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
}

/* 4. Messages area */
.nx-chat__body {
  flex: 1 1 auto;
  padding: var(--nx-space-3);
  overflow-y: auto;
  background: var(--nx-gray-100);
  scroll-behavior: smooth;
}
.nx-chat__body::-webkit-scrollbar {
  width: 8px;
}
.nx-chat__body::-webkit-scrollbar-thumb {
  background: var(--nx-gray-300);
  border-radius: 4px;
}

/* 5. Message bubbles */
.nx-msg {
  max-width: 80%;
  padding: var(--nx-space-2) var(--nx-space-3);
  margin-bottom: var(--nx-space-3);
  border-radius: 1.25rem;
  font-size: .95rem;
  line-height: 1.4;
  word-break: break-word;
}
.nx-msg--agent {
  background: #fff;
  border: 1px solid var(--nx-gray-300);
  align-self: flex-start;
}
.nx-msg--user {
  background: var(--nx-orange-500);
  color: #fff;
  align-self: flex-end;
}
.nx-msg--system {
  align-self: center;
  text-align: center;
  background: transparent;
  font-style: italic;
  font-size: .85rem;
  color: var(--nx-gray-700);
}
.nx-msg--agent + .nx-msg--agent {
  margin-top: calc(-1 * var(--nx-space-1)); /* tighter stack */
}

/* 6. Timestamp / meta */
.nx-msg__meta {
  display: block;
  margin-top: var(--nx-space-1);
  font-size: .75rem;
  opacity: .7;
}

/* 7. Input bar */
.nx-chat__input {
  display: flex;
  align-items: center;
  gap: var(--nx-space-2);
  padding: var(--nx-space-2) var(--nx-space-3);
  border-top: 1px solid var(--nx-gray-300);
  background: #fff;
}
.nx-chat__textarea {
  flex: 1 1 auto;
  resize: none;
  border: 0;
  outline: 0;
  font: 400 1rem/1.35 var(--nx-font-body);
  color: var(--nx-text-900);
  padding: var(--nx-space-1);
}
.nx-chat__textarea::placeholder { opacity: .5; }

/* 8. Send button */
.nx-chat__send {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  background: var(--nx-orange-500);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background .25s ease, transform .2s ease;
}
.nx-chat__send svg {
  width: 1.25rem;
  height: 1.25rem;
}
.nx-chat__send svg path {
  stroke: #fff; /* Ensure path stroke is white */
}
.nx-chat__send:hover   { background: var(--nx-orange-600); transform: translateY(-2px); }
.nx-chat__send:active  { background: var(--nx-orange-700); transform: translateY( 0); }

/* 9. Utility states */
.nx-hidden { display: none !important; }
@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; }
}

/* 10. Markdown styles */
.nx-msg code {
    background: rgba(0, 0, 0, 0.05);
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: monospace;
    font-size: 0.9em;
}

.nx-msg pre {
    background: rgba(0, 0, 0, 0.05);
    padding: 1em;
    border-radius: 4px;
    overflow-x: auto;
    margin: 0.5em 0;
}

.nx-msg ul, .nx-msg ol {
    margin: 0.5em 0;
    padding-left: 1.5em;
}

.nx-msg li {
    margin: 0.25em 0;
}

.nx-msg ul ul, .nx-msg ol ol, .nx-msg ul ol, .nx-msg ol ul {
    margin: 0;
}

.nx-msg h1, .nx-msg h2, .nx-msg h3, 
.nx-msg h4, .nx-msg h5, .nx-msg h6 {
    margin: 0.5em 0;
    line-height: 1.2;
}

.nx-msg h1 { font-size: 1.5em; }
.nx-msg h2 { font-size: 1.3em; }
.nx-msg h3 { font-size: 1.2em; }
.nx-msg h4 { font-size: 1.1em; }
.nx-msg h5 { font-size: 1em; }
.nx-msg h6 { font-size: 0.9em; }

.nx-msg a {
    color: var(--nx-orange-500);
    text-decoration: none;
}

.nx-msg a:hover {
    text-decoration: underline;
}

.nx-msg strong {
    font-weight: 600;
}

.nx-msg em {
    font-style: italic;
}

.nx-msg blockquote {
    border-left: 3px solid var(--nx-gray-300);
    margin: 0.5em 0;
    padding-left: 1em;
    color: var(--nx-gray-700);
}

/* 11. Resize Handle */
.nx-chat__resize-handle {
    position: absolute;
    top: 0;
    left: 0;
    width: 15px;
    height: 15px;
    cursor: nwse-resize;
    z-index: 10;
}
`;
    // Widget configuration
    const config = {
        position: 'bottom-right',
        primaryColor: '#E73A4E', // Use brand red
        textColor: '#ffffff',
        companyName: 'Nexus Tours',
        apiUrl: 'https://nexus-development.onrender.com', // Directly set to Render URL
        widgetId: null,
        pollingInterval: 5000 // Intervalo de sondeo en milisegundos (ej. 5 segundos)
    };

    // Widget state
    let isOpen = false;
    let sessionId = null;
    let deviceId = null;
    let threadId = null;
    let pollingTimer = null;
    let socket = null;
    let displayedMessages; // Track displayed message IDs
    let messagesContainer;
    let wsReconnectAttempts = 0;
    let maxReconnectAttempts = 3;
    let wsReconnectTimer = null;
    let isWebSocketEnabled = true;
    let heartbeatInterval = null;

    // Generate a unique device ID
    function generateDeviceId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Create widget HTML
    function createWidgetHTML() {
        const styleTag = document.createElement('style');
        styleTag.textContent = widgetStyles;
        styleTag.id = 'nexus-widget-styles';
        document.head.appendChild(styleTag);

        const widget = document.createElement('div');
        widget.id = 'nexus-widget-container';
        widget.innerHTML = `
            <div id="nexus-widget-button" style="
                position: fixed;
                ${config.position === 'bottom-right' ? 'bottom: 20px; right: 20px;' : 'bottom: 20px; left: 20px;'}
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: var(--nx-brand-red); /* Use brand solid red */
                color: ${config.textColor};
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
                z-index: 9999;
            ">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
            </div>
            <div id="nexus-widget-chat" class="nx-chat nx-hidden" style="${config.position === 'bottom-right' ? 'right: var(--nx-space-4);' : 'left: var(--nx-space-4);'}">
                <div id="nexus-widget-resize-handle" class="nx-chat__resize-handle"></div>
                <div class="nx-chat__header">
                    <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span>NexusTours</span>
                    <button id="nexus-widget-close" style="margin-left:auto;background:none;border:none;color:#fff;cursor:pointer;font-size:1.25rem;line-height:1;">&times;</button>
                </div>
                <div class="nx-chat__body" id="nexus-widget-messages"></div>
                <div class="nx-chat__input">
                    <textarea class="nx-chat__textarea" id="nexus-widget-message-input" placeholder="Type your message..."></textarea>
                    <button class="nx-chat__send" id="nexus-widget-send">
                        <svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke-width="2" fill="none"/></svg>
                    </button>
                </div>
            </div>
        `;

        // Inject required libraries for Markdown parsing and sanitization
        const markedScript = document.createElement('script');
        markedScript.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
        document.head.appendChild(markedScript);

        const purifyScript = document.createElement('script');
        purifyScript.src = 'https://cdn.jsdelivr.net/npm/dompurify/dist/purify.min.js';
        document.head.appendChild(purifyScript);
        
        document.body.appendChild(widget);
    }

    // Initialize widget
    function initWidget(customerConfig) {
        // Merge customer config with default config
        Object.assign(config, customerConfig);

        // Generate or retrieve device ID
        deviceId = localStorage.getItem('nexus_device_id') || generateDeviceId();
        localStorage.setItem('nexus_device_id', deviceId);

        // Create widget HTML
        createWidgetHTML();

        // Initialize messages container reference
        messagesContainer = document.getElementById('nexus-widget-messages');
        displayedMessages = new Set();

        // Set up event listeners
        const chatButton = document.getElementById('nexus-widget-button');
        const closeButton = document.getElementById('nexus-widget-close');
        const sendButton = document.getElementById('nexus-widget-send');
        const messageInput = document.getElementById('nexus-widget-message-input');

        chatButton.addEventListener('click', toggleWidget);
        closeButton.addEventListener('click', toggleWidget);
        sendButton.addEventListener('click', sendMessage);
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });

        // Initialize session
        initializeSessionAndThread();
        enableResizing();
    }

    // Toggle widget visibility
    function toggleWidget() {
        const chat = document.getElementById('nexus-widget-chat');
        const button = document.getElementById('nexus-widget-button');
        
        isOpen = !isOpen;
        
        if (isOpen) {
            chat.classList.remove('nx-hidden');
            button.style.display = 'none';
            
            // Initialize connection if not already done
            if (!threadId) {
                initializeSessionAndThread();
            }
        } else {
            chat.classList.add('nx-hidden');
            button.style.display = 'flex';
        }
    }

    function enableResizing() {
        const chatContainer = document.getElementById('nexus-widget-chat');
        const resizeHandle = document.getElementById('nexus-widget-resize-handle');
    
        if (!chatContainer || !resizeHandle) return;
    
        let initialWidth, initialHeight, initialX, initialY;
    
        const onMouseDown = (e) => {
            e.preventDefault();
            initialX = e.clientX;
            initialY = e.clientY;
            const rect = chatContainer.getBoundingClientRect();
            initialWidth = rect.width;
            initialHeight = rect.height;
            
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };
    
        const onMouseMove = (e) => {
            const dx = e.clientX - initialX;
            const dy = e.clientY - initialY;
            
            const newWidth = initialWidth - dx;
            const newHeight = initialHeight - dy;
    
            // Using computed style for robustness against CSS unit changes
            const style = window.getComputedStyle(chatContainer);
            const minWidth = parseFloat(style.minWidth);
            const minHeight = parseFloat(style.minHeight);
            const maxWidth = parseFloat(style.maxWidth);
            const maxHeight = parseFloat(style.maxHeight);
    
            if (newWidth >= minWidth && newWidth <= maxWidth) {
                chatContainer.style.width = newWidth + 'px';
            }
            if (newHeight >= minHeight && newHeight <= maxHeight) {
                chatContainer.style.height = newHeight + 'px';
            }
        };
    
        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    
        resizeHandle.addEventListener('mousedown', onMouseDown);
    }

    async function initializeSessionAndThread() {
        try {
            // Check if we have a stored thread ID that's still valid
            const storedThreadId = localStorage.getItem('nexus_thread_id');
            if (storedThreadId) {
                threadId = storedThreadId;
                console.log('🔄 Using stored thread:', threadId);
                
                // Try to fetch existing messages to validate thread
                const success = await fetchAndRenderMessages(true);
                if (success) {
                    console.log('✅ Stored thread is valid, setting up connections');

                    // If the thread is valid but empty, show the welcome message
                    if (messagesContainer && messagesContainer.children.length === 0) {
                        console.log('Thread is empty. Adding welcome message.');
                        addMessageSafely('assistant', 'Welcome to Nexus Tours! How can I assist you today?', null, 'msg_welcome');
                    }

                    // Thread is valid, set up real-time communication with delay
                    setTimeout(() => {
                        connectWebSocket();
                    }, 500);
                    
                    // Also start polling as backup after WebSocket attempt
                    setTimeout(() => {
                        if (!socket || socket.readyState !== WebSocket.OPEN) {
                            console.log('🔄 WebSocket not connected, starting polling backup');
                            startPolling();
                        }
                    }, 3000);
                    return;
                } else {
                    console.log('❌ Stored thread is invalid, removing from storage');
                    localStorage.removeItem('nexus_thread_id');
                    threadId = null;
                }
            }

            console.log('🆕 Creating new session and thread...');
            
            // Create new session and thread
            const sessionResponse = await fetch(`${config.apiUrl}/users/identify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ device_id: deviceId })
            });

            if (!sessionResponse.ok) {
                const errorText = await sessionResponse.text();
                throw new Error(`Failed to create session: ${sessionResponse.status} - ${errorText}`);
            }
            
            const sessionData = await sessionResponse.json();
            sessionId = sessionData.session_id;
            console.log('✅ Session created:', sessionId);

            const threadResponse = await fetch(`${config.apiUrl}/threads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ session_id: sessionId })
            });

            if (!threadResponse.ok) {
                const errorText = await threadResponse.text();
                throw new Error(`Failed to create thread: ${threadResponse.status} - ${errorText}`);
            }
            
            const threadData = await threadResponse.json();
            // Support both `thread_id` and `id` field names from the API
            threadId = threadData.thread_id || threadData.id;

            if (threadId) {
                localStorage.setItem('nexus_thread_id', threadId);
                console.log('✅ New thread created:', threadId);
                addMessageSafely('assistant', 'Welcome to Nexus Tours! How can I assist you today?', null, 'msg_welcome');
                
                // Give server time to fully process the thread creation
                console.log('⏳ Waiting for server to process thread creation...');
                setTimeout(() => {
                    console.log('🔌 Attempting WebSocket connection to thread:', threadId);
                    connectWebSocket();
                }, 1000); // Increased delay to ensure server processing
                
                // Start polling as backup after giving WebSocket time to connect
                setTimeout(() => {
                    if (!socket || socket.readyState !== WebSocket.OPEN) {
                        console.log('🔄 WebSocket not ready, starting polling backup');
                        startPolling();
                    }
                }, 4000); // Increased delay
            } else {
                throw new Error('Thread ID not received from server');
            }

        } catch (error) {
            console.error('💥 Nexus Widget Initialization Error:', error);
            console.error('Error details:', {
                message: error.message,
                stack: error.stack,
                apiUrl: config.apiUrl,
                deviceId: deviceId
            });
            
            addMessageSafely('system', 'Sorry, we are unable to connect to customer support at the moment. Please try refreshing the page.');
            
            // Start polling as fallback even on error if we have a threadId
            if (threadId) {
                console.log('🔄 Starting polling as fallback for thread:', threadId);
                startPolling();
            }
        }
    }

    /**
     * Parses Markdown text into safe HTML using marked.js and DOMPurify.
     * @param {string} text The markdown text to parse.
     * @returns {string} The safe HTML string.
     */
    function parseMarkdown(text) {
        if (!text || typeof marked === 'undefined' || typeof DOMPurify === 'undefined') {
            // Fallback for safety or if libraries haven't loaded yet
            return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
        
        // 1. Convert Markdown to HTML using marked.js
        // gfm: true -> Enables GitHub Flavored Markdown (better lists, tables, etc.)
        // breaks: true -> Treats single newlines in paragraphs as <br> tags
        const dirtyHtml = marked.parse(text, { gfm: true, breaks: true });

        // 2. Sanitize the HTML to prevent XSS attacks using DOMPurify
        const cleanHtml = DOMPurify.sanitize(dirtyHtml);

        return cleanHtml;
    }

    // Update addMessageSafely to handle markdown
    function addMessageSafely(role, content, timestamp, messageId) {
        if (!messagesContainer) {
            messagesContainer = document.getElementById('nexus-widget-messages');
        }

        if (!displayedMessages) {
            displayedMessages = new Set();
        }

        const idStr = messageId !== undefined && messageId !== null ? String(messageId) : null;

        // Skip if already displayed
        if (idStr && displayedMessages.has(idStr)) {
            console.log('Message already displayed, skipping:', idStr);
            return false;
        }

        // For temporary messages, check if similar content exists
        if (idStr && idStr.startsWith('temp_')) {
            const existingMessages = messagesContainer.querySelectorAll('.nx-msg');
            for (let msg of existingMessages) {
                if (msg.textContent.includes(content) && msg.dataset.messageId !== idStr) {
                    console.log('Similar message found, skipping temp:', idStr);
                    return false;
                }
            }
        }

        // Mark as displayed
        if (idStr) {
            displayedMessages.add(idStr);
        }

        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('nx-msg');
        if (role === 'user' || role === 'customer') {
            messageDiv.classList.add('nx-msg--user');
        } else if (role === 'system') {
            messageDiv.classList.add('nx-msg--system');
        } else {
            messageDiv.classList.add('nx-msg--agent');
        }
        if (idStr) messageDiv.dataset.messageId = idStr;

        // Parse markdown and set content
        const parsedContent = parseMarkdown(content);
        messageDiv.innerHTML = parsedContent;

        // Add timestamp if available
        if (timestamp) {
            const timeElement = document.createElement('span');
            timeElement.className = 'nx-msg__meta';
            try {
                // FIX V2: Ensure all timestamps are treated as UTC before display.
                // The server might send UTC timestamps in a format that browsers
                // interpret as local time (e.g., 'YYYY-MM-DD HH:MM:SS').
                // This standardizes the timestamp to an ISO string with a 'Z' for UTC.
                let date;
                if (typeof timestamp === 'string' && !timestamp.toLowerCase().endsWith('z') && !/[+-]\d{2}(:?\d{2})?$/.test(timestamp)) {
                    // If no timezone is specified, assume UTC.
                    // Replace space with 'T' and append 'Z' for ISO 8601 compliance.
                    const isoTimestamp = timestamp.trim().replace(' ', 'T') + 'Z';
                    date = new Date(isoTimestamp);
                } else {
                    date = new Date(timestamp);
                }
                
                // Check if the date is valid before trying to format it
                if (!isNaN(date.getTime())) {
                    timeElement.textContent = date.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        hour12: true 
                    });
                } else {
                     console.error('Invalid date created from timestamp:', timestamp);
                }
            } catch (e) {
                console.error('Error formatting timestamp:', e, timestamp);
            }
            messageDiv.appendChild(timeElement);
        }

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return true;
    }

    // Remove temporary message when real message arrives
    function removeTempMessage(content, senderType) {
        if (!messagesContainer) {
            messagesContainer = document.getElementById('nexus-widget-messages');
        }
        if (!displayedMessages) {
            displayedMessages = new Set();
        }

        const tempMessages = messagesContainer.querySelectorAll('[data-message-id^="temp_"]');
        tempMessages.forEach(tempMsg => {
            if (tempMsg.textContent.includes(content) && senderType === 'customer') {
                const tempId = tempMsg.dataset.messageId;
                displayedMessages.delete(tempId);
                tempMsg.remove();
                console.log('Removed temporary message:', tempId);
            }
        });
    }

    function handleClosedConversation() {
        // Erase session data so a new chat starts on reload
        localStorage.removeItem('nexus_thread_id');
        threadId = null;
        cleanupConnections();

        // Just disable the input, keeping the conversation visible.
        const messageInput = document.getElementById('nexus-widget-message-input');
        if (messageInput) {
            messageInput.disabled = true;
            messageInput.placeholder = 'This conversation is closed.';
        }
        const sendButton = document.getElementById('nexus-widget-send');
        if (sendButton) sendButton.disabled = true;

        console.log('Conversation closed. Input disabled, history preserved until page reload.');
    }

    async function fetchAndRenderMessages(suppressErrorOnUI = false) {
        if (!threadId) {
            console.log('❌ Cannot fetch messages: no threadId');
            return false;
        }
        
        try {
            const url = `${config.apiUrl}/threads/${threadId}/messages`;
            console.log('📡 Fetching messages from:', url);
            
            const response = await fetch(url);
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch messages: ${response.status} - ${errorText}`);
            }
            
            const data = await response.json();
            console.log('📥 Messages fetched:', {
                messageCount: data.messages ? data.messages.length : 0,
                threadId: threadId,
                hasMessages: data.messages && Array.isArray(data.messages),
                threadStatus: data.thread_status // Log status for debugging
            });

            // Handle closed thread
            if (data.thread_status === 'closed') {
                console.log('🔒 Thread is closed, starting graceful shutdown of conversation.');
                handleClosedConversation();
                return false; // Stop further processing
            }
            
            if (data.messages && Array.isArray(data.messages)) {
                renderMessages(data.messages);
                return true;
            }
            
            console.log('⚠️ No messages array in response:', data);
            return false;
            
        } catch (error) {
            console.error('💥 Error fetching messages:', {
                error: error,
                message: error.message,
                threadId: threadId,
                apiUrl: config.apiUrl,
                suppressErrorOnUI: suppressErrorOnUI
            });
            
            if (!suppressErrorOnUI) {
                addMessageSafely('system', 'Could not load conversation history.');
            }
            return false;
        }
    }

    function renderMessages(messages) {
        let hasNewMessages = false;

        messages.forEach(msg => {
            // Remove any matching temporary messages first
            if (msg.sender_type === 'customer') {
                removeTempMessage(msg.content, msg.sender_type);
            }

            // Add message if not already displayed
            const added = addMessageSafely(msg.sender_type, msg.content, msg.created_at, msg.id);
            if (added) {
                hasNewMessages = true;
            }
        });

        if (hasNewMessages) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    function connectWebSocket() {
        if (!threadId || !isWebSocketEnabled) {
            console.log('❌ Cannot connect WebSocket:', { threadId, isWebSocketEnabled });
            return;
        }
        
        // Clean up existing connection
        if (socket) {
            console.log('🧹 Cleaning up existing WebSocket connection');
            socket.onclose = null; // Prevent reconnection attempts
            socket.close();
            socket = null;
        }

        // Clear any existing reconnect timer
        if (wsReconnectTimer) {
            clearTimeout(wsReconnectTimer);
            wsReconnectTimer = null;
        }
        
        try {
            const apiUrl = new URL(config.apiUrl);
            const wsProtocol = apiUrl.protocol === 'https:' ? 'wss:' : 'ws:';
            const wsUrl = `${wsProtocol}//${apiUrl.host}/ws/${threadId}`;
            
            console.log(`🔌 Connecting WebSocket (attempt ${wsReconnectAttempts + 1}):`, {
                url: wsUrl,
                threadId: threadId,
                protocol: wsProtocol,
                host: apiUrl.host,
                apiUrl: config.apiUrl
            });
            
            socket = new WebSocket(wsUrl);
            
            // Set connection timeout
            const connectionTimeout = setTimeout(() => {
                if (socket && socket.readyState === WebSocket.CONNECTING) {
                    console.log('⏰ WebSocket connection timeout after 15 seconds');
                    socket.close();
                    handleWebSocketReconnect();
                }
            }, 15000); // Increased timeout to 15 seconds

            socket.onopen = () => {
                clearTimeout(connectionTimeout);
                console.log('✅ WebSocket connected successfully to thread:', threadId);
                stopPolling(); // Stop polling as WebSocket is now connected
                console.log('🔗 WebSocket state:', {
                    readyState: socket.readyState,
                    url: socket.url,
                    protocol: socket.protocol
                });
                wsReconnectAttempts = 0; // Reset on successful connection
                
                // Send a connection confirmation message
                try {
                    socket.send(JSON.stringify({ 
                        type: 'connect', 
                        thread_id: threadId,
                        timestamp: new Date().toISOString()
                    }));
                    console.log('📤 Sent connection confirmation');
                } catch (e) {
                    console.error('❌ Error sending connection confirmation:', e);
                }
                
                // Start heartbeat to keep connection alive
                startHeartbeat();
            };
            
            socket.onclose = (event) => {
                clearTimeout(connectionTimeout);
                stopHeartbeat();
                console.log(`❌ WebSocket disconnected:`, {
                    code: event.code,
                    reason: event.reason,
                    wasClean: event.wasClean,
                    threadId: threadId
                });
                
                // Only attempt reconnection if not manually closed
                if (event.code !== 1000 && event.code !== 1001) {
                    handleWebSocketReconnect();
                }
            };
            
            socket.onerror = (error) => {
                clearTimeout(connectionTimeout);
                console.error('💥 WebSocket error:', {
                    error: error,
                    threadId: threadId,
                    url: socket ? socket.url : 'unknown',
                    readyState: socket ? socket.readyState : 'unknown'
                });
                stopHeartbeat();
            };
            
            socket.onmessage = (event) => {
                console.log('📨 WebSocket message received:', {
                    data: event.data,
                    threadId: threadId,
                    timestamp: new Date().toISOString()
                });
                
                try {
                    const msg = JSON.parse(event.data);
                    
                    // Handle heartbeat pong
                    if (msg.type === 'pong') {
                        console.log('💓 Heartbeat pong received');
                        return;
                    }

                    // Handle thread status updates
                    if (msg.type === 'thread_status_update' && msg.status === 'closed') {
                        console.log('🔒 Thread closed via WebSocket. Starting graceful shutdown.');
                        handleClosedConversation();
                        return;
                    }
                    
                    // Handle regular messages
                    if (msg.id && msg.content) {
                        // If the message is from the user, remove the temporary optimistic message first
                        if (msg.sender_type === 'customer' || msg.sender_type === 'user') {
                            removeTempMessage(msg.content, msg.sender_type);
                        }
                        console.log('✨ Adding message via WebSocket:', msg);
                        addMessageSafely(msg.sender_type, msg.content, msg.created_at, msg.id);
                    } else {
                        console.log('📝 WebSocket message without ID/content:', msg);
                    }
                } catch (e) {
                    console.error('❌ Error parsing WebSocket message:', {
                        error: e,
                        data: event.data,
                        threadId: threadId
                    });
                }
            };
            
        } catch (error) {
            console.error('❌ Error creating WebSocket connection:', {
                error: error,
                message: error.message,
                stack: error.stack,
                threadId: threadId,
                apiUrl: config.apiUrl
            });
            handleWebSocketReconnect();
        }
    }

    function handleWebSocketReconnect() {
        if (!isWebSocketEnabled || wsReconnectAttempts >= maxReconnectAttempts) {
            console.log('❌ WebSocket max reconnection attempts reached, falling back to polling');
            isWebSocketEnabled = false;
            socket = null;
            
            // Ensure polling is active as fallback
            if (!pollingTimer) {
                startPolling();
            }
            return;
        }

        wsReconnectAttempts++;
        const delay = Math.min(1000 * Math.pow(2, wsReconnectAttempts), 30000); // Exponential backoff, max 30s
        
        console.log(`🔄 Attempting WebSocket reconnection in ${delay}ms (attempt ${wsReconnectAttempts}/${maxReconnectAttempts})`);
        
        wsReconnectTimer = setTimeout(() => {
            connectWebSocket();
        }, delay);
    }

    function startHeartbeat() {
        stopHeartbeat(); // Clear any existing heartbeat
        
        heartbeatInterval = setInterval(() => {
            if (socket && socket.readyState === WebSocket.OPEN) {
                try {
                    socket.send(JSON.stringify({ type: 'ping' }));
                    console.log('💓 Heartbeat ping sent');
                } catch (error) {
                    console.error('❌ Error sending heartbeat:', error);
                    stopHeartbeat();
                }
            } else {
                stopHeartbeat();
            }
        }, 30000); // Send heartbeat every 30 seconds
    }

    function stopHeartbeat() {
        if (typeof heartbeatInterval !== 'undefined' && heartbeatInterval) {
            clearInterval(heartbeatInterval);
            heartbeatInterval = null;
        }
    }

    function startPolling() {
        stopPolling(); 
        
        if (!threadId) {
            console.log('❌ Cannot start polling: no threadId');
            return;
        }
        
        console.log(`🔄 Starting polling for thread ${threadId} every ${config.pollingInterval}ms`);
        pollingTimer = setInterval(() => {
            console.log('📊 Polling for new messages...', {
                threadId: threadId,
                timestamp: new Date().toISOString(),
                socketState: socket ? socket.readyState : 'no socket'
            });
            fetchAndRenderMessages(true);
        }, config.pollingInterval);
    }

    function stopPolling() {
        if (pollingTimer) {
            console.log('⏹️ Stopping polling');
            clearInterval(pollingTimer);
            pollingTimer = null;
        }
    }

    function cleanupConnections() {
        // Clean up WebSocket
        if (socket) {
            socket.onclose = null; // Prevent reconnection attempts
            socket.close();
            socket = null;
        }
        
        // Clear timers
        if (wsReconnectTimer) {
            clearTimeout(wsReconnectTimer);
            wsReconnectTimer = null;
        }
        
        stopHeartbeat();
        stopPolling();
    }

    async function sendMessage() {
        const input = document.getElementById('nexus-widget-message-input');
        const content = input.value.trim();
        if (!content) return;

        try {
            // If there's no thread, create one first. This will show the welcome message.
            if (!threadId) {
                console.log('✉️ No thread found, creating a new one...');
                // This will add a welcome message.
                await initializeSessionAndThread(); 

                if (!threadId) {
                    // It failed.
                    throw new Error("Failed to create a new session. Please refresh.");
                }
                console.log('✅ New thread created by sendMessage, proceeding to send message.');
            }

            const tempMessageId = 'temp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            const timestamp = new Date().toISOString();
            
            // Add user message to UI after potential thread creation
            addMessageSafely('customer', content, timestamp, tempMessageId);
            input.value = '';
            input.placeholder = 'Type your message...'; // Reset placeholder

            const response = await fetch(`${config.apiUrl}/threads/${threadId}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ content: content })
            });

            if (!response.ok) throw new Error(`Message send failed: ${response.status}`);

            // This prevents the race condition causing duplicates
            console.log('Message sent successfully to thread:', threadId);

        } catch (error) {
            console.error('Error sending message:', error);
            addMessageSafely('assistant', error.message || 'Failed to send message.');
            
            // Remove temporary message on error
            const tempMessageElement = document.querySelector(`[data-message-id="${tempMessageId}"]`);
            if (tempMessageElement) {
                displayedMessages.delete(tempMessageId);
                tempMessageElement.remove();
            }
        }
    }

    // Legacy function for backward compatibility
    function addMessageToUI(role, content, timestamp, messageId) {
        return addMessageSafely(role, content, timestamp, messageId);
    }

    // Expose the widget to the global scope
    window.NexusWidget = {
        init: function(config) {
            // Merge default config with provided config
            const defaultConfig = {
                apiUrl: 'http://localhost:5000/api',
                companyName: 'Nexus Tours',
                primaryColor: '#FD921E',
                textColor: '#FFFFFF',
                position: 'bottom-right'
            };

            // Merge configs
            const mergedConfig = { ...defaultConfig, ...config };
            
            // Initialize the widget
            initWidget(mergedConfig);
        }
    };

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        console.log('🧹 Cleaning up widget connections');
        cleanupConnections();
    });

    // Cleanup on page visibility change (mobile browsers)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            console.log('🔇 Page hidden, pausing connections');
            // Don't fully cleanup, just pause heartbeat
            stopHeartbeat();
        } else {
            console.log('👁️ Page visible, resuming connections');
            if (typeof socket !== 'undefined' && socket && socket.readyState === WebSocket.OPEN) {
                startHeartbeat();
            } else if (threadId) {
                connectWebSocket();
            }
        }
    });
})();
