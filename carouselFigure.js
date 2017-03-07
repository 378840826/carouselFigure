/*
1，写出基础 HTML
2，绑定上下一张按钮事件
3，写出小图 HTML
4，小图相应高亮
5，小图坐标位移
*/

// 定义 log 函数
const log = function() {
    console.log.apply(console, arguments)
}

//定义 toggleClass
const toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

//定义 removeClassAll
const removeClassAll = function(className) {
    var selector = '.' + className
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}

//定义 下一张 函数
const next = function() {
    //找到存储图片数据的 div,并找出数据
    var bigPic = document.querySelector('.big_pic')
    //所有图片数量
    var number = parseInt(bigPic.dataset.imgs)
    //当前显示的图片下标(也是id后缀)
    var activeIndex = parseInt(bigPic.dataset.active)

    //隐藏当前图片
    var nowImgId = 'id-big-' + activeIndex
    var nowImg = document.querySelector(`#${nowImgId}`)
    nowImg.classList.remove('active')

    //算出下一张图片的下标，并设置父元素的 data-active
    var nextIndex = parseInt(activeIndex + 1) % number
    //log('activeIndex',activeIndex)
    //log('nextIndex',nextIndex)
    bigPic.dataset.active = nextIndex

    //通过下标拼出 id 找到新图片
    //给新图片的 class 加上 active
    var newId = 'id-big-' + nextIndex
    var newImgs = document.querySelector(`#${newId}`)
    newImgs.classList.add('active')
    //高亮相应小图
    smallOpacity()
    //位移小图片
    smallMove()
}

//定义 上一张 函数
const last = function() {
    //找到存储图片数据的 div,并找出数据
    var bigPic = document.querySelector('.big_pic')
    //所有图片数量
    var number = parseInt(bigPic.dataset.imgs)
    //当前显示的图片下标(也是id后缀)
    var activeIndex = parseInt(bigPic.dataset.active)

    //隐藏当前图片
    var nowImgId = 'id-big-' + activeIndex
    var nowImg = document.querySelector(`#${nowImgId}`)
    nowImg.classList.remove('active')

    //算出上一张图片的下标，并设置父元素的 data-active
    var lastIndex = parseInt((activeIndex - 1 + number) % number)
    //log('activeIndex',activeIndex)
    //log('lastIndex',lastIndex)
    bigPic.dataset.active = lastIndex

    //通过下标拼出 id 找到新图片
    //给新图片的 class 加上 active
    var newId = 'id-big-' + lastIndex
    var newImgs = document.querySelector(`#${newId}`)
    newImgs.classList.add('active')
    //高亮相应小图
    smallOpacity()
    //位移小图片
    smallMove()
}

//绑定下一张按钮事件
const bindNext = function(event) {
    var nextButton = document.querySelector('.button_next')
    nextButton.addEventListener('click', next)
}

//绑定上一张按钮事件
const bindLast = function(event) {
    var lastButton = document.querySelector('.button_last')
    lastButton.addEventListener('click', last)
}

//设置当前小图片高亮
const smallOpacity = function() {
    //找到当前显示的图片
    //先找到当前显示的大图的下标
    var bigPic = document.querySelector('.big_pic')
    var nowImgIndex = bigPic.dataset.active
    //拼接 id 找出小图
    var nowSmallId = '#id-small-' + nowImgIndex
    //设置当前小图高亮
    var nowSmall = document.querySelector(nowSmallId)
    removeClassAll('opacity')
    nowSmall.classList.add('opacity')
}

//小图坐标根据显示位移（第3、4张时需要位移）
//第 3 张时 small_pic 移动 left -130px
//第 4 张时 small_pic 移动 left -260px
//第 1 张时 移回 0 点
const smallMove = function() {
    //得到要移动的小图长条容器
    var smallPic = document.querySelector('.small_pic')
    //得到当前显示的图片的下标
    var bigPic = document.querySelector('.big_pic')
    var nowImgIndex = bigPic.dataset.active
    //判断是否第 3、4、1张
    //因有‘上一张’从第一张到最后一张时候，需判断是否最后一张
    var smallPic = document.querySelector('.small_pic')
    if (nowImgIndex == 2) {
        smallPic.setAttribute('style', 'left: -130px')
    } else if (nowImgIndex == 3 || nowImgIndex == 4) {
        smallPic.setAttribute('style', 'left: -260px')
    } else if (nowImgIndex == 0) {
        smallPic.setAttribute('style', 'left: 0px')
    }
    //上一张按钮时在 3 转 2 张 时候出现高亮图不再中间的 bug
    if (event.target.classList.contains('button_last')) {
        if (nowImgIndex == 1) {
            smallPic.setAttribute('style', 'left: 0px')
        }
    }
}






//绑定所有事件集合
const bindAll = function() {
    //下一张按钮事件
    bindNext()
    //上一张按钮事件
    bindLast()
}

//主函数
const __mian = function() {
    bindAll()
}


//程序入口
__mian()
