# What? Why? Waaa
I wanted to pause spotify running in firefox using my media keys and this is what i have. It works and as of now it is just pause and play. Adding the rest is just a piece of cake, but why make a cake you dont want to eat :p .I'll add that soon :D

# Server
The server is an application that sends over the media key to the plugin via websockets. I couldnt figure out an easier way of doing this and believe me this was not easy too. (Note:I have never worked with ObjC/ Cocoa / OSX Whatever)

# Plugin
After fighting with a raw firefox plugin for days, i ended up using the SDK (which i didnt want to, because the plan was to learn). It basically listens for the media key events, finds the first spotify tab and pauses it. It is very raw .. very very raw and a kind-of-weekend project. I will try to update this as per required.

# Running it
 - install `node.js`, `npm` and firefox (you should install them, even if you are not using this plugin)
 - Clone the repository `$ git clone https://github.com/hardfire/mekespo`
 - Change directory `$ cd mekespo`
 - Switch to the server directory $ `cd server`
 - install server packages `$ npm install`
 - run the server `$ node server.js&` - Note, for now you should do this after every restart or maybe put it in your bashrc / startup. Need to figure out a better way to handle this.
 - install the plugin in firefox. The plugin xpi file is at `plugin/mekespo.xpi` - just drag and drop it to your firefox
 - Enjoy!

# FAQ
* iTunes starts up everytime i use my media Keys
 - this worked for me acidx.net/wordpress/2013/03/stop-itunes-from-launching-when-using-media-keys/

# Feature Requests
Frankly, I would like Pull Requests more than feature requests :D
Or just create an issue \m/
