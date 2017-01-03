/**
 * @file
 * A Backbone model for representing paragraphs_editor commands.
 */

/**
 * @file
 * Drupal CKEditor Toolbox plugin.
 *
 * @ignore
 */
(function ($, Drupal, CKEDITOR) {

  'use strict';

  Drupal.ckeditor_toolbox.DragHandler = function(editor, finder, dropTargetTracker) {
    this._editor = editor;
    this._finder = finder;
    this._dropTargetTracker = dropTargetTracker;
  }

  $.extend(Drupal.ckeditor_toolbox.DragHandler.prototype, {

    /**
     * Handles when a card first starts getting dragged.
     */
    start: function(evt, cardView) {
      this._initializeDrag(evt, cardView);

      // Focus the editor to show the carot and start tracking the drop region.
      this._editor.focus();
      this._dropTargetTracker.startTracking();
      this._setDragging(true);

      this._alterDrag(evt, cardView);
    },

    /**
     * Handles when a card is no longer being dragged.
     */
    stop: function(evt) {
      this._dropTargetTracker.stopTracking();
      this._setDragging(false);

      // We can't always rely on the iframe to generate a drop event, so
      // we manually fire it whenever the user stops dragging.
      var dropRange = this._dropTargetTracker.getTargetRange();
      if (dropRange) {
        this._editor.fire('drop', {
          dropRange: dropRange,
          target: dropRange.startContainer,
        });
      }
    },

    /**
     * Handles when a card enters the editor zone.
     */
    enter: function(evt) {
      this._dropTargetTracker.updateTarget(evt.data.$.clientY);
      this._updateDropEffect(evt);
    },

    /**
     * Handles when a card leaves the editor.
     */
    leave: function(evt) {
      this._dropTargetTracker.reset();
      this._updateDropEffect(evt);
    },

    _initializeDrag: function(evt, cardView) {
      // Attach the card model to the event data using the clipboard
      // facade.
      CKEDITOR.plugins.clipboard.initDragDataTransfer(evt);
      evt.data.dataTransfer.setData('cke/toolbox-item', cardView.model);
      evt.data.dataTransfer.setData('text/html', cardView.$el.text());
      this._finder.setDraggedModel(cardView.model);
    },

    _alterDrag: function(evt, cardView) {
      if (evt.data.dataTransfer.$.setDragImage) {
      }
    },

    _updateDropEffect: function(evt) {
      var dataTransfer = evt.data.$.dataTransfer;
      if (dataTransfer) {
        var draggedModel = this._finder.getDraggedModel();
        if (draggedModel.get('dropable')) {
          dataTransfer.dropEffect = 'copy';
        }
        else {
          dataTransfer.dropEffect = 'none';
        }
      }
      evt.data.preventDefault();
    },

    _setDragging: function(yesno) {
      var draggedModel = this._finder.getDraggedModel();
      if (draggedModel) {
        draggedModel.set({dragging: yesno});
      }
    }

  });

})(jQuery, Drupal, CKEDITOR);
