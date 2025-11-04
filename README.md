# hass-auto-reconnect-card
Home Assistant Frontend card to force-reload HA when websocket is disconnected. A frankly a stupid way to solve a stupid problem.

If you use an iPad or Android tablet as a home control dashboard, you likely use the Home Assistant Companion App to do so.

There is a problem (at least in the iOS app) where when the iPad is woken from the lock screen, the websocket may fail to reconnect and timeout. This is confusing and frustrating members of the household trying to use the tablet to control smart home features.

To work around the issue, this card is added to the dashboard you run on the tablet, and will detect when the websocket disconnects for more than the configured time interval, and force a page refresh.
If the websocket disconnects while the device is locked (or the Home Assistant app is 'hidden'), it will wait until the app is visible again before triggering a refresh.

## Installation
- Place the 'auto-reconnect-card.js' file under /config/www
- Add '/local/autoreconnect-card.js' to your frontend resources via Settings >> Dashboards >> Three Dots (top right corner) >> Resources

## Configuration
This is an 'invisible' card that can be placed on whichever dashboard you wish to have automatically refresh on connection loss

To add the card, edit your desired dashboard, click the add card button, scroll to the bottom, select 'Manual', and set the following YAML

```yaml
type: custom:auto-reconnect-card
connection_timeout: 10
```

The connection_timeout is how many seconds the web socket can be disconnected before it will reload the dashboard.