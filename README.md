# ACO Trade Image Helper
### A Simple Discord Tool for ACOs to create carrier images for their carrier.
Invite Link: https://discord.com/api/oauth2/authorize?client_id=989186785395474442&permissions=379968&scope=bot%20applications.commands  
When Hosting the Bot yourself, 379968 is the permissions required and scopes are applications.commands and bot.
## Commands
#### Carrier Mission Commands
`/load (nactag carriername carrierid commodity station system profit units)` 
- Gives an image and post text using provided paramaters for carrier loading.

`/unload (nactag carriername carrierid commodity station system profit units)`
- Gives an image and post text using provided paramaters for carrier unloading.
#### WOKCommands Commands
`/channelonly (command) [channel]`
- Makes a command only work in some channels 

`/command (action command)`
- Enables or disables a command for the server

`/language [language]`
- Sets the language for WOKCommands (Note: does not set language for Carrier Mission Commands!)

`/prefix [prefix]`
- Sets the legacy command prefix (Note: Unused)

`/requiredrole (command none-or-roleid)`
- Makes a command require a specific role
