document.addEventListener('DOMContentLoaded', () => {
    /*******************************************
     * inc.utils.asp  로그인버튼 클릭시 팝업
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

    // // 메시지 내용 변경 감지
    // const observer = new MutationObserver(checkScroll);
    // observer.observe(chatContainer, {
    //     childList: true,
    //     subtree: true,
    // });

    // 버튼 클릭 시 스크롤 맨 아래로 이동
    button.addEventListener('click', () => {
        if (chatContainer) {
            chatContainer.scrollTo({
                top: chatContainer.scrollHeight,
                behavior: 'smooth'
            });
            button.style.display = 'none'; // 스크롤 내릴 때 버튼 숨김
        }
    });

    // 사용자가 스크롤하면 스크롤 위치에 따라 버튼 보이기/숨기기
    chatContainer.addEventListener('scroll', () => {
        // scrollTop + clientHeight가 scrollHeight와 같거나 거의 같으면 맨 아래 도달
        if (chatContainer.scrollTop + chatContainer.clientHeight >= chatContainer.scrollHeight - 1) {
            button.style.display = 'none';
        } else {
            button.style.display = 'block';
        }
    });


    /********************************
      NAV 옵션 레이어 (PC용)
  ********************************/
    const chatButtons = document.querySelectorAll('.chat .btn-chat');

    chatButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const clickedChat = btn.closest('.chat');

            // 1. 모든 .chat과 .btn-chat에서 active 제거
            document.querySelectorAll('.chat').forEach((chat) => {
                chat.classList.remove('active');
                const chatBtn = chat.querySelector('.chat .btn-chat');
                if (chatBtn) {
                    chatBtn.classList.remove('active');
                }
            });

            // 2. 클릭한 .chat과 해당 버튼에 active 추가
            btn.classList.add('active');
            clickedChat.classList.add('active');
        });
    });
    const popup = document.querySelector('.options');
    if (popup) {
        let currentButton = null;
        // 레이어 닫기 함수
        function closePopup() {
            popup.style.display = 'none';
            currentButton = null;
        }

        // 각 .btn-more 버튼 클릭 시 팝업 열기/닫기
        document.querySelectorAll('.btn-more').forEach(button => {
            button.addEventListener('click', e => {
                e.stopPropagation();

                // 현재 열린 버튼을 다시 클릭하면 닫기
                if (currentButton === button && popup.style.display === 'block') {
                    closePopup();
                    return;
                }

                // 팝업 위치 설정 (버튼 기준으로 위치 지정)
                const rect = button.getBoundingClientRect();
                const top = rect.top - 13;
                const left = rect.left + 30;
                popup.style.top = `${top}px`;
                popup.style.left = `${left}px`;
                popup.style.display = 'block';
                currentButton = button;
            });
        });

        // 팝업 내 항목 클릭 시 팝업 닫기
        popup.querySelectorAll('li').forEach(item => {
            item.addEventListener('click', closePopup);
        });

        // ESC 키 누르면 팝업 닫기
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                closePopup();
            }
        });
    }


    /********************************
       모바일 내비게이션 열고 닫기
   *******************************= */

    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const closeLnb = document.getElementById('closeLnb');
    const lnb = document.getElementById('lnb');
    if (hamburgerMenu && closeLnb && lnb) { }
    // 햄버거 메뉴 클릭 시 내비 열기
    hamburgerMenu.addEventListener('click', () => {
        lnb.classList.add('active');
    });

    // 닫기 버튼 클릭 시 내비 닫기
    closeLnb.addEventListener('click', () => {
        lnb.classList.remove('active');
    });

    /********************************
       외부 클릭 시 닫기 처리
       (팝업 + 모바일 내비게이션)
   *******************************= */
    // document.addEventListener('click', (e) => {
    //     // 팝업 외 클릭 시 팝업 닫기
    //     if (popup.style.display === 'block' && !popup.contains(e.target) && !e.target.classList.contains('btn-more')) {
    //         closePopup();
    //     }

    //     // 모바일 내비게이션 외 클릭 시 닫기 (768px 이하일 때만)
    //     if (window.innerWidth <= 768) {
    //         if (!nav.contains(e.target) && !hamburgerMenu.contains(e.target)) {
    //             nav.classList.remove('active');
    //         }
    //     }
    // });

    /********************************
       메시지 입력 및 전송 기능
   *******************************= */
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const messagesOver = document.getElementById('messages');

    if (messageInput && sendBtn && messagesOver) {
        const messageWrap = document.querySelector('.message-wrap');
        const placeholder = document.querySelector('.custom-placeholder');

        let isComposing = false;

        // 스크롤 맨 아래로
        function scrollToBottom() {
            messagesOver.scrollTop = messagesOver.scrollHeight;
        }

        scrollToBottom();

        // 한글 입력 처리
        messageInput.addEventListener('compositionstart', () => isComposing = true);
        messageInput.addEventListener('compositionend', () => {
            isComposing = false;
            updateButtonState();
        });

        messageInput.addEventListener('input', () => {

            if (!isComposing) updateButtonState();
            messageInput.style.height = '100px'; // 기본값으로 초기화
            if (messageInput.scrollHeight > 100) {
                messageInput.style.height = messageInput.scrollHeight + 'px'; // 2줄 이상만 늘어남
            }
        });

        function updateButtonState() {
            const text = messageInput.value.trim();
            sendBtn.disabled = !text;
        }

        // 메시지 전송 함수
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



        // 커스텀 플레이스홀더 제어
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
    } // 추천 질문 버튼
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
