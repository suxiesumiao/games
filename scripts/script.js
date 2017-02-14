window.onload = function () {
    // 胜利表
    let win = ['012', '345', '678', '036', '147', '258', '048', '246']
    // 胜利数字-用于记录最终胜利时的胜利表的位置
    let winNumber = ''
    let fnTool = {
        // value values 均为字符串
        // 检测 value中的每一个字符是否都存在于 values 之中 顺序无关
        valueInValues: (value, values) => {
            for (let i = 0, len = value.length; i < len; i++) {
                if (Array.prototype.indexOf.call(values, value[i]) === -1) { return false }
            }
            return true
        },
        // 检测 win 中的某一个元素是否存在于 computed 之中
        winInComputed: (computed) => {
            for (let i = 0, len = win.length; i < len; i++) {
                if (fnTool.valueInValues(win[i], computed)) {
                    winNumber = win[i]
                    return true
                }
            }
        },
        // 给胜利的一方添加效果 附加缓冲
        winEffect: () => {
            for (let i = 0; i < winNumber.length; i++) {
                child[winNumber[i]].classList.add('win')
            }
            fnTool.delayPrint()
        },
        toggleColor: (obj, color) => { obj.classList.toggle(color) },
        addColor: (obj, color) => { obj.classList.add(color) },
        removeColor: (obj, color) => { obj.classList.remove(color) },
        stringSplit: (string, obj) => { return string += obj.getAttribute('data-number') },
        delayPrint: () => { setTimeout(() => { fnTool.init(child, 'Red') }, 2000) },
        textSet: (str) => { text[0].innerText = str },
        // 初始化
        init: (obj, color) => {
            text[0].innerText = `轮到${color}方了`
            fnTool.removeColor(player[1], 'gold')
            fnTool.addColor(player[0], 'red')
            for (let i = 0; i < obj.length; i++) {
                obj[i].className = 'child'
                count = 0, redStore = '', goldStore = ''
            }
        },
        main: (e) => {
            let eTrget = e.target
            // eTrget.matches('div.child') 用于匹配class是div的元素-即使是有多个class 比如.red也会匹配到
            // 此处需要className的唯一性-不用matches方法匹配
            if (eTrget && eTrget.className === 'child') {
                if (count % 2 === 0) {
                    fnTool.addColor(eTrget, 'red')
                    redStore = fnTool.stringSplit(redStore, eTrget)
                    fnTool.textSet('轮到Gold方了')
                    fnTool.toggleColor(player[0], 'red')
                    fnTool.toggleColor(player[1], 'gold')
                    if (fnTool.winInComputed(redStore)) {
                        fnTool.textSet('Red WINS!!!')
                        fnTool.winEffect()
                        return
                    } else if (count === 8) {
                        fnTool.textSet('Draw!!!')
                        fnTool.delayPrint()
                    }
                } else {
                    fnTool.addColor(eTrget, 'gold')
                    goldStore = fnTool.stringSplit(goldStore, eTrget)
                    fnTool.textSet('轮到Red方了')
                    fnTool.toggleColor(player[1], 'gold')
                    fnTool.toggleColor(player[0], 'red')
                    if (fnTool.winInComputed(goldStore)) {
                        fnTool.textSet('Gold WINS!!!')
                        fnTool.winEffect()
                        return
                    }
                }
                count++
            } else if (count !== 9) {
                fnTool.textSet('不要点击边框或是已经点击的区域')
            }
        }
    }
    let parents = document.getElementsByClassName('parent')
    let init = document.getElementsByClassName('init')
    let child = document.getElementsByClassName('child')
    let text = document.getElementsByClassName('text')
    let players = document.getElementsByClassName('players')
    let player = players[0].getElementsByClassName('player')
    // 初始化
    fnTool.init(child, 'Red')
    // 主操作 
    parents[0].addEventListener('click', (e) => { fnTool.main(e) }, false)
    // 清空事件
    init[0].addEventListener('click', () => { fnTool.init(child, 'Red') }, false)
}