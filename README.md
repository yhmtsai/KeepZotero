# KeepZotero
KeepZotero is a zotero plugin to keep zotero in taskbar by changing close to minimize or disabling shortcut

# Installation
1. Download the *.xpi from Release
2. Start Zotero: Tools -> Add-ons
3. select "Install Add-on From File..." from the wheel on top right corner
4. choose the xpi file

# Usage
There are some options to decide KeepZotero's behavior
- (Default: yes) When window is not minialized, normal close way lead minialization.  
This will change the normal close way - the closs button of the window, alt + F4 (Windows), close from taskbar such that they minimized the window.  
When Zotero is minimized, close from taskbar close Zotero.
- (Default: yes) Disable the zotero main panel close shortcut Ctrl/Command + W  
Note. this shortcut still works on pdf reader or other place out of the main panel. Clicking File/Close or File/Exit still close the Zotero.
- (Default: no) Give a confirmation dialog to avoid Exit. If it is selected, user need to confirm exit to close Zotero.

# Acknowledgment
- Thanks to [Thunderbird keepintaskbar](https://github.com/martinzilak/keepintaskbar). It gives me the direction.
- Thanks to [Zotfile](https://github.com/jlegewie/zotfile) and [zotero-hellow-world](https://github.com/zotero/zotero-hello-world/) such that I can follow its structure and build this plugin

# My Limitation and Questions
Although I have some coding experience with different language, I do not learn JavaScript or Chrome Extension(?). Thus, the code may do some stupid things... When developing this plugin, I do not find the proper documentation to explain my questions, which I write them in the code. I will appreciate if someone notice any issue inside the code or have some answer to my questions.
- I add the listener for clicking File/Close. It captures the behavior but Zotero is still closed even if I use `stopPropagation()` and `preventDefault()`.
- I try the visiblitychange not beforeunload but Zotero seems not to change the visiblitychange property or I use the wrong window to check
- I can only use 2 not `Components.interfaces.nsIDOMChromeWindow.STATE_MINIMIZED` for checking `windowState` in `closeListener`. The later one is shown undefined.