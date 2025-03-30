KeepZotero = {
    id: null,
    version: null,
    rootURI: null,
    initialized: false,
    addedElementIDs: [],

    init({ id, version, rootURI }) {
        if (this.initialized) return;
        this.id = id;
        this.version = version;
        this.rootURI = rootURI;
        this.initialized = true;
    },

    log(msg) {
        Zotero.debug("KeepZotero: " + msg);
    },

    addToWindow(window) {
        if (window.ZoteroPane) {
            this.log("install keydown event")
            window.addEventListener("keydown", KeepZotero.Listener.keydownListener);
            this.log("install beforeunload event")
            window.addEventListener("beforeunload", KeepZotero.Listener.checkExitListener);
        }
    },

    addToAllWindows() {
        var windows = Zotero.getMainWindows();
        for (let win of windows) {
            if (!win.ZoteroPane) continue;
            this.addToWindow(win);
        }
    },

    removeFromWindow(window) {
        if (window.ZoteroPane) {
            this.log("remove keydown event")
            window.removeEventListener("keydown", KeepZotero.Listener.keydownListener);
            this.log("remove beforeunload event")
            window.removeEventListener("beforeunload", KeepZotero.Listener.checkExitListener);
        }
    },

    removeFromAllWindows() {
        var windows = Zotero.getMainWindows();
        for (let win of windows) {
            if (!win.ZoteroPane) continue;
            this.removeFromWindow(win);
        }
    },


    async main() {
    },
};


KeepZotero.Listener = new function () {
    /**
     * Get preference value in 'extensions.keepzotero' branch
     * @param  {string} pref     Name of preference in 'extensions.keepzotero' branch
     * @return {string|int|bool} Value of preference.
     */
    this.getPref = function (pref) {
        return Zotero.Prefs.get('extensions.keepzotero.' + pref, true);
    };

    this.log = function(text) {
        Zotero.debug("KeepZotero Listener: " + text);
    }

    /**
     * make the common exit key just minimize the window
     */
    this.keydownListener = function (event) {
        const cmdOrCtrlOnly = Zotero.isMac
            ? (event.metaKey && !event.shiftKey && !event.ctrlKey && !event.altKey)
            : (event.ctrlKey && !event.shiftKey && !event.altKey);
        this.log("enable ctrl + w for minimization: " + this.getPref('cb_enable_ctrl_w'));
        this.log("enable alt + f4 for minimization: " + this.getPref('cb_enable_alt_f4'));
        this.log("enable ctrl + q for minimization: " + this.getPref('cb_enable_ctrl_q'));
        if (this.getPref('cb_enable_ctrl_w') && cmdOrCtrlOnly && event.key.toLowerCase() == 'w') {
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
            event.currentTarget.minimize();
            event.preventDefault();
            event.stopPropagation();
        }
    }.bind(this)

    /**
     * give confirmation dialog when user close Zotero
     */
    this.checkExitListener = function (event) {
        this.log("give confirmation when exit: " + this.getPref('cb_enable_ctrl_q'));
        if (this.getPref('cb_check_exit')) {
            event.preventDefault();
            event.returnValue = true;
        }
    }.bind(this)
};