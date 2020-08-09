export class StatsObservant {
  constructor(app) {
    this._application = app;
    document.addEventListener('keydown', (event) => {
      if (event.key === 's') {
        this._toggleStats();
      }
    });
    if (sessionStorage['__stats_visibility__'] === 'true') {
      this._showStats();
    }
    // @ts-ignore
    this._application.stats.showPanel(0);
  }

  _toggleStats() {
    this._visible ? this._hideStats() : this._showStats();
    this._visible = !this._visible;
    sessionStorage['__stats_visibility__'] = this._visible;
  }

  _hideStats() {
    // @ts-ignore
    document.body.removeChild(this._application.stats.dom);
    this._application.ticker.remove(this._updateStats, this);
  }

  _showStats() {
    // @ts-ignore
    document.body.appendChild(this._application.stats.dom);
    this._application.ticker.add(this._updateStats, this);
  }

  _updateStats() {
    // @ts-ignore
    this._application.stats.update();
  }
}
