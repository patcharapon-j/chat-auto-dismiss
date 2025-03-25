/**
 * Chat Auto Dismiss
 * A module for Foundry VTT that automatically dismisses chat messages after a configurable time period.
 */

// Module constants
const MODULE_ID = 'chat-auto-dismiss';
const DEFAULT_TIMEOUT = 10; // Default timeout in seconds

/**
 * Register module settings
 */
Hooks.once('init', () => {
  console.log(`${MODULE_ID} | Initializing Chat Auto Dismiss`);
  
  // Register module settings
  game.settings.register(MODULE_ID, 'dismissTimeout', {
    name: game.i18n.localize("chat-auto-dismiss.settings.dismissTimeout.name"),
    hint: game.i18n.localize("chat-auto-dismiss.settings.dismissTimeout.hint"),
    scope: 'client',
    config: true,
    type: Number,
    default: DEFAULT_TIMEOUT,
    range: {
      min: 0,
      max: 60,
      step: 1
    },
    onChange: value => {
      console.log(`${MODULE_ID} | Dismiss timeout changed to ${value} seconds`);
    }
  });
  
  // Show Timer Bar setting
  game.settings.register(MODULE_ID, 'showTimerBar', {
    name: game.i18n.localize("chat-auto-dismiss.settings.showTimerBar.name"),
    hint: game.i18n.localize("chat-auto-dismiss.settings.showTimerBar.hint"),
    scope: 'client',
    config: true,
    type: Boolean,
    default: true
  });
  
  // Animation Preset setting
  game.settings.register(MODULE_ID, 'animationPreset', {
    name: game.i18n.localize("chat-auto-dismiss.settings.animationPreset.name"),
    hint: game.i18n.localize("chat-auto-dismiss.settings.animationPreset.hint"),
    scope: 'client',
    config: true,
    type: String,
    choices: {
      "slide": game.i18n.localize("chat-auto-dismiss.settings.animationPreset.choices.slide"),
      "fade": game.i18n.localize("chat-auto-dismiss.settings.animationPreset.choices.fade"),
      "shrink": game.i18n.localize("chat-auto-dismiss.settings.animationPreset.choices.shrink"),
      "none": game.i18n.localize("chat-auto-dismiss.settings.animationPreset.choices.none")
    },
    default: "slide"
  });
  
  // Animation Direction setting
  game.settings.register(MODULE_ID, 'animationDirection', {
    name: game.i18n.localize("chat-auto-dismiss.settings.animationDirection.name"),
    hint: game.i18n.localize("chat-auto-dismiss.settings.animationDirection.hint"),
    scope: 'client',
    config: true,
    type: String,
    choices: {
      "right": game.i18n.localize("chat-auto-dismiss.settings.animationDirection.choices.right"),
      "left": game.i18n.localize("chat-auto-dismiss.settings.animationDirection.choices.left"),
      "up": game.i18n.localize("chat-auto-dismiss.settings.animationDirection.choices.up"),
      "down": game.i18n.localize("chat-auto-dismiss.settings.animationDirection.choices.down")
    },
    default: "right"
  });
});

/**
 * Hook into the chat message rendering process
 */
Hooks.on('renderChatMessage', (message, html, data) => {
  // Only apply to messages in the stream interface
  if (!window.location.pathname.includes('/stream')) return;
  
  const dismissTimeout = game.settings.get(MODULE_ID, 'dismissTimeout');
  
  // If timeout is set to 0, disable auto-dismiss
  if (dismissTimeout <= 0) return;
  
  // Get the user settings
  const showTimerBar = game.settings.get(MODULE_ID, 'showTimerBar');
  const animationPreset = game.settings.get(MODULE_ID, 'animationPreset');
  const animationDirection = game.settings.get(MODULE_ID, 'animationDirection');
  
  // Add the auto-dismiss class to the message
  html.addClass('auto-dismiss');
  
  // Apply timer bar setting
  if (showTimerBar) {
    html.addClass('show-timer-bar');
  }
  
  // Apply animation preset and direction
  html.addClass(`animation-${animationPreset}`);
  
  // Only add direction class for slide animations
  if (animationPreset === 'slide') {
    html.addClass(`direction-${animationDirection}`);
  }
  
  // Set the CSS variable for the countdown animation
  html[0].style.setProperty('--dismiss-timeout', `${dismissTimeout}s`);
  
  // Set a timeout to add the 'dismissing' class which triggers the animation
  setTimeout(() => {
    html.addClass('dismissing');
    
    // After the animation completes, remove the message from the DOM
    setTimeout(() => {
      html.remove();
    }, 1000); // Animation duration in milliseconds
  }, dismissTimeout * 1000);
});

/**
 * Add a hook for when the stream interface is rendered
 */
Hooks.on('renderStreamView', (app, html, data) => {
  console.log(`${MODULE_ID} | Stream view rendered`);
  
  // Apply our styles to the stream view
  html.find('#chat-log').addClass('auto-dismiss-enabled');
});
