Zotero.KeepZotero = new function () {
    /**
     * Get preference value in 'extensions.zotfile' branch
     * @param  {string} pref     Name of preference in 'extensions.zotfile' branch
     * @return {string|int|bool} Value of preference.
     */
    this.getPref = function (pref) {
        return Zotero.Prefs.get('extensions.keepzotero.' + pref, true);
    };

    /**
     * Open keepzotero preference window
     */
    this.openPreferenceWindow = function (paneID, action) {
        var io = { pane: paneID, action: action };
        window.openDialog('chrome://keepzotero/content/options.xul',
            'keepzotero-options',
            'chrome,titlebar,toolbar,centerscreen,' +
                Zotero.Prefs.get('browser.preferences.instantApply', true) ? 'dialog=no' : 'modal',
            io);
    };

    /**
     * The closeListener is change the normal close to minimize
     */
    this.closeListener = function (event) {
        const currentTarget = event.currentTarget;
        // currentTarget.windowState != Components.interfaces.nsIDOMChromeWindow.STATE_MINIMIZED
        // windowState is number and 2 is for minimized
        if (this.getPref("cb_disable_close") && currentTarget.windowState.valueOf() != 2) {
            currentTarget.minimize();
            event.preventDefault();
        }
    }.bind(this)

    /**
     * make the ctrl/cmd + w minimize the window
     */
    this.keydownListener = function (event) {
        const cmdOrCtrlOnly = Zotero.isMac
            ? (event.metaKey && !event.shiftKey && !event.ctrlKey && !event.altKey)
            : (event.ctrlKey && !event.shiftKey && !event.altKey);
        if (this.getPref('cb_disable_zotero_close') && cmdOrCtrlOnly && event.key.toLowerCase() == 'w') {
            event.currentTarget.minimize();
            event.preventDefault();
            event.stopPropagation();
        }
        // Only shortcut for not mac
        if (Zotero.isMac) {
            return;
        }

        const altOnly = !event.shiftKey && !event.ctrlKey && event.altKey;
        if (this.getPref('cb_enable_alt_f4') && altOnly && event.key == 'F4' ||
            this.getPref('cb_enable_ctrl_q') && cmdOrCtrlOnly && event.key.toLowerCase() == 'q') {
            goQuitApplication();
            // If the confirmation deny the exit, keep the original window
            event.preventDefault();
            event.stopPropagation();
        }
    }.bind(this)

    /**
     * give confirmation dialog when user close Zotero
     */
    this.checkExitListener = function (event) {
        event.preventDefault();
        return (event.returnValue = 'Are you sure you want to exit?');
    }

};