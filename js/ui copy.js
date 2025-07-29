document.addEventListener('DOMContentLoaded', () => {
    const onlongclick = ($target, duration, callback) => {
        let timer = null;

        $target.onmousedown = () => {
            timer = setTimeout(callback, duration);

            $target.onmouseup = () => {
                clearTimeout(timer);
                $target.onmouseup = null;  // �̺�Ʈ �ڵ鷯 �ʱ�ȭ
            };
        };
    };
    const $target = document.querySelector('.chat-text');
    const $layer = document.getElementById('layer');

    onlongclick($target, 300, () => {
        $layer.classList.add('active');
    });


    /* === NAV option pop === */
    const popup = document.querySelector('.options');
    let currentButton = null;

    function closePopup() {
        popup.style.display = 'none';
        currentButton = null;
    }

    document.querySelectorAll('.btn-more').forEach(button => {
        button.addEventListener('click', e => {
            e.stopPropagation();

            if (currentButton === button && popup.style.display === 'block') {
                closePopup();
                return;
            }

            const rect = button.getBoundingClientRect();
            const top = rect.top - 13;
            const left = rect.left + 30;
            popup.style.top = `${top}px`;
            popup.style.left = `${left}px`;
            popup.style.display = 'block';
            currentButton = button;
        });
    });

    popup.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', closePopup);
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closePopup();
        }
    });

    /* === Mobile navigation toggle === */
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const closeNav = document.getElementById('closeNav');
    const nav = document.getElementById('nav');

    hamburgerMenu.addEventListener('click', () => {
        nav.classList.add('active');
    });

    closeNav.addEventListener('click', () => {
        nav.classList.remove('active');
    });

    // �ݱ� ���� (�˾� + ����� ������̼�)
    document.addEventListener('click', (e) => {
        // popup �� Ŭ�� �� �ݱ�
        if (popup.style.display === 'block' && !popup.contains(e.target) && !e.target.classList.contains('btn-more')) {
            closePopup();
        }

        // ����� nav �ݱ�
        if (window.innerWidth <= 768) {
            if (!nav.contains(e.target) && !hamburgerMenu.contains(e.target)) {
                nav.classList.remove('active');
            }
        }
    });

    /* === �޽��� ���� ��� === */

    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const messagesContainer = document.getElementById('messages');

    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    scrollToBottom(); // �ʱ� ��ũ��

    let isComposing = false;
    messageInput.addEventListener('compositionstart', () => isComposing = true);
    messageInput.addEventListener('compositionend', () => isComposing = false);

    function sendMessage() {
        const message = messageInput.value.trim();
        if (!message) return;

        const userMessage = document.createElement('div');
        userMessage.className = 'message user';
        userMessage.innerHTML = `<div class="message-content">${message}</div>`;
        messagesContainer.appendChild(userMessage);

        messageInput.value = '';
        scrollToBottom();

        setTimeout(() => {
            const assistantMessage = document.createElement('div');
            assistantMessage.className = 'message assistant';
            assistantMessage.innerHTML = `<div class="message-content">�޽����� �޾ҽ��ϴ�. ó�� ���Դϴ�...</div>`;
            messagesContainer.appendChild(assistantMessage);
            scrollToBottom();
        }, 1000);
    }

    sendBtn.addEventListener('click', sendMessage);

    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
            e.preventDefault();
            sendMessage();
        }
    });

    const askButtons = document.querySelectorAll('.ask-btn');
    const placeholder = document.querySelector('.custom-placeholder');

    askButtons.forEach(button => {
        button.addEventListener('click', () => {
            const askText = button.querySelector('.ask-text').textContent;
            messageInput.value = askText;
            messageInput.focus();

            // placeholder �����
            if (placeholder) {
                placeholder.style.opacity = '0';
            }
        });
    });

    // Ŀ���� placeholder ����
    messageInput.addEventListener('focus', () => {
        if (placeholder) placeholder.style.opacity = '0';
    });

    messageInput.addEventListener('blur', () => {
        if (placeholder && !messageInput.value.trim()) {
            placeholder.style.opacity = '1';
        }
    });
});
