const { contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld(
  "api", {
    SearchDiary: (date, callback) =>
        ipcRenderer.invoke("r2m:search-diary", date.replaceAll("/",""))
            .then(result => callback(result))
            .catch(err => console.log(err)),
    SelectRoot: () =>
        ipcRenderer.invoke("r2m:select-root")
        .then(result => result)
        .catch(err => console.log(err)),
    SaveDiary: (data) =>{
        // console.log(data)
        ipcRenderer.invoke("r2m:save-diary", data)
            .then(result => result)
            .catch(err => console.log(err))
    }
  }
);