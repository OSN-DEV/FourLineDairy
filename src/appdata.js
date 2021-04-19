const Store = require('electron-store')
/*
    store.set(key, value)   // 保存
    value = store.get(key)  // 取得
    store.delete(key)       // 削除
    store.clear()           // 全削除
    store.has(key)          // キーの確認
*/

const Keys = {
    root: "root",
}

class AppData {
    constructor() {
        this.store = new Store()
    }

    // ルートフォルダ
    getRoot() { return this.store.has(Keys.root) ? this.store.get(Keys.root) : '' }
    setRoot(value) { this.store.set(Keys.root, value) }
}

module.exports = AppData