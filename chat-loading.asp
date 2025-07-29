<!--#include file="inc.head.asp"-->

<body>
    <div class="container">
        <!--#include file="inc.lnb.asp"-->
        <main class="main">
            <!--#include file="inc.header.asp"-->
            <!--#include file="inc.utils.asp"-->
            <div class="chat-container">

                <div class="contents chat-content">
                    <div class="messages" id="messages">

                        <div class="message user">
                            <div class="message-content">
                                나는 LEET 120점, GPA 90점, 토익 800점이야. 경북대학교에 합격할 수 있을까?
                            </div>
                        </div>
                        <div class="message assistant">
                            <div class="message-content loading">
                                데이터를 분석 중입니다<span class="dots"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!--#include file="inc.chatbox-loading.asp"-->

        </main>
        <div class="dimmed"></div>
    </div>

</body>

</html>