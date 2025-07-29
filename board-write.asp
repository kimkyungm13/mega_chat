<!--#include file="inc.head.asp"-->

<body>
    <div class="container">
        <!--#include file="inc.lnb.asp"-->
        <main class="main">
            <!--#include file="inc.header.asp"-->
            <!--#include file="inc.utils.asp"-->
            <div class="chat-container">
                <div class="contents chat-content">
                    <!--#include file="inc.board-top.asp"-->
                    <div class="view write-wrap">
                        <form>
                            <div class="form-group">
                                <label for="type">유형</label>
                                <select id="type" name="type" required>
                                    <option value="" disabled selected>유형을 선택해주세요.</option>
                                    <option value="error">오류신고</option>
                                    <option value="etc">기타</option>
                                </select>
                                <label for="title">제목</label>
                                <input type="text" id="title" placeholder="제목을 입력해 주세요.">
                            </div>
                            <div class="form-group">
                                <label for="content">내용</label>
                                <textarea id="content" placeholder="내용을 입력해 주세요."></textarea>
                                <!--25.07.21-->
                                <div class="notice">
                                    * 메가로스쿨 AI 디케이는 AI 서비스 특성상 답변이 불가능하거나, 데이터에 오류가 발생하는 경우가 있을 수 있습니다.
                                </div>
                            </div>
                            <div class="form-group">
                                <label>첨부파일</label>
                                <div class="file-upload">
                                    <label for="fileInput">
                                        <span class="icon-file"></span>파일 첨부
                                    </label>
                                    <input type="file" id="fileInput" multiple />
                                    <div class="limit">* 10MB 미만의 파일만 첨부하실 수 있습니다.</div>
                                </div>
                            </div>
                            <div class="file-list">
                                <div class="file-item">
                                    <div class="name"><span class="icon-file"></span> IMG_0705.jpg</div>
                                    <button class="remove" onclick="this.closest('.file-item').remove();"></button>
                                </div>
                                <div class="file-item">
                                    <div class="name"><span class="icon-file"></span> IMG_0706.jpg</div>
                                    <button class="remove" onclick="this.closest('.file-item').remove();"></button>
                                </div>
                                <div class="file-item">
                                    <div class="name"><span class="icon-file"></span> IMG_0707.jpg</div>
                                    <button class="remove" onclick="this.closest('.file-item').remove();"></button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="btn-group">
                        <a href="#" class="btn btn-list">목록</a>
                        <div class="btn-adit-wrap">
                            <button type="button" class="btn btn-save" onclick="">저장</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <div class="dimmed"></div>
    </div>
</body>

</html>