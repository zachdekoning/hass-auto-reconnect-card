/* Auto Reconnect Card
 * Home Assistant card used to trigger an automatic refresh if connection is lost
 * Used primarily for tablet kiosks where ther companion app can experience a connection timeout and hang indefinitely
 */
class AutoReconnectCard extends HTMLElement {

    hassConnected = true;
    reloadTimeoutInProgress = false;

    reloadIfDisconnected() {
      // Check to ensure HASS hasn't reconnected within timeout period
      if (!this.hassConnected) {
        // If HASS still disconnected after timeout, reload the page

        // If the page is hidden (i.e screen locked), wait until visible and then reload page
        if (document.hidden) {
          window.addEventListener("focus", () => this._onVisibleReload(), { once: true });
        } else {
          // Otherwise, reload now
          window.location.reload();
        }
      }

      // HASS successfully reconnected during timeout, cancel in progress reload check
      this.reloadTimeoutInProgress = false;
    }

    _onVisibleReload () {
      window.location.reload();
    }

    // Whenever the state changes, a new `hass` object is set. Use this to
    // update your content.
    set hass(hass) {

      // Check if HASS is disconnected
      if (!hass.connection.connected) {
        this.hassConnected = false;

        // Ensure another reload check isn't already running
        if (!this.reloadTimeoutInProgress) {
          console.log("HASS Disconnected!");
          this.reloadTimeoutInProgress = true; // Flag reload check as in progress
          // Run schedule reload if necessary  for 30 seconds time from now
          setTimeout(() => { this.reloadIfDisconnected() }, this.config.connection_timeout * 1000);
        }

      } else {
        // Hass is connected!
        this.hassConnected = true;
      }
    }
  
    // The user supplied configuration. Throw an exception and Home Assistantm will render an error card.
    setConfig(config) {
      if (!config.connection_timeout) {
        throw new Error("You need to define the connection_timeout (seconds)");
      }
      this.config = config;
    }
  
    // The height of your card. Home Assistant uses this to automatically
    // distribute all cards over the available columns in masonry view
    getCardSize() {
      return 3;
    }
  
    // The rules for sizing your card in the grid in sections view
    getGridOptions() {
      return {
        rows: 1,
        columns: 3,
        min_rows: 1,
        max_rows: 1,
      };
    }
  }
  
  customElements.define("auto-reconnect-card", AutoReconnectCard);
  console.log("auto-reconnect-card loaded in!");