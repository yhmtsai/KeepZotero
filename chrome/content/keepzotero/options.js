/**
 * Functions for keepzotero's preference window
 */

var Zotero = Components.classes["@zotero.org/Zotero;1"]
    .getService(Components.interfaces.nsISupports)
    .wrappedJSObject;
Components.utils.import("resource://gre/modules/Services.jsm");

var syncStatus = function () {
    // Get the main window not the preference window
    var existingWin = Services.wm.getMostRecentWindow("navigator:browser");
    if (this.getPref("cb_check_exit")) {
        // before adding, remove once
        existingWin.removeEventListener("beforeunload", Zotero.KeepZotero.checkExitListener);
        existingWin.addEventListener("beforeunload", Zotero.KeepZotero.checkExitListener);
    } else {
        existingWin.removeEventListener("beforeunload", Zotero.KeepZotero.checkExitListener);
    }
}.bind(Zotero.KeepZotero);