What? Why? Waaa
================
I wanted to pause spotify running in firefox using my media keys and this is what i have. It works and as of now it is just pause and play. Adding the rest is just a piece of cake, but why make a cake you dont want to eat :p .I'll add that soon :D

Server
=======
The server is an application that sends over the media key to the plugin via websockets. I couldnt figure out an easier way of doing this and believe me this was not easy too. (Note:I have never worked with ObjC/ Cocoa / OSC)

Plugin
======
After fighting with a raw firefox plugin for days, i ended up using the SDK (which i didnt want to, because the plan was to learn). It basically listens for the media key events, finds the first spotify tab and pauses it. It is very raw .. very very raw and a kind-of-weekend project. I will try to update this as per required.

Feature Requests
================
Frankly, I would like Pull Requests more than feature requests :D
