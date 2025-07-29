document.addEventListener('DOMContentLoaded', () => {

    /** 로그인 버튼 팝업 **/
    /*07.25 수정 */
    const loginLink = document.getElementById('loginLink');
    if (loginLink) {
        loginLink.addEventListener('click', function (e) {
            if (window.innerWidth > 768) {
                e.preventDefault();
                window.open(this.href, '_blank', 'width=790,height=400,top=0,left=0,scrollbars=yes');
            }
        });
    }
    /* //07.25 수정 */

    /** 툴팁 **/
    const chatItems = document.querySelectorAll('.chat-item');
    chatItems.forEach(el => {
        el.addEventListener('mouseenter', function () {
            document.querySelector('.tooltip-layer')?.remove();
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip-layer';
            tooltip.textContent = el.textContent;
            document.body.appendChild(tooltip);
            el._tooltip = tooltip;
            const rect = el.getBoundingClientRect();
            tooltip.style.position = 'absolute';
            tooltip.style.top = `${rect.bottom + window.scrollY}px`;
            tooltip.style.left = `${rect.left + window.scrollX + 180}px`;
        });
        el.addEventListener('mouseleave', function () {
            el._tooltip?.remove();
            delete el._tooltip;
        });
    });

    /** chatbox 스크롤버튼 **/
    const button = document.querySelector('.btn-scroll');
    const chatContainer = document.querySelector('.chat-container');
    function toggleScrollButton() {
        if (!chatContainer || !button) return;
        const isOverflowing = chatContainer.scrollHeight > chatContainer.clientHeight;
        const isAtBottom = chatContainer.scrollTop + chatContainer.clientHeight >= chatContainer.scrollHeight - 1;
        button.classList.toggle('none', !isOverflowing || isAtBottom);
    }
    toggleScrollButton();
    chatContainer?.addEventListener('scroll', toggleScrollButton);
    window.addEventListener('resize', toggleScrollButton);
    const observer = new MutationObserver(toggleScrollButton);
    if (chatContainer) {
        observer.observe(chatContainer, { childList: true, subtree: true });
    }
    button?.addEventListener('click', () => {
        chatContainer?.scrollTo({ top: chatContainer.scrollHeight, behavior: 'smooth' });
    });

    /** NAV 옵션 레이어  **/
    const popup = document.querySelector('.options');
    const chat = document.querySelector('.chat');
    if (chat) {
        const chatButtons = document.querySelectorAll('.chat .btn-chat');
        chatButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const clickedChat = btn.closest('.chat');
                document.querySelectorAll('.chat').forEach((chat) => {
                    chat.classList.remove('active');
                    chat.querySelector('.btn-chat')?.classList.remove('active');
                });
                clickedChat.classList.add('active');
            });
        });
    }
    if (chat && popup) {
        let currentButton = null;

        function closePopup() {
            popup.classList.remove('show', 'mobile');
            dimmed.classList.remove('show');
            currentButton = null;
        }


        const dimmed = document.querySelector('.dimmed');
        document.querySelectorAll('.btn-more').forEach(button => {
            button.addEventListener('click', e => {
                e.stopPropagation();
                const isMobile = window.innerWidth <= 768;

                const isSameButton = currentButton === button;
                const isPopupVisible = popup.classList.contains('show');

                if (isSameButton && isPopupVisible) {
                    closePopup();
                    return;
                }
                if (isMobile) {
                    popup.classList.add('show');
                    dimmed.classList.add('show');
                } else {
                    const rect = button.getBoundingClientRect();
                    popup.style.top = `${rect.top - 13}px`;
                    popup.style.left = `${rect.left + 30}px`;
                    popup.classList.add('show');
                    dimmed.classList.add('show');
                }

                currentButton = button;
            });
        });

        popup.querySelectorAll('li').forEach(item => {
            item.addEventListener('click', closePopup);
        });
        const closeBtn = document.querySelector('.m-btn-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (window.innerWidth <= 768) {
                    closePopup();
                }
            });
        }
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                closePopup();
            }
        });

        document.addEventListener('click', e => {
            if (!popup.contains(e.target) && !e.target.classList.contains('btn-more')) {
                closePopup();
            }
        });
    }

    /** 모바일 메뉴 열기/닫기 **/
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const closeLnb = document.getElementById('closeLnb');
    const lnb = document.getElementById('lnb');
    if (hamburgerMenu && closeLnb && lnb) {
        hamburgerMenu.addEventListener('click', () => lnb.classList.add('active'));
        closeLnb.addEventListener('click', () => lnb.classList.remove('active'));
    }

    /** 메시지 입력 및 전송 **/
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const messagesOver = document.getElementById('messages');
    const messageWrap = document.querySelector('.message-wrap');
    const placeholder = document.querySelector('.custom-placeholder');

    if (messageInput && sendBtn && messagesOver) {
        const askButtons = document.querySelectorAll('.ask-btn');
        askButtons.forEach(button => {
            button.addEventListener('click', () => {
                const askText = button.querySelector('.ask-text').innerText.trim();
                messageInput.value = askText;
                messageInput.focus();
                updateButtonState();
                if (placeholder) placeholder.style.opacity = '0';
            });
        });

        let isComposing = false;

        function scrollToBottom() {
            messagesOver.scrollTop = messagesOver.scrollHeight;
        }

        scrollToBottom();

        messageInput.addEventListener('compositionstart', () => isComposing = true);
        messageInput.addEventListener('compositionend', () => {
            isComposing = false;
            setTimeout(updateButtonState, 0);
        });

        messageInput.addEventListener('input', () => {
            updateButtonState();
            if (window.innerWidth <= 768) {
                messageInput.style.height = '80px'
            }
            // messageInput.style.height = '100px';
            // if (messageInput.scrollHeight > 100) {
            //     messageInput.style.height = messageInput.scrollHeight + 'px';
            // }
        });

        function updateButtonState() {
            const text = messageInput.value.trim();
            sendBtn.disabled = !text;
        }

        function sendMessage() {
            const message = messageInput.value.trim();
            if (!message) return;

            const userMessage = document.createElement('div');
            userMessage.className = 'message user';
            userMessage.innerHTML = `<div class="message-content">${message}</div>`;
            messagesOver.appendChild(userMessage);

            messageInput.value = '';
            updateButtonState();
            scrollToBottom();
        }

        sendBtn.addEventListener('click', sendMessage);
        messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
                e.preventDefault();
                sendMessage();
            }
        });

        messageInput.addEventListener('focus', () => {
            if (placeholder && !messageWrap?.classList.contains('logout')) {
                placeholder.style.opacity = '0';
            }
        });
        messageInput.addEventListener('blur', () => {
            if (placeholder && !messageWrap?.classList.contains('logout') && !messageInput.value.trim()) {
                placeholder.style.opacity = '1';
            }
        });
    }

    /** 모바일 닫기 버튼 처리 */
    document.querySelector('.m_close')?.addEventListener('click', function (e) {
        e.preventDefault();

        const infoWrap = document.querySelector('.info-wrap');
        const moBtn = document.querySelector('.mo.btn-text-line');
        if (window.innerWidth <= 1024) {
            infoWrap?.classList.add('hide');
            moBtn?.classList.add('show');
        }
    });

});
