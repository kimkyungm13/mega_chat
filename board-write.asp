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
                                <label for="type">����</label>
                                <select id="type" name="type" required>
                                    <option value="" disabled selected>������ �������ּ���.</option>
                                    <option value="error">�����Ű�</option>
                                    <option value="etc">��Ÿ</option>
                                </select>
                                <label for="title">����</label>
                                <input type="text" id="title" placeholder="������ �Է��� �ּ���.">
                            </div>
                            <div class="form-group">
                                <label for="content">����</label>
                                <textarea id="content" placeholder="������ �Է��� �ּ���."></textarea>
                                <!--25.07.21-->
                                <div class="notice">
                                    * �ް��ν��� AI �����̴� AI ���� Ư���� �亯�� �Ұ����ϰų�, �����Ϳ� ������ �߻��ϴ� ��찡 ���� �� �ֽ��ϴ�.
                                </div>
                            </div>
                            <div class="form-group">
                                <label>÷������</label>
                                <div class="file-upload">
                                    <label for="fileInput">
                                        <span class="icon-file"></span>���� ÷��
                                    </label>
                                    <input type="file" id="fileInput" multiple />
                                    <div class="limit">* 10MB �̸��� ���ϸ� ÷���Ͻ� �� �ֽ��ϴ�.</div>
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
                        <a href="#" class="btn btn-list">���</a>
                        <div class="btn-adit-wrap">
                            <button type="button" class="btn btn-save" onclick="">����</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <div class="dimmed"></div>
    </div>
</body>

</html>