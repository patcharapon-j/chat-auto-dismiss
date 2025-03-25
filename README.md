# Chat Auto Dismiss

A Foundry VTT v12 module that automatically dismisses chat messages in the Stream interface after a configurable time period.

## Features

- Automatically dismisses chat messages in the Stream interface after a configurable time period
- Visual countdown indicator showing when a message will be dismissed (can be toggled on/off)
- Multiple animation presets: Slide Out, Fade Out, Shrink, or No Animation
- Configurable animation direction for slide animations (Right, Left, Up, Down)
- Configurable timeout (1-60 seconds, or disable with 0)
- Client-side settings (each user can configure their own preferences)

## Installation

### Method 1: Using the Foundry VTT Module Manager

1. Open the Foundry VTT setup screen
2. Go to the "Add-on Modules" tab
3. Click "Install Module"
4. In the "Manifest URL" field, paste: `https://github.com/patcharapon-j/chat-auto-dismiss/releases/latest/download/module.json`
5. Click "Install"

### Method 2: Manual Installation

1. Download the [latest release](https://github.com/patcharapon-j/chat-auto-dismiss/releases/latest/download/chat-auto-dismiss.zip)
2. Extract the zip file to your Foundry VTT `Data/modules/` folder
3. Restart Foundry VTT if it's already running

## Configuration

1. In Foundry VTT, go to "Game Settings" > "Configure Settings" > "Module Settings"
2. Find the "Chat Auto Dismiss" section
3. Configure the following settings:
   - **Dismiss Timeout**: Set the duration (in seconds) before messages are dismissed
     - Set to 0 to disable auto-dismissing messages
   - **Show Timer Bar**: Toggle the visual countdown indicator at the bottom of messages
   - **Animation Preset**: Choose how messages disappear when dismissed
     - Slide Out: Messages slide away (default)
     - Fade Out: Messages fade to transparent
     - Shrink: Messages shrink and fade out
     - No Animation: Messages disappear instantly
   - **Animation Direction**: For slide animations, choose which direction messages slide
     - Right (default), Left, Up, or Down

## Compatibility

This module is designed for Foundry VTT v12 and specifically targets the Stream interface.

## License

This module is licensed under the MIT License. See the LICENSE file for details.

## Credits

Created by [Patcharapon Joksamut](https://github.com/patcharapon-j).
