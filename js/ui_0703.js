document.addEventListener('DOMContentLoaded', () => {
    /*******************************************
     * inc.utils.asp  �α��ι�ư Ŭ���� �˾�
     ********************************************/
    const loginLink = document.getElementById('loginLink');
    if (loginLink) {
        loginLink.addEventListener('click', function (e) {
            e.preventDefault();
            window.open(this.href, '_blank', 'width=790,height=400,top=0,left=0,scrollbars=yes');
        });
    }

    /********************************************************************
    * inc. chatbox-*.asp
    ***********************************************************************/
    //scroll btn
    const button = document.querySelector('.btn-scroll');
    const chatContainer = document.querySelector('.chat-container');
    function checkScroll() {
        if (!chatContainer || !button) return;
        if (chatContainer.scrollHeight > chatContainer.clientHeight) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    }
    checkScroll();

    // // �޽��� ���� ���� ����
    // const observer = new MutationObserver(checkScroll);
    // observer.observe(chatContainer, {
    //     childList: true,
    //     subtree: true,
    // });

    // ��ư Ŭ�� �� ��ũ�� �� �Ʒ��� �̵�
    button.addEventListener('click', () => {
        if (chatContainer) {
            chatContainer.scrollTo({
                top: chatContainer.scrollHeight,
                behavior: 'smooth'
            });
            button.style.display = 'none'; // ��ũ�� ���� �� ��ư ����
        }
    });

    // ����ڰ� ��ũ���ϸ� ��ũ�� ��ġ�� ���� ��ư ���̱�/�����
    chatContainer.addEventListener('scroll', () => {
        // scrollTop + clientHeight�� scrollHeight�� ���ų� ���� ������ �� �Ʒ� ����
        if (chatContainer.scrollTop + chatContainer.clientHeight >= chatContainer.scrollHeight - 1) {
            button.style.display = 'none';
        } else {
            button.style.display = 'block';
        }
    });


    /********************************
      NAV �ɼ� ���̾� (PC��)
  ********************************/
    const chatButtons = document.querySelectorAll('.chat .btn-chat');

    chatButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const clickedChat = btn.closest('.chat');

            // 1. ��� .chat�� .btn-chat���� active ����
            document.querySelectorAll('.chat').forEach((chat) => {
                chat.classList.remove('active');
                const chatBtn = chat.querySelector('.chat .btn-chat');
                if (chatBtn) {
                    chatBtn.classList.remove('active');
                }
            });

            // 2. Ŭ���� .chat�� �ش� ��ư�� active �߰�
            btn.classList.add('active');
            clickedChat.classList.add('active');
        });
    });
    const popup = document.querySelector('.options');
    if (popup) {
        let currentButton = null;
        // ���̾� �ݱ� �Լ�
        function closePopup() {
            popup.style.display = 'none';
            currentButton = null;
        }

        // �� .btn-more ��ư Ŭ�� �� �˾� ����/�ݱ�
        document.querySelectorAll('.btn-more').forEach(button => {
            button.addEventListener('click', e => {
                e.stopPropagation();

                // ���� ���� ��ư�� �ٽ� Ŭ���ϸ� �ݱ�
                if (currentButton === button && popup.style.display === 'block') {
                    closePopup();
                    return;
                }

                // �˾� ��ġ ���� (��ư �������� ��ġ ����)
                const rect = button.getBoundingClientRect();
                const top = rect.top - 13;
                const left = rect.left + 30;
                popup.style.top = `${top}px`;
                popup.style.left = `${left}px`;
                popup.style.display = 'block';
                currentButton = button;
            });
        });

        // �˾� �� �׸� Ŭ�� �� �˾� �ݱ�
        popup.querySelectorAll('li').forEach(item => {
            item.addEventListener('click', closePopup);
        });

        // ESC Ű ������ �˾� �ݱ�
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                closePopup();
            }
        });
    }


    /********************************
       ����� ������̼� ���� �ݱ�
   *******************************= */

    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const closeLnb = document.getElementById('closeLnb');
    const lnb = document.getElementById('lnb');
    if (hamburgerMenu && closeLnb && lnb) { }
    // �ܹ��� �޴� Ŭ�� �� ���� ����
    hamburgerMenu.addEventListener('click', () => {
        lnb.classList.add('active');
    });

    // �ݱ� ��ư Ŭ�� �� ���� �ݱ�
    closeLnb.addEventListener('click', () => {
        lnb.classList.remove('active');
    });

    /********************************
       �ܺ� Ŭ�� �� �ݱ� ó��
       (�˾� + ����� ������̼�)
   *******************************= */
    // document.addEventListener('click', (e) => {
    //     // �˾� �� Ŭ�� �� �˾� �ݱ�
    //     if (popup.style.display === 'block' && !popup.contains(e.target) && !e.target.classList.contains('btn-more')) {
    //         closePopup();
    //     }

    //     // ����� ������̼� �� Ŭ�� �� �ݱ� (768px ������ ����)
    //     if (window.innerWidth <= 768) {
    //         if (!nav.contains(e.target) && !hamburgerMenu.contains(e.target)) {
    //             nav.classList.remove('active');
    //         }
    //     }
    // });

    /********************************
       �޽��� �Է� �� ���� ���
   *******************************= */
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const messagesOver = document.getElementById('messages');

    if (messageInput && sendBtn && messagesOver) {
        const messageWrap = document.querySelector('.message-wrap');
        const placeholder = document.querySelector('.custom-placeholder');

        let isComposing = false;

        // ��ũ�� �� �Ʒ���
        function scrollToBottom() {
            messagesOver.scrollTop = messagesOver.scrollHeight;
        }

        scrollToBottom();

        // �ѱ� �Է� ó��
        messageInput.addEventListener('compositionstart', () => isComposing = true);
        messageInput.addEventListener('compositionend', () => {
            isComposing = false;
            updateButtonState();
        });

        messageInput.addEventListener('input', () => {

            if (!isComposing) updateButtonState();
            messageInput.style.height = '100px'; // �⺻������ �ʱ�ȭ
            if (messageInput.scrollHeight > 100) {
                messageInput.style.height = messageInput.scrollHeight + 'px'; // 2�� �̻� �þ
            }
        });

        function updateButtonState() {
            const text = messageInput.value.trim();
            sendBtn.disabled = !text;
        }

        // �޽��� ���� �Լ�
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



        // Ŀ���� �÷��̽�Ȧ�� ����
        messageInput.addEventListener('focus', () => {
            if (placeholder && !messageWrap.classList.contains('logout')) {
                placeholder.style.opacity = '0';
            }
        });

        messageInput.addEventListener('blur', () => {
            if (placeholder && !messageWrap.classList.contains('logout') && !messageInput.value.trim()) {
                placeholder.style.opacity = '1';
            }
        });
    } // ��õ ���� ��ư
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
});
