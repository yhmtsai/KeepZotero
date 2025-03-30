# KeepZotero (Zotero 7)
KeepZotero is a zotero plugin to keep zotero in taskbar by changing remap the key to minimize or give a confirmation dialog before close.  
The master branch and version 0.1.0 starts to support Zotero 7.  
For the user from Zotero 6. Please check [Changes from Zotero 6 to Zotero 7](#changes-from-zotero-6-to-zotero-7)

# KeepZotero (Zotero 6)
The master branch does not keep the implementation for Zotero 6. However, we still keep the `keepzotero-update.rdf` such that Zotero 6 users do not get invalid url message when checking plugin.  
If you still want to use KeepZotero in Zotero 6, please check [tag v0.0.2](https://github.com/yhmtsai/KeepZotero/tree/v0.0.2) and get the xpi under [release v0.0.2](https://github.com/yhmtsai/KeepZotero/releases/tag/v0.0.2).

# Installation
1. Download the *.xpi from Release
2. Start Zotero: Tools -> Add-ons
3. select "Install Add-on From File..." from the wheel on top right corner
4. choose the xpi file

# Changes from Zotero 6 to Zotero 7
This plugin does not change the behavior of close button anymore.  
This plugin can remap the common exit key (`Ctrl/Command + W`, `Ctrl+ Q`, `Alt + F4`) to just minimize Zotero

# Usage
There are some options to decide KeepZotero's behavior
When Zotero is minimized, close from taskbar terminates Zotero.
1. (Default: Yes) Give a confirmation dialog when closing Zotero. If it is selected, user need to confirm exit to close Zotero. If Alt + F4 still performs `close`, it will not trigger the confirmation dialog. (Unstable, especially MacOS)
2. (Default: yes) Make shortcut Ctrl/Command + W to be minimization
Note. this shortcut still works on pdf reader or other place out of the main panel.
The followings only have effect on Windows or Linux:
3. (Default: yes) Make shortcut Alt + F4 to be minimization
4. (Default: yes) Make shortcut Ctrl + Q to be minimization Note. MacOS Command + Q always closes entire Zotero.

# Different keyboard layout
If the current shortcut is not your usual shortcut (not the personal shortcut) to close the panel, please create an issue with the shortcut.

# Acknowledgment
- Thanks to [Thunderbird keepintaskbar](https://github.com/martinzilak/keepintaskbar). It gives me the direction.
- Thanks to [make-it-red](https://github.com/zotero/make-it-red) such that I can follow its structure and build this plugin for Zotero 7

# My Limitation and Questions
Although I have some coding experience with different language, I do not learn JavaScript or Chrome Extension(?). Thus, the code may do some stupid things... When developing this plugin, I do not find the proper documentation to explain my questions, which I write them in the code. I will appreciate if someone notice any issue inside the code or have some answer to my questions.
- I do not find a way to detect the close button. The close event I used in KeepZotero for Zotero 6 does not work in Zotero 7.
