/**
 * @file
 * Tracker for drag and drop insertion locations.
 *
 * @ignore
 */
(function ($, Drupal, CKEDITOR) {

  Drupal.ckeditor_toolbox.DropTargetTracker = function (finder, locator, liner) {
    this._finder = finder;
    this._locator = locator;
    this._liner = liner;
    this._dragData = null;
    this._isTracking = false;
  }

  $.extend(Drupal.ckeditor_toolbox.DropTargetTracker.prototype, {

    getTargetRange: function() {
      var bestCandidate = this._getBestCandidate();
      return bestCandidate ? this._finder.getRange(this._getBestCandidate()) : null;
    },

    startTracking: function() {
      var resolver = this;

      this._targetCandidates = [];

      // Handle drag events ~ every 50 ms.
      var relations = this._finder.greedySearch();
      this._buffer = CKEDITOR.tools.eventsBuffer(50, function() {
        if (resolver._isTracking) {
          resolver._processUpdate(resolver._y, relations);
        }
        else {
          resolver._liner.hideVisible();
        }
      });

      this._isTracking = true;
    },

    stopTracking: function() {
      if (CKEDITOR.tools.isEmpty(this._liner.visible)) {
        this._targetCandidates = [];
      }

      this._isTracking = false;
      this._y = 0;
      this._liner.hideVisible();
    },

    reset: function() {
      this._setDropable(false);
      this._targetCandidates = [];
      this.stopTracking();
    },

    updateTarget: function(y) {
      if (!this._isTracking) {
        this.startTracking();
      }
      this._y = y;
      this._buffer.input();
    },

    _getBestCandidate: function() {
      return this._targetCandidates.length ? this._targetCandidates[0] : null;
    },

    _renderInsertMarker: function(relations) {
      var dropTargetTracker = this;
      var hasValidTarget = false;
      try {
        var locations = this._locator.locate(relations);
        var bestCandidate = this._getBestCandidate();
        if (bestCandidate) {
          this._liner.prepare(relations, locations);
          this._liner.placeLine(bestCandidate, function(line) {
            dropTargetTracker.fire('line', line);
          });
          this._liner.cleanup();
          hasValidTarget = true;
        }
      }
      catch (e) {
        this._targetCandidates = [];
      }
      this._setDropable(hasValidTarget);
    },

    _processUpdate: function(y, relations) {
      this._targetCandidates = this._locator.sort(y, 1);
      this._renderInsertMarker(relations);
    },

    _setDropable: function(yesno) {
      this.fire('dropable', yesno);
    }
  });

  CKEDITOR.event.implementOn(Drupal.ckeditor_toolbox.DropTargetTracker.prototype);

})(jQuery, Drupal, CKEDITOR);
