<!--#include file="inc.head.asp"-->

<body>
    <div class="container">
        <!--#include file="inc.lnb.asp"-->
        <main class="main">
            <!--#include file="inc.header.asp"-->
            <!--#include file="inc.utils.asp"-->
            <div class="chat-container">
                <div class="contents chat-content">
                    <!--#include file="inc.board-topbtn.asp"-->

                    <div class="view no-data">
                        <div class="board-table-wrap">
                            <table class="board-table">
                                <colgroup>
                                    <col width="10%">
                                    <col width="10%">
                                    <col>
                                    <col width="15%">
                                    <col width="15%">
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>유형</th>
                                        <th>제목</th>
                                        <th>등록일</th>
                                        <th>답변상태</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colspan="5" class="no-data">작성한 게시글이 없습니다.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <a href="#" class="btn-ask">문의하기</a>
                </div>
            </div>
        </main>
        <div class="dimmed"></div>
    </div>
</body>

</html>