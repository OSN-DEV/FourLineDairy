let currentDate = null
let line1 = null
let line2 = null
let line3 = null
let line4 = null
let freeSpace = null

/* --------------------------------------------------
  event
-------------------------------------------------- */
window.addEventListener('DOMContentLoaded', onLoad)
window.addEventListener('keydown', onKeyDown)
/**
 * ロードイベント
 */
function onLoad() {
    // reactだったらもう少しきれいに書けるのだろうか・・？
    currentDate = document.getElementById('currentDate')
    line1 = document.getElementById('line1')
    line2 = document.getElementById('line2')
    line3 = document.getElementById('line3')
    line4 = document.getElementById('line4')
    freeSpace = document.getElementById('freeSpace')

    document.getElementById('prev').addEventListener('click', onPrevClick)
    document.getElementById('next').addEventListener('click', onNextClick)
    document.getElementById('root').addEventListener('click', onRootClick)
    document.getElementById('save').addEventListener('click', onSaveClick)

    // 本日の日記を表示
    currentDate.innerText = formatDate(Date())
    window.api.SearchDiary(currentDate.innerText, showData)
    LockControl(true)
}

/**
 * キーイベント
 * @param {eventargs}} e 
 */
function onKeyDown(e) {
    if(e.ctrlKey && e.keyCode == 83){
        onSaveClick();
    }
}

/**
 * 前日ボタンクリック
 */
async function onPrevClick() {
    console.log('onPrevClick')
    currentDate.innerText = addDate(-1)
    window.api.SearchDiary(currentDate.innerText, showData)
    LockControl(true)
}

/**
 * 翌日ボタンクリック
 */
async function onNextClick() {
    console.log('onNextClick')
    currentDate.innerText = addDate(1)
    window.api.SearchDiary(currentDate.innerText, showData)
    LockControl(true)
}

/**
 * ルート選択ボタンクリック
 */
async function onRootClick() {
    console.log('onRootClick')
    const result = await window.api.SelectRoot()
}

/**
 * 保存ボタンクリック
 */
async function onSaveClick() {
    console.log('onSaveClick')

    // クラスを渡したいけどレンダラープロセスではrequireを使えない設定にしているので今回は我慢。。
    const result = await window.api.SaveDiary(
        {
            'date': currentDate.innerText.replaceAll("/","")
           ,'line1': line1.value
           ,'line2': line2.value
           ,'line3': line3.value
           ,'line4': line4.value
           ,'freeSpace': freeSpace.value
        }
    )
}


/* --------------------------------------------------
  private method
-------------------------------------------------- */
/**
 *  日付のフォーマット
 * @param { string } date フォーマット対象の日付
 * @returns 書式済みの日付
 */
function formatDate(date) {
    var dt = new Date(date)
    var y = dt.getFullYear()
    var m = ("00" + (dt.getMonth()+1)).slice(-2)
    var d = ("00" + dt.getDate()).slice(-2)
    var result = y + "/" + m + "/" + d
    return result
}

/**
 * 日付ラベルに加算した日付を取得
 * @param {*} day 加算する日数(+1 or -1)
 * @returns 加算結果
 */
function addDate(day) {
    var dt = new Date(currentDate.innerText)
    dt.setDate(dt.getDate() + day)
    return formatDate(dt)
}

/**
 * 日記を表示する
 * @param { object } data 
 */
function showData(data) {
    console.log("showData")
    line1.value = data.line1
    line2.value = data.line2
    line3.value = data.line3
    line4.value = data.line4
    freeSpace.value = data.freeSpace
    LockControl(false)
}

/**
 * 画面のコントロールをロックする
 * @param { boolean } lock 
 */
function LockControl(lock) {
    console.log("LockControl")
    document.getElementById('header')
        .childNodes.forEach(element => {element.disabled = lock})
    document.getElementById('form')
        .childNodes.forEach(element => {element.disabled = lock})
}
