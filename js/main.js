const commitButton = e('.btn-commit')

const template = function(comment) {
    const t = `
        <div class="yd-comment-item row">
            <div class="col-md-1">
                <img class="yd-comment-avatar" src="image/${comment.avatar}.png" alt="">
            </div>
            <div class="yd-comment-content col-md-11">
                <div class="yd-comment-head">
                    <a href="">${comment.name}</a>
                </div>
                <div class="yd-comment-body">
                    <p>${comment.content}</p>
                </div>
                <div class="yd-comment-footer">
                    <p>${comment.time}</p>
                </div>
            </div>
        </div>
    `
    return t
}

const insertComment = function(comment) {
    const commentWrap = e('.yd-comment-wrap')
    const t = template(comment)
    commentWrap.insertAdjacentHTML('beforeend', t)
}

const saveComment = function() {
    // 把所有评论存入到localStorge
    let items = document.querySelectorAll('.yd-comment-item')
    var comments = []
    for (let i = 0; i < items.length; i++) {
        // 在单个评论页中读取用户信息
        const item = items[i];
        var comment = {
            name: find(item, '.yd-comment-head').innerText,
            content: find(item, '.yd-comment-body').innerText,
            time: find(item, '.yd-comment-footer').innerText,
        }
        // 得到图片的src路径 x.png 的 x 这个属性
        var avatar = find(item, '.yd-comment-avatar').src.slice(-5, -4)
        comment.avatar = avatar
        comments.push(comment)
    }
    console.log('comments', comments);
    localStorage.comments = JSON.stringify(comments)
}

const loadComment = function() {
    // 从localStorge中读取所有的评论并载入, 一开始没有评论, localStorage为空
    var num = e('.span-comment-num')
    var s = localStorage.comments
    if (s !== '') {
        var comments = JSON.parse(localStorage.comments)        
        num.innerText = comments.length
        for (let i = 0; i < comments.length; i++) {
            insertComment(comments[i])
        }
    }
}

bindEvent(commitButton, 'click', function(event) {
    // 1. 读取信息, 存入object中, 随机给一个头像 
    let user = {
        name: e('.yd-name').value,
        email: e('.yd-email').value,
        url: e('.yd-url').value,
        content: e('.yd-editor').value,
        time: getTime(),
        avatar: parseInt(Math.random()*2) + 1
    }
    // 2. 如果用户没输入名字, 给一个自定义的名字
    if (user.name == "") {        
        user.name = '高大锤'
    }
    // 3. 插入用户到页面中
    insertComment(user)
    // 4. 读取页面中所有的评论信息写入到localStorge中
    saveComment()
})

loadComment()

