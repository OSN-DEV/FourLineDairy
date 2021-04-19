const fs = require("fs")
const path = require('path');

// 参考
// https://blog.katsubemakito.net/nodejs/file-read

class DiaryOp {
    /**
     * 日記情報をテキストに保存する
     * @param {string} root ルートフォルダ
     * @param {string} data 対象日付
     * @returns true:処理成功、false:それ以外
     */
    saveDiary(root, data) {
        let file = path.join(root, `${data.date}.txt`)
        console.log(file)

        try {
            if (this.isFileExist(file)) {
                fs.unlinkSync(file)
            }
            fs.writeFileSync(file, 
                data.line1 + '\n' + 
                data.line2 + '\n' + 
                data.line3 + '\n' + 
                data.line4 + '\n' + 
                data.freeSpace)
            return true;
        } catch(err) {
            return false
        }
    }

    /**
     * 日記情報を取得する
     * @param {string} root ルートフォルダ
     * @param {string} date 対象日付
     * @returns 日記情報(日記が存在しない場合はメンバがすべて空のオブジェクトを返却)
     */
    getData(root, date) {
        let file = path.join(root, `${date}.txt`)
        let result = {
            "line1":"",
            "line2":"",
            "line3":"",
            "line4":"",
            "freeSpace":"",
        }
        if (!this.isFileExist(file)) {
            return result
        }

        try {
            let text = fs.readFileSync(file, "utf8").split("\n")
            if (text.length < 5) {
                return result
            }
            result.line1 = text[0]
            result.line2 = text[1]
            result.line3 = text[2]
            result.line4 = text[3]
            for(let i = 4; i < text.length; i++) {
                result.freeSpace += text[i]
                if (i < text.length -1) {
                    result.freeSpace += "\n"
                }
            }
        } catch(err) {
        }
        return result
    }

    /**
     * ファイルの存在チェック
     * @param { string } file チェックするファイル名
     * @returns true:ファイルあり、false:それ以外
     */
    isFileExist(file) {
        var isExist = false;
        try {
            fs.statSync(file);
            isExist = true;
        } catch(err) {
            console.log(`${file} not found`)
            isExist = false;
        }
        return isExist;
    }
}

module.exports = DiaryOp