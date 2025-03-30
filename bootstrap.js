var KeepZotero;

function log(msg) {
	Zotero.debug("KeepZotero: " + msg);
}

function install() {
	log("Installed KeepZotero");
}

async function startup({ id, version, rootURI }) {
	log("Starting KeepZotero");
	
	Zotero.PreferencePanes.register({
		pluginID: 'keepzotero@yhmtsai',
		src: rootURI + 'preferences.xhtml',
		scripts: [rootURI + 'preferences.js']
	});
	
	Services.scriptloader.loadSubScript(rootURI + 'keepzotero.js');
	KeepZotero.init({ id, version, rootURI });
	KeepZotero.addToAllWindows();
	await KeepZotero.main();
}

function onMainWindowLoad({ window }) {
	KeepZotero.addToWindow(window);
}

function onMainWindowUnload({ window }) {
	KeepZotero.removeFromWindow(window);
}

function shutdown() {
	log("Shutting down");
	KeepZotero.removeFromAllWindows();
	KeepZotero = undefined;
}

function uninstall() {
	log("Uninstalled");
}