# KeepZotero
KeepZotero is a zotero plugin to keep zotero in taskbar by changing close to minimize or disabling shortcut

# Installation
1. Download the *.xpi from Release
2. Start Zotero: Tools -> Add-ons
3. select "Install Add-on From File..." from the wheel on top right corner
4. choose the xpi file

# Usage
There are some options to decide KeepZotero's behavior
1. (Default: yes) When window is not minialized, normal close way lead minialization.  
This will change the normal close way - the closs button of the window, alt + F4 (Windows), close from taskbar such that they minimized the window.  
When Zotero is minimized, close from taskbar terminates Zotero.
2. (Default: yes) Make shortcut Ctrl/Command + W to be minimization
Note. this shortcut still works on pdf reader or other place out of the main panel. Clicking File/Close or File/Exit still close the Zotero.
3. (Default: no) Give a confirmation dialog to avoid Exit. If it is selected, user need to confirm exit to close Zotero.
The followings only have effect on Windows or Linux:
4. (Default: no) Enable the shortcut Alt + F4 to close entire Zotero. Note. Without this option, Alt + F4 minimizes Zotero.
5. (Default: yes) Enable the shortcut Ctrl + W to close entire Zotero. Note. MacOS Command + Q always closes entire Zotero.

Note. When only enable the third option, the Alt + F4 and clicking close button on titlebar will not have the confirmation dialog.
However, if also enable the forth option, the Alt + F4 will give the confirmation dialog.

# Different keyboard layout
If the current shortcut is not your usual shortcut (not the personal shortcut) to close the panel, please create an issue with the shortcut.

# Acknowledgment
- Thanks to [Thunderbird keepintaskbar](https://github.com/martinzilak/keepintaskbar). It gives me the direction.
- Thanks to [Zotfile](https://github.com/jlegewie/zotfile) and [zotero-hellow-world](https://github.com/zotero/zotero-hello-world/) such that I can follow its structure and build this plugin

# My Limitation and Questions
Although I have some coding experience with different language, I do not learn JavaScript or Chrome Extension(?). Thus, the code may do some stupid things... When developing this plugin, I do not find the proper documentation to explain my questions, which I write them in the code. I will appreciate if someone notice any issue inside the code or have some answer to my questions.
- I add the listener for clicking File/Close. It captures the behavior but Zotero is still closed even if I use `stopPropagation()` and `preventDefault()`.
- I try the visiblitychange not beforeunload but Zotero seems not to change the visiblitychange property or I use the wrong window to check
- I can only use 2 not `Components.interfaces.nsIDOMChromeWindow.STATE_MINIMIZED` for checking `windowState` in `closeListener`. The later one is shown undefined.
- I do not find or try the proper way such that MacOS also shows KeepZotero's preferences with buttons, so I put the sync function into unload.
- MacOS may redraw the window (Command + W close and then reopen it from taskbar). I do not regenerate the KeepZotero. KeepZotero's `openPreferenceWindow` may still use the old window not the new one such that opening preference throws `NS_ERROR_NOT_AVAILABLE` error.  
Currently, I always get the current main window to avoid this question. Of course, if select the second option to make Command + W to be minimization, it somehow avoid this kind of issue.