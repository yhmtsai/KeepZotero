if (!Zotero.KeepZotero) {
    var loader = Components.classes["@mozilla.org/moz/jssubscript-loader;1"]
        .getService(Components.interfaces.mozIJSSubScriptLoader);
    loader.loadSubScript("chrome://keepzotero/content/keepzotero.js");
}
// only add event listener when the window contain ZoteroPane
if (window.ZoteroPane) {
    window.addEventListener("close", Zotero.KeepZotero.closeListener, false);
    // click event listener to File/Close can detect the event but it still closes with StopPropagation
    // window.addEventListener("click", Zotero.KeepZotero.clickCloseListener);
    window.addEventListener("keydown", Zotero.KeepZotero.keydownListener);
    // https://developer.chrome.com/blog/page-lifecycle-api/#the-beforeunload-event
    // beforeunload will give a confirm dialog when using zotero's toolbar/
    if (Zotero.KeepZotero.getPref('cb_check_exit')) {
        console.log('Start need to add check exit')
        window.addEventListener("beforeunload", Zotero.KeepZotero.checkExitListener);
    }
    // try visiblitychange but zotero Close/Exit seem not to change the visibiltyState
}
